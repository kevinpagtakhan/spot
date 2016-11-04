angular.module('app')
  .controller('SpacesShowController', SpacesShowController);

SpacesShowController.$inject = ['$state', '$stateParams','SpacesFactory'];

function SpacesShowController($state, $stateParams, SpacesFactory){
  var vm = this;
  vm.details = {};
  vm.address = {};
  vm.map = {};
  vm.isLoading = true;

  vm.updateMap = function(){
    var address = vm.space.address;
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

  SpacesFactory.show($stateParams.id)
    .then(function success(data){
      vm.space = data.data.data;
      // console.log(vm.space);
      vm.updateMap()
      vm.isLoading = false;
    }, function failure(data){
      if(data.status == 403){
        $state.go('logout');
      }
    })

  vm.details.space_id = $stateParams.id;

  vm.reserveSpace = function(){
    SpacesFactory.reserveSpace(vm.details)
      .success(function(data){
        console.log(data);
        $state.go('reservationsShow', {'id': data.data._id});
      });
  }
}
