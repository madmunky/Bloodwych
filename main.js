Run = function() {
	var animFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback, element) {
				window.setTimeout(callback, 1000 / 60);
		};
	})();

	return function() {
		game = new Game();
		var render = new Renderer(game),
			now,
			last = new Date().getTime(),
			dt = 0,
			gdt = 0,
			rdt = 0;

		function run() {
			now = new Date().getTime();

			dt = Math.min(1, (now - last) / 1000);
			gdt = gdt + dt;
			while (gdt > game.step) {
				gdt = gdt - game.step;
				game.update();
			}
			rdt = rdt + dt;
			if (rdt > render.step) {
				rdt = rdt - render.step;
				render.update();
			}
			last = now;
			animFrame(run);
		}

		game.init && game.init();
		render.init && render.init();
		run();
		
		$(function() {
			canvas.addEventListener('keydown', doKeyDown, true);
			checkClickEvents();
			canvas.focus();
		});
	}
}();
