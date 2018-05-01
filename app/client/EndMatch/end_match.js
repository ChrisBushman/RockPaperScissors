var end_match = function(game) {
  
};

var endMatchText, titleButton;

end_match.prototype = {
    preload: function() {
        game.load.image('ReturnToTitle', 'assets/ReturnToTitleButton.png');
    },

    create: function() {
        endMatchText = game.add.text(game.world.centerX, game.world.height * 0.2, "The match has ended!", instructionsStyle);
        endMatchText.anchor.set(0.5, 0.5);

        titleButton = game.add.button(game.world.centerX, 
                                      game.world.height * 0.4, 
                                      'ReturnToTitle',
                                      () => {
                                        titleButton.tint = 0.1 * 0xffffff;
                                        game.state.start("Title");
                                      }, this);
        titleButton.tint = 0.5 * 0xffffff;
        titleButton.anchor.set(0.5, 0.5);
        titleButton.onInputOver.add(() => {
            titleButton.tint = 0.8 * 0xffffff;
        }, this);
        titleButton.onInputOut.add(() => {
            titleButton.tint = 0.5 * 0xffffff;
        }, this);
    }
};