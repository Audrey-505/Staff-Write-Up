const inquirer = require('inquirer')
const fs = require('fs')

const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const Manager = require('./lib/manager')

let teamMembers = []


  // create 3 other const for each type of employee / muniplulate arrays to display dif parts of html (use getRole)

const generateManager = currentManager => {
    return `
    <div class = " "> this one goes at the very end of card </div>
    <div class = " "> this one goes after first two methods (headers) </div>
    <h2 class = " "> ${currentManager.getName()}</h2>
    <h3 class = " "> ${currentManager.getRole()}</h3>
    <div class = " "> this one goes after the 3 other details id, email, extra </div>
    <h4 class = " "> ${currentManager.getId()}</h4>
    <h4 class = " "> ${currentManager.getEmail()}</h4>
    <h4 class = " "> ${currentManager.getOfficeNumber()}</h4>`
  }

  const generateEngineer = currentEngineer => {
    return `
    <div class =" ">
    <div class =" "> 
    <h2 class = " "> ${currentEngineer.getName()}</h2>
    <h3 class = " "> ${currentEngineer.getRole()}</h3>
    </div>
    <div class = " "> 
    <h4 class = " "> ${currentEngineer.getId()}</h4>
    <h4 class = " "> ${currentEngineer.getEmail()}</h4>
    <h4 class = " "> ${currentEngineer.getGithub()}</h4>
    </div>
    </div>`
  }

  const generateIntern = currentIntern => {
    return `
    <div class = " "> 
    <div class = " "> 
    <h2 class = " "> ${currentIntern.getName()}</h2>
    <h3 class = " "> ${currentIntern.getRole()}</h3>
    </div>
    <div class = " ">
    <h4 class = " "> ${currentIntern.getId()}</h4>
    <h4 class = " "> ${currentIntern.getEmail()}</h4>
    <h4 class = " "> ${currentIntern.getSchool()}</h4>
    </div>
    </div>`
  }

//might the parameter need to be teamMembers instead of data?
generateHTML = (teamMembers) => {
     employeeArray = []

    for (i = 0; i < teamMembers.length; i++) {
        const employee = teamMembers[i]
        const role = employee.getRole()

        if (role === 'Manager') {
            const managerCard = generateManager(employee)
            employeeArray.push(managerCard)
        }

        if (role === 'Engineer') {
            const engineerCard = generateEngineer(employee)
            employeeArray.push(engineerCard)
        }

        if (role === 'Intern') {
            const internCard = generateIntern(employee)
            employeeArray.push(internCard)
        }

        if (role === 'Done') {
            return
        }
    }

    //why are we merging the items in array into one string?
    const staffCards = employeeArray.join('')

    const createTeam = prompts(staffCards)
    return createTeam

}

const prompts = (staffCards) => {
    //console.log(staffCards)
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>HTML 5 Boilerplate</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <h1>My Team</h1>
      ${staffCards}
      </body>
      </html>`
  
}


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
            type: 'list',
            name: 'role',
            message: `employee's role`,
            choices: ['Engineer', 'Intern', 'Done']
        },
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
            // fs.writeFile('index.html', htmlPage, (err) =>
            //     err ? console.log(err) : console.log('Successfully created index.html!')
            // )
        }
    })
}




askManager()
// .then(teamMembers => {
//     return generateHTML(teamMembers)
// })
// .catch(err => {
//     console.log(err)
// })




// .then((data)=> {
//     const htmlPage = prompts(data)
//     fs.writeFile('index.html', htmlPage, (err) =>
//     err ? console.log(err) : console.log('Successfully created index.html!') 
//     )
// })