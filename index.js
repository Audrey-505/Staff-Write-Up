const inquirer = require('inquirer')
const fs = require('fs')

const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const Manager = require('./lib/manager')

let teamMembers = []

const prompts = (teamMembers) => {
    console.log(teamMembers)
    const topPart = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>`

  // create 3 other const for each type of employee / muniplulate arrays to display dif parts of html (use getRole)
  const mainPart = `<h1>Hello World</h1>
    <div>
      <h4>${name}</h4>
      <h4>${id}</h4>
      <h4>${email}</h4>
    </div>`

  const bottomPart = `</body>
  </html>
  `
  
}


// .then((data)=> {
//     const htmlPage = prompts(data)
//     fs.writeFile('index.html', htmlPage, (err) =>
//     err ? console.log(err) : console.log('Successfully created index.html!') 
//     )
// })



// Would creating functions for each type of employee be right?
function askManager(){
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
    }
 ]).then((data)=>{
    let currentName = data.name
    let currentEmail = data.email
    let currentId = data.id
    let currentOfficeNum = data.officeNumber
    const currentManager = new Manager(currentName, currentEmail, currentId, currentOfficeNum)
    teamMembers.push(currentManager)
    askEmployees()
 })
}

function askEmployees(){
    inquirer
    .prompt([
        {
            type:'input',
            name: 'name',
            message: `employee's name`
        },
        {
            type: 'input',
            name: 'id',
            message: `employee's id`
        },
        {
            type: 'input',
            name: 'email',
            message: `employee's email`
        },
        {
            type: 'list',
            name: 'role',
            message: `employee's role`,
            choices: ['Engineer', 'Intern', 'Done']
        }
    ]).then((data)=> {
        let currentName = data.name
        let currentEmail = data.email
        let currentId = data.id
        if (data.role === 'Engineer') {
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'github',
                    message: `engineer's github`
                }
            ]).then((data) => {
                let engineerGithub = data.github
                let currentEngineer = new Engineer(currentName, currentId, currentEmail, engineerGithub)
                teamMembers.push(currentEngineer)
                askEmployees()
            })
        }
        if (data.role === 'Intern'){
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'school',
                    message: `intern's school`
                }
            ]).then((data) => {
                let internSchool = data.school
                let currentIntern = new Intern(currentName, currentId, currentEmail, internSchool)
                teamMembers.push(currentIntern)
                askEmployees()
            })
        }
        if (data.role === 'Done'){
            const htmlPage = prompts(teamMembers)
            //fs.writeFile('index.html', htmlPage, (err) =>
            //     err ? console.log(err) : console.log('Successfully created index.html!')
            // )
        }
    })
}

askManager()
