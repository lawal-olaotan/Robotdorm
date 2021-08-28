console.log('popup.js initiliazed')

let jumiaScrapper = angular.module("jumiascrapper",['ui.router']);

jumiaScrapper.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home', {
        url:'/home',
        templateUrl:'../views/home.html'
    })
    .state('login', {
        url:'/login',
        templateUrl:'../views/login.html'
    })
    .state('signup', {
        url:'/signup',
        templateUrl:'../views/signup.html'
    })
    .state('welcome', {
        url:'/welcome',
        templateUrl:'../views/welcome.html'
    })



    $urlRouterProvider.otherwise('login')

})


jumiaScrapper.controller("popupCtrl", ['$scope', '$state', function($scope,$state){
    console.log('popupCtrl initialized');

    $scope.login = function(formData){
        console.log(formData);
        chrome.runtime.sendMessage({type:"login", data:formData}, 
            function(response){
                console.log('response from background is:',response ) 
                if(response.user){
                    $scope.name = response.user.username;
                    $state.go('welcome');
                }
            }
        
        )
    }

    $scope.signup  = function(formData){
        console.log(formData);
        chrome.runtime.sendMessage({type:"signup",data:formData}, 
        function(response){
            console.log('response from background is:',response )
            if(response.token){
                $state.go('login');
            }
        
        }
        
        )
    }

   
}])