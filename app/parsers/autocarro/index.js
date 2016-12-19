"use strict"

const logger = require("log4js").getLogger("autocarro"),
      events = require("../../events"),
      config = require("./config"),
      http = require('http-as-promised'),
      _ = require("lodash"),
      S = require("string"),
      Promise = require("bluebird"),
     cheerio = require('cheerio')

function getDetails(url){
    loger.trace("getDetails",url)
    return http(url).spread( (response, body) => {
        let $ = cheerio.load(body)

        let details = $("div.details-datas-w tr")

        const result = {}
        details.each( (index, element) => {
            const key = $(element).find("strong").text()
            const value = S($(element).find("td").last().text()).trim().s
            //console.log(key,"=",value)
            result[key]=value
        })
        
        return result
    }).catch (error => {
        logger.error("Error",error)
    })
}

function parseResponse(body){
    const begin = "  var COLLECTION = "
    const lineSelected = _.find(body.split("\n"), line => {
        return S(line).startsWith(begin)
    })
    const json = S(lineSelected).chompLeft(begin).chompRight(";").s

    return JSON.parse(json)
}

function buildRow(row){
    return {
        //foto: row.fot,
        opcionais: row.opc,
        url: `http://autocarro.com.br/${row.lnk}`,
        //tip: '1',
        //vei: 'Carros',
        id: row.cod,
        ano: row.ano,
        ano_fabricacao: row.fab,
        valor: row.val,
        //val2: '42.990,00',
        portas: row.por,
        marca: row.mar,
        modelo: row.mod,
        versao: row.ver,
        combustivel: row.com,
        cambio: row.cam,
        cor: row.cor,
        estado: row.est,
        cidade: row.cid,
        //anu: '2',
        nome: row.nom,
        telefone: row.lgf,
        source: "AutoCarro"
        //lga: '0' 
    }
}

function getRowsFromPage(){
    logger.trace("Loading page", config.baseUrl)
    return http(config.baseUrl).spread( (response, body) => {
        const rows = parseResponse(body)
        logger.trace("Got rows")
        return rows;
    }).catch( error => {
        logger.error("getRowsFromPage", error)
        return []
    })
}

function enrichWithDetails(row){
    return getDetails(row.url)
    .then (details => {
        row.km = details["Km:"]
        row.placa = details["Placa:"]
        return row
    })
}

events.once("app.started", event => {
    return getRowsFromPage()
    .then( rows => {
        return Promise.map(rows, row => {
            events.emit("row.found",buildRow(row))
/*
            return enrichWithDetails(buildRow(row)).then(newRow => {
                events.emit("row.found", newRow)
            })
*/                        
        })
    }).then ( () => { 
        logger.info("end")
    })
})