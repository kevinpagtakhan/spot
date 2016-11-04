angular.module('app')
  .controller('SpacesController', SpacesController);

SpacesController.$inject = ['$state', 'SpacesFactory'];

function SpacesController($state, SpacesFactory){
  var vm = this;
  vm.isLoading = true;

  SpacesFactory.index()
    .then(function success(data){
      vm.spaces = data.data.data;
      vm.isLoading = false;
    }, function failure(data){
      if(data.status == 403){
        $state.go('login');
      }
    })
}
