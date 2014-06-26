/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function gameState(saveName) {
    this.gameData = [];
    this.fileName = saveName;
}

gameState.prototype.load = function() {
    this.gameData = JSON.parse(localStorage.getItem(this.fileName));
    tower = this.gameData.myTower;
    champion = this.gameData.myChampion;
};

gameState.prototype.save = function() {
    
    var myTower = jQuery.extend(true, {}, tower);
    var myChampion = jQuery.extend(true, {}, champion);
    var myMonsters = jQuery.extend(true, {}, monster);
    
    this.gameData = {
       // player1: player[0],
        //player2: player[1],
        myTower:myTower,
        myChampion:myChampion,
        myMonsters:myMonsters
    //    myItems:item
    };
    this.gameData.myTower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x] = setHexToBinaryPosition(this.gameData.myTower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x], 8, 1, '0');
    
    for (c in this.gameData.myChampion){
        this.gameData.myChampion[c].monster = null;
        this.gameData.myChampion[c].pocket = null;
    }
    
    for (m in this.gameData.myMonsters){
        for (mm in this.gameData.myMonsters[m]){
            this.gameData.myMonsters[m][mm].ref = null;
        }        
    }
    
    //this.gameData.player1.PlayerCanvas = null;
    //this.gameData.player1.Portal = null;    
    //isCyclic(this.gameData.player1);
    
    localStorage.setItem(this.fileName,JSON.stringify(this.gameData));
};

