const inquirer = require('inquirer')
const fs = require('fs')

const prompts = ({name, id, email}) =>
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

inquirer([
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
])

.then((data) => {
    const htmlPage = prompts(data)
    fs.writeFile('index.html', htmlPage, (err) =>
    err ? console.log(err) : console.log('Successfully created index.html!')
    )
})