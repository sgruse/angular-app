'use strict';

const debug = require('debug')('todo:manageServer');
module.exports = returnManageServer;

// returnManageServer = A module to provide methods for before and after to start and end the server;

function returnManageServer(mongoose, server, port) {
  const manageServer = {
    // Checking if it needs to start the server or not;
    checkIfServerRunningBeforeTests(done) {
      debug('checkIfServerRunningBeforeTests');
      if(!server.isRunning) {
        debug('Server was not running');
        return server.listen(port, () => {
          debug(`Server listening on ${port}`);
          server.isRunning = true;
          return done();
        });
      }
      debug('Server was running, calling done');
      return done();
    },
    // Checking if it needs to close the server and for mongoose to drop the database;
    closeServerAndDbAfterTests(done) {
      debug('CloseServerAfterTests');
      if(server.isRunning) {
        return server.close(() => {
          debug('Server closed');
          server.isRunning = false;
          mongoose.connection.db.dropDatabase(() => {
            debug('dropped test db');
            return done();
          });
        });
      }
      mongoose.connection.db.dropDatabase(() => {
        debug('Dropped test db');
        return done();
      });
    }
  };
  return manageServer;
}
