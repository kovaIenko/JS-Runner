/**
 * Created by admin on 06.04.2017.
 */


const HEIGTH_PERSON=70;
const HEIGTH_GROUND=122;
const  COUNT=50;
const HEIGTH_BLOCK=15;
const WIDTH_BLOCK=40;
const HEIGHT_SCREEN = 500;
const WIDTH_SCREEN = 800;


var platforms; // група об'єктів, на яких Персонаж буде пригати
var player;

var pause_label;
var sounds;
var loopCount = 0;
var block;
var abscis =10;
var bullets;
var current=0; //змінна дл отриманн, поточного значення блоку


var pattern=['tile3','tile4','tile5']; //масив шаблонів ступенів
var sizePattern=[3*WIDTH_BLOCK,4*WIDTH_BLOCK,5*WIDTH_BLOCK];

var playState = {
    create: function () {
//Фізика
       game.physics.startSystem(Phaser.Physics.ARCADE);

       // game.physics.startSystem(Phaser.Physics.P2JS);
     //   game.physics.p2.restitution = 0.9;
      var land = game.add.sprite(0, 0, 'background');
        game.physics.arcade.enable(land); //фізика для персонажа
        land.enableBody = true;
        land.body.gravity.x=30;
        game.camera.x+= 30;
        game.world.setBounds(0,0, 50000000000000000, 490);
       // music = game.add.audio('music');

        sounds = [music];

        game.sound.setDecodedCallback(sounds, start, this);


        // Створюємо групу для бордюрів, на які Персонаж буде пригати
        platforms = game.add.group();
        platforms.enableBody = true;  //фізика для цієї групи
        game.physics.enable(platforms, Phaser.Physics.ARCADE);




        player = game.add.sprite(WIDTH_SCREEN*0.4,game.world.height/2, 'person');
        game.physics.arcade.enable(player); //фізика для персонажа


        // animation
        player.animations.add('run');
       // player.animations.add('stop', [0004], 20, true);
        player.animations.play('run', 80, true);
        player.scale.setTo(0.3);
        player.enableBody = true;  //фізика для цієї групи
        player.body.gravity.y = 1500;
        player.body.gravity.x =15;
        //player.body.gravity.x+=0.3;
        player.anchor.setTo(0.5, 1);
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
       // game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
        //game.camera.focusOnXY(0, 0);



        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);


        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(100, 'bullet');
       bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
      //  bullets.setAll('outOfBoundsKill', true);
      //  bullets.setAll('checkWorldBounds', true);

        cursors = game.input.keyboard.createCursorKeys();



        // Меню паузи
        pause_label = game.add.text(WIDTH_SCREEN - 100, 20, 'Pause', {font: '24px Arial', fill: '#fff'});
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
            game.paused = true;
            resume = game.add.button(100, 50, 'resume', actionOnClick, this, 2, 1, 0);
            restart = game.add.button(-80, 50, 'restart', actionOnClick, this, 2, 1, 0);
            exit = game.add.button(160, 200, 'exit', actionOnClick, this, 2, 1, 0);
            exit.onInputDown.add(backToTheMenu,this);
        });

        function actionOnClick() {
            // Unpause the game
            game.paused = false;
        }

        game.input.onDown.add(unpause, self);
        function unpause(event) {
            if (game.paused) {
                // Calculate the corners of the menu
                var x1 = game.world.centerX - 95, x2 = game.world.centerX - 40,
                    y1 = 400, y2 = 500;

                // button.onInputOver.add(over, this);
                // Check if the click was inside the menu
                if (event.x > 100 && event.x < 292 && event.y > 50 && event.y < 125) {
                    resume.destroy();
                    restart.destroy();
                    exit.destroy();
                    game.paused = false;
                }
                if (event.x > 120 && event.x < 312 && event.y > 125 && event.y < 200) {
                    restartTheGame();
                }
                if (event.x > 150 && event.x < 342 && event.y > 200 && event.y < 275) {
                    music.destroy();
                    game.paused = false;
                    game.state.start("load");
                }
            }
        }

    },





    update: function () {
        game.physics.arcade.collide(player, platforms);
        toManage();
        insertBlock();
        count++;



    }
}

  var  bullet;
   var bulletTime=0;
function fireBullet() {


    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.x=50;
            bulletTime = game.time.now + 200;
        }
    }


    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.

        //  Grab the first bullet we can from the pool

            bullet = game.add.sprite(player.body.x+25, player.body.y+20, 'bullet');
    bullet.scale.setTo(0.06);
    game.physics.arcade.enable(bullet);
    bullet.enableBody = true;  //фізика для цієї групи
   bullet.body.gravity.x = 300;
    console.log(total);







    }

var createdBlocks=[];
function  generateBlock(space) {
    if(space) {
        block = platforms.create(abscis, 25 * HEIGTH_BLOCK, select(0));
        //block.body.velocity.x = -220;
        block.scale.setTo(0.5);
        block.body.immovable = true;
        createdBlocks.push(block);
        checkingThereIsOnScrean();
    }
    abscis+=3*WIDTH_BLOCK;
}


function select(rgen) {
    return pattern[rgen];

}


function checkingThereIsOnScrean() {
    if(createdBlocks[0].body.x+150<0)
        createdBlocks.shift().destroy();
}

function insertBlock() {
    if(count%5==0&&count%60==0&&count!=0){
        generateBlock(false);
       // return ;
        count++;
    }

    if(count%5==0)
        generateBlock(true);
}

var count=0;

function start() {
    sounds.shift();
    music.loopFull(0.6);
    music.onLoop.add(hasLooped, this);
}

function hasLooped(sound) {

    loopCount++;

    if (loopCount === 1)
    {
        sounds.shift();
        music.loopFull();
    }
    else if (loopCount >= 2)
    {
        current.stop();
        current = game.rnd.pick(sounds);
        current.loopFull();
    }


}

function restartTheGame() {
    player.destroy();
    platforms.destroy();
    resume.destroy();
    restart.destroy();
    exit.destroy();
    // back.destroy();
    music.destroy();
    //create();
    soundOFF = false;
    game.paused = false;
    game.state.start('play');
}

function backToTheMenu() {
    game.state.start('menu');
}


function render() {
    game.debug.soundInfo(music, 20, 32);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  var fireButton;
var jumpButton;
function toManage() {
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = game.input.keyboard.createCursorKeys();

    if(fireButton.onUp.isDown) {
        fireBullet();
    }
   // player.body.setZeroVelocity();

  /*  if (cursors.left.isDown)
    {
        player.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(200);
    }
*/
    if (cursors.up.isDown&&player.body.touching.down)
    {
        player.body.velocity.y-=500;
        player.body.velocity.x+=5;
       // player.body.setZeroVelocity();
    }
  /*  else if (cursors.down.isDown)
    {
        player.body.moveDown(200);
    }

    if (cursors.right.isDown && player.body.touching.down)
    {

        player.body.velocity.x =+10;

    }
    if (cursors.left.isDown && player.body.touching.down)
    {

        player.body.velocity.x =+10;
    }*/
}

function rigthRandom(rgen)
{

    while(rgen==current_rgen) {
        rgen = getRandomInt(0, 2);
    }
    return rgen;

}

