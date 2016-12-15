"use strict"

const logger = require("log4js").getLogger("autocarro"),
      events = require("../../events"),
      config = require("./config"),
      http = require('http-as-promised'),
      _ = require("lodash"),
      S = require("string")

function parseResponse(body){
    const begin = "  var COLLECTION = "
    const lineSelected = _.find(body.split("\n"), line => {
        return S(line).startsWith(begin)
    })
    const json = S(lineSelected).chompLeft(begin).chompRight(";").s

    return JSON.parse(json)
}

function parseRow(row){
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

events.once("app.started", event => {
    return http(config.baseUrl).spread( (response, body) => {
        const rows = parseResponse(body)
        _.each(rows, row => {
            events.emit("row.found", parseRow(row))
        })
        logger.info("end")
    })
})