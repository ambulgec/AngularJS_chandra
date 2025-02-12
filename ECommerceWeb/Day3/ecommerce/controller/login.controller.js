authModule.controller("LoginController", function ($scope, $window) {
    $scope.user = { email: "", password: "" };

    $scope.users = [
        { email: "sujit@gmail.com", password: "sujit" },
        { email: "abc@gmail.com", password: "234" },
        { email: "klm@gmail.com", password: "143323" }
    ];

    $scope.onValidate = function () {
        var matchedUser = $scope.users.find(
            user => user.email === $scope.user.email && user.password === $scope.user.password
        );

        if (matchedUser) {
            localStorage.setItem("loggedInUser", matchedUser.email);
            $scope.$applyAsync(function () {
                alert("Hello");
                // $window.location.href = "index.html"; 
            });
        } else {
            $scope.errorMessage = "Invalid credentials. Please try again.";
        }
    };
});


