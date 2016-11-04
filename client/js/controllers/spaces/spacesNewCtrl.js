angular.module('app')
  .controller('SpacesNewController', SpacesNewController);

SpacesNewController.$inject = ['$state', 'SpacesFactory'];

function SpacesNewController($state, SpacesFactory){
  var vm = this;
  vm.isLoading = false;
  vm.newSpace = {}

  console.log((new Date()).getTime());

  vm.createSpace = function(){
    SpacesFactory.create(vm.newSpace)
      .then(function success(data){
        var space_id = data.data.data._id;
        $state.go('spacesShow', {'id': space_id});
      }, function failure(data){
        if(data.status == 403){
          $state.go('logout');
        }
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
    xhr.open('GET', '/api/sign-s3?file-name=' + (new Date()).getTime() + '&file-type=' + file.type + '&token=' + localStorage.getItem('token'));
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
          vm.newSpace.image_url = url
          document.getElementById('preview').src = url;
          document.getElementById('avatar-url').value = url;
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
}
