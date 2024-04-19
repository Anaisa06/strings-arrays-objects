//Generador de Nombres de Usuario (username) y Correos Electrónicos (email) con el dominio myDomain.com
const mailList = []
const usernameList = []

//Function to verify that the entry is valid
function verifyName(name){
    while (!(name.includes(" "))){
        name = prompt(`${name} no es una entrada válida, por favor ingresa nombre y apellido`)
    }
    return name
}

//Loop to create a new email
let newEmail = confirm("¿Quieres generar un nuevo email?")
while (newEmail){
    //Ask name and lastname (prompt) and normalice to lower case (toLowerCase())
    let nameLastname = verifyName(prompt("Escribe tu primer nombre y tu primer apellido")).toLowerCase()
    console.log(nameLastname)

    //Separate name from last name (split()), save it into arrays
    const splittedName = nameLastname.split(" ")
    console.log(splittedName)

    //Get first three letters of name and lastname (slice())
    const nameRoot = splittedName[0].slice(0, 3)
    const lastnameRoot = splittedName [1].slice(0, 3)
    console.log(nameRoot, lastnameRoot)

    //Concatenate the letters to create de username
    let userName = nameRoot + lastnameRoot
    console.log(userName)

    //Verify if username already exists and add a number
    if (usernameList.includes(userName)){
        userName = userName + 1
    }

    //Add the user name to the list
    usernameList.push(userName)

    //Concatenate user name with domain "mydomain.com"
    const domain = "@mydomain.com"
    const userEmail = userName + domain
    console.log(userEmail)

    //Save user name and email into an object
    const mailObject = {
        [userName]: userEmail    
    }
    console.log(mailObject)

    //Save the object into the list
    mailList.push(mailObject)
    console.log(mailList)

    alert(`Tu nombre de usuario es ${userName} y tu email es ${userEmail}`)
    newEmail = confirm("¿Quieres generar un nuevo email?")
}

console.log(mailList)
alert("Hasta pronto!")

