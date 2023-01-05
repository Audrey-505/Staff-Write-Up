const Employee = require('./employee')

class Engineer extends Employee {
    constructor(github){
        const name = 'Mike'
        const id = 14
        const email = 'mike@aol.com'

        super(name, id, email)
        this.github = github
    }
    getGithub(){
        console.log(`GitHub username: ${this.github}`)
    }
    getRole(){
        //override the employee class getRole with Engineer class
    }
}

// const mike = new Engineer('stanmanga79')
// mike.getGithub()
// the line below proves we have access to previous methods 
// mike.getName()

module.exports = Engineer;