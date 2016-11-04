angular.module('app')
  .factory('ReservationsFactory', ['$http', ReservationsFactory])

function ReservationsFactory($http){
  return {
    index: index,
    show: show,
    update: update,
    apiUsersURL: '/api/users/',
    apiReservationsURL: '/api/reservations/',
  }

  function index(){
    return $http.get(this.apiUsersURL + '?token=' + localStorage.getItem('token'));
  }

  function show(id){
    return $http.get(this.apiReservationsURL + id + '?token=' + localStorage.getItem('token'));
  }

  function update(id, updatedReservation){
    return $http.post(this.apiReservationsURL + id + '?token=' + localStorage.getItem('token'), updatedReservation);
  }
}
