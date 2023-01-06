const Employee = require('./employee')

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email)
        this.github = github
    }
    getGithub(){
        return this.github
    }
    getRole(){
        return 'Engineer'
    }
}

// const mike = new Engineer('stanmanga79')
// mike.getGithub()
// the line below proves we have access to previous methods 
// mike.getName()

module.exports = Engineer;