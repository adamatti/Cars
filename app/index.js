"use strict"

const logger = require("log4js").getLogger("index"),
      events = require("./events")

//Load modules
require("./parsers")
require("./persist")
require("./web")

logger.info("App started")
events.emit("app.started",{})