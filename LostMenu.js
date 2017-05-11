/**
 * Created by admin on 09.05.2017.
 */
var Total;
var lostState =
{
    preload: function () {
        game.load.image('background', 'img/back.png');
        game.load.image('start', "img/first.png");
        game.load.image('center', "img/center.png");
        game.load.image('end', "img/end.png");
        game.load.atlasJSONHash('person', 'player.png', 'player.json');

// PauseMenu
        game.load.image('exit', "img/PauseMenu/exit2.png");
        //game.load.image('options', "img/PauseMenu/options.png");
        game.load.image('restart', "img/PauseMenu/restart2.png");
        game.load.image('resume', "img/PauseMenu/resume2.png");
        game.load.image('back', "img/PauseMenu/back.png");
        game.load.image('musicOn', "img/PauseMenu/musicOn.jpg");
        game.load.image('musicOFF', "img/PauseMenu/musicOFF.jpg");
        game.load.image('menuStart', "img/PauseMenu/menuStart.jpg");
        game.load.image('menuSet', "img/PauseMenu/menuSet.jpg");
        //music
        game.load.audio('music',"Music/tobi.mp3");
    },
    create : function () {
        game.add.sprite(0,0,'background');
        var nameLabel = game.add.text(100,100,"BACK TO MENU",{font:'50px Monotype Corsiva',fill:"#62C908"});
        var startLabel = game.add.text(100,150,"YOUR SCORE : ",{font:'50px Monotype Corsiva',fill:"#62C908"});
        Total = game.add.text(400,150,score + "",{font:'50px Monotype Corsiva',fill:"#62C908"});
        nameLabel.inputEnabled = true;
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        nameLabel.events.onInputDown.add(this.start,this);
    music.destroy();


    },
    start: function () {
      score =0;
        music.destroy();
        game.state.start('boot');
    },
    options: function () {
    }
};