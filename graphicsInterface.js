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
    
    return ImageArray;
    
}

function drawUI(p) {
    
    if (typeof gfxUI !== "undefined" && gfxUI !== null){
    
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
            
            ctx.drawImage(gfxUI[UI_CHARACTER_BOX],p.ScreenX*scale,p.ScreenY*scale,gfxUI[UI_CHARACTER_BOX].width*scale,gfxUI[UI_CHARACTER_BOX].height*scale);    
            ctx.drawImage(gfxUI[UI_STATSBOX],(p.ScreenX + 51)*scale,p.ScreenY*scale,gfxUI[UI_STATSBOX].width*scale,gfxUI[UI_STATSBOX].height*scale);    
            ctx.drawImage(gfxUI[UI_CHAIN_LONG],(p.ScreenX + 1)*scale,(p.ScreenY+80)*scale,gfxUI[UI_CHAIN_LONG].width*scale,gfxUI[UI_CHAIN_LONG].height*scale);    
            ctx.drawImage(gfxUI[UI_CHAIN_LONG],(p.ScreenX + 226)*scale,(p.ScreenY+80)*scale,gfxUI[UI_CHAIN_LONG].width*scale,gfxUI[UI_CHAIN_LONG].height*scale);    
            
            for (x=0;x<3;x++){
                if (p === player[0]){
                    ctx.drawImage(gfxUI[UI_SHIELD_BLUE],(x * 32*scale) + (p.ScreenX*scale),(p.ScreenY+45)*scale,gfxUI[UI_SHIELD_BLUE].width*scale,gfxUI[UI_SHIELD_BLUE].height*scale);        
                }               
                else{
                    ctx.drawImage(gfxUI[UI_SHIELD_RED],(x * 32*scale) + (p.ScreenX*scale),(p.ScreenY+45)*scale,gfxUI[UI_SHIELD_RED].width*scale,gfxUI[UI_SHIELD_RED].height*scale);        
                }
            }
            
            try {
                 var tmp = drawCharacter(monster[champion[0]],0,4,p,0,true);    
                 ctx.drawImage(tmp,(x * 32*scale) + (p.ScreenX*scale),(p.ScreenY+45)*scale,tmp.width*scale,tmp.height*scale);        
                }catch(e){};
            
            

            
    }
}

function drawPocketUI(p) {
    
    
}

