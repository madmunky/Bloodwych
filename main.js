var dataLoaded = {};
var Loaded = false;

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

            if (gfx['character']['legs'].width > 0 && !Loaded) {
                gfx['character']['heads'].onload = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 12, 12, 16);
                gfx['character']['torsos'].onload = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 15, 14, 16);
                gfx['character']['legs'].onload = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 15, 26, 16);
                gfx['character']['arms'].onload = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 9, 18, 16);
                gfx['character']['people'].onload = getCharacterSprite(NUMBER_OF_WHOLEPEOPLE, 'character', 'people', 12, 21, 14);
                Loaded = true;
                charLoaded = true;
            }

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

        };

        game.init && game.init();
        render.init && render.init();
        run();
    };
}();
