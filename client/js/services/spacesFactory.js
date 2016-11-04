angular.module('app')
  .factory('SpacesFactory', ['$http', SpacesFactory]);

function SpacesFactory($http){

  return {
    index: index,
    show: show,
    create: create,
    update: update,
    reserveSpace: reserveSpace,

    apiURL: '/api/spaces/'
  }

  function index(){
    return $http.get(this.apiURL + '?token=' + localStorage.getItem('token'));
  }

  function create(space){
    return $http.post(this.apiURL + '?token=' + localStorage.getItem('token'), space);
  }

  function show(id){
    return $http.get(this.apiURL + id + '?token=' + localStorage.getItem('token'));
  }

  function reserveSpace(body) {
    return $http.post('/api/reservations?token=' + localStorage.getItem('token'), body);
  }

  function update(space){
    return $http.patch(apiURL + space._id, space);
  }
}
