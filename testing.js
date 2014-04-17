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
    try {
        
        ctx.drawImage(imageCharacterArray[2][test2][test1][test],169,114,imageCharacterArray[2][test2][test1][test].width * scale, imageCharacterArray[2][test2][test1][test].height * scale); 
        ctx.drawImage(imageCharacterArray[1][test2][test1][test],169,72,imageCharacterArray[1][test2][test1][test].width * scale, imageCharacterArray[1][test2][test1][test].height * scale); 
        ctx.drawImage(imageCharacterArray[0][test2][test1][test],175,51,imageCharacterArray[0][test2][test1][test].width * scale, imageCharacterArray[0][test2][test1][test].height * scale); 
        ctx.drawImage(imageCharacterArray[3][0][test1][test],155,80,imageCharacterArray[3][0][test1][test].width * scale, imageCharacterArray[3][0][test1][test].height * scale); 
    }catch(e){};
    
}