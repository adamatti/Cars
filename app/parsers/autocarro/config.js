"use strict"

var config = {}

config.minPrice = process.env.MIN_VALUE || 15
config.maxPrice = process.env.MAX_VALUE || 45

config.state = 43 // 43 = RS
config.type = 2 //2 = revendedora

config.baseUrl=`http://autocarro.com.br/auto-busca/carros?AutoBusca=1&ai=2014&t=${config.type}&pi=${config.minPrice}&pf=${config.maxPrice}&est=${config.state}&cid=#1`

module.exports = config