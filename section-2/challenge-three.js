//Sistema de Gestión de Inventario

//Function to check if the input is a number
function checkNum (variable){
    while(isNaN(variable)){
        console.warn("El valor ingresado no es un número")
        variable = prompt("Por favor, ingresa solo números")
    }
    variable = parseFloat(variable)
    return variable   
}

//Define an empty list to save the products objects
let productList = []

//Ask if the user wants to add new product with a while loop
let newProduct = confirm("¿Quieres añadir un nuevo producto")
let id = 1

while (newProduct){
    
    //Ask for the details of the product
    let productName = (prompt("Ingresa el nombre del producto")).toLowerCase()
    console.log(`Nombre: ${productName}`)

    let price = checkNum(prompt("Ingresa el precio del producto"))
    console.log(`Precio: $${price}`)

    let quantity = checkNum(prompt("Ingresa la cantidad disponible del producto"))
    console.log(`Cantidad: ${quantity}`)

    let description = (prompt("Ingresa la descripción del producto")).toLowerCase()
    console.log(`Descripción: ${description}`)

    //Save the details of the product into an object and save the object in the list
    const product = {
        id,
        productName,
        price,
        quantity,
        description    
    }
    console.log(product)

    productList.push(product)
    
    //Increase the id number for every loop
    id++

    newProduct = confirm("¿Quieres añadir un nuevo producto")    
}

console.log(productList)


//Duplicate products


let duplicate = confirm("¿Quieres duplicar un producto?")
let showList = "Esta es una lista de los productos:\n"
productList.forEach(product => {
    showList += `Id: ${product.id} - Nombre: ${product.productName} - Precio ${product.price}\n`
})

while (duplicate){

    //Create a variable to show the products list with id and name  
    

    let duplicateId = checkNum(prompt(`${showList}Escribe el id del producto que deseas duplicar`))

    //Verify if the id provided exists in the list
    let existingProduct = productList.find(product => product.id === duplicateId)

    //If yes, make the copy
    if (existingProduct){

        //Find the last product id in the list
        const idList = []

        //Save the id for each product in the array
        productList.forEach(product => {
            idList.push(product.id)
        })

        //Sort the list from lowest to highest and find the last number
        idList.sort((a, b) => a - b)
        const lastIndex = idList.length - 1
        const lastId = idList[lastIndex]


        //Make the copy
        const productCopy = {
            id: lastId + 1,
            productName: existingProduct.productName + " copy",
            price: existingProduct.price,
            quantity: existingProduct.quantity,
            description: existingProduct.description
        }
        console.log(productCopy)
        productList.push(productCopy)
        
          
    //Else, give an alert and try again
    } else {
        alert("No existe ningún producto con ese id, intenta de nuevo")
    }

    duplicate = confirm("¿Quieres duplicar un producto?")
}


//Show products
let showProducts = confirm("¿Quieres ver una lista de los productos?")
if (showProducts){
    let updateList = "Esta es una lista de los productos:\n"
    productList.forEach(product => {
        updateList += `Id: ${product.id} - Nombre: ${product.productName} - Precio ${product.price}\n`
    })
    alert(updateList)
} 

//Search products
let searchProducts = confirm("¿Quieres buscar un producto?")
while (searchProducts){

    //Ask the parameter to search the product
    let searchCategory = prompt("¿Deseas buscar por nombre o por precio?\n1. Nombre\n2. Precio")

    //If the user wants to search by name
    if (searchCategory === "1"){

        //Ask the name of the product
        let searchName = prompt("Ingresa el nombre del producto que quieres buscar").toLowerCase()

        //Check if it matches with a product in the list, if it does, show the product
        existingProduct = productList.find(product => product.productName === searchName)
            if (existingProduct){
                alert(`Este es el producto que buscas:\nNombre: ${existingProduct.productName} - Precio: $${existingProduct.price} - Cantidad: ${existingProduct.quantity} - Descripción ${existingProduct.description}`)
            } else {
                alert("No encontramos ningún producto con ese nombre")
            }
    
    //If user wants to search by price
    // } else if(searchCategory === "2"){

    // } else {
    //     alert("No es una opción válida, por favor ingresa 1 o 2")
    }

    searchProducts = confirm("¿Quieres buscar un producto?")
}




// - Métodos de arrays: push(), pop(), shift(), unshift(), splice(), slice(), map(), filter(), reduce(), sort(), entre otros.
//     - Métodos de objetos: Object.keys(), Object.values(), Object.entries(), Object.assign()