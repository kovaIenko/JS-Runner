/**
 * Created by admin on 06.04.2017.
 */
var platforms; // група об'єктів, на яких Персонаж буде пригати
var player;
var score =0;
var pause_label;
var sounds;
var current;
var loopCount = 0;
var start_;
var end_;
var center_;
var Score;
var timer;
var total = 0;
var Label;
var tileSprite;
var current=0; //змінна дл отриманн, поточного значення блоку
var resume;
var restart;
var exit;


const HEIGTH_PERSON=70;
const HEIGTH_GROUND=122;
const  COUNT=50;
const HEIGTH_BLOCK=15;
const WIDTH_BLOCK=40;
const HEIGHT_SCREEN = 500;
const WIDTH_SCREEN = 800;
   var back;

var playState = {
    create: function () {
//Фізика
        game.physics.startSystem(Phaser.Physics.ARCADE);
       //  back=game.add.sprite(0, 0, 'background');
       // back.enableBody = true;
       // game.physics.arcade.enable(back);
       //  back.body.gravity.x=18;

        game.world.setBounds(0,0, 50000000000000000, 490);

        music = game.add.audio('music');

        sounds = [music];

        game.sound.setDecodedCallback(sounds, start, this);

        this.bg= this.game.add.tileSprite(0, 0, 50000000000000000, 490, 'background');
        //tileSprite of the background
        // Create a tilesprite (x, y, width, height, key)
        // Створюємо групу для бордюрів, на які Персонаж буде пригати
        platforms = game.add.group();
        platforms.physicsBodyType = Phaser.Physics.ARCADE;
        platforms.enableBody = true;  //фізика для цієї групи
        game.physics.enable(platforms, Phaser.Physics.ARCADE);


        player = game.add.sprite(300, game.world.height - HEIGTH_GROUND - HEIGTH_PERSON - 300, 'person');
        game.physics.arcade.enable(player); //фізика для персонажа

        player.enableBody = true; //фізика для цієї групи
        player.body.gravity.y = 1500;
        player.body.gravity.x =18;

          //player.body.gravity.x+=0.3;

        // animation
        player.animations.add('run');
        player.animations.play('run', 120, true);
        player.scale.setTo(0.3);

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
        game.camera.velocity= 18;
        music.volume= LevelOfSound/100;

        cursors = game.input.keyboard.createCursorKeys();
        //timer = game.time.create(false);
        Label =  game.add.text(450,20,"SCORE: ",{font:'30px Monotype Corsiva',fill:"#62C908"});
        Label.fixedToCamera = true;
        Score = game.add.text(550,10,score,{font:'50px Monotype Corsiva',fill:"#62C908"});
        Score.fixedToCamera = true;
        //  Create our Timer
        timer = game.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        timer.loop(1000, updateCounter, this);

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        timer.start();
        //updating timer
        function updateCounter() {

            total++;
            score =score + 1;
        }

        // Меню паузи
        pause_label = game.add.text(WIDTH_SCREEN - 150, 10, 'Pause', {font:'40px Monotype Corsiva',fill:"#62C908"});
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
            game.paused = true;
            resume = game.add.button(game.camera.x + 100, 50, 'resume', actionOnClick, this, 2, 1, 0);
            resume.fixedToCamera = true;
            restart = game.add.button(game.camera.x-80, 50, 'restart', actionOnClick, this, 2, 1, 0);
            restart.fixedToCamera = true;
            exit = game.add.button(game.camera.x+160, 200, 'exit', actionOnClick, this, 2, 1, 0);
            exit.fixedToCamera = true;
            exit.onInputDown.add(backToTheMenu,this);
        });

        function actionOnClick() {
            // Unpause the game
            game.paused = false;
        }

        game.input.onDown.add(unpause, self);
        function unpause(event) {
            if (game.paused) {
                // // Calculate the corners of the menu
                var x1 = game.world.centerX - 95, x2 = game.world.centerX - 40,
                    y1 = 400, y2 = 500;
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
                    console.log("ldsjf");
                    music.destroy();
                    score = 0;
                    createdBlocks=[];
                    game.paused = false;
                    game.state.start("load");
                }
               exit.onInputDown.add(backToTheMenu,this);
            }
        }
    },

    update: function () {
        game.physics.arcade.collide(player, platforms);
        toManage();
        insertBlock();
        this.bg.tilePosition.x -= 1;
        count++;
    }
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
    score =0;
    soundOFF = false;
    game.paused = false;
    game.state.start('play');
}

function backToTheMenu() {
    score=0;
    music.destroy();
    createdBlocks=[];
    game.state.start('menu');
}


function render() {
    game.debug.soundInfo(music, 20, 32);
    Score.setText(score);
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

    if (cursors.up.isDown&&player.body.touching.down)
    {
        player.body.velocity.y-=500;
        player.body.velocity.x+=5;
       // player.body.setZeroVelocity();
    }
   if(player.y>500){
        game.state.start("LostMenu");
    }
    Score.setText(score);

}
  var abscis=10;
var createdBlocks=[];
function generateBlock(space) {
    if(space) {
        block = platforms.create(abscis, 25*HEIGTH_BLOCK, 'tile');
//block.body.velocity.x = -220;
        block.scale.setTo(0.5);
        block.body.immovable = true;
        createdBlocks.push(block);

    }
  // checkingThereIsOnScrean();
    abscis+=3*WIDTH_BLOCK;
}





// function checkingThereIsOnScrean() {
//      //console.log(createdBlocks[0].body.x);
//         if (player.body.x - createdBlocks[0].body.x > 1000)
//             createdBlocks.shift().destroy();
//
// }

function insertBlock() {
    if(count%5==0&&count%60==0&&count!=0){
        generateBlock(false);
// return ;
        count++;
    }

    if(count%5==0)
        generateBlock(true);
}