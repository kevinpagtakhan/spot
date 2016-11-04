angular.module('app')
  .controller('ProfileController', ProfileController)

ProfileController.$inject = ['$state', 'ProfileFactory', 'ReservationsFactory'];

function ProfileController($state, ProfileFactory, ReservationsFactory){
  var  vm = this;
  vm.isLoading = true;

  vm.getUser = function(){
    ProfileFactory.loggedInUser()
      .then(function success(data){
        vm.user = data.data.data;

        vm.isLoading = false;
      }, function failure(data){
        if(data.status == 403){
          $state.go('logout');
        }
      })
  }

  vm.getUser();

  vm.acceptRequest = function(id){
    ReservationsFactory.update(id, {confirmed: true})
      .then(function success(data){
        vm.getUser();
      }, function failure(data){
        console.log(data);
      })
  }

  document.getElementById("file-input").addEventListener("change", function() {
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    getSignedRequest(file);
  });

  function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/sign-s3?file-name=${(new Date()).getTime()}&file-type=${file.type}&token=${localStorage.getItem('token')}`);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          vm.image_url = url;
          console.log(vm.image_url);
          document.getElementById('preview').src = url;
          document.getElementById('default-preview').style.display = 'none';
          document.getElementById('preview').style.display = 'block';

          ProfileFactory.update({_id: vm.user._id, image_url: url})
            .then(function success(data){
              console.log(data);
            }, function failure(data){
              console.log('failure');
            })
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
}
