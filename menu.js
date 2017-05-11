/**
 * Created by admin on 05.04.2017.
 */
var level;
var music;

var menuState =
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
        music = game.add.audio('music');
        game.add.sprite(0,0,'background');
        var nameLabel = game.add.text(100,100,"START",{font:'50px Monotype Corsiva',fill:"#62C908"});
        var startLabel = game.add.text(100,150,"SETTINGS",{font:'50px Monotype Corsiva',fill:"#62C908"});
        nameLabel.inputEnabled = true;
        startLabel.inputEnabled = true;
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        nameLabel.events.onInputDown.add(this.start,this);
        startLabel.events.onInputDown.add(this.options,this);
        music.volume = LevelOfSound/100;

    },
    start: function () {
        game.state.start('play');
    },
    options: function () {
        var music = game.add.text(400,100,"VOLUME",{font:'50px Monotype Corsiva',fill:"#62C908"});
        var plus = game.add.text(400,160,"+",{font:'50px Monotype Corsiva',fill:"#62C908"});
        var minus = game.add.text(470,155,"-",{font:'50px Monotype Corsiva',fill:"#62C908"});
        level = game.add.text(530,160,LevelOfSound + "%",{font:'50px Monotype Corsiva',fill:"#62C908"});
        var back = game.add.text(400,200,"BACK",{font:'50px Monotype Corsiva',fill:"#62C908"});
        plus.inputEnabled = true;
        minus.inputEnabled = true;
        back.inputEnabled = true;
        plus.events.onInputDown.add(plussing,this);
        minus.events.onInputDown.add(minussing,this);
    }
};

var LevelOfSound = 100;
function actionOnClick() {}
function plussing() {
    if(LevelOfSound < 100) {
        LevelOfSound =LevelOfSound + 10;
        level.setText(LevelOfSound + "%");
        music.volume+=0.1;
        console.log(music.volume);
    }
}
function minussing() {
    if(LevelOfSound >0 ) {
        LevelOfSound =LevelOfSound- 10;
        //var level = game.add.text(530, 160, LevelOfSound + "%", {font: '50px Monotype Corsiva', fill: "#62C908"});
        level.setText(LevelOfSound + "%");
        music.volume-=0.1;
        console.log(music.volume);
    }
}
function render() {
    game.debug.soundInfo(music, 20, 32);
}