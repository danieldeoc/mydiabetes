import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);


//////////////////////////////
// Register a new user
interface registerData_Interface {
    Name: string | undefined,
    Email: string | undefined,
    Pass: string | undefined
}

interface response_Interface {
    Status: "error" | "warning" | "info" | "success",
    Message: string
}


////////////////////////////////
// Sign-out user
export async function logOut():Promise<void> {
    await signOut(auth).then(() => {
         document.cookie = "User Auth=; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;";
         document.cookie = "User Name=; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;";
         document.cookie = "User E-mail=; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;";
         window.location.href = "/";
         // Sign-out successful.
     }).catch((error) => {
         // An error happened.
         console.error("logout could not be performed")
     })
 }

///////////////////////////////
// Cookiee session control
function sessionControl(id:string, name:string | undefined, email:string | undefined):void {
    if(id){
        document.cookie = "User Auth="+id+"; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;"; 
        if(name && typeof name != undefined){
            document.cookie = "User Name="+name+"; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;";
        }
        if(email && typeof email != undefined){
           document.cookie = "User E-mail="+email+"; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;";
        }
    } else {
        console.error("User session could not be created. User data: ", id, name, email)
    }
}


///////////////////////////////
// Create a new user with password and e-mail
export async function CreateUser(registerData: registerData_Interface ):Promise<response_Interface> {
    let response:response_Interface = {
        Status: "error",
        Message: "please, check all fields"
    }

    if(
        registerData.Email && registerData.Pass && registerData.Name
    ){
        await createUserWithEmailAndPassword(auth, registerData.Email, registerData.Pass)
            .then(
                async (userCredential) => {
                // Signed in
                    const user = userCredential.user;
                    await updateProfile(user, {
                        displayName: registerData.Name
                    })
                    sessionControl(user.uid, registerData.Name, registerData.Email)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                response.Message = errorCode + " / " + errorMessage;
            })
        response.Status = "success"
        response.Message = "User Created with success";
    } else {
        response.Message = "Please, check all data."
    }  
    return response;    
}


////////////////////////////////
// Sign-in with user email and passwor
export async function signIn(email:string, password:string):Promise<response_Interface> {

    let response:response_Interface = {
        Status: "error",
        Message: "please, check all fields"
    }
    
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        let name = "";
        let email = "";
        if(user.displayName != null){
            name = user.displayName
        }
        if(user.email != null){
            email = user.email
        }
        sessionControl(user.uid, name, email);
        response.Status = "success";
        response.Message = "Logged in";
        
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
        response.Message = errorCode + " | " + errorMessage;
      });
    
    return response;
}