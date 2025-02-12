catlogModule.controller("ProductController", function ($scope) {
    $scope.products = [
        { name: "Pen", price: 50, image: "pen.jpg", description: "A smooth writing pen" },
        { name: "Book", price: 200, image: "book.jpg", description: "A notebook for students" },
        { name: "Laptop", price: 50000, image: "laptop.jpg", description: "High-performance laptop" }
    ];
});
