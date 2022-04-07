const http = require('http');
const PORT = process.env.PORT || 3000;
const server = http.createServer();
const yargs = require('yargs');
const {getDegrees,addStudent,listStudents,calculateDegrees,removeStudent, getStudent} = require('./controllers/student.controller')

// node index.js list
yargs.command({
    command:"list",
    describe:"list students information",
    handler:()=>{
        listStudents();
    }
})


yargs.command({
    command:"read",
    describe:"reading stundent",
      id:{
              type:"number",
              describe:'This is studentId in add command',
              demandOption:true,
          },
    handler:(x)=>{
        getStudent(x.id)
    }
})

yargs.command({
    command:"delete",
    describe:"Deleting stundent",
    builder:{
        id:{
            type:"number",
            describe:'This is studentId in add command',
            demandOption:true,
        }
    },
    handler:(x)=>{
        removeStudent(x.id)
    }
})

//node 
yargs.command({
    command:"add",
    describe:"Adding students",
    builder:{
          name:{
              type:"string",
              describe:'This is student name in add command',
              demandOption:true,
          },
        degrees: {
              type:"array",
              describe:'This is degrees in add command',
              demandOption:true,
          },
    },
    handler:(x)=>{
        addStudent({name:x.name , degrees:x.degrees});
    }
})

yargs.parse()   

server.listen(PORT,()=>{
    console.log("Server Is Running")
})