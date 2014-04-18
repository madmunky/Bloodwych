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
    
        //test =3;
    
    try {
        
        switch (test) {
            
            case 0:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],169,114,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],169,72,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175,51,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test]),213,80,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);
                ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test],155,80,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);}break;
            case 1:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],182,114,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],175,72,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175,51,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale);}break;                     
            case 2:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],160,114,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],168,72,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175,51,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale);}break; 
            case 3:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],169,114,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],169,72,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],175,51,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test],155,80,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test]),213,80,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);}break;
        }
        
        
    }catch(e){};
    
}