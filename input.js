/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*function doTouchStart(e) {
    
            canvas_x = event.targetTouches[0].pageX;
            canvas_y = event.targetTouches[0].pageY;
    
            if (canvas_y < 300 & (canvas_x > 120 & canvas_x < 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].move(DIRECTION_NORTH);
                player[0].updateView(tw.floor[player[0].floor].Map);
                drawPlayersView(player[0]);
                event.preventDefault();
            }
            else if (canvas_y > 300 & (canvas_x > 120 & canvas_x < 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].move(DIRECTION_SOUTH);
                player[0].updateView(tw.floor[player[0].floor].Map);
                drawPlayersView(player[0]);
            }
            else if (canvas_y < 300 & (canvas_x > 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].rotateTo(player[0].Rotation + 1);
                player[0].updateView(tw.floor[player[0].floor].Map);
                drawPlayersView(player[0]);                
            }
            else if (canvas_y < 300 & (canvas_x < 120)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].rotateTo(player[0].Rotation - 1);
                player[0].updateView(tw.floor[player[0].floor].Map);
                drawPlayersView(player[0]);                
            }
            
    

                       
        
}*/

var KEYPAD_8 = 104,
	KEYPAD_4 = 100,
	KEYPAD_5 = 101,
	KEYPAD_6 = 102,
	KEYPAD_7 = 103,
	KEYPAD_8 = 104,
	KEYPAD_9 = 105,
	KEY_END = 96,
	KEYPAD_PLUS = 107,
	KEY_L = 76,
	KEY_T = 84,
	KEY_SPACEBAR = 32,
	KEY_G = 71,
	KEY_W = 87,
	KEY_S = 83,
	KEY_A = 65,
	KEY_D = 68,
	KEY_Q = 81,
	KEY_E = 69,
	KEY_R = 82,
	KEY_F = 70,
	KEY_5 = 53,
	KEY_6 = 54,
	KEY_7 = 55,
	KEY_8 = 56,
	KEY_9 = 57,
	KEY_0 = 48,
	KEY_MINUS = 189,
	KEY_PLUS = 187;


function doKeyDown(e) {

	switch (e.keyCode) {

		case KEYPAD_8:
			player[1].move(DIRECTION_NORTH);
			break; //8
		case KEYPAD_5:
			player[1].move(DIRECTION_SOUTH);
			break; //5
		case KEYPAD_4:
			player[1].move(DIRECTION_WEST);
			break; //4
		case KEYPAD_6:
			player[1].move(DIRECTION_EAST);
			break; //6
		case KEYPAD_7:
			player[1].rotateTo(player[1].Rotation - 1);
			break; //7
		case KEYPAD_9:
			player[1].rotateTo(player[1].Rotation + 1);
			break; //9
		case KEY_END:
			player[1].action();
			break; //End Key
		case KEYPAD_PLUS:
			player[1].toggleFrontObject();
			break; //+ Key
		case KEY_L: // THE L KEY
			CurrentMap = (CurrentMap + 1) % Maps.length;
			tw = new Tower(Maps[CurrentMap]);
			player[0].x = 3;
			player[1].x = 3;
			player[0].y = 1;
			player[1].y = 3;
			player[0].floor = 0;
			player[1].floor = 0;
			break;
		case KEY_T:
			player[0].changeUpFloor();
			break; // T KEY     
		case KEY_SPACEBAR:
			player[0].action();
			break; // SpaceBar        
		case KEY_G:
			player[0].changeDownFloor();
			break; // G KEY  
		case KEY_W:
			player[0].move(DIRECTION_NORTH);
			break; // W KEY
		case KEY_S:
			player[0].move(DIRECTION_SOUTH);
			break; // S KEY
		case KEY_A:
			player[0].move(DIRECTION_WEST);
			break; // A KEY
		case KEY_D:
			player[0].move(DIRECTION_EAST);
			break; // D KEY
		case KEY_Q:
			player[0].rotateTo(player[0].Rotation - 1);
			break; // Q KEY
		case KEY_E:
			player[0].rotateTo(player[0].Rotation + 1);
			break; // E KEY
		case KEY_R:
			player[0].toggleFrontObject();
			break; //R Key
		case KEY_F:
			player[0].testMode();
			break; // F cheat
		case KEY_PLUS:
			testDirection = (testDirection + 1) % 4;
			break;
		case KEY_MINUS:
			testDirection = (testDirection + 3) % 4;
			break;
		case KEY_6:
			testDirection = (testDirection + 3) % 4;
			break;
		case KEY_5:
			testDirection = (testDirection + 1) % 4;
			break;
		case KEY_7:
			testDistance = (testDistance + 1) % 3;
			PrintLog("Distance: " + testDistance);
			break;
		case KEY_8:
			testDistance = (testDistance + 3) % 3;
			PrintLog("Distance: " + testDistance);
			break;
		case KEY_0:
			testMon1 = (testMon1 + 1) ;
			break;
		case KEY_9:
			testMon1 = (testMon1 - 1) ;
			break;
		default:
			break;
	}
}

function checkClickEvents() {
	$('body').on('click', 'canvas#game-port', function(e) {
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		var xy;
		for(p = 0; p < 2; p++) {
			xy = { x: Math.floor((x - player[p].PortalX) / scale / 42.67), y: Math.floor((y - player[p].PortalY) / scale / 38) };
			if(xy.x >= 0 && xy.x <= 2 && xy.y >= 0 && xy.y <= 2) {
				if(xy.x === 0 && xy.y === 0) { //rotate left
					player[p].rotateTo(player[p].Rotation - 1);
				} else if(xy.x === 2 && xy.y === 0) { //rotate right
					player[p].rotateTo(player[p].Rotation + 1);
				} else if(xy.x === 1 && xy.y === 0) { //move forward
					player[p].move(DIRECTION_NORTH);
				} else if(xy.x === 0 && xy.y === 1) { //move left
					player[p].move(DIRECTION_WEST);
				} else if(xy.x === 2 && xy.y === 1) { //move right
					player[p].move(DIRECTION_EAST);
				} else if(xy.x === 1 && xy.y === 1) { //move backward
					player[p].move(DIRECTION_SOUTH);
				} else if(xy.y === 2) { //action
					player[p].action();
				}
			}
		}
	});
}