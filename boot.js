/**
 * Created by admin on 06.04.2017.
 */

var bootState = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};