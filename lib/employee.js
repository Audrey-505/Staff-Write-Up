
class Employee {
    constructor(name, id, email){
        this.name = name
        this.id = id 
        this.email = email 
    }
    getName(){
        console.log(`name is: ${this.name}`)
    }
    getId(){
        console.log(`id is: ${this.id}`)
    }
    getEmail(){
        console.log(`email is: ${this.email}`)
    }
    getRole(){
       // needs to return employee 
       console.log(`role is: ${constructor.name}`)
    }
}

// const ted = new Employee('Ted', 12, 'ted@aol.com')
// ted.getName()
// ted.getId()
// ted.getEmail()
// ted.getRole()

module.exports = Employee;