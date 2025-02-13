app.controller("AuthController", function ($scope, $window) {
    if (!localStorage.getItem("loggedInUser")) {
        $window.location.href = "login.html"; 
    }

    $scope.logout = function () {
        localStorage.removeItem("loggedInUser"); 
        $window.location.href = "login.html";
    };
});

