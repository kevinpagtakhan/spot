angular.module('app')
  .controller('SearchController', SearchController)

SearchController.$inject = ['$state', 'SearchFactory'];

function SearchController($state, SearchFactory){
  var vm = this;
  vm.address = {}
  vm.map = {}

  vm.updateMap = function(){
    if(!vm.address.origin){
      vm.map.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBxDN6q_NrQougCGoZU22AsMrWNnri82u0&q=Santa+Monica+CA'
    } else if (vm.address.origin && !vm.address.destination){
      vm.map.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBxDN6q_NrQougCGoZU22AsMrWNnri82u0&q=' + vm.address.origin;
    } else if (vm.address.origin && vm.address.destination) {
        vm.map.src = 'https://www.google.com/maps/embed/v1/directions?mode=walking&key=' + 'AIzaSyBxDN6q_NrQougCGoZU22AsMrWNnri82u0' + '&origin=' + vm.address.origin + '&destination=' + vm.address.destination;
    }

      document.getElementById('mymap').setAttribute('src', vm.map.src);
  }

  vm.updateDestination = function(address){
    console.log('clicked');
    address.line_2 = address.line_2 || '';
    vm.address.destination = address.line_1 + ' ' + address.line_2 + ' ' + address.city + ' ' + address.state;
    vm.updateMap();
  }

  vm.updateMap();

  vm.searchNearby = function(){
    SearchFactory.nearby(vm.address)
      .then(function success(data){
        vm.nearby = data.data;
        console.log(vm.nearby);
      }, function failure(data){
        if(data.status == 403){
          $state.go('login');
        }
      })
  }
}
