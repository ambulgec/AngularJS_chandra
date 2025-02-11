var app = angular.module("transflower", []);

app.controller("LoginController", function($scope) {
    // User credentials
    $scope.user = {
        email: "",
        pass: ""
    };

    $scope.users=[{email: "abc@gmail.com",pass: "123"   },
        {email: "abc1@gmail.com",pass: "123"   },
        {email: "abc2@gmail.com",pass: "123"   },
        {email: "abc3@gmail.com",pass: "123"   },
        {email: "abc4@gmail.com",pass: "123"   },];
        
 

    // Login validation function
    $scope.onValidate = function() {
        if ($scope.user.email === "sujit@gmail.com" && $scope.user.pass === "sujit") {
            alert("Hi from Angular - Login Successful!");
        } else {
            alert("Invalid Credentials");
        }
    };
});


// var app=angular.module("transflower",[]);
// app.controller("LoginController",function($scope){

//     $scope.user={
//         email:"sujit@gmail.com",
//         pass:"sujit"
//     };

//     $scope.onValidate=function()
//     {
//         if(email==="sujit@gmail.com")
//         {
//             alert("Hi from angular");
//         }
//     }
// });