class Car{
    constructor(number,name,price){
        this.number = number;
        this.name = name;
        this.price = price;
    }
}
class kuaiCar extends Car{
    constructor(number,name,price){
        super(number,name,price);
        // this.price = price;
    }
}

class zhuaiCar extends Car{
    constructor(number,name,price){
        super(number,name,price);
        // this.price = price;
    }
}

class Trip{
    constructor(car){
        this.car = car;
    }
    start(){
        alert(`这辆叫${this.car.name},车牌号${this.car.number}`);
    }
    end(){
        alert(`花了${this.car.price*5}`)
    }
}

var kuai = new kuaiCar(23,"宝马",1);
let trip = new Trip(kuai);
trip.start();
trip.end();