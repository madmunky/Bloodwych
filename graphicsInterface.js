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
    
    //Grab the grey bar for the amour stat
    ImageArray.push(grabImageAt(spriteSheetIMG,285,201,95,8,false));
    
    //Grab the character Shields    
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,210,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,227,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,244,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,261,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,278,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,295,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,312,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,100,329,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,210,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,227,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,244,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,261,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,278,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,295,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,312,30,16,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,133,329,30,16,false));    
    ImageArray.push(ImagePortraits);
    ImagePortraits = [];
    
    //Grab the shield type (heart, spade etc..)
    ImagePortraits.push(grabImageAt(spriteSheetIMG,165,210,28,11,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,165,224,28,11,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,165,238,28,11,false));
    ImagePortraits.push(grabImageAt(spriteSheetIMG,165,252,28,11,false));
    ImageArray.push(ImagePortraits);
    ImagePortraits = [];
        
    //Grab the bottom and top of the shield
    ImageArray.push(grabImageAt(spriteSheetIMG,170,269,20,9,false));
    ImageArray.push(grabImageAt(spriteSheetIMG,164,279,30,5,false));        
    
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
    

            //ctx.drawImage(gfxUI[UI_CHARACTER_BOX],p.ScreenX*scale,p.ScreenY*scale,gfxUI[UI_CHARACTER_BOX].width*scale,gfxUI[UI_CHARACTER_BOX].height*scale);    
            ctx.drawImage(gfxUI[UI_STATSBOX],(p.ScreenX + 51)*scale,p.ScreenY*scale,gfxUI[UI_STATSBOX].width*scale,gfxUI[UI_STATSBOX].height*scale);    
            ctx.drawImage(gfxUI[UI_CHAIN_LONG],(p.ScreenX + 1)*scale,(p.ScreenY+80)*scale,gfxUI[UI_CHAIN_LONG].width*scale,gfxUI[UI_CHAIN_LONG].height*scale);    
            ctx.drawImage(gfxUI[UI_CHAIN_LONG],(p.ScreenX + 226)*scale,(p.ScreenY+80)*scale,gfxUI[UI_CHAIN_LONG].width*scale,gfxUI[UI_CHAIN_LONG].height*scale);    
            
            //ctx.drawImage(gfxUI[UI_PORTRAITS][p.champion[0]],(p.ScreenX+8)*scale,(p.ScreenY+8)*scale,gfxUI[UI_PORTRAITS][p.champion[0]].width*scale,gfxUI[UI_PORTRAITS][p.champion[0]].height*scale);    
            
            for (x=0;x<4;x++){
                if (p === player[0]){
                    if (x === 0){
                        ctx.drawImage(gfxUI[UI_CHAIN_VERT],(x +2 *scale) + (p.ScreenX*scale),(p.ScreenY+5)*scale,gfxUI[UI_CHAIN_VERT].width*scale,gfxUI[UI_CHAIN_VERT].height*scale);        
                        ctx.drawImage(drawCharacter(monster[6][p.champion[x]],0,0,p,{x: 0, y: 0},true,false),(x - 38*scale) + (p.ScreenX*scale)*scale,(p.ScreenY-32)*scale);                       
                        ctx.drawImage(gfxUI[UI_CHAIN_VERT],(x + 43*scale) + (p.ScreenX*scale),(p.ScreenY+5)*scale,gfxUI[UI_CHAIN_VERT].width*scale,gfxUI[UI_CHAIN_VERT].height*scale);        
                    }else{
                        ctx.drawImage(gfxUI[UI_SHIELD],((x-1) * 32*scale) + (p.ScreenX*scale),(p.ScreenY+45)*scale,gfxUI[UI_SHIELD].width*scale,gfxUI[UI_SHIELD].height*scale);        
                        ctx.drawImage(drawCharacter(monster[6][p.champion[x]],0,1,p,{x: 0, y: 0},true,false),((x-1) * 32*scale) + (p.ScreenX*scale)-49*scale,(p.ScreenY+45)*scale-37*scale);                       
                    }
                    
                }               
                else{
                    if (x === 0){
                        ctx.drawImage(gfxUI[UI_CHAIN_VERT],(x +2 *scale) + (p.ScreenX*scale),(p.ScreenY+5)*scale,gfxUI[UI_CHAIN_VERT].width*scale,gfxUI[UI_CHAIN_VERT].height*scale);        
                        ctx.drawImage(drawCharacter(monster[6][p.champion[x]],0,0,p,{x: 0, y: 0},true,false),(p.ScreenX-38)*scale,(p.ScreenY-32)*scale);                       
                        ctx.drawImage(gfxUI[UI_CHAIN_VERT],(x + 43*scale) + (p.ScreenX*scale),(p.ScreenY+5)*scale,gfxUI[UI_CHAIN_VERT].width*scale,gfxUI[UI_CHAIN_VERT].height*scale);        
                    }else{
                        ctx.drawImage(gfxUI[UI_SHIELD],((x-1) * 32*scale) + (p.ScreenX*scale),(p.ScreenY+45)*scale,gfxUI[UI_SHIELD].width*scale,gfxUI[UI_SHIELD].height*scale);        
                        ctx.drawImage(drawCharacter(monster[6][p.champion[x]],0,1,p,{x: 0, y: 0},true,false),((x-1) * 32*scale) + (p.ScreenX*scale)-49*scale,(p.ScreenY+45)*scale-37*scale);                       
                    }
                }
            }
            
            var t = createShield(p.champion[1],1);
            ctx.drawImage(t,(p.ScreenX*scale),(p.ScreenY+45)*scale,t.width*scale,t.height*scale);
               
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
    writeFontImage("Armour:+0", p.ScreenX/scale +233 ,(p.ScreenY+55), COLOUR[COLOUR_YELLOW]);            
    
    for (x=0;x<6;x++){
        
        switch (x) {
            
            case 0:{ctx.drawImage(gfxUI[UI_POCKET_CLUB],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 63)) *scale,gfxUI[UI_POCKET_EMPTY].width*scale,gfxUI[UI_POCKET_EMPTY].height*scale);        };break
            case 1:{ctx.drawImage(gfxUI[UI_POCKET_SPADE],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 63)) *scale,gfxUI[UI_POCKET_EMPTY].width*scale,gfxUI[UI_POCKET_EMPTY].height*scale);        };break
            case 2:{ctx.drawImage(gfxUI[UI_POCKET_HEART],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 63)) *scale,gfxUI[UI_POCKET_EMPTY].width*scale,gfxUI[UI_POCKET_EMPTY].height*scale);        };break
            case 3:{ctx.drawImage(gfxUI[UI_POCKET_DIMOND],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 63)) *scale,gfxUI[UI_POCKET_EMPTY].width*scale,gfxUI[UI_POCKET_EMPTY].height*scale);        };break
            case 4:{ctx.drawImage(gfxUI[UI_POCKET_EMPTY],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 63)) *scale,gfxUI[UI_POCKET_EMPTY].width*scale,gfxUI[UI_POCKET_EMPTY].height*scale);        };break
            case 5:{ctx.drawImage(gfxUI[UI_ICON_BACK],((p.ScreenX + 225) + (x*16)) *scale,((p.ScreenY + 63)) *scale,gfxUI[UI_POCKET_EMPTY].width*scale,gfxUI[UI_POCKET_EMPTY].height*scale);        };break
                
        }
    }
    
    
}

function itemID(id){
    
    switch (id) {
        
        case 1:{return UI_POCKET_COIN;} //Coinage
        case 2:{return UI_POCKET_COMMON_KEY;} //Common Keys
        case 3:{return UI_POCKET_ARROW;} //Arrows
        case 4:{return UI_POCKET_ELF_ARROW;} //Elf Arrows
        case 5:{return UI_POCKET_APPLE_1;} //1/3 Apple
        case 6:{return UI_POCKET_APPLE_2;} //2/3 Apple
        case 7:{return UI_POCKET_APPLE_3;} //Apple
        case 8:{return UI_POCKET_BISCUIT_1;} //1/3 Biscuit
        case 9:{return UI_POCKET_BISCUIT_2;} //2/3 Biscuit
        case 10:{return UI_POCKET_BISCUIT_3;} //Biscuit
        case 11:{return UI_POCKET_CHICKEN_1;} //1/3 Chicken
        case 12:{return UI_POCKET_CHICKEN_2;} //2/3 Chicken
        case 13:{return UI_POCKET_CHICKEN_3;} //Chicken
        case 14:{return UI_POCKET_WATER_1;} //1/3 Mead
        case 15:{return UI_POCKET_WATER_2;} //2/3 Mead
        case 16:{return UI_POCKET_WATER_3;} //Mead
        case 17:{return UI_POCKET_WATER_1;} //1/3 Water
        case 18:{return UI_POCKET_WATER_2;} //2/3 Water
        case 19:{return UI_POCKET_WATER_3;} //Water
        case 20:{return UI_POCKET_NEGG;} //N'egg (Green)
        case 21:{return UI_POCKET_NEGG;} //N'egg (Blue)
        case 22:{return UI_POCKET_NEGG;} //N'egg (Red)
        case 23:{return UI_POCKET_POTION;} //Serpent Slime
        case 24:{return UI_POCKET_POTION;} //Brimstone Broth
        case 25:{return UI_POCKET_POTION;} //Dragon Ale
        case 26:{return UI_POCKET_POTION;} //Moon Elixir
        case 27:{return UI_POCKET_AMOUR_LEATHER;} //Leather Armour
        case 28:{return UI_POCKET_AMOUR_CHAIN;} //Chain Mail
        case 29:{return UI_POCKET_AMOUR_PLATE;} //Plate Mail
        case 30:{return UI_POCKET_AMOUR_CHAIN;} //Mithril Chain
        case 31:{return UI_POCKET_AMOUR_PLATE;} //Mithril Plate
        case 32:{return UI_POCKET_AMOUR_CHAIN;} //Adamant Chain
        case 33:{return UI_POCKET_AMOUR_PLATE;} //Adamant Plate
        case 34:{return UI_POCKET_AMOUR_CHAIN;} //Crystal Chain
        case 35:{return UI_POCKET_AMOUR_PLATE;} //Crystal Plate
        case 36:{return UI_POCKET_SHIELD_1;} //Leather Shield
        case 37:{return UI_POCKET_SHIELD_2;} //Buckler
        case 38:{return UI_POCKET_SHIELD_3;} //Rune Shield (Classic)
        case 39:{return UI_POCKET_SHIELD_4;} //Large Shield
        case 40:{return UI_POCKET_SHIELD_5;} //Moon Shield
        case 41:{return UI_POCKET_SHIELD_6;} //Dragon Scale
        case 42:{return UI_POCKET_SHIELD_7;} //War Shield
        case 43:{return UI_POCKET_GLOVE;} //Chaos Gloves
        case 44:{return UI_POCKET_GLOVE;} //Battle Gloves
        case 45:{return UI_POCKET_GLOVE;} //Mithril Gloves
        case 46:{return UI_POCKET_GLOVE;} //Adamant Gloves
        case 47:{return UI_POCKET_GLOVE;} //Crystal Gloves
        case 48:{return UI_POCKET_DAGGER;} //Dagger
        case 49:{return UI_POCKET_SWORD_1;} //Stealth Blade
        case 50:{return UI_POCKET_SHORT_SWORD;} //Short Sword
        case 51:{return UI_POCKET_SWORD_3;} //Long Sword
        case 52:{return UI_POCKET_SWORD_4;} //Mithril Sword
        case 53:{return UI_POCKET_SWORD_5;} //Fleshbane
        case 54:{return UI_ICON_UNKNOWN;} //Demon Blade
        case 55:{return UI_ICON_UNKNOWN;} //Ace of Swords
        case 56:{return UI_POCKET_AXE_1;} //Battle Axe
        case 57:{return UI_POCKET_AXE_2;} //Mithril Axe
        case 58:{return UI_POCKET_AXE_3;} //Troll's Axe
        case 59:{return UI_POCKET_AXE_4;} //Brainbiter
        case 60:{return UI_POCKET_AXE_1;} //Deathbringer
        case 61:{return ;} //Staff
        case 62:{return ;} //Battle Staff
        case 63:{return ;} //Power Stadd
        case 64:{return ;} //Blodwyn (RIP)
        case 65:{return ;} //Murlock (RIP)
        case 66:{return ;} //Eleanor (RIP)
        case 67:{return ;} //Roseanne (RIP)
        case 68:{return ;} //Astroth (RIP)
        case 69:{return ;} //Zothen (RIP)
        case 70:{return ;} //Baldrick (RIP)
        case 71:{return ;} //Elfric (RIP)
        case 72:{return ;} //Sir Edward (RIP)
        case 73:{return ;} //Megrim (RIP)
        case 74:{return ;} //Sethra (RIP)
        case 75:{return ;} //Mr. Flay (RIP)
        case 76:{return ;} //Ulrich (RIP)
        case 77:{return ;} //Zastaph (RIP)
        case 78:{return ;} //Hengist (RIP)
        case 79:{return ;} //Thai-Chang (RIP)
        case 80:{return ;} //Bronze Key
        case 81:{return ;} //Iron Key
        case 82:{return ;} //Serpent Key
        case 83:{return ;} //Chaos Key
        case 84:{return ;} //Dragon Key
        case 85:{return ;} //Moon Key
        case 86:{return ;} //Chromatic Key
        case 87:{return ;} //Serpent Wand
        case 88:{return ;} //Chaos Wand
        case 89:{return ;} //Dragon Wand
        case 90:{return ;} //Moon Wand
        case 91:{return ;} //Heal Wand
        case 92:{return ;} //Long Bow
        case 93:{return ;} //Frost Bow
        case 94:{return ;} //Cross Bow
        case 95:{return ;} //permit
        case 96:{return ;} //Serpent Crystal
        case 97:{return ;} //Chaos Crystal
        case 98:{return ;} //Dragon Crystal
        case 99:{return ;} //Moon Crystal
        case 100:{return ;} //Grey Gem
        case 101:{return ;} //Bluish Gem
        case 102:{return ;} //Brown Gem
        case 103:{return ;} //Tan Gem
        case 104:{return ;} //Grey Ring
        case 105:{return ;} //Serpent Ring
        case 106:{return ;} //Chaos Ring
        case 107:{return ;} //Dragon Ring
        case 108:{return ;} //Moon Ring
        case 109:{return ;} //Book of Skulls
        
    }
    
    
}

function createShield(id,type){
    
    //ID = Characters ID i.e. 0 = Blodwyn
    //Type = 0 to 3 = Spade,Heart
    
    var can = document.createElement('canvas');
	can.width = 30;
	can.height = 41;
	var context = can.getContext("2d");
	context.drawImage(gfxUI[UI_SHIELD_TOP], 0, 0);
        context.drawImage(gfxUI[UI_SHIELD_CHARACTERS][id], 0, 5);
        context.drawImage(gfxUI[UI_SHIELD_TYPES][type], 1, 21);
        context.drawImage(gfxUI[UI_SHIELD_BOTTOM], 5, 32);
	context.save();
	return can;
    
}