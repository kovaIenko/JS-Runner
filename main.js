/**
 * Created by Ruslan on 19.03.2017.
 */


var game = new Phaser.Game(
    800,
    490,
    Phaser.AUTO,
    'game'
);
game.state.add('boot', bootState, false);
game.state.add('load', loadState, false);
game.state.add('menu', menuState, false);
game.state.add('play', playState, false);
game.state.add('LostMenu',lostState, false);
game.state.start('boot');
