function gameState(saveName) {
    this.gameData = [];
    this.fileName = saveName;
}

gameState.prototype.load = function() {
    this.gameData = JSON.parse(localStorage.getItem(this.fileName));
    tower = this.gameData.myTower;
    //champion = this.gameData.myChampion;
};

gameState.prototype.save = function() {
    try{

        this.gameData = {
            myTower: jQuery.extend(true, {}, tower),
            myChampion:jQuery.extend(true, {}, champion)
            //myMonsters:jQuery.extend(true, {}, monster)
        //    myItems:item
        };
        isCyclic(this.gameData);
        for (c in this.gameData.myChampion){
            this.gameData.myChampion[c].spellBook = null;            
        }
        isCyclic(this.gameData.myChampion);
        this.gameData.myTower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x] = setHexToBinaryPosition(this.gameData.myTower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x], 8, 1, '0');
        localStorage.setItem(this.fileName,JSON.stringify(this.gameData));
    }catch(e){
        console.log('Error: ' + e.toString());    
    }
};

