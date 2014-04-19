var dataLoaded = {};
var Loaded = false;

Run = function() {
    var animFrame = (function(){
        return window.requestAnimationFrame || 
               window.webkitRequestAnimationFrame || 
               window.mozRequestAnimationFrame || 
               window.oRequestAnimationFrame || 
               window.msRequestAnimationFrame || 
            function(callback, element){
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
            
            if (gfx['character']['maleLegs'][0].width > 0 && !Loaded){
                gfx['character']['heads'][0].onload = getCharacterSprite(NUMBER_OF_HEADS,'character','heads',12,12,16);
                gfx['character']['maleBodies'][0].onload = getCharacterSprite(NUMBER_OF_BODIES,'character','maleBodies',15,14,16);
                gfx['character']['maleLegs'][0].onload = getCharacterSprite(NUMBER_OF_LEGS,'character','maleLegs',15,26,16);
                gfx['character']['maleArms'][0].onload = getCharacterSprite(NUMBER_OF_ARMS,'character','maleArms',9,18,16);
                Loaded = true;
            }
            
            dt  = Math.min(1, (now - last) / 1000);
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