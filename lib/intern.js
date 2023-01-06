const Employee = require('./employee')

class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email)
        this.school = school
    }
    getSchool(){
       return this.school
    }
    getRole(){
        return 'Intern'
    }
}

// const rob = new Intern('GT')
// rob.getSchool()
// rob.getId()

module.exports = Intern;