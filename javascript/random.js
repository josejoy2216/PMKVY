
random = Math.random()*100+1
random = Math.floor(random)
let count = 0

guess = prompt("Enter your guess")
console.log(random)

while(true){
    console.log(random)
    if(guess == random){
        alert(`your won ${count}`)
        break
    }else if(guess > random){
        count++
        guess = prompt(`Go lower`)
    }else{
        count++
        guess = prompt(`Go higer`)
    }
}
