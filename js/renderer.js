function Renderer(game) {
	this.game = game;

};
Renderer.prototype = {
	init: function() {
		this.fps = 30;
		this.step = 1 / this.fps;
        if(resumeLoadGame) {
            resumeLoadGame = false;
		} else {
            clearCanvas();
            redrawUI(2);
        }		
		configCanvas();
	},

	update: function() {
		//try{
			updatePlayerViewScreen();
		//}catch(err){
		//	PrintLog("Drawing Error: " + err.toString());
		//}
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
