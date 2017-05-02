angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function ($scope, Contato,$rootScope) {

  

    $scope.lista = Contato.getContatos();
    console.log($scope.lista);
})

.controller('PlaylistCtrl', function ($scope, Contato, $ionicLoading, $stateParams, $q) {
   // alert($stateParams.playlistId);
    $scope.formulario = {};
    var formulario  = {
        _id: "",
        rua: "",
        numero: "",
        descricao: "",
        Bairroid: "",
        foco: "",
        garrafa: "",
        Plasitco: "",
        Pneu: "",
        Lixo: "",
        Psina: "",

        completed: false
    };
    var c = 1;
    $ionicLoading.show({ template: 'Espere...' });
    var relo = function(contador)
    {
        if (c != 1)
        {
            window.location.reload();
            c = 2;
           
        }

    }
    formulario = Contato.getContatosid($stateParams.playlistId);
    formulario.then(function(result) {
 
        formulario = result.rows[0].doc;
        $scope.formulario = formulario;
        relo(c);
        $ionicLoading.hide();
        });
   
    $scope.chama = function (valor) {
       
    };
  
    
  
   
    
})

.controller('Browse', function ($scope,$http ,Contato) {
    $scope.bairros = Contato.getBairro();
   
   
    //$http({
    //    method: 'GET',
    //    url: 'http://seletivosaude.alfenas.mg.gov.br//Home/ReturnAreaJson'
    //}).then(function successCallback(response) {
    //    angular.forEach(response.data, function (value, key) {
    //        alert(value.nome)
        
    //        Contato.persistirContatos(value.nome);
    //    });
    //    // response => { last: <POSIX_DATE>, contatos: { key1: {nome: 'abc', fone: '123' },  key2: {nome: 'xyz', fone: '456'}, ... }  }    
    //}, function errorCallback(response) {
    //    console.log('Ajax falhou');
    //});


   
 
  
    $scope.salva = function (Valor) {
      
        var valores =[
        
        ];
        Contato.setTodo(Valor);
      
        
        Contato.syncronismoDengue();
      
    };
    $scope.sinc = function () {
      
        Contato.syncronismoDengue();
      
    };
});

