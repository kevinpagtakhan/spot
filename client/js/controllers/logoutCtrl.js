angular.module('app')
  .controller('LogoutController', LogoutController)

LogoutController.$inject = ['$state'];

function LogoutController($state){
  localStorage.removeItem('token');
  $state.go('login');
}
