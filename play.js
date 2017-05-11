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

var current=0; //змінна дл отриманн, поточного значення блоку



const HEIGTH_PERSON=70;
const HEIGTH_GROUND=122;
const  COUNT=50;
const HEIGTH_BLOCK=25;
const HEIGHT_SCREEN = 500;
const WIDTH_SCREEN = 800;


var playState = {
    create: function () {
//Фізика
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'background');

        music = game.add.audio('music');

        sounds = [music];

        game.sound.setDecodedCallback(sounds, start, this);


        // Створюємо групу для бордюрів, на які Персонаж буде пригати
        platforms = game.add.group();
        platforms.physicsBodyType = Phaser.Physics.ARCADE;
        platforms.enableBody = true;  //фізика для цієї групи
        game.physics.enable(platforms, Phaser.Physics.ARCADE);


        player = game.add.sprite(300, game.world.height - HEIGTH_GROUND - HEIGTH_PERSON - 300, 'person');
        game.physics.arcade.enable(player); //фізика для персонажа


        // animation
        player.animations.add('run');
        player.animations.play('run', 40, true);
        player.scale.setTo(0.429);

        //фізика для персонажа
        game.physics.enable(player, Phaser.Physics.ARCADE);
        //  Налаштування персонажа
        player.body.bounce.set(0.1);
        // player.body.immovable = true;
        player.body.gravity.y = 300; //швидше буде падати
        //changing music volume due to settings
        music.volume= LevelOfSound/100;

        cursors = game.input.keyboard.createCursorKeys();
        //timer = game.time.create(false);
        Label =  game.add.text(450,20,"SCORE: ",{font:'30px Monotype Corsiva',fill:"#62C908"});
        Score = game.add.text(550,10,score,{font:'50px Monotype Corsiva',fill:"#62C908"});
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
                    game.paused = false;
                    game.state.start("load");
                }
            }
        }

        line();
    },

    update: function () {
        game.physics.arcade.collide(player, platforms);
        toManage();
    }
}
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


//start- початок побудови
function line() {
    var start=0;
    var next=1;
    var current_heigth_level =0;
    for(var r=0;r<COUNT;r++) {

        next =getRandomInt(0,current_heigth_level+1);
        if (start == 0)
            start_ = platforms.create((start + 38), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'start');
        else
            start_ = platforms.create(38 + (start += 38), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'start');
        start += 38;
        //  start_.body.immovable = true;

        var i = 0;
        for (i = 0; i < getRandomInt(0, 5); i++) {
            center_ = platforms.create((start += 38), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'center');
            center_.body.immovable = true;
            center_.body.velocity.x = - 220;
            center_.scale.setTo(0.5)
        }

        end_ = platforms.create(start += 38, game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'end');
        start += 30;
        current_heigth_level =3;
        start_.body.immovable = true;
        end_.scale.setTo(0.5);
        end_.body.immovable = true;
        start_.scale.setTo(0.5)
        start_.body.velocity.x = - 220;
        end_.body.velocity.x = - 220;


    }
}

function toManage() {
    cursors = game.input.keyboard.createCursorKeys();
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -220;
    }

    if (cursors.right.isDown && player.body.touching.down)
    {
        player.body.velocity.x +=10;

    }
    if (cursors.left.isDown && player.body.touching.down)
    {
        player.body.velocity.x -=10;
    }
    if(player.y>500){
        game.state.start("LostMenu");
    }
    Score.setText(score);



}

