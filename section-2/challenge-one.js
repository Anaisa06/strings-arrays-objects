//Calculadora de Promedio de Calificaciones

//Check that there are only numbers and allowed characters with a while loop and a regular expression
const regEx = /[^0-9,. ]/

while (true){

    //Ask for the grades of the student
    let grades = prompt("Ingresa las calificaciones separadas por coma")
    console.log(grades)

    //If the input has not allowed characters, there is a warning and the loop starts again
    if (regEx.test(grades)){
        console.warn("Datos inválidos")
        alert("Hay datos que no son válidos, intenta de nuevo")        

    //If the input doesn't have not allowed characters, the process continues    
    } else {

        //Add the grades to a list
        let gradesList = grades.split(",")
        console.log(gradesList)

        //Remove white spaces 
        gradesList = gradesList.map(i => i.trim())

        //Parse to number
        gradesList = gradesList.map(i => i = parseFloat(i))

        //Sum grades
        const gradesSum = gradesList.reduce((acum, grade) => {
            return acum + grade
        })

        //Calculate the average
        const gradesAverage = gradesSum/gradesList.length
        console.log(gradesAverage)
        alert(`El promedio de las calificaciones es de ${gradesAverage}`)          
        
        break
    }
}