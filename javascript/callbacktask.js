
function wakeup(callback){
    setTimeout(function(){
        console.log("wake up")
        callback()
    },5000)
}

function brushteeth(callback){
    setTimeout(function(){
        console.log("brush teeth")
        callback()
    },3000)
}

function walkdog(callback){
    setTimeout(function(){
        console.log("walk dog")
        callback()
    },1000)
}

function breakfast(callback){
    setTimeout(function(){
        console.log("break fast")
        callback()
    },2000)
}

function gocollege(callback){
    setTimeout(function(){
        console.log("go college")
        callback()
    },1000)
}

function startday(){
    wakeup(()=>{
        brushteeth(()=>{
            walkdog(()=>{
                breakfast(()=>{
                    gocollege(()=>{
                        console.log("done for the day")
                    })
                })
            })
        })
    })
}


startday()
