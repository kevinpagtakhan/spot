angular.module('app')
  .controller('ProfileShowController', ProfileShowController);

ProfileShowController.$inject = ['$state', '$stateParams', 'ProfileFactory'];

function ProfileShowController($state, $stateParams, ProfileFactory){
  var vm = this;

  ProfileFactory.show($stateParams.id)
    .success(function(data){
      vm.user = data.data;
    })

}
