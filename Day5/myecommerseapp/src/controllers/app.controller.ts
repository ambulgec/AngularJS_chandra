
import { IScopeCustom } from "../interfaces/iscope.interface";



export class MyFirstController{
    name!: string;
    user = {
        "email":"vaibhav@gmail.com",
        "password":"Vaibhav1005"
    };
    users = [
        {
            "email":"alex@gmail.com",
            "password":"alex1005"
        },
        {
            "email":"swapnil@gmail.com",
            "password":"swapnil1006"
        },
        {
            "email":"nasir@gmail.com",
            "password":"nasir1007"
        },
        {
            "email":"pravin@gmail.com",
            "password":"pravin1008"
        },
        {
            "email":"onkar@gmail.com",
            "password":"onkar1009"
        },
        {
            "email":"lalit@gmail.com",
            "password":"lalit1010"
        }
    ]
    onValidate(){
        if(this.user.email === "vaibhav@gmail.com" && this.user.password === "Vaibhav1005"){
            console.log("Welcome");
        }else{
            console.log("Invalid");
        }
    }

    constructor($scope: IScopeCustom){
        $scope['vm'] = this;
    }
}