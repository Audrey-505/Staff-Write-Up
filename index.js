const inquirer = require('inquirer')
const fs = require('fs')

const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const Manager = require('./lib/manager')

let teamMembers = []


// create 3 other const for each type of employee / muniplulate arrays to display dif parts of html (use getRole)

const generateManager = currentManager => {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${currentManager.getName()}</h5>
    <h5 class="card-title">${currentManager.getRole()} <i class="bi bi-clipboard"></i></h5>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">ID: ${currentManager.getId()}</li>
    <li class="list-group-item">Email: <a href="mailto:${currentManager.getEmail()}">${currentManager.getEmail()}</a></li>
    <li class="list-group-item">Office Number: ${currentManager.getOfficeNumber()}</li>
    </ul>
    </div>
    </div>`
}

const generateEngineer = currentEngineer => {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${currentEngineer.getName()}</h5>
    <h5 class="card-title">${currentEngineer.getRole()} <i class="fa-solid fa-glasses"></i></h5>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">ID: ${currentEngineer.getId()}</li>
    <li class="list-group-item">Email: <a href="mailto:${currentEngineer.getEmail()}">${currentEngineer.getEmail()}</a></li>
    <li class="list-group-item">GitHub: <a href="https://github.com/${currentEngineer.getGithub()}">${currentEngineer.getGithub()}</a></li>
    </ul>
    </div>
    </div>`
}

const generateIntern = currentIntern => {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${currentIntern.getName()}</h5>
    <h5 class="card-title">${currentIntern.getRole()} <i class="fa-solid fa-graduation-cap"></i></h5>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">ID: ${currentIntern.getId()}</li>
    <li class="list-group-item">Email: <a href="mailto:${currentIntern.getEmail()}">${currentIntern.getEmail()}</a></li>
    <li class="list-group-item">School: ${currentIntern.getSchool()}</li>
    </ul>
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
        // if (role === 'Done') {
        //     return
        // }
    }

    //why are we merging the items in array into one string?
    const staffCards = employeeArray.join('')

    const createTeam = prompts(staffCards)
    return createTeam

}

const prompts = (staffCards) => {
    //console.log(staffCards)
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Staff List</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
    <nav class="navbar justify-content-center bg-body-tertiary">      
    <h1>My Team</h1>
    </nav>
      ${staffCards}
      </body>
      </html>`
}


// Would creating functions for each type of employee be right?
function askManager() {
    inquirer
        .prompt([
            {
                type: 'input',
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
        ]).then((data) => {
            let currentName = data.name
            let currentEmail = data.email
            let currentId = data.id
            let currentOfficeNum = data.officeNumber
            const currentManager = new Manager(currentName, currentId, currentEmail, currentOfficeNum)
            teamMembers.push(currentManager)
            askEmployees()
        })
}

function askEmployees() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: `employee's role`,
                choices: ['Engineer', 'Intern']
            },
            {
                type: 'input',
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
        ]).then((data) => {
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
                        },
                        {
                            type: 'confirm',
                            name: 'addMore',
                            message: 'Add more employees?',
                            default: false
                        }
                    ]).then((data) => {
                        let engineerGithub = data.github
                        let moreEmploy = data.addMore
                        let currentEngineer = new Engineer(currentName, currentId, currentEmail, engineerGithub, moreEmploy)
                        teamMembers.push(currentEngineer)
                        if (moreEmploy) {
                            return askEmployees()
                        } else {
                            //return teamMembers

                            const employCards = generateHTML(teamMembers)
                            //console.log(employCards)

                            //const newParam = JSON.stringify(teamMembers)
                            //const htmlPage = prompts(employCards)
                            fs.writeFile('index.html', employCards, (err) =>
                                err ? console.log(err) : console.log('Successfully created index.html!')
                            )
                        }
                    })
            }
            if (data.role === 'Intern') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'school',
                            message: `intern's school`
                        },
                        {
                            type: 'confirm',
                            name: 'addMore',
                            message: 'Add more employees?',
                            default: false
                        }
                    ]).then((data) => {
                        let internSchool = data.school
                        let moreEmploy = data.addMore
                        let currentIntern = new Intern(currentName, currentId, currentEmail, internSchool, moreEmploy)
                        teamMembers.push(currentIntern)
                        if (moreEmploy) {
                            return askEmployees()
                        } else {
                            //return teamMembers

                            const employCards = generateHTML(teamMembers)
                            //console.log(employCards)

                            //const newParam = JSON.stringify(teamMembers)
                            //const htmlPage = prompts(employCards)
                            fs.writeFile('index.html', employCards, (err) =>
                                err ? console.log(err) : console.log('Successfully created index.html!')
                            )
                        }
                    })
            }
            // if (data.role === 'Done'){
            //     //console.log(teamMembers)

            //     // const employCards = generateHTML(teamMembers)
            //     // //console.log(employCards)

            //     // //const newParam = JSON.stringify(teamMembers)
            //     // const htmlPage = prompts(employCards)
            //     // fs.writeFile('index.html', htmlPage, (err) =>
            //     //     err ? console.log(err) : console.log('Successfully created index.html!')
            //     // )
            // }
        })
}

askManager()

// .then(teamMembers =>{
//     //console.log(generateHTML(teamMembers))
//     return generateHTML(teamMembers)
// })
// .then(htmlPage => {
//     //const employCards = generateHTML(teamMembers)
//     //const htmlPage = prompts(employCards)
//     return fs.writeFile('index.html', htmlPage, (err) => 
//     err ? console.log(err) : console.log('Successfully created index.html!'))
// })




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