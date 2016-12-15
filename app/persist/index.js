"use strict"

const logger = require("log4js").getLogger("persist"),
      events = require("../events"),
      filters = require("./filters")

const records = []

events.on("row.found", row => {
    if (filters.shallPersist(row)){
        records.push(row)
    }     
})

module.exports = {
    list: function (){
        return records
    }
}