let oreo = {
    firstname: "oreo",
    age: 10,
    hobbies: ["music" , "drawing"],
    address:{
        city: "Mumbai",
        country: "India"
    },
    getbirthyear: function(){
        return 2024 - this.age
    }
}

console.log(oreo)
console.log(oreo.age)
console.log(oreo.getbirthyear())


let car1 = {
    brand: "toyoto",
    getbrand: function (){
        return `you drive: ${this.brand} `
    }
}

let car2 = {
    brand: "BMW",
    getbrand: function (){
        return `you drive: ${this.brand} `
    }
}


console.log(car1.getbrand())