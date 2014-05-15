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
    ImageArray.push(grabImageAt(spriteSheetIMG,131,161,41,6,false)); //Stats
    ImageArray.push(grabImageAt(spriteSheetIMG,131,168,60,31,false));//Red Actions
    ImageArray.push(grabImageAt(spriteSheetIMG,193,168,60,31,false));//Blue Actions
    
    ImageArray.push(grabImageAt(spriteSheetIMG,254,161,30,41,false));//Filled Shield
    ImageArray.push(grabImageAt(spriteSheetIMG,287,194,92,6,false));//Long Chain
    ImageArray.push(grabImageAt(spriteSheetIMG,324,1,48,44,false));//Character Box
    ImageArray.push(grabImageAt(spriteSheetIMG,373,1,32,24,false));//Pocket Box
    ImageArray.push(grabImageAt(spriteSheetIMG,324,46,94,19,false));//Blue Name Box
    ImageArray.push(grabImageAt(spriteSheetIMG,324,66,94,19,false));//Red Name Box
    
    return ImageArray;
    
}

function drawUI(p) {
    
    
    
}

function drawPocketUI(p) {
    
    
}