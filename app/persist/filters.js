"use strict"

const _ = require("lodash"),
      S = require("string")

function checkInvalid(row, invalidList, field){
    return !_.find(invalidList, item => {
        return item == row[field]
    })
}

function isPortasOk(row){
    const invalid = [2,3]
    return checkInvalid(row,invalid, "portas")
}

function isMarcaOk(row){
    const invalid = ["REBOQUE","PEUGEOT","LIFAN","JAC","GEELY","CITROEN","CHERY"]
    return checkInvalid(row,invalid, "marca")
}

function isCambioOk(row){
    const invalid = ["Automático"]
    return checkInvalid(row,invalid, "cambio")
}

function isModeloOk(row){
    const invalid = [
        "PALIO","SANDERO","FIESTA","VOYAGE","ETIOS",

        "ONIX","CLASSIC","CELTA","MONTANA","SPIN","MOBI","UNO","DOBLO","GRAND SIENA","STRADA","IDEA","SIENA","KA","HB20","PICANTO",
        "MARCH","FRONTIER","LIVINA","CLIO","FOX","GOL","UP","DUSTER","CROSSFOX","SPACEFOX","SAVEIRO","BUGGY","CORSA","FIORINO",
        "KOMBI"
    ]
    return checkInvalid(row,invalid, "modelo")
}

function isCidadeOk(row){
    const valid = ["CACHOEIRINHA","GRAVATAI","PORTO ALEGRE","CANOAS"]
    return !checkInvalid(row,valid, "cidade")
}

function isVersaoOk(row){
    const str = S(row.versao)
    const invalid = ["HATCH","1.0","2.0"]
    return !_.find(invalid, item => {
        return str.contains(item)
    })
}

function isCorOk(row){
    const invalid = ["BRANCA"]
    return checkInvalid(row,invalid, "cor")
}

function shallPersist(row){
    return isPortasOk(row) &&
        isMarcaOk(row) && 
        isCidadeOk(row) &&
        isModeloOk(row) &&
        isCambioOk(row) && 
        isVersaoOk(row) && 
        isCorOk(row)
}

module.exports = {
    shallPersist
}