

// function validate()
// {
//     let status=false;
//     let emailAddress=document.getElementById("email").value;
//     let password=document.getElementById("password").value;

//     if(emailAddress === "sujit" && password === "sujit")
//     {
//        status=true;
//     }
    
// }

function validate(email, password) {
    let status = false;

    if (email === "sujit" && password === "sujit") {
        status = true;
    }

    return status;  // Return the status correctly
}

// function validate(email, password) {
//     let status = false;

//     for (let i = 0; i < credentials.length; i++) {
//         if (credentials[i].email === email && credentials[i].pass === password) {
//             status = true;
//             break;
//         }
//     }

//     return status;
// }