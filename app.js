let baseFreq = 50;
let scale = 0.33; // Image scale (I work on 1080p monitor)
let fps = 30;
let MAX_SPEED = 10;

let canvas;
let ctx;
let time;

let dvd = {
    x: 200,
    y: 300,
    width: 640,
    height: 480,
    xspeed: 10,
    yspeed: 10,
    video: document.getElementById('video')
};

function main(){
    document.getElementById('btn').style.display = 'none';
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");

    //Draw the "tv screen"
    canvas.width  = window.innerWidth - 1;
    canvas.height = window.innerHeight - 1;

    dvd.x = Math.abs(Math.floor(Math.random() * canvas.width) - 256);
    dvd.y = Math.abs(Math.floor(Math.random() * canvas.height) - 256);
    dvd.xspeed = (Math.random() * (MAX_SPEED * 2)) - MAX_SPEED;
    dvd.yspeed = (Math.random() * (MAX_SPEED * 2)) - MAX_SPEED;

    let d = Math.sqrt(Math.pow(dvd.xspeed, 2) + Math.pow(dvd.yspeed, 2));
    time = (d / (MAX_SPEED * 1.5)) * baseFreq;
    console.log(time);

    

    updateScreen();
    updateLocation();
};

function updateScreen() {
    setInterval(() => {

        ctx.drawImage(dvd.video, dvd.x, dvd.y, dvd.width*scale, dvd.height*scale);
    }, 1000 / fps)
}

function updateLocation() {
    setInterval(() => {

        let oldx = dvd.x;
        let oldy = dvd.y;
        dvd.x+=dvd.xspeed;
        dvd.y+=dvd.yspeed;

        ctx.fillStyle = 'white';
        let xsp = Math.abs(dvd.xspeed)
        let ysp = Math.abs(dvd.yspeed)
        ctx.fillRect(oldx - xsp, oldy - ysp, dvd.width*scale + 2 * xsp, dvd.height*scale + 2 * ysp);
        ctx.drawImage(dvd.video, dvd.x, dvd.y, dvd.width*scale, dvd.height*scale);

        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        ctx.fillText("сајт у изради!", canvas.width / 2, canvas.height / 2);

        checkHitBox(); 
    }, time)
}

//Check for border collision
function checkHitBox(){
    if(dvd.x+dvd.width*scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
    }
        
    if(dvd.y+dvd.height*scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
    }    
}

onresize = (event) => {
    canvas.width  = window.innerWidth - 1;
    canvas.height = window.innerHeight - 1;
};
