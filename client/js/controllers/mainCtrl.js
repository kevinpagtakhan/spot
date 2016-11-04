angular.module('app')
  .controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$state']

function MainController($rootScope, $state){
  var vm = this;
  $rootScope.$on('$stateChangeStart', function(){
    vm.$state = $state;
  })
}
