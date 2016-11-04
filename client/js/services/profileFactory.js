angular.module('app')
  .factory('ProfileFactory', ['$http', ProfileFactory]);

function ProfileFactory($http){

  return {
    loggedInUser: loggedInUser,
    show: show,
    update: update,

    apiURL: '/api/users/'
  }
  function loggedInUser(){
    return $http.get(this.apiURL + '?token=' + localStorage.getItem('token'));
  }

  function show(id){
    return $http.get(this.apiURL + id + this.tokenQuery);
  }

  function update(user){
    return $http.post(this.apiURL + user._id + '?token=' + localStorage.getItem('token'), user);
  }
}
