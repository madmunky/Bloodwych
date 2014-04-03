/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tower(map) {
    
    this.Levels = getFileData('maps/' + map + '.MAP', mapdate, this,"map");    
    this.Switches = getFileData('maps/' + map + '.switches', readSwitchData, this, "switches", 4);
    this.Triggers = getFileData('maps/' + map + '.triggers', readSwitchData, this, "triggers", 4);
    this.MonsterData = getFileData('maps/' + map + '.monsters', readSwitchData, this,"monsters", 6);

}

function Map(Width,Height,xOff,yOff){
    
    this.Width = Width;
    this.Height = Height;
    this.yOffset = yOff;
    this.xOffset = xOff;
    this.Map = [];
    
}
