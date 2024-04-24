function hello(){
    console.log("hello world")
}

hello()

function add(a , b){
    console.log(a+b)
}
add(12 ,15)

function sub( a , b){
    return a-b
}
s = sub(12, 5)
console.log(s)


let fac = 1
function fact( n ){
    for(let i = 1 ; i <=n ; i++){
        fac = fac * i
    }
    return fac
}

console.log(fact(5))


a1 = [1,2,3,"oreo"]
console.log(a1[3])

for(let i = 0 ; i <  a1.length ; i++ ){
    console.log(a1[i])
}

let student = ["john", "joe" , "james" , "jack" , "Jose" , "roy" , "raj"]
// for(let i = 0 ; i <  student.length ; i++ ){
//     console.log( student[i])
// }

student.forEach( function(stud){
    console.log( stud)
})

console.log( "----------------------------------------------------------")
let num = [1,2,3,4,5,6,7,8,9]

num.forEach(function(n){
    console.log(n)
})

console.log( "----------------------------------------------------------")
num.forEach(n=> console.log(n))

console.log( "----------------------------------------------------------")
let newStudent = student.filter(stud=>stud.length> 3)
console.log(newStudent)

console.log( "----------------------------------------------------------")
let newStudent1 = student.map(s=>s.toUpperCase())
console.log(newStudent1)

console.log( "----------------------------------------------------------")

// newnum = num.reduce(    )


console.log( "------------------Spead operator-------------------------------")
n1=[1,2,3,4,5]
n2=[6,7,8,9]
n1=[...n1,...n2]
console.log(n1)

console.log( "----------------------------------------------------------")

console.log( "----------------------------------------------------------")

