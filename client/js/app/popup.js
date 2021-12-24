
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
    $scope.signupText = 'Kindly, Sign up to join us'

    $scope.onPopupInit = function(){
        console.log('ran popup init function');

        chrome.runtime.sendMessage({type:"onPopupInit"}, 
            function(response){
                console.log('this is the response from the background page',response);
                if(response === null){
                    $scope.welcome = 'Kindly, Sign in to continue'
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
        if(formData){
            const loginId = document.querySelector("#loginid");
            loginId.innerHTML = ''
            const loginSpin = spinnEle();
            loginId.appendChild(loginSpin); 

            chrome.runtime.sendMessage({type:"login", data:formData}, 
            function(response){
                console.log('response from background is:',response);
                if(response.user){
                    $scope.name = response.user.username;
                    $state.go('welcome');
                }else if(response.responseJSON.message === 'User Not Exist'){
                    $scope.signupText = response.responseJSON.message
                    $state.go('signup');
                }else if(response.responseJSON.message === 'Incorrect Password !'){
                    $scope.welcome = response.responseJSON.message
                    loginId.innerHTML = '';
                    loginId.innerHTML = 'Try Again'
                }else{
                    $scope.welcome = response.responseJSON.errors[0].msg

                }
            })
        }else{
            $scope.welcome = 'Email and password is empty'
            loginId.innerHtml='Login Here';
        }
    }

       

    $scope.signup  = function(formData){

        if(formData){
        const signBtn = document.querySelector('#signupbtn');
        signBtn.innerHTML = ''

        const spinit = spinnEle(); 
        signBtn.appendChild(spinit);
        
        chrome.runtime.sendMessage({type:"signup",data:formData}, 
        function(response){
            console.log('response from background is:',response )

            if(response.token){
                $scope.welcome = 'Kindly, Sign in to continue'
                $state.go('login');
            }else if(response.responseJSON.msg){
                $state.go('login');
                $scope.welcome = response.responseJSON.msg
            }else if(response.responseJSON.errors){
                $scope.signupText = response.responseJSON.errors[0].msg
                signBtn.innerHTML = 'Sign Up'
            }
        })
        }else{
            $scope.signupText = 'Email and password is empty';
        }
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


const spinnEle = () => {

    const spinnercon = document.createElement('div');
        spinnercon.setAttribute("class", "spinner-border");
        spinnercon.setAttribute("role","status"); 

    let spinner = document.createElement('span');
        spinner.setAttribute("class", "visually-hidden");
        spinner.TextContent = 'Loading...'; 

    spinnercon.appendChild(spinner);

    return spinnercon; 
}