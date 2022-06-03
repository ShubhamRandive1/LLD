
// LLD: Low Level Design
//Parking Lot system


class Vehicle{
    constructor(type,regNumber,color){
        this._type = type;
        this._regNumber = regNumber;
        this._color = color;

    }

    get type(){
        return this._type;
    }

    set type(value){
        this._type = value;
    }
}

//let v1 = new Vehicle('car','Hj-2147','Black')

//console.log(v1)



// Car
class Car extends Vehicle{

    constructor(regNumber,color){
        super('car',regNumber,color)
    }

}

//let c1 = new Car('HJ-2147','Black')

//console.log(c1)

//Bike
class Bike extends Vehicle{

constructor(regNumber,color){
    super('Bike',regNumber,color)
}

}

//let b1 = new Bike('HJ-2147','Black-White')

//console.log(b1)


//Truck
class Truck extends Vehicle{

constructor(regNumber,color){
    super('Truck',regNumber,color)
}

}


//let t1 = new Truck('HJ-2147','Blue')

//console.log(t1)

//**

//parking spoots

class Slot{
    constructor(type,number){
        this.number = number;
        this.type = type;
        this._isBooked = false;
    }


    get isBooked(){
        return this._isBooked;
    }

    set isBooked(value){
        this._isBooked = value;
    }
}

//let s1 = new Slot('Bike', 0);

//s1.isBooked = true;

//console.log(s1.isBooked)

//no need to invoke, isBooked() no need

//Individual floor

class ParkingFloor{

    constructor(floorNumber,maxSpots){
        this.floorNumber = floorNumber;
        this._parkingSpots = [];

        for(let i=0;i<maxSpots;i++)
        {
            if(i === 0)
            {
                this._parkingSpots.push(new Slot('Car', i));
                //push the the slot
            }
            else if(i === 1)
            {
                this._parkingSpots.push(new Slot('Bike', i));
                //push the Slots
            }
            else
            {
                this._parkingSpots.push(new Slot('Truck', i));
                // push the slot
            }
        }
    }

    get parkingSpots(){
        return this._parkingSpots;
    }

    set parkingSpots(value){
        this._parkingSpots = value;
    }

}

//let p1 = new ParkingFloor(0,3)

//console.log(p1)


//parking lot

class ParkingLot{
    constructor(number){
        this._floors = []
        this._numberOfFloors = number;

        for(let i=0;i<number;i++)
        {
            this._floors.push(new ParkingFloor(i,3));
        }
    }

    get numberOfFloors(){
        return this._numberOfFloors;
    }

    get floors(){
        return this._floors;
    }

    //parking

    parkVehicle(vehicle)
    {
        let slot = this.findSlot(vehicle.type);

        if(slot)
        {
            this.bookSlot(slot);
            let ticket = new Ticket(slot.floorNumber, slot.slot.number)

            console.log('Ticket is issued',ticket)

        }
        else
        {
            console.log('No Slots')
            return false;
        }
    }

    findSlot(type)
    {
        for(let i=0;i<this._numberOfFloors;i++)//check which slot is empty to park
        {
            for(let slot of this._floors[i]._parkingSpots)
            {
                if((slot.type == type) && (!slot._isBooked))
                {
                    return {floorNumber: i, slot: slot};//floor number and complete slot
                }
            }
        }

        return false;
    }

    bookSlot(slot)
    {
        slot.slot.isBooked = true;
        console.log('Slot is Booked')//now isBooked slot will be true from earlier and as we did get method no need for psyphon
        return true;
    }

}

//let pl1 = new ParkingLot(3);

//console.log(pl1);

//Ticket Counter

class Ticket{
    constructor(floorNumber,slotNumber){
        this.floorNumber = floorNumber;
        this.slotNumber = slotNumber;
        this.issuedAt = new Date();
    }
}

//let t1 = new Ticket(1,1)

//console.log(t1)


let b1 = new Bike('Dl-1234', 'Black');

let pl1 = new ParkingLot(3)

pl1.parkVehicle(b1)