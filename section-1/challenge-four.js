//Gestor de eventos

//Funciones
function mostrarLista (lista){
    let verEventos = "Esta es una lista de los eventos\n"
            lista.forEach(evento => {
                //Dar formato a la lista para mostrar
                verEventos += `- Id: ${evento.id} - Nombre: ${evento.nombreEvento} - Fecha: ${evento.fechaEvento} - Descripción: ${evento.descripciónEvento}\n`                
            })
            return verEventos
}

//Lista para guardar los eventos
let listaEventos = []

//Id para cada evento
let id = 1

//Bandera para el ciclo while
let continuar = true

//Ciclo while para mostrar el menú
while (continuar){

    //Menu interactivo
    let menu = prompt(`
    Bienvenido al gestor de eventos

    1. Agregar evento
    2. Ver eventos
    3. Buscar eventos
    4. Actualizar un evento
    5. Eliminar un evento
    6. Salir
    `)

    switch (menu){
        //Agregar un evento
        case "1":
            //Nombre del evento
            let nombreEvento = prompt("Escribe el nombre del evento")
            //Fecha del evento
            let fechaEvento = prompt("Escribe la fecha del evento (dia/mes/año)")
            //Descripción
            let descripciónEvento = prompt("Escribe la descripción del evento")
            //Crear objeto con la información del evento
            let evento = {
                id: id++,
                nombreEvento,
                fechaEvento,
                descripciónEvento
            }
            //Añadir el objeto a la lista
            listaEventos.push(evento)
            break
        //Ver eventos
        case "2":
            alert(mostrarLista(listaEventos))
            break
        //Buscar un evento
        case "3":
            let buscarEvento = prompt("Escribe el nombre del evento que quieres buscar")
            let eventoEncontrado = listaEventos.find(evento => evento.nombreEvento === buscarEvento)
            if (eventoEncontrado){
                alert(`Este es el evento que buscas:
                - Id: ${eventoEncontrado.id}
                - Nombre: ${eventoEncontrado.nombreEvento}
                - Fecha: ${eventoEncontrado.fechaEvento}
                - Descripción: ${eventoEncontrado.descripciónEvento}`)
            } else {
                alert("No se encontró el evento")
            }
            break
        //Actualizar evento    
        case "4":
            //Preguntar evento a actualizar
            let actualizarEvento =  prompt(`${mostrarLista(listaEventos)}\nPor favor ingresa el id del evento a actualizar`)
            //Verificar que el evento exista
            let eventoActualizar = listaEventos.find(evento => evento.id === parseInt(actualizarEvento))
            //Si existe, preguntar los nuevos detalles y modificar el evento
            if (eventoActualizar){
                let nuevoNombre = prompt("Escribe el nuevo nombre del evento")
                let nuevaFecha = prompt("Escribe la nueva fecha del evento (dia/mes/año)")
                let nuevaDescripción = prompt("Escribe la nueva descripción del evento")
                eventoActualizar.nombreEvento = nuevoNombre
                eventoActualizar.fechaEvento = nuevaFecha
                eventoActualizar.descripciónEvento = nuevaDescripción
                alert("Evento actualizado con éxito")
            } else {
                alert("No se encontró el evento")
            }
            break
        //Eliminar un evento
        case "5":
            //Preguntar el evento a eliminar
            let eliminarEvento = prompt(`${mostrarLista(listaEventos)}\nPor favor ingresa el id del evento a eliminar`)
            //Verificar si el evento existe
            let eventoEliminar = listaEventos.find(evento => evento.id === parseInt(eliminarEvento))
            //Si existe, eliminar el evento
            if (eventoEliminar){
            //Encontrar la posición del evento
            let posicionEvento = listaEventos.indexOf(eventoEliminar)
            //Eliminar el evento
            listaEventos.splice(posicionEvento, 1)
            alert("Evento eliminado con éxito")
            } else {
                alert("No se encontró el evento")
            } 
            break
        //Salir    
        case "6":
            alert("¡Hasta pronto!")
            continuar = false
            break
        //Si se elige una opción inválida
        default:
            alert("Opción inválida")
            break
    }
}