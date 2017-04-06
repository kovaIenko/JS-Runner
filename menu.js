/**
 * Created by admin on 05.04.2017.
 */
var menuState =
{
    create : function () {
        var nameLabel = game.add.text(90,90,"MENU",{font:'50px Arial',fill:"#ffffff"});
        var startLabel = game.add.text(90,200,"Press W to start",{font:'25px Arial',fill:"#ffffff"});

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.start,this);

    },
    start: function () {
        game.state.start('play');
    }
};