(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();


const canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  player = {
    x: canvas.width / 2,
    y: canvas.height - 5,
    width: 10,
    height: 10,
    speed: 3,
    velX: 0,
    velY: 0
  },
  keys = [],
  friction = 0.8,
  gravity = 0.1;

function update(e){
  if(keys[38] || keys[32]){
    if(!player.jumping){
      player.jumping = true;
      player.velY = -player.speed*2;
    }
  }
  if(keys[39]){
    // right arrow
    if(player.velX < player.speed){
      player.velX++;
    }
    player.x += player.velX;
  }
  if(keys[37]){
    // left arrow
    if(player.velX > -player.speed){
      player.velX--;
    }
  }


  player.velX *= friction;
  // player.velY *= friction;

  player.velY += gravity;

  // player.x += player.velX;
  // player.y += player.velY;

  if(player.x >= canvas.width - player.width){
    player.x = canvas.width - player.width;
  } else if (player.x <= 0){
    player.x = 0;
  }

  if(player.y >= canvas.height-player.height){
        player.y = canvas.height - player.height;
        player.jumping = false;
    }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.height, player.width);
  requestAnimationFrame(update);
}


window.addEventListener('load', function(){
  update();
});
window.addEventListener('keydown', function(e){
  e.preventDefault();
  keys[e.keyCode] = true;
});
window.addEventListener('keyup', function(e){
  e.preventDefault();
  keys[e.keycode] = false;
});
