const Employee = require('./employee')

class Manager extends Employee {
    constructor(name, id, email, officeNumber){

        super(name, id, email)
        this.officeNumber = officeNumber
    }
    getOfficeNumber(){
        return this.officeNumber
    }
    getRole(){
        return 'Manager'
    }
}

// const mandy = new Manager(4049056798)
// mandy.getOfficeNumber()
// mandy.getEmail()

module.exports = Manager;