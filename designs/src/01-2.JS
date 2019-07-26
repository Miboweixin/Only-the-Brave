//停车场
class Park{
    constructor(floors){
        this.floors = floors;
        this.camera = new Camera();
        this.screen = new Screen();
        this.carList = {};
    }
    emptyNum(){
        return this.floors.map(floor=>{
            var floorEmptyNum = floor.emptyPlaceNum();
            return `第${floor["index"]}层，有空位${floorEmptyNum}`
        }).join('\n')
    }
    in(car){
        let info = this.camera.shot(car);
        let i = parseInt(Math.random()*100%100);
        let place = this.floors[0].places[i];
        place.in();
        info.place = place;
        this.carList[car.number] = info;
    }
    out(car){
        // 获取信息
        const info = this.carList[car.number]
        const place = info.place
        place.out()

        // 显示时间
        this.screen.show(car, info.inTime)

        // 删除信息存储
        delete this.carList[car.number]
    }
}

class Floor{
    constructor(index,places){
        this.index = index;
        this.places = places;
    }
    emptyPlaceNum(){
        let emptyNum = 0;
        for(var i = 0;i<this.places.length;i++){
            let place = this.places[i];
            if(place["empty"]){//是否空闲
                emptyNum++;
            }
        }
        return emptyNum;
    }
}

class Place{
    constructor(){
        this.empty = true;
    }
    in(){
        this.empty = false;
    }
    out(){
        this.empty = true;
    }
}

class Car{
    constructor(number){
        this.number = number;
    }
}

class Camera{
    shot(car){
        let number = car.number;
        let obj = {
            num:number,
            inTime:Date.now()
        }
        return obj;
    }
}

class Screen{
    show(car, inTime) {
        console.log('车牌号', car.number)
        console.log('停车时间', Date.now() - inTime)
    }   
}

// 测试代码------------------------------
// 初始化停车场
const floors = []
for (let i = 0; i < 3; i++) {
    const places = []
    for (let j = 0; j < 100; j++) {
        places[j] = new Place()
    }
    floors[i] = new Floor(i + 1, places)
}
const park = new Park(floors)

// 初始化车辆
const car1 = new Car('A1')
const car2 = new Car('A2')
const car3 = new Car('A3')

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)

console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)