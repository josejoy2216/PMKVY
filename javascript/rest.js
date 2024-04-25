

sum = function(...num){
    ans = 0
    for(let n of num){
        ans += n
    }
    console.log(ans)
}

sum(1,2)
sum(55,67,2,34,54)


mul = function(...num1){
    ans = num1.reduce(myFunc)   
    console.log(ans)
}

mul(0,3,4,5)

function myFunc(total, num) {
    return total * num;
  }


