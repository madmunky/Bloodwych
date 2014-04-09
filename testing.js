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
    
    if (test < 3 && test >= 0){
       myDIx(ctx,gfx["heads"],imageCharacterArray[0][test2][0][test],player[0],scale);
    }
    else if (test === 3){
       ctx.drawImage(flipImageAt(gfx["heads"],imageCharacterArray[0][test2][0][test-2]),0,0,imageCharacterArray[0][9][0][test-2][2] * scale, imageCharacterArray[0][9][0][test-2][3] * scale); 
    }       

}