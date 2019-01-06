
var array = [];
var board = document.getElementById("gameboard");
//1517 being one less than the board width
var y_loc = 0;
var player = {x_loc:100,y_loc:325,width:30,height:75,v_y:0,a_y:0};
var dt = 0;
var interval=null;
var speed = 5;
var distance = 0;
drawPlayer();

function mainLoop() {
    if( interval === null )  {
        distance = 0;
        reset();
        drawBackground();
        

        document.getElementById("p1").innerHTML = "Alive!";
        var dt = 0.10;
        interval = setInterval( function() {
                                    requestGameFrame(dt);
                                }, dt);
    }
}

function drawBackground()   {
    var ctx = board.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "white";
    
    //for player testing
    //ctx.fillStyle = "rgb(218,207,182)";
    
    ctx.fillRect(0,0,board.width,board.height);
    ctx.stroke();
}


//Updates gameboard with respect to passing of time
function requestGameFrame(t)    {
    document.onkeydown = checkKey;
    // Recieves user button-down input
    function checkKey(e)    {
        e = e || window.event;

        if (e.keyCode == '38') {
            userJump(e);
        }
        else if (e.keyCode == '40') {
            userCrouch(e);
        }
    }
    dt = t;
    //Draw Player Function with dynamic positioning
    //Advance Obstacles
    //Maintain queue of Passable Scary Zones
    //Allow future development of time step to be based on real time
    drawBackground();
    printScore();
    if(highScore)   {
        printHighScore();
    }
    distance += speed;
    
    updatePlayer();
    updateObstacles();
    
    playerDead();
}
function printScore()   {
    var ctx = board.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(distance, 10, 50); 
    ctx.stroke();

}
var highScore;
function printHighScore()   {
    var ctx = board.getContext("2d");
    ctx.font = "15px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("high score: ".concat(highScore.toString()),10,75);
    ctx.stroke();
}
function updateHighScore()  {
    if(highScore && distance>highScore)   {
        highScore = distance;
    }   else if(!highScore) {
        highScore = distance;
    }
    printHighScore();
}
function updatePlayer()   {
    if(player.v_y!==0 || player.y_loc<board.height-player.height)  {
        player.y_loc += -Math.round(player.v_y*dt);
        player.v_y += player.a*dt;
    }
    if(player.y_loc>=board.height-player.height+1)    {
        player.y_loc = board.height-player.height;
        player.v_y=0;
        player.a_y=0;
    }
    drawPlayer();
}
function drawPlayer()   {
    /*var canvas = document.getElementById('gameboard');
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle='black';
    ctx.fillRect(player.x_loc,player.y_loc,player.width,player.height);
    ctx.stroke();*/
    
    const ctx = board.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'black';
    //image.style.opacity = 0.7;
    //ctx.drawImage(image,player.x_loc,player.y_loc,player.width,player.height);
    ctx.fillRect(player.x_loc,player.y_loc,player.width,player.height);

    ctx.stroke();


}

function updateObstacles()  {
    throwObstacle();
    drawObstacles();
}
//generates obstacles
function throwObstacle()    {
    //x_pos,width,height
    var obstacle_1 = [0,100,50];
    var obstacle_2 = [0,50,50];
    var obstacle_3 = [0,100,100];
    var obstacle_4 = [0,50,100];
    var freq_1 = 1000;
    var freq_2 = 1750;
    var freq_3 = 3500;
    var freq_4 = 4250;
    if(distance%freq_1==0)  {
        array.push(obstacle_1);
    } 
    if (distance%freq_2==0) {
        array.push(obstacle_2);
    }
    if (distance%freq_3==0) {
        array.push(obstacle_3);
    }
    if (distance%freq_4==0) {
        array.push(obstacle_4);
    }
}
function drawObstacles() {
    var i;
    for (i=0;i<array.length;i++)    {
        var obstacle = array[i];
        var ctx = board.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(board.width-obstacle[0],board.height-obstacle[2],obstacle[1],obstacle[2]);
        ctx.stroke();
        array[i][0]+=speed;
    }
    if(board.width-array[0][0]<=-array[0][1])    {
        array.shift();
    }
}

function playerDead()   {
    var leniency = 5;
    var i;
    for (i=0;i<array.length;i++)    {
        var y_pr = player.y_loc+player.height;
        var x_pr = player.x_loc+player.width;
        var x_p = player.x_loc;

        var obstacle = array[i];
        var x_o = board.width-obstacle[0];
        var width_o = obstacle[1];
        var top_o = board.height-obstacle[2];
        //if the player hits the obstacle.
        if(y_pr>=top_o+leniency && x_pr > x_o+leniency && x_p+leniency < x_o+width_o)    {
            gameOver();
        }
    }
}

function gameOver() {
    drawBackground();
    document.getElementById("p1").innerHTML = "Dead!";
    
    drawObstacles();
    drawPlayer();
    updateHighScore();
    printScore();
    
    clearInterval(interval);
    interval = null;
}

// Checks if player is not already jumping and submits a jump request
function userJump()  {
    if(player.y_loc == board.height-player.height) {
        player.v_y = 80;
        player.a = -15;
    }   
}

function userCrouch()   {
    w = player.width;
    player.width = player.height;
    player.height = w;
    player.y_loc = player.y_loc+(player.width-player.height);
}

function reset()    {
    if(player.width>player.height)  {
        userCrouch();
        player.y_loc = board.height-player.height;
    }
    
    while (array.length>0)  {
        array.shift();
    }
    
}