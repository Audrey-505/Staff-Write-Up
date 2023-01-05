const Employee = require('./employee')

class Manager extends Employee {
    constructor(officeNumber){
        const name = 'Mandy'
        const id = 11
        const email = 'mandy@aol.com'

        super(name, id, email)
        this.officeNumber = officeNumber
    }
    getOfficeNumber(){
        console.log(`office number is: ${this.officeNumber}`)
    }
    getRole(){
        //override the employee class getRole with Engineer class
    }
}

// const mandy = new Manager(4049056798)
// mandy.getOfficeNumber()
// mandy.getEmail()

module.exports = Manager;