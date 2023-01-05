const inquirer = require('inquirer')
const fs = require('fs')

const Employee = require('./lib/employee')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const Manager = require('./lib/manager')

let teamMembers = []

const prompts = ({name, id, email, officeNumber, github, school}) =>

`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hello World</h1>
    <div>
      <h4>${name}</h4>
      <h4>${id}</h4>
      <h4>${email}</h4>
    </div>
	<script src="index.js"></script>
  </body>
</html>
`

inquirer
.prompt([
    {
        type:'input',
        name: 'name',
        message: `team manager's name`
    },
    {
        type: 'input',
        name: 'id',
        message: `team manager's id`
    },
    {
        type: 'input',
        name: 'email',
        message: `team manager's email`
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: `team manager's phone number`
    },
    {
        type: 'list',
        name: 'menu',
        choices: [ 'add engineer', new inquirer.Separator(), 'add intern', new inquirer.Separator(), 'finished building team' ],
        message: 'What license does this application use'
    },
])

.then(function (data){
    const manager = new Manager (data.name, data.id, data.email, data.officeNumber)
    teamMembers.push(manager)
    const engineer = new Engineer (data.name, data.id, data.email, data.github)
    teamMembers.push(engineer)
    const intern = new Intern (data.name, data.id, data.email, data.school)
    teamMembers.push(intern)
})
.then((data)=> {
    const htmlPage = prompts(data)
    fs.writeFile('index.html', htmlPage, (err) =>
    err ? console.log(err) : console.log('Successfully created index.html!') 
    )
})


// .then((data) => {
//     const htmlPage = prompts(data)
//     fs.writeFile('index.html', htmlPage, (err) =>
//     err ? console.log(err) : console.log('Successfully created index.html!')
//     )
// })