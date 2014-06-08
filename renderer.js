function Renderer(game) {
	this.game = game;

};
Renderer.prototype = {
	init: function() {
		this.fps = 10;
		this.step = 1 / this.fps;
		redrawUI(2);
		configCanvas();
	},

	update: function() {
            
            if (STARTSCREEN){
                configCanvas();
                startScreen();
            }else{
                updatePlayerViewScreen();
            }
		
	},

	invalid: {
		value: true
	},
	invalidateExample: function() {
		this.invalid.example = true;
	}
};

var fps = {
	startTime: 0,
	frameNumber: 0,
	getFPS: function() {
		this.frameNumber++;
		var d = new Date().getTime(),
			currentTime = (d - this.startTime) / 1000,
			result = Math.floor((this.frameNumber / currentTime));

		if (currentTime > 1) {
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
		}
		return result;
	}
};
