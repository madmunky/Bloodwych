function SpriteSheetArray(){

      //Convert the graphics sprite sheets into individual images and put them in an array
      //The Array consists of StartX,StartY,WidthX,HeightY,ScreenX,ScreenY
      
      var ImageArray = new Array();
	
      ImageArray[0] = new Array(0, 0, 15, 76, 0, 0);
      ImageArray[1] = new Array(0, 0, 15, 76, 0, 0);
      ImageArray[2] = new Array(15, 0, 98, 76, 15, 0);
      ImageArray[3] = new Array(113, 0, 15, 76, 113, 0);

      ImageArray[4] = new Array(128, 0, 15, 76, 0, 0);
      ImageArray[5] = new Array(143, 0, 17, 76, 15, 0);
      ImageArray[6] = new Array(160, 0, 64, 76, 32, 0);
      ImageArray[7] = new Array(224, 0, 17, 76, 96, 0);
      ImageArray[8] = new Array(241, 0, 16, 76, 113, 0);

      ImageArray[9] = new Array(0, 76, 32, 42, 0, 14);
      ImageArray[10] = new Array(32, 76, 8, 42, 32, 14);
      ImageArray[11] = new Array(40, 76, 48, 42, 40, 14);
      ImageArray[12] = new Array(88, 76, 8, 42, 88, 14);
      ImageArray[13] = new Array(96, 76, 32, 42, 96, 14);

      ImageArray[14] = new Array(128, 76, 41, 36, 0, 14);
      ImageArray[15] = new Array(168, 76, 6, 36, 40, 14);
      ImageArray[16] = new Array(174, 76, 36, 36, 46, 14);
      ImageArray[17] = new Array(210, 76, 6, 36, 82, 14);
      ImageArray[18] = new Array(215, 76, 41, 36, 87, 14);

      ImageArray[19] = new Array(0, 118, 12, 28, 0, 18);
      ImageArray[20] = new Array(12, 118, 34, 28, 12, 18);
      ImageArray[21] = new Array(46, 118, 4, 28, 46, 18);
      ImageArray[22] = new Array(50, 118, 4, 28, 78, 18);
      ImageArray[23] = new Array(54, 118, 34, 28, 82, 18);
      ImageArray[24] = new Array(88, 118, 12, 28, 116, 18);

      ImageArray[25] = new Array(100, 118, 13, 28, 0, 18);
      ImageArray[26] = new Array(113, 118, 10, 28, 13, 18);
      ImageArray[27] = new Array(123, 118, 10, 28, 104, 18);
      ImageArray[28] = new Array(133, 118, 14, 28, 114, 18);
      
      //ImageArray[28] = new Array(292, 222, 60, 151, 0, 0);
      //ImageArray[29] = new Array(324, 222, 190, 151, 0, 0);
     // ImageArray[30] = new Array(485, 222, 60, 151, 0, 0);
	  
	  return ImageArray;
	  
    }
    
    function getImage(Hex){
      
      //This function will return the correct graphic to be draw for the Hex Code passed
      //I may need to pass the Graphics Position to be drawn so I can work out which graphic
      //to be return for each wall side.
      
      var CC = parseInt(Hex.substring(3),16);
      var BB = parseInt(Hex.substring(1,2),16);
      
        switch (CC){
            case 0:return null;break;
            case 1:return gfxStone;break;
            case 2:return gfxWooden[0];break;
            case 3:return gfxMisc[0];break;
            case 4:{if (Hex.substring(1,2) === "1"){return gfxStairs[0];}
                     else {return gfxStairs[1];};break;}
            case 5:{if (BB%4 === 2 || BB%4 === 3) {return gfxDoor[1];}else{return gfxDoor[0];}}break;
            case 6:{if (Hex === "0706"){return gfxFloor[1];} //Roof Pit
                    if (BB % 4 === 0) {return null;} 
                    else if (BB % 4 === 1) {return gfxFloor[0];} //Floor Pit
                    else if (BB % 4 === 2) {return gfxFloor[2];} //Green Pad
                    else if (BB % 4 === 3) {return null;} //Blank space
                    else {return null;}} //Default blank space
            case 7:return gfxUnknown;break;                
        }
        
    };