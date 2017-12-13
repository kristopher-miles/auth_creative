var myApp = angular.module("myApp",["firebase"]);
var provider = new firebase.auth.GoogleAuthProvider();


myApp.controller("chatController", ["$scope", "$firebaseArray",
                                    function($scope, $firebaseArray) {
   var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
   $scope.update = function(user) {
       var newmessage = {from:user.name || "anonymous",body:user.chat};
       console.log(newmessage);
       $scope.chats.$add(newmessage);
       user.chat = "";
   }
   
   
   
 }
                                    
]);

function login(){
    firebase.auth().signInWithRedirect(provider);
}

function logout(){
        firebase.auth().signOut().then(function() {
  console.log("This user has signed out successfully");
}).catch(function(error) {
  // An error happened.
});
        
    }

function verifyLoggin(){
        if(firebase.auth().currentUser != null){
            window.location.replace("http://ec2-54-201-196-253.us-west-2.compute.amazonaws.com:3010/authenticated.html");
        }
        else{
            window.location.replace("http://ec2-54-201-196-253.us-west-2.compute.amazonaws.com:3010/index.html");
        }
    }