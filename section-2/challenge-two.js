//Calculadora de Estadísticas de Calificaciones

//Functions

//Function to calculate average
function listAverage(list){
    //Sum grades
    const acumm = list.reduce((acum, grade) => {
        return acum + grade
    })

    //Calculate the average
    const average = acumm/list.length
    return average     
}

//Function to find the highest grade
function findHighestNum(list){
    const highestNum = list.reduce((acum, element) => {
       return acum < element ? element : acum
    }, list[0])
    return highestNum

    // let highestNum = list[0]
    // list.forEach(element => {
    //     if(highestNum < element){
    //         highestNum = element
    //     }
    // })
    // return highestNum
}

//Function to find the lowest grade
function findLowestNum(list){
   const lowestNum = list.reduce((acum, element) => {
    return acum > element ? element : acum
   }, list[0])
   return lowestNum
   
    // let lowestNum = list[0]
    // list.forEach(element => {
    //     if(lowestNum > element){
    //         lowestNum = element
    //     }
    // })
    // return lowestNum
}

//Function to find the approved and failed
function countApprovedFailed(list){
    let approved = 0
    let failed = 0
    list.forEach(element => {
        if(element >= 70){
            approved++
        } else {
            failed++
        }
    })
    return {approved, failed}
}

//Check that there are only numbers and allowed characters with a while loop and a regular expression
const regEx = /[^0-9,. ]/

while (true){

    //Ask for the grades of the students
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

        //Calculate grades average with reduce
        const gradesAverage = listAverage(gradesList).toFixed(2)
        console.log(gradesAverage)
        alert(`El promedio de las calificaciones es de ${gradesAverage}`)

        //Find the highest grade
        const highestGrade = findHighestNum(gradesList)
        console.log(highestGrade)
        alert(`La nota más alta es de ${highestGrade}`)

        //Find the lowest grade
        const lowestGrade = findLowestNum(gradesList)
        console.log(lowestGrade)
        alert(`La nota más baja es de ${lowestGrade}`)

        //Count the approved and failed ones with function
            // const approved = countApprovedFailed(gradesList).approved
            // console.log(approved)

            // const failed = countApprovedFailed(gradesList).failed
            // console.log(failed)

        //Count the approved and failed ones using filter
        const approved = gradesList.filter(element => element >= 70).length
        const failed = gradesList.filter(element => element < 70).length

        alert(`El número de aprobados es de ${approved} y el número de reprobados es de ${failed}`)

        //Ordered list from highest to lowest using sort
        const orderedList = gradesList.sort((a, b) => b - a)
        console.log(orderedList)
        alert(`La lista ordernada de mayor a menor es ${orderedList}`)
        break
    }
}
