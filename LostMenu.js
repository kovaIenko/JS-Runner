/**
 * Created by admin on 11.05.2017.
 */
/**
 * Created by admin on 09.05.2017.
 */
var Total;
var lostState =
{
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
        createdBlocks=[];
        music.destroy();
        game.state.start('boot');
    },
    options: function () {
    }
};