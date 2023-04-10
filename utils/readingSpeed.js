

const pages = 0

function slowReading(){
    let minutes = pages / 3.3
    let hours = minutes / 60
    let totalTime = Math.floor(hours * 100) / 100 
}


function avgReading(){
    let minutes = pages / 1.7
    let hours = minutes / 60
    let totalTime = Math.floor(hours * 100) / 100 
}

function fastReading(){
    let minutes = pages / .83
    let hours = minutes / 60
    let totalTime = Math.floor(hours * 100) / 100 
}