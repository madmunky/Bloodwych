/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function doTouchStart(e) {
    
            canvas_x = event.targetTouches[0].pageX;
            canvas_y = event.targetTouches[0].pageY;
    
            if (canvas_y < 300 & (canvas_x > 120 & canvas_x < 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].move(DIRECTION_NORTH);
                player[0].updateView(tw.Level[player[0].level].Map);
                drawPlayersView(player[0]);
                event.preventDefault();
            }
            else if (canvas_y > 300 & (canvas_x > 120 & canvas_x < 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].move(DIRECTION_SOUTH);
                player[0].updateView(tw.Level[player[0].level].Map);
                drawPlayersView(player[0]);
            }
            else if (canvas_y < 300 & (canvas_x > 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].rotateTo(player[0].Rotation + 1);
                player[0].updateView(tw.Level[player[0].level].Map);
                drawPlayersView(player[0]);                
            }
            else if (canvas_y < 300 & (canvas_x < 120)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], player[0], scale);
                player[0].rotateTo(player[0].Rotation - 1);
                player[0].updateView(tw.Level[player[0].level].Map);
                drawPlayersView(player[0]);                
            }
            
    

                       
        
}

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
        KEY_7 = 55,
        KEY_8 = 56,
        KEY_9 = 57,
        KEY_0 = 48,
        KEY_MINUS = 189,
        KEY_PLUS = 187;


function doKeyDown(e) {

    switch (e.keyCode)
    {
        
        case KEYPAD_8: player[1].move(DIRECTION_NORTH);break; //8
        case KEYPAD_5: player[1].move(DIRECTION_SOUTH);break; //5
        case KEYPAD_4: player[1].move(DIRECTION_WEST);break; //4
        case KEYPAD_6: player[1].move(DIRECTION_EAST);break; //6
        case KEYPAD_7: player[1].rotateTo(player[1].Rotation - 1);break; //7
        case KEYPAD_9: player[1].rotateTo(player[1].Rotation + 1);break; //9
        case KEY_END: player[1].action();break; //End Key
        case KEYPAD_PLUS: player[1].toggleFrontObject();break; //+ Key
        case KEY_L: // THE L KEY
            CurrentMap = (CurrentMap + 1) % Maps.length;
            tw = new Tower(Maps[CurrentMap]);
            player[0].X = 3; player[1].X = 3;
            player[0].Y = 1; player[1].Y = 3;
            player[0].level = 0; player[1].level = 0;
            break;
        case KEY_T: player[0].changeUpLevel();break;    // T KEY     
        case KEY_SPACEBAR: player[0].action();break;           // SpaceBar        
        case KEY_G: player[0].changeDownLevel(); break; // G KEY  
        case KEY_W: player[0].move(DIRECTION_NORTH);break;      // W KEY
        case KEY_S: player[0].move(DIRECTION_SOUTH);break;    // S KEY
        case KEY_A: player[0].move(DIRECTION_WEST);break;         // A KEY
        case KEY_D: player[0].move(DIRECTION_EAST);break;        // D KEY
        case KEY_Q: player[0].rotateTo(player[0].Rotation - 1);break;    // Q KEY
        case KEY_E: player[0].rotateTo(player[0].Rotation + 1);break;    // E KEY
        case KEY_R: player[0].toggleFrontObject();break; //R Key
        case KEY_F: player[0].testMode();break; // F cheat
        case KEY_PLUS: test++; break;
        case KEY_MINUS: test--; break;
        case KEY_8: test1++; break;
        case KEY_7: test1--; break;
        case KEY_0: test2++; break;
        case KEY_9: test2--; break;
        default: break;
    }


    if (b === 0) {
        b = 1;
    }
    else {
        b = 0;
    }
}
