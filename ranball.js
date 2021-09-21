

// Global variables
const area = document.getElementById('area'); //This is the area where the balls will be moved. Its properties are in CSS file
const areaStyle = getComputedStyle(area); // This is used to get the CSS style property which otherwise can't be obtained from CSS filevar ballCount = 10; // Give the required balls to run 
var ballArray = []; // This created the array which stores each ball properties as an object
var timeoutId;

// It creates a ball the random color and position supplied.
function createball(color,left,top)
{
    var ball = document.createElement('div');
    ball.style.background = color;
    ball.style.position = 'absolute';
    ball.style.left = left+'px';
    ball.style.top = top+'px';
    ball.style.width = '25px';  // Change ball size
    ball.style.height = '25px'; // both width and height must be same
    ball.style.borderRadius = '50%'; // This is to create the round shape of the ball (soft edge)
    area.appendChild(ball); // This will add the ball in the area defined in HTML page
    ball.dx = 5; // distance to be moved per timeperiod in x axis
    ball.dy = 4; //distance to be moved per timeperiod in y axis
    return ball;
}

// When the ball has to change its direction . 
function changeBallDirectionUponEdge(ball,x,y){
    var finalWidth = parseInt(areaStyle.width)-parseInt(ball.style.width) // ParseInt helps to trucnk the unneccessary strings and give the
    var finalHeight = parseInt(areaStyle.height)-parseInt(ball.style.height) //numerical part of the string passed
    // console.log(finalWidth,finalHeight);
    if (x < 0 || x > finalWidth) {
        ball.dx = -ball.dx;
        console.log(ball.dx);
    }
    if (y < 0 || y > finalHeight) {
        ball.dy = -ball.dy;
        console.log(ball.dy);
    }
}

// It moves the ball to the given location
function moveTo(ball, x, y) {
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
}

//To move ball after every 1000/60 ms
function update(ball, x, y) {
    moveTo(ball,x,y);
    timeoutId = window.setTimeout(function () {
                changeBallDirectionUponEdge(ball, x, y);
                update(ball, x + ball.dx, y + ball.dy);
                }, 1000/60);
    console.log("timeout:"+timeoutId);
}

// It clears all the timerID's that are created from the last to first by -- till it reaches 0 where the condition not met and it will comeout.
// Finally it will reload the page.
function clear(){  
    console.log("Inside Clear")
    while (timeoutId--) {
        window.clearTimeout(timeoutId);
        console.log("clearing "+ timeoutId)
    }   
    location.reload();    
}

//creates and moves array of balls
function start(){
    ballCount = document.getElementById("ballcount").value; //get ball count from input form from HTML
    for (let i=0; i< ballCount; i++){
        const ballColor = "#"+ (Math.floor(Math.random()*16777215).toString(16));
        const x = Math.floor(Math.random()*550);
        const y = Math.floor(Math.random()*350);
        console.log(ballColor,x,y); //check
        ballArray[i] = createball(ballColor,x,y);
        update(ballArray[i],x,y)
    }
}

//Its another way to call a function on certain event happens on the DOM element and it always works.
document.querySelector('.clearbtn').addEventListener('click',clear);







