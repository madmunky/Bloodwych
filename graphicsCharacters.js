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

var imageCharacterArray = [];


function getHeadArray(){
    
    
    
}

function flipImage(image) {

          var can = document.createElement('canvas');
          can.width = width;
          can.height = height;
          var flipcontext = can.getContext("2d");
          var flipx = image.x;
          var flipy = image.y;
          var flipwidth = image.width;
          var flipheight = image.height;
          var flipimageObj = new Image();
          flipimageObj.width = image.width;
          flipimageObj.height = image.height;
          
          flipcontext.translate(flipwidth, 0);
          flipcontext.scale(-1, 1);
          flipcontext.drawImage(image, flipx, flipy, flipwidth, flipheight);
          flipcontext.save();           
          flipimageObj.src = can.toDataURL();
           
        return flipimageObj;
  
};



