/**
 * Created by Ruslan on 19.03.2017.
 */
const HEIGTH_PERSON=70;
const HEIGTH_GROUND=122;
const  COUNT=50;
const HEIGTH_BLOCK=25;


var game = new Phaser.Game(
    800,
    490,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);


 //загрузка контента
function preload() {
    game.load.image('background', 'img/back.png');
    game.load.image('start', "img/first.png");
    game.load.image('center', "img/center.png");
    game.load.image('end', "img/end.png");
    game.load.atlasJSONHash('person', 'player.png', 'player.json');
}
var platforms; // група об'єктів, на яких Персонаж буде пригати
var player;
//ініціалізація початкових параметрів(фон, карта, персонажі..)
   function create() {
    //Фізика
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background');



    // Створюємо групу для бордюрів, на які Персонаж буде пригати
    platforms = game.add.group();
    platforms.physicsBodyType = Phaser.Physics.ARCADE;
    platforms.enableBody = true;  //фізика для цієї групи
    game.physics.enable(platforms, Phaser.Physics.ARCADE);

     //Персонаж
    player=game.add.sprite(300, game.world.height - HEIGTH_GROUND-HEIGTH_PERSON-300, 'person');


    // animation
    player.animations.add('run');
    player.animations.play('run', 70, true);
    player.scale.setTo(0.429);

    //фізика для персонажа
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //  Налаштування персонажа
    player.body.bounce.set(0.1);
   // player.body.immovable = true;
    player.body.gravity.y = 300; //швидше буде падати

    line();

}
var start_;
var end_;
var center_;

//оновлення після зміни на Canvas
function update() {
    game.physics.arcade.collide(player, platforms);
    toManage();


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


