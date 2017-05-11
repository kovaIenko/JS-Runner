
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
game.state.start('boot');
