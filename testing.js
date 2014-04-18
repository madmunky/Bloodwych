/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function testing(){
<<<<<<< HEAD
    test = ((test + 4) % 4); //rotation?
        //test =3;
=======
    

    
    if (test > 3){
        test = 0;
    };
    if (test < 0){
        test = 3;
    }
    
    //test = 3;
    
    var CHAR_OFFSETX = 65,
            CHAR_OFFSETY = 2;
>>>>>>> c1547bb38b629d6d97a080f931156ededefb9330
    
    try {
        
        switch (test) {
            
<<<<<<< HEAD
            case 0: ctx.drawImage(characterGfx[IMAGE_CHA_LEG][test2][test1][test],169,114,       characterGfx[IMAGE_CHA_LEG][test2][test1][test].width * scale,   characterGfx[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_BODY][test2][test1][test],169,72,       characterGfx[IMAGE_CHA_BODY][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_HEAD][test2][test1][test],175,51,       characterGfx[IMAGE_CHA_HEAD][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(flipImage(characterGfx[IMAGE_CHA_ARM][0][test1][test]),213,80, characterGfx[IMAGE_CHA_ARM][0][test1][test].width * scale,       characterGfx[IMAGE_CHA_ARM][0][test1][test].height * scale);
                    ctx.drawImage(characterGfx[IMAGE_CHA_ARM][0][test1][test],155,80,            characterGfx[IMAGE_CHA_ARM][0][test1][test].width * scale,       characterGfx[IMAGE_CHA_ARM][0][test1][test].height * scale); break;
            case 1: ctx.drawImage(characterGfx[IMAGE_CHA_LEG][test2][test1][test],182,114,       characterGfx[IMAGE_CHA_LEG][test2][test1][test].width * scale,   characterGfx[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_BODY][test2][test1][test],175,72,       characterGfx[IMAGE_CHA_BODY][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_HEAD][test2][test1][test],175,51,       characterGfx[IMAGE_CHA_HEAD][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_HEAD][test2][test1][test].height * scale); break;                     
            case 2: ctx.drawImage(characterGfx[IMAGE_CHA_LEG][test2][test1][test],160,114,       characterGfx[IMAGE_CHA_LEG][test2][test1][test].width * scale,   characterGfx[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_BODY][test2][test1][test],168,72,       characterGfx[IMAGE_CHA_BODY][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_HEAD][test2][test1][test],175,51,       characterGfx[IMAGE_CHA_HEAD][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_HEAD][test2][test1][test].height * scale); break; 
            case 3: ctx.drawImage(characterGfx[IMAGE_CHA_LEG][test2][test1][test],169,114,       characterGfx[IMAGE_CHA_LEG][test2][test1][test].width * scale,   characterGfx[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_BODY][test2][test1][test],169,72,       characterGfx[IMAGE_CHA_BODY][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_HEAD][test2][test1][test],175,51,       characterGfx[IMAGE_CHA_HEAD][test2][test1][test].width * scale,  characterGfx[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(characterGfx[IMAGE_CHA_ARM][0][test1][test],155,80,            characterGfx[IMAGE_CHA_ARM][0][test1][test].width * scale,       characterGfx[IMAGE_CHA_ARM][0][test1][test].height * scale);
                    ctx.drawImage(flipImage(characterGfx[IMAGE_CHA_ARM][0][test1][test]),213,80, characterGfx[IMAGE_CHA_ARM][0][test1][test].width * scale,       characterGfx[IMAGE_CHA_ARM][0][test1][test].height * scale); break;
=======
            case 0:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],170+CHAR_OFFSETX,114+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],169+CHAR_OFFSETX,72+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175+CHAR_OFFSETX,51+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test]),201+CHAR_OFFSETX,80+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test],155+CHAR_OFFSETX,80+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);}break;
            case 1:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],182+CHAR_OFFSETX,114+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],175+CHAR_OFFSETX,72+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175+CHAR_OFFSETX,51+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale);                    
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][1]),185+CHAR_OFFSETX,80+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][1].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][1].height * scale);}break;
            case 2:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],160+CHAR_OFFSETX,114+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],168+CHAR_OFFSETX,72+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175+CHAR_OFFSETX,51+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale);
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][1],176+CHAR_OFFSETX,80+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][1].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][1].height * scale);}break;
            case 3:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],169+CHAR_OFFSETX,114+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],169+CHAR_OFFSETX,72+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175+CHAR_OFFSETX,51+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][0],155+CHAR_OFFSETX,80+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][0].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][0].height * scale);
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][0]),201+CHAR_OFFSETX,80+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][0].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][0].height * scale);
                    }break;
>>>>>>> c1547bb38b629d6d97a080f931156ededefb9330
        }
        
        
    }catch(e){};
    
}