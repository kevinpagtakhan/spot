angular.module('app')
  .factory('MessagesFactory', ['$http', MessagesFactory])

function MessagesFactory($http){
  return {
    index: index,
    create: create,
    apiURL: '/api/reservations/',
  }

  function index(id){
    return $http.get(this.apiUsersURL + id + '?token=' + localStorage.getItem('token'));
  }

  function create(id, newMessage){
    return $http.post(this.apiURL + id + '/messages?token=' + localStorage.getItem('token'), newMessage);
  }
}
