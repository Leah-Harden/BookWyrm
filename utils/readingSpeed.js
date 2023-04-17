
var convert = require('convert-seconds');

function slowReading(pages){
    let minutes = pages / 3.3;
    let seconds = minutes * 60;
    console.log(convert(seconds));
}


function avgReading(pages){
    let minutes = pages / 1.7
    let seconds = minutes * 60;
    console.log(convert(seconds))
}

function fastReading(pages){
    let minutes = pages / .83
    let seconds = minutes * 60;
    console.log(convert(seconds))
}