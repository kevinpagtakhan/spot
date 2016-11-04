angular.module('app')
  .controller('ReservationsShowController', ReservationsShowController);

ReservationsShowController.$inject = ['$state', '$stateParams', 'ReservationsFactory', 'MessagesFactory'];

function ReservationsShowController($state, $stateParams, ReservationsFactory, MessagesFactory){
  var vm = this;
  vm.isLoading = true;
  vm.address = {}
  vm.map = {}
  vm.message = {}

  vm.updateMap = function(){
    var address = vm.reservation._space.address;
    vm.address.origin = address.line_1 + ' ';
    if (vm.address.origin.line_2) {
      vm.address.origin += address.line_2 + ' ';
    }
    vm.address.origin += address.city + ' ';
    vm.address.origin += address.state + ' ';
    vm.address.origin += address.zip_code + ' ';

    if(vm.address.origin){
      vm.map.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBxDN6q_NrQougCGoZU22AsMrWNnri82u0&q=' + vm.address.origin;

      document.getElementById('mymap').setAttribute('src', vm.map.src);
    }
  }

  ReservationsFactory.show($stateParams.id)
    .then(function success(data){
      console.log(data);
      vm.reservation = data.data.data;
      vm.updateMap();
      vm.isLoading = false;
    }, function failure(data){
      $state.go('logout');
    });

  vm.sendMessage = function(){
    MessagesFactory.create($stateParams.id, vm.message)
      .then(function success(data){
        console.log(data);
        vm.reservation.messages = data.data.data;
        vm.message = {}
      }, function failure(data){
        console.log(data);
      })
  }
}
