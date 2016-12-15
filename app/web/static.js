"use strict"

module.exports = function(server){
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    })
/*    
    server.route({
        method: 'GET',
        path: '/bower/{param*}',
        handler: {
            directory: {
                path: 'node_modules',
                listing: true
            }
        }
    })
*/    
}