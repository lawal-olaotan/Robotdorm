
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

    $scope.onPopupInit = function(){
        console.log('ran popup init function');

        chrome.runtime.sendMessage({type:"onPopupInit"}, 
            function(response){
                console.log('this is the response from the background page',response);
                if(response.user === null){
                    $state.go('login');
                    
                }else{
                    chrome.tabs.query({
                        active:true,
                        currentWindow: true,  
                        }, tabs => {
                        // send request for the current tab 
                        chrome.tabs.sendMessage(
                            tabs[0].id,
                            {type:'mypage'}
                        ,function (data){
                            $scope.name = response.user.username;
                            if(data === true){
                                $state.go('welcome')
                                $scope.search = 'disabled'
                                $scope.messageContext(); 
                            }else{
                                $state.go('home')
                            }
                        })

                    })
                }
            }
        )
    }

    $scope.onPopupInit();

    $scope.login = function(formData){
        


        chrome.runtime.sendMessage({type:"login", data:formData}, 
            function(response){
                console.log('response from background is:',response);
                if(response.user){
                    $scope.name = response.user.username;
                    $state.go('welcome');
                }
            }
    )}
    $scope.signup  = function(formData){
        chrome.runtime.sendMessage({type:"signup",data:formData}, 

        function(response){
            console.log('response from background is:',response )
            if(response.token){
                $state.go('login');
            }
        })
    }
    
    $scope.messageContext = function(){
        chrome.tabs.query({
            active:true,
            currentWindow: true,  
            }, tabs => { 
            // send request for the current tab 
            chrome.tabs.sendMessage(
                tabs[0].id,
                {type:'enable'}
            ,function (response){
                console.log(response);
                if(response === true){
                    $scope.search = ''
                }else{
                   $scope.search = 'disabled'
                }
            })
        })
    }
}])

jumiaScrapper.controller("ScraperCtrl", ['$scope', '$state', function($scope,$state){
    console.log('ScraperCtrl initialized');

    $scope.keywordSearch = function(){
        const popBody = document.querySelector('.ng-scope');
        popBody.style.display='none';
        chrome.runtime.sendMessage({type:'keywordSearch'},function(response){
            console.log(response); 
        })
        
    }

}])

jumiaScrapper.controller("homeCtrl", ['$scope', '$state', function($scope,$state){
    console.log('homeCtrl initialized');

    $scope.vistWeb = function(){
        chrome.runtime.sendMessage({type:'visitJumia'},
        function(response){
            console.log('this is the message from the background script',response);
        
        });

    }
}])


