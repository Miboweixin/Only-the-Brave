// alert('4344')
class Person {
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}
var p = new Person('zjh');
alert(p.getName())