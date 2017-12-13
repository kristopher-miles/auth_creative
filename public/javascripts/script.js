var myApp = angular.module("myApp",["firebase"]);
var provider = new firebase.auth.GoogleAuthProvider();


myApp.controller("chatController", ["$scope", "$firebaseArray",
                                    function($scope, $firebaseArray) {
   var ref = firebase.database().ref().child("messages");
                                        
   $scope.chats = $firebaseArray(ref);
   $scope.update = function(user) {
       var newmessage = {from:firebase.auth().currentUser.displayName,image:firebase.auth().currentUser.photoURL, body:user.chat};
       console.log(newmessage);
       $scope.chats.$add(newmessage);
       user.chat = "";
   }
 }
                                    
]);

function login(){
    firebase.auth().signInWithRedirect(provider);
    verifyLoggin();
}

function logout(){
    firebase.auth().signOut().then(function() {
        console.log("This user has signed out successfully");
        verifyLoggin();
    }).catch(function(error) {});      
}

