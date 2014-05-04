function Game() {};
Game.prototype = {

	init: function() {
		this.fps = 10;
		this.step = 1 / this.fps;
		this.reset();
		this.eventQueue = [];

	},

	// Reset the game
	reset: function() {
		this.example = 0;
	},

	// Update the game model
	update: function() {
		timerMaster++;
		monsterMove();
	},

	subscribe: function(e, callback, target) {
		this.subs = this.subs || {};
		this.subs[e] = this.subs[e] || [];
		this.subs[e].push({
			callback: callback,
			target: target
		});
	},

	publish: function(e) {
		this.subs && this.subs[e].forEach(function(sub) {
			var args = [].slice.call(arguments, 1);
			sub.callback.apply(sub.target, args)
		});
	}
}

function monsterMove() {
	if(timerMaster - timerMonsterMove >= 20) {
		timerMonsterMove = timerMaster;
		for(m = 0; m < monster[towerThis].length; m++) {
			monster[towerThis][m].move();
		}
	}
}