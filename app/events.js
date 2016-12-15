"use strict"

const logger = require("log4js").getLogger("events"),
      events = require("events"),
      eventEmitter = new events.EventEmitter()

module.exports = eventEmitter