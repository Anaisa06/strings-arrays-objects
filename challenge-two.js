//Validador de Contraseñas seguras


function checkPassword(password){
    //Verify if the password has at least eight characters
    if (password.length < 8){  
        alert("Su contraseña debe tener al menos 8 dígitos")
        return false
    }  

    //Verify if the password has a number
    let number = /[0-9]/
    if (!number.test(password)){
        alert("Su contraseña debe tener al menos un número")        
        return false
    }

    //Verify if the password has a letter
    let letter = /[a-zA-Z]/
    if (!letter.test(password)){    
        alert("Su contraseña debe tener al menos una letra")     
        return false
    }

    //Verify if the password has a special character
    let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (!specialChar.test(password)){  
        alert("Su contraseña debe tener al menos un caracter especial")       
        return false
    }

    return true
}
    
//Ask for a password with prompt

while (true){
    let userPasssword = prompt("Por favor ingresa tu nueva contraseña")
        if (checkPassword(userPasssword)){
            alert("Su contraseña es válida")
            break
        }          
}
