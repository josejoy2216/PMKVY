hello(bye)

function hello(callback){
    setTimeout(function(){
        console.log("hello")
        callback()
    },5000)
}

function bye(){
    console.log("bye")
}