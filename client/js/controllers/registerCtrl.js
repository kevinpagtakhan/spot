angular.module('app')
  .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$http', '$state'];

function RegisterController($http, $state) {
  var vm = this;
  vm.isLoading = false;

  vm.createUser = function(){
    var apiURL = '/api/';
    vm.isLoading = true;
    $http.post(apiURL + 'users/', vm.newUser)
      .then(function (data) {
        if(data.data.success){
          vm.isLoading = false;
          $state.go('login');
        } else {
          vm.user.password = '';
          vm.user.confirmPassword = '';
          // vm.feedback.type = 'error';
          // vm.feedback.message = 'Incorrect username/password';
        }
      })
  }
}
