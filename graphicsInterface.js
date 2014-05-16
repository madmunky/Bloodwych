function grabUISprites(spriteSheetIMG){
    
    var ImageArray = [];
    
    //Grab the ICONS
    for (y=0;y<6;y++){
        for (x=0;x<20;x++){
         ImageArray.push(grabImageAt(spriteSheetIMG,x*16,y*16,16,16,false));
        }
    }
    
    //Remove the blank images
    for (x=0;x<7;x++){
        ImageArray.pop();
    }
    
    //Grab the SpellBook
    //var SpellBookAnim = [];
    for (x=0;x<5;x++){
        ImageArray.push(grabImageAt(spriteSheetIMG,x*94,97,94,62,false));        
    }
    
    //ImageArray.push(SpellBookAnim);
    
    //Grab the rest of the UI
    ImageArray.push(grabImageAt(spriteSheetIMG,0,161,30,41,false));  //Shield  
    ImageArray.push(grabImageAt(spriteSheetIMG,31,162,37,22,false)); //SpellBook Icon
    ImageArray.push(grabImageAt(spriteSheetIMG,69,161,22,22,false)); //Scroll
    ImageArray.push(grabImageAt(spriteSheetIMG,92,162,28,11,false)); //Attack
    ImageArray.push(grabImageAt(spriteSheetIMG,123,161,6,37,false)); //Chain
    ImageArray.push(grabImageAt(spriteSheetIMG,406,0,43,44,false)); //Stats
    ImageArray.push(grabImageAt(spriteSheetIMG,131,168,60,31,false));//Red Actions
    ImageArray.push(grabImageAt(spriteSheetIMG,193,168,60,31,false));//Blue Actions
    
    ImageArray.push(grabImageAt(spriteSheetIMG,254,161,30,41,false));//Filled Shield
    ImageArray.push(grabImageAt(spriteSheetIMG,287,194,92,6,false));//Long Chain
    ImageArray.push(grabImageAt(spriteSheetIMG,324,1,48,44,false));//Character Box
    ImageArray.push(grabImageAt(spriteSheetIMG,373,1,32,24,false));//Pocket Box
    ImageArray.push(grabImageAt(spriteSheetIMG,324,46,94,19,false));//Blue Name Box
    ImageArray.push(grabImageAt(spriteSheetIMG,324,66,94,19,false));//Red Name Box
    
    ImageArray.push(grabImageAt(spriteSheetIMG,381,160,30,41,false));//Red Shield
    ImageArray.push(grabImageAt(spriteSheetIMG,412,160,30,41,false));//Blue Shield
    
    //Grab the character Portraits
    var ImagePortraits = [];
    ImagePortraits.push(grabImageAt(spriteSheetIMG,0,210,32,29,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,0,240,32,30,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,0,271,32,31,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,0,303,32,30,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,0,334,32,30,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,0,365,32,29,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,33,210,32,29,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,33,240,32,30,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,33,271,32,31,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,33,303,32,30,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,33,334,32,30,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,33,365,32,29,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,66,210,32,29,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,66,240,32,30,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,66,271,32,31,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,66,303,32,30,false));
    
    ImageArray.push(ImagePortraits);
    ImagePortraits = [];
    
    ImageArray.push(grabImageAt(spriteSheetIMG,285,201,95,8,false));
    
    return ImageArray;
    
}

function drawUI(p) {
    
    if (typeof gfxUI !== "undefined" && gfxUI !== null){
    
        leftUI(p);   
        drawPocketUI(p);
        myDIx(ctx, gfx["misc"]["separator"], [0, 0, 320, 7, 0, 100]);

            
    }
}

function leftUI(p){
    

            ctx.drawImage(gfxUI[UI_CHARACTER_BOX],p.ScreenX*scale,p.ScreenY*scale,gfxUI[UI_CHARACTER_BOX].width*scale,gfxUI[UI_CHARACTER_BOX].height*scale);    
            ctx.drawImage(gfxUI[UI_STATSBOX],(p.ScreenX + 51)*scale,p.ScreenY*scale,gfxUI[UI_STATSBOX].width*scale,gfxUI[UI_STATSBOX].height*scale);    
            ctx.drawImage(gfxUI[UI_CHAIN_LONG],(p.ScreenX + 1)*scale,(p.ScreenY+80)*scale,gfxUI[UI_CHAIN_LONG].width*scale,gfxUI[UI_CHAIN_LONG].height*scale);    
            ctx.drawImage(gfxUI[UI_CHAIN_LONG],(p.ScreenX + 226)*scale,(p.ScreenY+80)*scale,gfxUI[UI_CHAIN_LONG].width*scale,gfxUI[UI_CHAIN_LONG].height*scale);    
            
            ctx.drawImage(gfxUI[UI_PORTRAITS][p.champion[0]],(p.ScreenX+8)*scale,(p.ScreenY+8)*scale,gfxUI[UI_PORTRAITS][p.champion[0]].width*scale,gfxUI[UI_PORTRAITS][p.champion[0]].height*scale);    
            
            for (x=0;x<3;x++){
                if (p === player[0]){
                    ctx.drawImage(gfxUI[UI_SHIELD],(x * 32*scale) + (p.ScreenX*scale),(p.ScreenY+45)*scale,gfxUI[UI_SHIELD].width*scale,gfxUI[UI_SHIELD].height*scale);        
                    ctx.drawImage(drawCharacter(monster[6][p.champion[x+1]],0,1,p,{x: 0, y: 0},true,false),(x * 32*scale) + (p.ScreenX*scale)-49*scale,(p.ScreenY+45)*scale-37*scale);                       
                }               
                else{
                    ctx.drawImage(gfxUI[UI_SHIELD],(x * 32*scale) + (p.ScreenX*scale),(p.ScreenY+45)*scale,gfxUI[UI_SHIELD].width*scale,gfxUI[UI_SHIELD].height*scale);        
                    ctx.drawImage(drawCharacter(monster[6][p.champion[x+1]],0,1,p,{x: 0, y: 0},true,false),(x * 32*scale) + (p.ScreenX*scale)-49*scale,(p.ScreenY+45)*scale-37*scale);   
                }
            }
            
            try {
     
                }catch(e){};
            
               
}

function rightUI(p){
    
            if (p === player[0]){
                ctx.drawImage(gfxUI[UI_NAME_BLUE],p.ScreenX + 226 *scale,(p.ScreenY + 0) *scale,gfxUI[UI_NAME_BLUE].width*scale,gfxUI[UI_NAME_BLUE].height*scale);    
                ctx.drawImage(gfxUI[UI_ICON_ARROWS_BLUE],p.ScreenX + 226 *scale,(p.ScreenY +45) *scale,gfxUI[UI_ICON_ARROWS_BLUE].width*scale,gfxUI[UI_ICON_ARROWS_BLUE].height*scale);    
                
            }
            else{
                ctx.drawImage(gfxUI[UI_NAME_RED],p.ScreenX + 226 *scale,(p.ScreenY + 0) *scale,gfxUI[UI_NAME_RED].width*scale,gfxUI[UI_NAME_RED].height*scale);    
                ctx.drawImage(gfxUI[UI_ICON_ARROWS_RED],p.ScreenX + 226 *scale,(p.ScreenY +45) *scale,gfxUI[UI_ICON_ARROWS_RED].width*scale,gfxUI[UI_ICON_ARROWS_RED].height*scale);    
            }
            
            writeFontImage(champion[p.champion[0]].firstName, p.ScreenX/scale +226 ,(p.ScreenY+7), COLOUR[COLOUR_YELLOW]);
            ctx.drawImage(gfxUI[UI_ICON_SPELLBOOK],p.ScreenX + 226 *scale,(p.ScreenY + 22) *scale,gfxUI[UI_ICON_SPELLBOOK].width*scale,gfxUI[UI_ICON_SPELLBOOK].height*scale);    
            ctx.drawImage(gfxUI[UI_ICON_SCROLL],p.ScreenX + 265 *scale,(p.ScreenY + 22) *scale,gfxUI[UI_ICON_SCROLL].width*scale,gfxUI[UI_ICON_SCROLL].height*scale);    
            ctx.drawImage(gfxUI[UI_POCKETBOX],p.ScreenX + 290 *scale,(p.ScreenY + 21) *scale,gfxUI[UI_POCKETBOX].width*scale,gfxUI[UI_POCKETBOX].height*scale);    
            
            if (p === player[0]){
                ctx.drawImage(gfxUI[UI_ICON_OPENDOOR],(p.ScreenX + 289) *scale,(p.ScreenY + 22) *scale,gfxUI[UI_ICON_OPENDOOR].width*scale,gfxUI[UI_ICON_OPENDOOR].height*scale);    
                ctx.drawImage(gfxUI[UI_ICON_POCKETS],(p.ScreenX + 305) *scale,(p.ScreenY + 22) *scale,gfxUI[UI_ICON_POCKETS].width*scale,gfxUI[UI_ICON_POCKETS].height*scale);    
            }
            else {
                ctx.drawImage(gfxUI[UI_ICON_OPENDOOR],(p.ScreenX + 289) *scale,(p.ScreenY + 22) *scale,gfxUI[UI_ICON_OPENDOOR].width*scale,gfxUI[UI_ICON_OPENDOOR].height*scale);    
                ctx.drawImage(gfxUI[UI_ICON_POCKETS],(p.ScreenX + 305) *scale,(p.ScreenY + 22) *scale,gfxUI[UI_ICON_POCKETS].width*scale,gfxUI[UI_ICON_POCKETS].height*scale);    
            }
    
}

function drawPocketUI(p) {
    
    if (p === player[0]){
                ctx.drawImage(gfxUI[UI_NAME_BLUE],p.ScreenX + 226 *scale,(p.ScreenY + 0) *scale,gfxUI[UI_NAME_BLUE].width*scale,gfxUI[UI_NAME_BLUE].height*scale);    
            }
    else{
                ctx.drawImage(gfxUI[UI_NAME_RED],p.ScreenX + 226 *scale,(p.ScreenY + 0) *scale,gfxUI[UI_NAME_RED].width*scale,gfxUI[UI_NAME_RED].height*scale);    
    }
            
    writeFontImage(champion[p.champion[0]].firstName, p.ScreenX/scale +226 ,(p.ScreenY+7), COLOUR[COLOUR_YELLOW]);            
    
    var i = 0;
    for (y=0;y<2;y++){
        for (x=0;x<6;x++){
            var pocketImg = champion[p.champion[0]].pocket[i];
            if (champion[p.champion[0]].pocket[i] === 0){                
                pocketImg = UI_POCKET_EMPTY;
                if (y === 0){                    
                    switch (x) {                        
                        case 0:{pocketImg = UI_POCKET_EMPTY_LEFT_HAND;};break;
                        case 1:{pocketImg = UI_POCKET_EMPTY_RIGHT_HAND;};break;
                        case 2:{pocketImg = UI_POCKET_EMPTY_AMOUR;};break;
                        case 3:{pocketImg = UI_POCKET_EMPTY_LARGE_SHIELD;};break;                            
                    }                    
                }                
            }else{pocketImg = UI_ICON_BOOKOFSKULLS;}//WRITE SOMETHING HERE TO RETURN THE CORRECT OBJECT VALUE
            ctx.drawImage(gfxUI[pocketImg],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 23)+ (y*16)) *scale,gfxUI[pocketImg].width*scale,gfxUI[pocketImg].height*scale);    
            i++;
        }            
    }
    
    ctx.drawImage(gfxUI[UI_GRAY_BAR],(p.ScreenX + 225) *scale,(p.ScreenY + 54) *scale,gfxUI[UI_GRAY_BAR].width*scale,gfxUI[UI_GRAY_BAR].height*scale);    
    writeFontImage("Armour +0", p.ScreenX/scale +233 ,(p.ScreenY+55), COLOUR[COLOUR_YELLOW]);            
    
    for (x=0;x<6;x++){
        if (x>3){
        ctx.drawImage(gfxUI[UI_POCKET_EMPTY],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 63)) *scale,gfxUI[UI_POCKET_EMPTY].width*scale,gfxUI[UI_POCKET_EMPTY].height*scale);        
        }
    }
    
    
}

