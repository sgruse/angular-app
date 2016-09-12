'use stict';

const debug = require('debug')('todo:userCreate');
module.exports = returnUserCreate;

function returnUserCreate(request, user) {
  const userCreate = {
    postUserBefore(userObject, done) {
      console.log('POST USER BEFOREHAND HAS BEEN HIT WITH : ', userObject);
      debug('userCreate postUserBefore');
      request.post('/new-account')
        .send(userObject)
        .end((err, res) => {
          this.err = err;
          this.res = res;
          return done();
        });
    }
  };

  return userCreate;
}
