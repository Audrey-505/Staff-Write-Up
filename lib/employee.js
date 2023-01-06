
class Employee {
    constructor(name, id, email){
        this.name = name
        this.id = id 
        this.email = email 
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
       // needs to return employee 
       return 'Employee'
    }
}

// const ted = new Employee('Ted', 12, 'ted@aol.com')
// ted.getName()
// ted.getId()
// ted.getEmail()
// ted.getRole()

module.exports = Employee;