// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
 .factory('Contato', function ($q) {
     //retorna true se o objeto existe e é não vazio

     var db = new PouchDB('banco');
     var remoteCouch = "http://187.87.80.56:5984/dengue";
     var dbbairro = new PouchDB('bancobairro');
     var remoteCouchbairro = "http://187.87.80.56:5984/bairro";
     var documentos = [];

     function dengue() {
         var nome;
         var idade;
         var curso;
     };
     var ContatoFactory = {
         //Objetos


         setTodo: function (Valor) {
          
             
             
            var todo = {
                 _id: new Date().toISOString(),
                 rua: Valor.rua,
                 numero: Valor.numero,
                 descricao: Valor.descricao,
                 Bairroid: Valor.bairro,
                 foco: Valor.foco,
                 garrafa: Valor.garrafa,
                 Plasitco: Valor.Plasitco,
                 Pneu: Valor.Pneu,
                 Lixo: Valor.Lixo,
                 Psina: Valor.Psina,
                
                 completed: false
             };
             db.put(todo, function callback(err, result) {
                 if (!err) {
                     console.log('Successfully posted a todo!');
                 }
             });

         },
         getContatos: function () {
             documento = [];
             

             db.query(function (doc, emit) {
                 documento.push(doc);
             });
             
             return documento;
         },
         getContatosid: function (id) {
             documento = null;
           
             return db.query(function(doc)
             { emit(doc._id) },
             { startkey: id, include_docs: true });
           
         },
      
         updateContatos: function (Valor) {

             db.get(Valor._id, function (err, retrieved) {

                 db.put({

                     _id: retrieved._id,
                     _rev: retrieved._rev, //need to specify _rev otherwise conflict will occur
                     rua: Valor.rua,
                     numero: Valor.numero,
                     descricao: Valor.descricao,
                     Bairroid: Valor.bairro,
                     foco: Valor.foco,
                     garrafa: Valor.garrafa,
                     Plasitco: Valor.Plasitco,
                     Pneu: Valor.Pneu,
                     Lixo: Valor.Lixo,
                     Psina: Valor.Psina,

                 }, function (err, response) {

                     if (err) {

                         console.log("COULDN'T CHANGE FRIEND STATUS");

                     } else { createAndDispatchEvent("friend status changed") }

                 });


             });
             
         },
         
         //Bairro
         setBairro: function (bairro) {
             var todo = {
                 _id: new Date().toISOString(),
                 title:bairro.title,
                 completed: false
             };
             dbbairro.put(todo, function callback(err, result) {
                 if (!err) {
                     console.log('Successfully posted a todo!');
                 }
             });

         },
         getBairro: function () {
             documento=[];
             dbbairro.query(function (doc, emit) {
                 documento.push(doc);
             });
             return documento;
         },
         //Syncs
          syncronismoDengue: function () {
              var db = new PouchDB('banco');
              var remoteCouch = "http://187.87.80.56:5984/dengue";           
              db.sync(remoteCouch).on('complete', function () {
                  // Sincronizado!
                  alert("sincronizou");
              }).on('error', function (err) {
                  // Ops, tivemos um erro!
                  alert("não sincronizou");
              });
          },

         syncronismoBairro: function () {
           
             dbbairro.sync(remoteCouchbairro).on('complete', function () {
             // Sincronizado!
             alert("sincronizou");
         }).on('error', function (err) {
             // Ops, tivemos um erro!
             alert("não sincronizou");
         });
     }
     };
     return ContatoFactory;
 })

   

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        
      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html',
                controller: 'Browse'
            }
        }
    })
      .state('app.playlists', {
          url: '/playlists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/playlists.html',
                  controller: 'PlaylistsCtrl'
              }
          }
      })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
});
