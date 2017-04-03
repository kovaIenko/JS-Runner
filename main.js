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

    game.state.add('Boot', BootGameState, false);
}
var platforms; // група об'єктів, на яких Персонаж буде пригати
var player;
<<<<<<< HEAD
var pause_label;
=======
>>>>>>> refs/remotes/kovaIenko/master
//ініціалізація початкових параметрів(фон, карта, персонажі..)
function create() {


    //Фізика
    game.physics.startSystem(Phaser.Physics.ARCADE);

   game.add.sprite(0, 0, 'background');
   game.add.sprite(0,378,'ground');


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

<<<<<<< HEAD
    player=game.add.sprite(50, game.world.height - HEIGTH_GROUND-HEIGTH_PERSON-300, 'person');

=======
    player=game.add.sprite(300, game.world.height - HEIGTH_GROUND-HEIGTH_PERSON-300, 'person');
   // var walk = player.animations.add('walk');
  //  player.animations.play('walk', 30, true);
>>>>>>> refs/remotes/kovaIenko/master
    game.physics.arcade.enable(player); //фізика для персонажа


    //  Налаштування персонажа
    player.body.bounce.y = 0.3;
   // player.body.immovable = true;
    player.body.gravity.y = 300; //швидше буде падати
  //
   player.body.collideWorldBounds = true;


<<<<<<< HEAD
    cursors = game.input.keyboard.createCursorKeys();

    // Меню паузи
    pause_label = game.add.text(WIDTH_SCREEN-100,20,'Pause',{ font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        game.paused = true;
       // menu = game.add.sprite(WIDTH_SCREEN/2,HEIGHT_SCREEN/2,'menu');
       // menu.anchor.setTo(0.5,0.5);
        choiseLabel = game.add.text(WIDTH_SCREEN/2, HEIGHT_SCREEN-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });


    game.input.onDown.add(unpause,self);
    function unpause(event) {
        if(game.paused){
            var x1 = WIDTH_SCREEN/2 - 270/2, x2 = WIDTH_SCREEN/2 + 270/2,
                y1 = HEIGHT_SCREEN/2 - 180/2, y2 = HEIGHT_SCREEN/2 + 180/2;
               // menu.destroy();
                choiseLabel.destroy();
                game.paused = false;
        }
    }
=======


    line();
>>>>>>> refs/remotes/kovaIenko/master
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