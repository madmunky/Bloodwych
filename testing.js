/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var characterSpriteLocations = characterSpriteLocation();

function testing(){
    

    
    if (test > 3){
        test = 0;
    };
    if (test < 0){
        test = 3;
    }
    
    //test = 3;
    
    var CHAR_PARTY_FRONT_RIGHTX = 65,
            CHAR_PARTY_FRONT_RIGHTY = 0,
            CHAR_PARTY_FRONT_LEFTX = -CHAR_PARTY_FRONT_RIGHTX,
            CHAR_PARTY_FRONT_LEFTY = -CHAR_PARTY_FRONT_RIGHTY,
            CHAR_SOLO_X = 0,
            CHAR_SOLO_Y = 0;
            
   var DISTANCE = 1;  
    
    test1 = 1;
   //test = 3;
    
    var CHAR_OFFSETX = -65,
            CHAR_OFFSETY = 0;
    
    try {
        
        switch (test) {
            
            case 0:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],characterSpriteLocations[DISTANCE][0][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][0][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],characterSpriteLocations[DISTANCE][1][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][1][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],characterSpriteLocations[DISTANCE][2][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][2][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test]),characterSpriteLocations[DISTANCE][3][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][3][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][test1][test],characterSpriteLocations[DISTANCE][4][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][4][1]+CHAR_OFFSETY-DISTANCE,imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][test1][test].height * scale);}break;
            case 1:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],characterSpriteLocations[DISTANCE][5][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][5][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],characterSpriteLocations[DISTANCE][6][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][6][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],characterSpriteLocations[DISTANCE][7][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][7][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale);                    
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][1]),characterSpriteLocations[DISTANCE][8][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][8][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][1].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][1].height * scale);}break;
            case 2:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],characterSpriteLocations[DISTANCE][9][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][9][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],characterSpriteLocations[DISTANCE][10][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][10][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],characterSpriteLocations[DISTANCE][11][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][11][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale);
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][1],characterSpriteLocations[DISTANCE][12][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][12][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][1].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][1].height * scale);}break;
            case 3:{ctx.drawImage(imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test],characterSpriteLocations[DISTANCE][13][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][13][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_LEG][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test],characterSpriteLocations[DISTANCE][14][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][14][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_BODY][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test],characterSpriteLocations[DISTANCE][15][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][15][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].width * scale, imageCharacterArray[IMAGE_CHA_HEAD][test2][test1][test].height * scale); 
                    ctx.drawImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][0],characterSpriteLocations[DISTANCE][16][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][16][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][0].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][0].height * scale);
                    ctx.drawImage(flipImage(imageCharacterArray[IMAGE_CHA_ARM][0][0][0]),characterSpriteLocations[DISTANCE][17][0]+CHAR_OFFSETX,characterSpriteLocations[DISTANCE][17][1]+CHAR_OFFSETY,imageCharacterArray[IMAGE_CHA_ARM][0][0][0].width * scale, imageCharacterArray[IMAGE_CHA_ARM][0][0][0].height * scale);
                    }break;
        }
        
        
    }catch(e){};
    
}

function characterSpriteLocation(){
    
    
         var myArray = [];   
         for (x=0;x<4;x++){
             
             if (x === 0) {
                            myArray.push(new Array(
                            //Front View
                            new Array(170,116),
                            new Array(169,74),
                            new Array(175,53),
                            new Array(201,82),
                            new Array(155,82),
                            //Left View
                            new Array(182,116),
                            new Array(175,74),
                            new Array(175,53),
                            new Array(185,82),
                            //Right View
                            new Array(160,116),                            
                            new Array(168,74),
                            new Array(176,53),
                            new Array(176,82),
                            //Rear View
                            new Array(170,116),//Leg
                            new Array(170,74),//Body                            
                            new Array(175,53),//Head
                            new Array(165,82),//Left Arm
                            new Array(201,82)));//Right Arm
                }
                if (x === 1) {
                    myArray.push(new Array(
                            //Front View
                            new Array(185,112),
                            new Array(187,74),
                            new Array(193,53),
                            new Array(215,82),
                            new Array(175,82),
                            //Left View
                            new Array(182,116),
                            new Array(175,74),
                            new Array(175,53),
                            new Array(185,82),
                            //Right View
                            new Array(160,116),                            
                            new Array(168,74),
                            new Array(176,53),
                            new Array(176,82),
                            //Rear View
                            new Array(170,116),//Leg
                            new Array(170,74),//Body                            
                            new Array(175,53),//Head
                            new Array(165,82),//Left Arm
                            new Array(201,82)));//Right Arm
                }            
             
                        }
    
    return myArray;
    
}