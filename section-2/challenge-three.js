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
let loop = true

while(loop){
    //Interactive menu
    let userResponse = prompt("Bienvenido al gestor de inventario\nEscoge la opción que deseas realizar\n1. Añadir un nuevo producto\n2. Duplicar un producto\n3. Ver lista de productos y buscar producto\n4. Actualizar un producto\n5. Eliminar un producto\n30. Salir")

//Swich to check the user response

    switch(userResponse){

        case "1": //The user wants to add a new product

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
            break

        case "2": //Duplicate products

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
            break

        case "3": //Show products and search product
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
                            alert("No existe ningún producto con ese nombre")
                        }
                
                //If user wants to search by price range
                } else if(searchCategory === "2"){

                    //Ask min price and max price
                    let minPrice = checkNum(prompt("Ingresa el precio mínimo"))
                    let maxPrice = checkNum(prompt("Ingresa el precio máximo"))

                let inRangeProducts = productList.filter(product => product.price >= minPrice && product.price <= maxPrice)

                let showInRange = "Estos son los productos dentro de ese rango de precios:\n"
                inRangeProducts.forEach(product => {
                    showInRange += (`- Nombre: ${product.productName} - Precio: $${product.price} - Cantidad: ${product.quantity} - Descripción: ${product.description}\n`)
                })

                alert(showInRange)
                console.log(showInRange)

                } else {
                    alert("No es una opción válida, por favor ingresa 1 o 2")
                }

                searchProducts = confirm("¿Quieres buscar un producto?")
            }
            break

        case "4": //Update product

            let updateProduct = confirm("¿Quieres actualizar un producto?")            

            while (updateProduct){ 
                let updateList = "Esta es una lista de los productos:\n"           
                productList.forEach(product => {
                    updateList += `Id: ${product.id} - Nombre: ${product.productName} - Precio ${product.price}\n`
                })
                let toUpdateId = checkNum(prompt(updateList + "Selecciona el id del producto a actualizar"))

                //Check if the id exists
                let existingProduct = productList.find(product => product.id === toUpdateId)

                //If yes, ask the attribute to update
                if (existingProduct){
                    let attributeUpdadte = prompt("¿Qué atributo te gustaría actualizar?\n1. Nombre\n2. Precio\n3. Cantidad\n4. Descripción")

                    //Switch to update the selected attribute
                    switch (attributeUpdadte){

                        case "1"://Update name
                            let newName = prompt("Ingresa el nuevo nombre del producto")
                            existingProduct.productName = newName
                            break
                        
                        case "2"://Update price
                            let newPrice = checkNum(prompt("Ingresa el nuevo precio"))
                            existingProduct.price = newPrice
                            break
                        
                        case "3"://Update quantity
                            let newQuantity = checkNum(prompt("Ingresa la nueva cantidad"))
                            existingProduct.quantity = newQuantity
                            break

                        case "4"://Update description
                            let newDescription = prompt("Ingresa la nueva descripción")
                            existingProduct.description = newDescription
                            break

                        default:
                            alert("No es una opción válida")
                    }

                    console.log(existingProduct)

                //If the id is not found    
                }else {
                    alert("Este id no existe")
                }

                //Ask if the user wants to update another product
                updateProduct = confirm("¿Quieres actualizar otro producto?")
            }

        case "5"://Erase a product
            let eraseProduct = confirm("¿Quieres eliminar un producto?")
            while (eraseProduct){

                //Show the list
                let updateList = "Esta es una lista de los productos:\n"           
                productList.forEach(product => {
                    updateList += `Id: ${product.id} - Nombre: ${product.productName} - Precio ${product.price}\n`
                })
                let toEraseId = checkNum(prompt(updateList + "Selecciona el id del producto a eliminar"))

                //Check if the id exists
                let existingProduct = productList.find(product => product.id === toEraseId)

                //If the product exists, erase the product
                if (existingProduct){
                    let eraseIndex = productList.indexOf(existingProduct)
                    productList.splice(eraseIndex, 1)
                    alert("Producto eliminado existosamente")
                
                //If the product doesn't exists, give an alert    
                } else {
                    alert("Ese producto no existe")
                } 
                eraseProduct = confirm("¿Quieres eliminar otro producto?")        
            } 
            console.log(productList.length)


        case "30":
            alert("¡Hasta pronto!")
            loop = false   
    }
}



    // - Métodos de arrays: push(), pop(), shift(), unshift(), splice(), slice(), map(), filter(), reduce(), sort(), entre otros.
    //     - Métodos de objetos: Object.keys(), Object.values(), Object.entries(), Object.assign()