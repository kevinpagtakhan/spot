angular.module('app')
  .controller('ReservationsController', ReservationsController)

ReservationsController.$inject = ['$state', 'ReservationsFactory'];

function ReservationsController($state, ReservationsFactory){
  var vm = this;
  vm.isLoading = true;

  ReservationsFactory.index()
    .then(function(data){
      vm.reservations = data.data.data.reservations;
      vm.isLoading = false;
    }, function failure(data){
      if(data.status == 403){
        $state.go('login');
      }
    })
}
