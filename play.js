/**
 * Created by admin on 06.04.2017.
 */
var platforms; // група об'єктів, на яких Персонаж буде пригати
var player;

var pause_label;
var sounds;
var current;
var loopCount = 0;
var soundOFF = false;
var start_;
var end_;
var center_;

var current=0; //змінна дл отриманн, поточного значення блоку

var music;

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


        cursors = game.input.keyboard.createCursorKeys();

        // Меню паузи
        pause_label = game.add.text(WIDTH_SCREEN - 100, 20, 'Pause', {font: '24px Arial', fill: '#fff'});
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
            game.paused = true;
            resume = game.add.button(300, 100, 'resume', actionOnClick, this, 2, 1, 0);
            restart = game.add.button(300, 153, 'restart', actionOnClick, this, 2, 1, 0);
            exit = game.add.button(300, 206, 'exit', actionOnClick, this, 2, 1, 0);
            if (soundOFF == false) {
                volumeOFF = game.add.button(700, 350, 'musicOFF', actionOnClick, this, 2, 1, 0);
                // if(soundOFF == false)
                volume = game.add.button(700, 350, 'musicOn', actionOnClick, this, 2, 1, 0);
            }
            if (soundOFF == true) {
                volume = game.add.button(700, 350, 'musicOn', actionOnClick, this, 2, 1, 0);
                volumeOFF = game.add.button(700, 350, 'musicOFF', actionOnClick, this, 2, 1, 0);
            }

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
                if (event.x > 300 && event.x < 500 && event.y > 100 && event.y < 150) {
                    resume.destroy();
                    restart.destroy();
                    exit.destroy();
                    volume.destroy();
                    volumeOFF.destroy();
                    game.paused = false;
                }
                if (event.x > 300 && event.x < 500 && event.y > 153 && event.y < 206) {
                    restartTheGame();
                }
                if (event.x > 700 && event.x < 788 && event.y > 350 && event.y < 438 && soundOFF == false) {
                    music.volume = 0.0;
                    volume.destroy();
                    soundOFF = true;
                    //volume.destroy();
                    volumeOFF.add();
                }

                if (event.x > 700 && event.x < 788 && event.y > 350 && event.y < 438 && soundOFF == true) {
                    music.volume = 1.0;
                    volumeOFF.destroy();
                    soundOFF = false;
                    volume.add();
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
    volume.destroy();
    volumeOFF.destroy();
    // back.destroy();
    music.destroy();
    //create();
    soundOFF = false;
    game.paused = false;
    game.state.start('play');
}



function render() {
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
}