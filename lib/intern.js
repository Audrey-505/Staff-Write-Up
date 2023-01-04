const Employee = require('./employee')

class Intern extends Employee{
    constructor(school){
        const name = 'Rob'
        const id = 13
        const email = 'rob@aol.com'

        super(name, id, email)
        this.school = school
    }
    getSchool(){
        console.log(`school is: ${this.school}`)
    }
    getRole(){
        //override the employee class getRole with Engineer class
    }
}

// const rob = new Intern('GT')
// rob.getSchool()
// rob.getId()