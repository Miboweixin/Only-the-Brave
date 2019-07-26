class Person {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    eat(){
        alert(`${this.name} eat something`);
    }

    speak(){
        alert(`my name is ${this.name},age ${this.age}`)
    }
}

class Student extends Person{
    constructor(name,age,number){
        super(name,age);
        this.number = number;
    }

    study(){
        alert(`${this.name} 正在学习，他的学号是${this.number}`)
    }
}
var p = new Student('zjh',28,'A1');
p.eat();
p.speak();
p.study();
alert(p.number)

module.exports = {"a":43}