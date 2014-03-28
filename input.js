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
                myDIx(ctx, img, background[b], p1, scale);
                p1.move(DIRECTION_NORTH);
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);
                event.preventDefault();
            }
            else if (canvas_y > 300 & (canvas_x > 120 & canvas_x < 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], p1, scale);
                p1.move(DIRECTION_SOUTH);
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);
            }
            else if (canvas_y < 300 & (canvas_x > 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], p1, scale);
                p1.RotatePlayer(0);
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);                
            }
            else if (canvas_y < 300 & (canvas_x < 120)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], p1, scale);
                p1.RotatePlayer(1);
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);                
            }
            
    

                       
        
}

function doKeyDown(e) {

    switch (e.keyCode)
    {
        
        case 104: {p2.move(DIRECTION_NORTH);break} //Up Arrow
        case 101: {p2.move(DIRECTION_SOUTH);break} //Down Arrow
        case 100: {p2.move(DIRECTION_WEST);break} //Left Arrow
        case 102: {p2.move(DIRECTION_EAST);break} //Right Arrow
        case 103: {p2.RotatePlayer(1);break} //Delete
        case 105: {p2.RotatePlayer(0);break} //Page Dn
        case  96: {p2.Action();break} //End Key
        
        case 76: {  // THE L KEY
            tw = new Tower();
            CurrentMap = CurrentMap + 1;
            if (CurrentMap > Maps.length -1){
                CurrentMap = 0;
            }
            p1.X = 0;p2.X = 0;
            p1.Y = 0;p2.Y = 0;
            GetDataView("maps/"+Maps[CurrentMap]+".MAP",mapdate);                        
            break; 
        }
        
        case 84: {p1.ChangeUpLevel();break;}    // T KEY     
        case 32: {p1.Action();break;}           // SpaceBar        
        case 71: {p1.ChangeDownLevel(); break;} // G KEY  
        case 87: {p1.move(DIRECTION_NORTH);break;}      // W KEY
        case 83: {p1.move(DIRECTION_SOUTH);break;}    // S KEY
        case 65: {p1.move(DIRECTION_WEST);break;}         // A KEY
        case 68: {p1.move(DIRECTION_EAST);break;}        // D KEY
        case 69: {p1.RotatePlayer(0);break;}    // Q KEY
        case 81: {p1.RotatePlayer(1);break;}    // E KEY

        default:{};break;
    }


    if (b === 0) {
        b = 1;
    }
    else {
        b = 0;
    }
}
