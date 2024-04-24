console.log("hello world")

//Operators
//arithmetic operator
// + - * / % 

a = 10 
b = 30 
console.log(a+b)
console.log(a-b)
console.log(a*b)
console.log(a/b)
console.log(a%b)



//assignment operator
// = += -= *= /= %=
console.log("-----------assignment operator--------------")
num = 10 
num += 20
console.log(num)
num -=20
console.log(num)
num *= 5
console.log(num)
num /=5 
console.log(num)
num %= 2
console.log(num)



// Logical operator 


//comperition 
console.log("-------------compairesion------------")
a = 10 
b = 20
c = "010"
console.log(a==b)
console.log(a===b)
console.log(a==c)
console.log(a===c)

console.log("-------------------------")
console.log(a <= b)
console.log(a >= b)
console.log(a == b)


//conditions
// if else
// ladder if else
// nested if else  
// switch case 

console.log("--------------conditions-----------")
x = 121 
if(x % 2 == 0){
    console.log("even")
}
else{
    console.log("false")
}
console.log("-------------conditions-if-else----------")
let marks = 80 
if(marks > 90){
    console.log("A+")
}else if( 80 < marks < 90){
    console.log("A")
}else if( 70 < marks < 80){
    console.log("B+")
}else if( 60 < marks < 70){
    console.log("B")
}else if( 50 < marks < 60){
    console.log("C")
}else{
    console.log("Fail")
}
console.log("-----------switch-case-------------")

let n = 4 

switch( n){
    case 1: 
        console.log("MONDAY")
        break
    case 2:
        console.log("TUESDAY")
        break
    case 3:
        console.log("WEDNESDAY")
        break
    case 4:
        console.log("THURSDAY")
        break
    case 5: 
        console.log("FRIDAY")
        break
    case 6:
        console.log("SATURDAY")
        break
    case 7:
        console.log("SUNDAY")
        break
} 

console.log("-------------data type------------")
//data type
p = 10 
q = 20 
console.log(typeof p )
console.log(p+ q)

o = "abc"
console.log(typeof o )
console.log(p+ o)

 a = 10 
 b = 5 
 c = 20
 if(a > b && a > c){
    console.log(a)
 }else if ( b > a && b > c){
    console.log(b)
 }else{
    console.log(c)
 }

 

 // loops
 //for
 //while
 //do while
 console.log("------------for-----------")
 for(let i = 1 ; i <=10 ; i++){
    console.log(i)
 }

 console.log("------------while----------")
 let i = 1
 while(i <=10 ){
    console.log(i)
    i++
 }

 console.log("----------do--while----------")
 let j = 11
 do{
    console.log(j)
    j++
 } while(j <=10 )
