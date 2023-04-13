var convert = require('convert-seconds');


const timeDown = (hours, mins, secs) => {
    let timeSecs = hours * 3600 + mins * 60 + secs
    console.log(convert(timeSecs))
    setInterval(() => {
        timeSecs--
        console.log(convent(timeSecs))
    },1000);
}


// timeDown(0, 0, 5) test