/**
 * Created by Ruslan on 19.03.2017.
 */
const HEIGTH_PERSON=70;
const HEIGTH_GROUND=122;
const HEIGTH_BLOCK=25;


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

var current=0; //змінна дл отриманн, поточного значення блоку
var current_heigth_level

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
}
var platforms; // група об'єктів, на яких Персонаж буде пригати
var player;

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
    ground.body.immovable = true;
 //Персонаж

    player=game.add.sprite(50, game.world.height - HEIGTH_GROUND-HEIGTH_PERSON-300, 'person');
    var walk = player.animations.add('walk');
    player.animations.play('walk', 30, true);
    game.physics.arcade.enable(player); //фізика для персонажа


    //  Налаштування персонажа
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300; //швидше буде падати
   player.body.velocity.x = 300;
   player.body.collideWorldBounds = true;


    cursors = game.input.keyboard.createCursorKeys();
}
//оновлення після зміни на Canvas
function update() {

     current_heigth_level=0;
    var next_level=getRandomInt(0,current_heigth_level+3);
    current=line(current,next_level);
    game.physics.arcade.collide(player, platforms);
  //



}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var start_;
var end_
var center_;
 //start- початок побудови
function line(start,next) {
    if (start == 0)
        start_ = platforms.create((start + 43), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'start');
    else
        start_ = platforms.create(43 + (start += 43), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'start');
    start += 43;
    var i = 0;
    for (i = 0; i < getRandomInt(0, 2); i++) {
        center_ = platforms.create((start += 43), game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'center');
        center_.body.immovable = true;
    }

    end_ = platforms.create(start += 43, game.world.height - HEIGTH_GROUND - HEIGTH_BLOCK - HEIGTH_PERSON - next * HEIGTH_BLOCK, 'end');
    start += 100;
    start_.body.immovable = true;
    end_.body.immovable = true;
    return start;
}