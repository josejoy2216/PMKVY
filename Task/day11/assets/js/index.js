title = "hi "
description = " hello"

document.getElementById("addBtn").onclick = function (){
    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
   
    console.log(title+ " " + description )
    document.getElementById('dtitle').value = title;
    document.getElementById('ddesp').value = description;

    // clear after adding data 
    document.getElementById('title').value = " ";
    document.getElementById('description').value = " ";
}

document.getElementById("clrBtn").onclick = function (){
    console.log(title+ " " + description )
    document.getElementById('title').value = " ";
    document.getElementById('description').value = " ";
}



document.getElementById("edtBtn").onclick = function (){
    title = document.getElementById('dtitle').value;
    description = document.getElementById('ddesp').value;
   
    console.log(title+ " " + description )
    document.getElementById('dtitle').value = title;
    document.getElementById('ddesp').value = description;
}

document.getElementById("deleteBtn").onclick = function (){
    title = document.getElementById('dtitle').value;
    description = document.getElementById('ddesp').value;
   
    console.log(title+ " " + description )
    document.getElementById('dtitle').value = " ";
    document.getElementById('ddesp').value = " ";
}

document.getElementById("deleteBtn1").onclick = function (){
    title = document.getElementById('dtitle').value;
    description = document.getElementById('ddesp').value;
   
    console.log(title+ " " + description )
    document.getElementById('dtitle1').value = " ";
    document.getElementById('ddesp1').value = " ";
}


