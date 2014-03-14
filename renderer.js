function Renderer(game) {
    this.game = game;
    
};
Renderer.prototype = {
    init: function() {
        this.fps = 60;
        this.step = 1 / this.fps;
        this.ctx = document.getElementById("gamePort").getContext("2d");
        
    },
    
    update: function() {
        updatePlayerViewScreen();
    },
    
    invalid: { value: true },
    invalidateExample: function(){ this.invalid.example = true; }
}