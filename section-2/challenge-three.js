//Sistema de Gestión de Inventario

//Function to check if the input is a number
function checkNum(variable) {
  while (isNaN(variable)) {
    console.warn('El valor ingresado no es un número');
    variable = prompt('Por favor, ingresa solo números');
  }
  variable = parseFloat(variable);
  return variable;
}

function showList(list) {
  let printList = 'Esta es una lista de los productos:\n';
  list.forEach((product) => {
    printList += `- Id: ${product.id} - Nombre: ${product.productName} - Precio: $${product.price} - Cantidad: ${product.quantity} - Descripción: ${product.description} \n`;
  });
  return printList;
}

function badWordsSearch(badWordsList, listToSearch){
    let newList = []
    listToSearch.forEach((product) => {
      const descriptionSplit = product.description.split(' ');
      descriptionSplit.forEach((word) => {
        if (badWordsList.includes(word)) {
          newList.push(product);
        }
      });
    });
    return newList
}

function findTotalValue(list){
    let totalValue = list.reduce(
      (accum, product) => (accum + product.price) * product.quantity
    );
    return totalValue
}

//Define an empty list to save the products objects
let productList = [];

//Define the list of bad words
const badWordsList = [
  'palabra1',
  'palabra2',
  'palabra3',
  'palabra4',
  'palabra5',
];
let loop = true;

while (loop) {
  //Interactive menu
  let userResponse = prompt(
    'Bienvenido al gestor de inventario\nEscoge la opción que deseas realizar\n1. Añadir un nuevo producto\n2. Duplicar un producto\n3. Ver lista de productos y buscar producto\n4. Actualizar un producto\n5. Eliminar un producto\n6. Verificar existencia de un producto\n7. Venta de productos\n8. Compra de productos\n9. Calcular valor total de inventario\n10. Ordernar inventario\n11. Buscar productos con malas palabras\n30. Salir'
  );

  //Swich to check the user response

  switch (userResponse) {
    case '1': //The user wants to add a new product
      //Ask if the user wants to add new product with a while loop
      let newProduct = confirm('¿Quieres añadir un nuevo producto');
      let id = 1;

      while (newProduct) {
        //Ask for the details of the product
        let productName = prompt(
          'Ingresa el nombre del producto'
        ).toLowerCase();
        console.log(`Nombre: ${productName}`);

        let price = checkNum(prompt('Ingresa el precio del producto'));
        console.log(`Precio: $${price}`);

        let quantity = checkNum(
          prompt('Ingresa la cantidad disponible del producto')
        );
        console.log(`Cantidad: ${quantity}`);

        let description = prompt(
          'Ingresa la descripción del producto'
        ).toLowerCase();
        console.log(`Descripción: ${description}`);

        //Save the details of the product into an object and save the object in the list
        const product = {
          id,
          productName,
          price,
          quantity,
          description,
        };
        console.log(product);

        productList.push(product);

        //Increase the id number for every loop
        id++;

        newProduct = confirm('¿Quieres añadir un nuevo producto');
      }

      console.log(productList);
      break;

    case '2': //Duplicate products
      let duplicate = confirm('¿Quieres duplicar un producto?');
      let printList = showList(productList);

      while (duplicate) {
        //Show list and ask for the Id
        let duplicateId = checkNum(
          prompt(`${printList}Escribe el id del producto que deseas duplicar`)
        );

        //Verify if the id provided exists in the list
        let existingProduct = productList.find(
          (product) => product.id === duplicateId
        );

        //If yes, make the copy
        if (existingProduct) {
          //Find the last product id in the list
          const idList = [];

          //Save the id for each product in the array
          productList.forEach((product) => {
            idList.push(product.id);
          });

          //Sort the list from lowest to highest and find the last number
          idList.sort((a, b) => a - b);
          const lastIndex = idList.length - 1;
          const lastId = idList[lastIndex];

          //Make the copy
          const productCopy = {
            id: lastId + 1,
            productName: existingProduct.productName + ' copy',
            price: existingProduct.price,
            quantity: existingProduct.quantity,
            description: existingProduct.description,
          };
          console.log(productCopy);
          productList.push(productCopy);

          alert('Producto duplicado con éxito');

          //Else, give an alert and try again
        } else {
          alert('No existe ningún producto con ese id, intenta de nuevo');
        }

        duplicate = confirm('¿Quieres duplicar un producto?');
      }
      break;

    case '3': //Show products and search product
      //Show products
      let showProducts = confirm('¿Quieres ver una lista de los productos?');
      if (showProducts) {
        alert(showList(productList));
      }

      //Search products
      let searchProducts = confirm('¿Quieres buscar un producto?');
      while (searchProducts) {
        //Ask the parameter to search the product
        let searchCategory = prompt(
          '¿Deseas buscar por nombre o por precio?\n1. Nombre\n2. Precio'
        );

        //If the user wants to search by name
        if (searchCategory === '1') {
          //Ask the name of the product
          let searchName = prompt(
            'Ingresa el nombre del producto que quieres buscar'
          ).toLowerCase();

          //Check if it matches with a product in the list, if it does, show the product
          existingProduct = productList.find(
            (product) => product.productName === searchName
          );
          if (existingProduct) {
            alert(
              `Este es el producto que buscas:\nNombre: ${existingProduct.productName} - Precio: $${existingProduct.price} - Cantidad: ${existingProduct.quantity} - Descripción ${existingProduct.description}`
            );
          } else {
            alert('No existe ningún producto con ese nombre');
          }

          //If user wants to search by price range
        } else if (searchCategory === '2') {
          //Ask min price and max price
          let minPrice = checkNum(prompt('Ingresa el precio mínimo'));
          let maxPrice = checkNum(prompt('Ingresa el precio máximo'));

          let inRangeProducts = productList.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
          );

          let showInRange =
            'Estos son los productos dentro de ese rango de precios:\n';
          inRangeProducts.forEach((product) => {
            showInRange += `- Nombre: ${product.productName} - Precio: $${product.price} - Cantidad: ${product.quantity} - Descripción: ${product.description}\n`;
          });

          alert(showInRange);
          console.log(showInRange);
        } else {
          alert('No es una opción válida, por favor ingresa 1 o 2');
        }

        searchProducts = confirm('¿Quieres buscar un producto?');
      }
      break;

    case '4': //Update product
      let updateProduct = confirm('¿Quieres actualizar un producto?');

      while (updateProduct) {
        let printList = showList(productList);
        let toUpdateId = checkNum(
          prompt(printList + 'Selecciona el id del producto a actualizar')
        );

        //Check if the id exists
        let existingProduct = productList.find(
          (product) => product.id === toUpdateId
        );

        //If yes, ask the attribute to update
        if (existingProduct) {
          let attributeUpdadte = prompt(
            '¿Qué atributo te gustaría actualizar?\n1. Nombre\n2. Precio\n3. Cantidad\n4. Descripción'
          );

          //Switch to update the selected attribute
          switch (attributeUpdadte) {
            case '1': //Update name
              let newName = prompt('Ingresa el nuevo nombre del producto');
              existingProduct.productName = newName;
              break;

            case '2': //Update price
              let newPrice = checkNum(prompt('Ingresa el nuevo precio'));
              existingProduct.price = newPrice;
              break;

            case '3': //Update quantity
              let newQuantity = checkNum(prompt('Ingresa la nueva cantidad'));
              existingProduct.quantity = newQuantity;
              break;

            case '4': //Update description
              let newDescription = prompt('Ingresa la nueva descripción');
              existingProduct.description = newDescription;
              break;

            default:
              alert('No es una opción válida');
          }

          console.log(existingProduct);

          //If the id is not found
        } else {
          alert('Este id no existe');
        }

        //Ask if the user wants to update another product
        updateProduct = confirm('¿Quieres actualizar otro producto?');
      }
      break;

    case '5': //Erase a product
      let eraseProduct = confirm('¿Quieres eliminar un producto?');
      while (eraseProduct) {
        //Show the list
        let printList = showList(productList);
        let toEraseId = checkNum(
          prompt(printList + 'Selecciona el id del producto a eliminar')
        );

        //Check if the id exists
        let existingProduct = productList.find(
          (product) => product.id === toEraseId
        );

        //If the product exists, erase the product
        if (existingProduct) {
          let eraseIndex = productList.indexOf(existingProduct);
          productList.splice(eraseIndex, 1);
          alert('Producto eliminado existosamente');

          //If the product doesn't exists, give an alert
        } else {
          alert('Ese producto no existe');
        }
        eraseProduct = confirm('¿Quieres eliminar otro producto?');
      }
      break;

    case '6': //Check if a product exists
      let checkAvailable = confirm(
        '¿Quieres verificar la existencia de un producto?'
      );
      while (checkAvailable) {
        //Ask for the name of the product
        let productAvailable = prompt(
          'Ingresa el nombre del producto para verificar su existencia'
        );

        //Check if product exists in the list
        let productCheckExistence = productList.find(
          (product) => product.productName === productAvailable
        );

        //If it exists, check availability
        if (productCheckExistence) {
          if (productCheckExistence.quantity === 0) {
            alert('No hay existencia de este producto');
            console.log('No hay existencia de este producto');
          } else {
            alert(
              `Este es el producto que buscas:\n- Nombre: ${productCheckExistence.productName}\n- Precio: $${productCheckExistence.price}\n- Cantidad: ${productCheckExistence.quantity}\n- Descripción: ${productCheckExistence.description}`
            );
          }
        } else {
          alert('El producto no existe, intenta de nuevo');
        }
        checkAvailable = confirm(
          '¿Quieres verificar la existencia de un producto?'
        );
      }
      break;

    //Sell a product
    case '7':
      let sellProduct = confirm('¿Quieres vender un producto?');

      while (sellProduct) {
        //Show the list
        let printList = showList(productList);
        let toSellId = checkNum(
          prompt(printList + 'Selecciona el id del producto a vender')
        );

        //Check if the id exists
        let existingProduct = productList.find(
          (product) => product.id === toSellId
        );

        if (existingProduct) {
          let sellIndex = productList.indexOf(existingProduct);
          if (productList[sellIndex].quantity === 0) {
            alert('No hay disponibilidad de este producto');
          } else {
            productList[sellIndex].quantity--;
            alert(
              `Producto vendido existosamente\nNueva cantidad: ${productList[sellIndex].quantity}`
            );
          }

          //If the product doesn't exists, give an alert
        } else {
          alert('Ese producto no existe');
        }
        sellProduct = confirm('¿Quieres vender otro producto?');
      }
      break;

    //Buy products
    case '8':
      let buyProduct = confirm('¿Quieres comprar un producto?');
      while (buyProduct) {
        //Show the list
        let printList = showList(productList);
        let toBuyId = checkNum(
          prompt(printList + 'Selecciona el id del producto a comprar')
        );

        //Check if the id exists
        let existingProduct = productList.find(
          (product) => product.id === toBuyId
        );

        if (existingProduct) {
          let buyIndex = productList.indexOf(existingProduct);
          productList[buyIndex].quantity++;
          alert(
            `Producto comprado existosamente\nNueva cantidad: ${productList[buyIndex].quantity}`
          );

          //If the product doesn't exists, give an alert
        } else {
          alert('Ese producto no existe');
        }
        buyProduct = confirm('¿Quieres comprar otro producto?');
      }
      break;

    //Total value
    case '9':
      let totalValue = findTotalValue(productList)
      alert(`El precio total de inventario es de ${totalValue}`);

    //Organize list
    case '10':
      flag = true;
      while (flag) {
        let organizeParameter = prompt(
          'Quieres ordernar la lista por:\n1. Precio\n2. Cantidad\n3. Nombre\n4. Descripción'
        );
        switch (organizeParameter) {
          //Price
          case '1':
            productList.sort((a, b) => a.price - b.price);
            flag = false;
            break;
          //Quantity
          case '2':
            productList.sort((a, b) => a.quantity - b.quantity);
            flag = false;
            break;
          //Name
          case '3':
            productList.sort((a, b) =>
              a.productName.localeCompare(b.productName)
            );
            flag = false;
            break;
          //Description
          case '4':
            productList.sort((a, b) =>
              a.description.localeCompare(b.description)
            );
            flag = false;
            break;
          default:
            alert('No es una opción válida, intenta de nuevo');
        }
      }
      alert(`Productos ordernados existosamente!\n${showList(productList)}`);
      break;

    //Bad words search
    case '11':
      let blacklistedProducts = badWordsSearch(badWordsList, productList);
      console.log(`Productos con posibles malas palabras ${showList(blacklistedProducts)}`);
      alert(`Productos con posibles malas palabras ${showList(blacklistedProducts)}`);
      break;

    //General report
    // case "12":
    //   let productsQuantity = productList.length
    //   let badWordsProducts = blacklistedProducts.length

    //   console.log(`Reporte general\nCantidad de productos: ${productsQuantity}\nValor total de inventario: ${totalValue}\nCantidad de productos con malas palabras: ${badWordsProducts}`)
    //   alert(`Reporte general\nCantidad de productos: ${productsQuantity}\nValor total de inventario: ${totalValue}\nCantidad de productos con malas palabras: ${badWordsProducts}`)
    //   break  
    case '30':
      alert('¡Hasta pronto!');
      loop = false;
  }
}

// - Métodos de arrays: push(), pop(), shift(), unshift(), splice(), slice(), map(), filter(), reduce(), sort(), entre otros.
//     - Métodos de objetos: Object.keys(), Object.values(), Object.entries(), Object.assign()
