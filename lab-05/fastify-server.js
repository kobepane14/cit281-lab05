//const { request } = require("http");
//const { parse } = require("path");

const fastify = require("fastify")();

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];

fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

fastify.get("/cit/student/:id", (request, reply) => {
    const { id } = request.params;
    const idInt = parseInt(id);

    for (student of students){
        if (student.id === idInt){
            reply
              .header("Content-Type", "application/json; charset=utf-8")
              .code(200)
              .send(student);
        }
    }
    reply
      .header("Content-Type", "application/json; charset=utf-8")
      .code(404)
      .send({ message: "Not Found" });
})

fastify.get("*", (request, reply) => {
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Page not Found!</h1>")
})

fastify.post("/cit/student", (request, reply) => {
    const studentIds = [];
    for (num of students){
        studentIds.push(num.id)
    }
    const maxId = Math.max(...studentIds);

   // const {last, first} = request.body

    const newStudent = {id: maxId + 1 , ...request.body}
    students.push(newStudent);
    //console.log(students)
    //let newstudent = {
     // id: maxId + 1,
    //last: last,
    //first: first,
    //};
    reply
      .send(newStudent)
        
})


const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
