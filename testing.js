/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function testing(){
    

    
    if (test > 3){
        test = 0;
    };
    if (test < 0){
        test = 3;
    }
    
    //test = 3;
    
    var CHAR_OFFSETX = 65,
            CHAR_OFFSETY = 2;
    
    try {
        
        switch (test) {
            
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
        }
        
        
    }catch(e){};
    
}