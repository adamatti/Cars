"use strict"

const Hapi = require('hapi'),
      server = new Hapi.Server(),
      logger = require("log4js").getLogger("web"),
      persist = require("../persist"),
      config = require("../config")

server.connection({ 
    port: config.port
})

server.register(require('inert'), err => {
    server.route({
        method: 'GET',
        path:'/rows', 
        handler: function (request, reply) {
            return reply(persist.list());
        }
    })

    require("./static")(server)

    server.start((err) => {
        if (err) {
            throw err;
        }
        logger.info('Server running at:', server.info.uri);
    })
})