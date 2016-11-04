angular.module('app')
  .controller('ProfileEditController', ProfileEditController);

ProfileEditController.$inject = ['$state', '$stateParams', 'ProfileFactory'];

function ProfileEditController($state, $stateParams, ProfileFactory){
  var vm = this;

  ProfileFactory.show($stateParams.id)
    .success(function(data){
      vm.user = data.data;
      console.log(vm.user);
    })

}
