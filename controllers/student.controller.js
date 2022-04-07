let model = require('../model/student.model');
const path = require('path')
const fs = require('fs')
const dataPath = path.join(__dirname,"../model/data.json")

function calculateDegrees (student) {
      let sumOfDegrees = 0;
      student.degrees.forEach((degree)=>{
        sumOfDegrees+=degree;
    })
    let degreesPercentage = (sumOfDegrees/(student.degrees.length*100))*100;
    let status = "";
    if(degreesPercentage>=50)
     {status="pass"}
    else
     {status="fail"}
        return {sumOfDegrees,degreesPercentage,status}
} 
function listStudents ()
 {
     model.forEach((student)=>{
    let {sumOfDegrees,status,degreesPercentage} = calculateDegrees(student);
    console.log(`Student ${student.name}, ID:${student.studentID}, sum of Grades:${sumOfDegrees}, sum of Grades in percentage: ${Math.round(degreesPercentage)}% , student ${status}`)
})}

function getStudent (id) {
    let student = model.find((student)=>{return student.studentID===id})
    let {sumOfDegrees,status,degreesPercentage} = calculateDegrees(student);
    console.log(`Student ${student.name}, ID:${student.studentID}, sum of Grades:${sumOfDegrees}, sum of Grades in percentage: ${Math.round(degreesPercentage)}% , student ${status}`)
}

function addStudent(student) {
    student.studentID=model.length;
    model.push(student)
    fs.writeFileSync(dataPath,JSON.stringify(model))
    let {sumOfDegrees,status,degreesPercentage} = calculateDegrees(student);
    console.log(`Student ${student.name}, ID:${student.studentID}, sum of Grades:${sumOfDegrees}, sum of Grades in percentage: ${Math.round(degreesPercentage)}% , student ${status}`)
    
}
function removeStudent(id) {
    let newModel = model.filter((student)=>{return student.studentID!=id});
     model = newModel;
    fs.writeFileSync(dataPath,JSON.stringify(model))
    console.log(`Element with id ${id} is deleted`)

}



module.exports={listStudents,addStudent,removeStudent,calculateDegrees,getStudent}