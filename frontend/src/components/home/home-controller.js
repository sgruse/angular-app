'use stict';

(function() {
  angular.module('HomeModule')
    .controller('HomeController', [
      'UserService',
      HomeController
    ]);

    function HomeController(userService) {
      console.log(userService);
      this.changeName = function(name) {
        userService.changeName(name.name);
      }
    };
})();
