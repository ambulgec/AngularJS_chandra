

app.controller("ProductController", function($scope) {

    $scope.product = {
        productId: "",
        productName: "",
        productPrice:"",
        Productdescription:"",

    };

    $scope.products=[{productId: "1",productName: "Pen" ,productPrice:"10",Productdescription:"Blue Pen"  },
        {productId: "2",productName: "Book" ,productPrice:"20",Productdescription:"Drawing Book" },
        {productId: "2",productName: "Glass" ,productPrice:"30",Productdescription:"Glass Material"  },
        {productId: "4",productName: "Bag" ,productPrice:"400",Productdescription:"School Bag" },
        {productId: "5",productName: "TVRemote" ,productPrice:"100",Productdescription:"Sony Tv remote" },];
        
 

    // Login validation function
    $scope.onValidate = function() {
        if ($scope.user.email === "sujit@gmail.com" && $scope.user.pass === "sujit") {
            alert("Hi from Angular - Login Successful!");
        } else {
            alert("Invalid Credentials");
        }
    };
});