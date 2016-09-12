'use strict';

(function() {
  angular.module('UserService', [])
    .factory('UserService', [
      UserService
    ])

    function UserService() {
      let userObj = {
        name: null,
        favoriteColor: null
      };

      userObj.changeName = function(newName) {
        userObj.name = newName;
      };

      return userObj;
    }
})();
