/**
 * Created by Ruslan on 19.03.2017.
 */
const HEIGTH_PERSON=70;
const HEIGTH_GROUND=122;
const  COUNT=50;
const HEIGTH_BLOCK=25;
const HEIGHT_SCREEN = 500;
const WIDTH_SCREEN = 800;

var game = new Phaser.Game(
    800,
    500,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);


var BootGameState = new Phaser.State();

BootGameState.create = function() {
    LoadingText = Game.add.text(Game.world.width / 2, Game.world.height / 2, LOADING_TEXT, {
        font: '32px "Press Start 2P"',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 3,
        align: 'center'
    });
    LoadingText.anchor.setTo(0.5, 0.5);
    Game.state.start('Preloader', false, false);
};


var current=0; //змінна дл отриманн, поточного значення блоку
var current_heigth_level;
var music;
 //загрузка контента
function preload() {
    game.load.image('background', 'img/background.jpg');
    game.load.image('ground', 'img/ground.png');
   game.load.spritesheet("person","img/Person/1.png");
    game.load.image('start', "img/start.png");
    game.load.image('center', "img/center.png");
    game.load.image('end', "img/end.png");
//
    game.load.image('run1', "img/Person/1.png");
    game.load.image('run2', "img/Person/2.png");
    game.load.image('run3', "img/Person/3.png");
    game.load.image('run4', "img/Person/4.png");
    game.load.image('run5', "img/Person/5.png");
    game.load.image('run6', "img/Person/6.png");
    //
// PauseMenu
    game.load.image('exit', "img/PauseMenu/exit.png");
    //game.load.image('options', "img/PauseMenu/options.png");
    game.load.image('restart', "img/PauseMenu/restart.png");
    game.load.image('resume', "img/PauseMenu/resume.png");
    game.load.image('back', "img/PauseMenu/back.png");
    game.load.image('musicOn', "img/PauseMenu/musicOn.jpg");
    game.load.image('musicOFF', "img/PauseMenu/musicOFF.jpg");

    game.state.add('Boot', BootGameState, false);
   // game.state.add('menu', menuState, false);
    //music
    game.load.audio('music',"Music/FloRida.mp3");
   // game.state.start('menu');

}

var platforms; // група об'єктів, на яких Персонаж буде пригати
var player;

var pause_label;
var sounds;
var current;
var loopCount = 0;
var soundOFF = false;
//ініціалізація початкових параметрів(фон, карта, персонажі..)
function create() {


    //Фізика
    game.physics.startSystem(Phaser.Physics.ARCADE);

   game.add.sprite(0, 0, 'background');
   game.add.sprite(0,378,'ground');
    music = game.add.audio('music');

    sounds = [ music ];

    game.sound.setDecodedCallback(sounds, start, this);


    // Створюємо групу для бордюрів, на які Персонаж буде пригати
    platforms = game.add.group();

    platforms.enableBody = true;  //фізика для цієї групи

    //створюємо підлогу, на яку теж діє фізика
    var ground = platforms.create(0, game.world.height - HEIGTH_GROUND, 'ground');
    //  Подгоняем размер пола по размерам игры (оригинальный спрайт размером 800x122)
 //   ground.scale.setTo(2, 2);

    // підлога непорушна
    //background.body.immovable =true;
    ground.body.immovable = true;
 //Персонаж


   // player=game.add.sprite(50, game.world.height - HEIGTH_GROUND-HEIGTH_PERSON-300, 'person');


   player=game.add.sprite(300, game.world.height - HEIGTH_GROUND-HEIGTH_PERSON-300, 'person');
   // var walk = player.animations.add('walk');
  //  player.animations.play('walk', 30, true);

    game.physics.arcade.enable(player); //фізика для персонажа


    //  Налаштування персонажа
    player.body.bounce.y = 0.3;
   // player.body.immovable = true;
    player.body.gravity.y = 300; //швидше буде падати
  //
   player.body.collideWorldBounds = true;



    cursors = game.input.keyboard.createCursorKeys();

    // Меню паузи
    pause_label = game.add.text(WIDTH_SCREEN-100,20,'Pause',{ font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        game.paused = true;
       resume =  game.add.button(300, 100, 'resume', actionOnClick, this, 2, 1, 0);
        restart =  game.add.button(300, 153, 'restart', actionOnClick, this, 2, 1, 0);
        exit =  game.add.button(300, 206, 'exit', actionOnClick, this, 2, 1, 0);
        if(soundOFF == false) {
            volumeOFF = game.add.button(700, 350, 'musicOFF', actionOnClick, this, 2, 1, 0);
            // if(soundOFF == false)
            volume = game.add.button(700, 350, 'musicOn', actionOnClick, this, 2, 1, 0);
        }
        if(soundOFF == true) {
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
                y1 =400, y2 = 500;

           // button.onInputOver.add(over, this);
            // Check if the click was inside the menu
            if (event.x > 300 && event.x < 500 && event.y > 100 && event.y < 150 ) {
                resume.destroy();
                restart.destroy();
                exit.destroy();
                volume.destroy();
                volumeOFF.destroy();
                game.paused = false;
            }
            if (event.x > 300 && event.x < 500 && event.y > 153 && event.y < 206 ) {
                restartTheGame();
            }
            if (event.x > 700 && event.x < 788 && event.y > 350 && event.y < 438 && soundOFF == false ) {
                music.volume = 0.0;
                volume.destroy();
                soundOFF = true;
                //volume.destroy();
                volumeOFF.add();
            }

            if (event.x > 700 && event.x < 788 && event.y > 350 && event.y < 438 && soundOFF == true ) {
                music.volume = 1.0;
                volumeOFF.destroy();
                soundOFF = false;
                volume.add();
            }

        }
    }

    line();

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
    create();
    soundOFF = false;
    game.paused = false;
}



function render() {
    game.debug.soundInfo(music, 20, 32);
}
var start_;
var end_;
var center_;
//оновлення після зміни на Canvas
function update() {
    game.physics.arcade.collide(player, platforms);

    cursors = game.input.keyboard.createCursorKeys();



  //
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

        next =getRandomInt(0,current_heigth_level+2);
        if (start == 0)
            start_ = platforms.create((start + 43), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'start');
        else
            start_ = platforms.create(43 + (start += 43), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'start');
        start += 43;
      //  start_.body.immovable = true;

        var i = 0;
        for (i = 0; i < getRandomInt(0, 2); i++) {
            center_ = platforms.create((start += 43), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'center');
            center_.body.immovable = true;
            center_.body.velocity.x = - 250;
        }

        end_ = platforms.create(start += 43, game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'end');
        start += 100;

current_heigth_level =3;
       start_.body.immovable = true;
        end_.body.immovable = true;
        start_.body.velocity.x = - 250;
        end_.body.velocity.x = - 250;


    }
}