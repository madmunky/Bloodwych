/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//First Three Rows Head 16x12
//Mid Rows 16x10
//Last Rows 16x8

var IMAGE_CHA_HEAD = 1,
        IMAGE_CHA_BODY = 2,
        IMAGE_CHA_ARM = 3,
        IMAGE_CHA_LEG = 4;

var IMAGE_CHA_DISTANCE_1 = 0,
        IMAGE_CHA_DISTANCE_2 = 1,
        IMAGE_CHA_DISTANCE_3 = 2,
        IMAGE_CHA_DISTANCE_4 = 3;

var NUMBER_OF_DISTANCES = 15,
            NUMBER_OF_HEADS = 19;
    
var imageCharacterArray = [];

//imageCharacterArray.push(getHeadArray());



function getHeads(){
    
    var heads = [];    

    for (x = 0;x < NUMBER_OF_HEADS;x++){
        var mid = [];
        var far = [];
        var close = [];
        var distant = [];
        var pos = 0;
            
            for (y = 0;y < NUMBER_OF_DISTANCES;y++){
                
                switch (y){
                    
                case 0:{close.push(grabImageAt(gfx["heads"],x*16, pos, 12, 12, false));pos=pos+12;};break
                    case 1:{close.push(grabImageAt(gfx["heads"],x*16, pos, 12, 12, false));close.push(grabImageAt(gfx["heads"],x*16, pos, 12, 12, true));pos=pos+12;};break
                    case 2:{close.push(grabImageAt(gfx["heads"],x*16, pos, 12, 12, false));pos=pos+12;};break
                case 3:{mid.push(grabImageAt(gfx["heads"],x*16, pos, 10, 10,false));pos=pos+10;};break    
                    case 4:{mid.push(grabImageAt(gfx["heads"],x*16, pos, 10, 10,false));mid.push(grabImageAt(gfx["heads"],x*16, pos, 10, 10,true));pos=pos+10;};break
                    case 5:{mid.push(grabImageAt(gfx["heads"],x*16, pos, 10, 10,false));pos=pos+10;};break
                case 6:{far.push(grabImageAt(gfx["heads"],x*16, pos, 8, 8, false));pos=pos+8;};break
                    case 7:{far.push(grabImageAt(gfx["heads"],x*16, pos, 8, 8, false));far.push(grabImageAt(gfx["heads"],x*16, pos, 8, 8, true));pos=pos+8;};break
                    case 8:{far.push(grabImageAt(gfx["heads"],x*16, pos, 8, 8, false));pos=pos+8;};break
                case 9:{distant.push(grabImageAt(gfx["heads"],x*16, pos, 5, 6, false));pos=pos+7;};break
                    case 10:{distant.push(grabImageAt(gfx["heads"],x*16, pos, 5, 6, false));distant.push(grabImageAt(gfx["heads"],x*16, pos, 5, 6, true));pos=pos+7;};break
                    case 11:{distant.push(grabImageAt(gfx["heads"],(x*16)+1, pos, 7, 7, false));};break    
                }
                
            }
        heads.push(new Array(close,mid,far,distant));
    }
    
    
    imageCharacterArray.push(heads);
    
}

function grabImageAt(image,startX,startY,width,height,flip) {
    
try{
          var can = document.createElement('canvas');
          can.width = width;
          can.height = height;
          var flipcontext = can.getContext("2d");
          var flipimageObj = new Image();
          flipimageObj.width = width;
          flipimageObj.height = height;
          if (flip){
            flipcontext.translate(width, 0);   
            flipcontext.scale(-1, 1);
        } 
          flipcontext.drawImage(image, startX, startY, width, height, 0, 0, width, height);
          flipcontext.save();           
          flipimageObj.src = can.toDataURL();
           
        return flipimageObj;
    }
    catch(e) {PrintLog("grabImageAt Error: " + e.toString());}
};



