//Validador de Correos Electrónicos

//Solicitar email por prompt
let userEmail = prompt("Por favor ingresa tu email")

/*Verificar formato: @, punto después del @, punto y @ no deben estar juntos, sin espacios en blanco*/
function verifyFormat(email){
    //Verify @ symbol
    if (!email.includes("@")){
        alert("Tu email debe incluir el símbolo @")
        return false
    }

    //Verify spaces
    if (email.includes(" ")){
        alert("Tu email no debe contener espacios en blanco")
        return false 
    }

    //Verify dot after @
    let splitEmail = email.split("@")
    if (splitEmail[1].includes(".")){

        //Verify that dot is not next to the @
        if (!splitEmail[1][(splitEmail[1]).indexOf(".")-1]){
            alert("Tu email no debe tener el punto junto al @")
            return false 
        }  
    } else {
        alert("Tu email debe tener un punto después del @")
        return false
    }   

    return true
}

//Test the email, and start again if it is invalid
while (!verifyFormat(userEmail)){
    userEmail = prompt("Por favor ingresa tu email")
}

//Show the email is valid
alert(`El email ${userEmail} es válido`)

