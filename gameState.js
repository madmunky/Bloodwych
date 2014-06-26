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
    
    var myTower = jQuery.extend(true, {}, tower);
        myTower = JSON.parse(JSON.stringify(dropClasses(myTower)));
    var myChampion = jQuery.extend(true, {}, champion);
        myChampion = JSON.parse(JSON.stringify(dropClasses(myChampion)));
    var myMonsters = jQuery.extend(true, {}, monster);
        myMonsters = JSON.parse(JSON.stringify(dropClasses(myMonsters)));
    
    
    this.gameData = {
        myTower:myTower,
        myChampion:myChampion,
        myMonsters:myMonsters
    //    myItems:item
    };
    this.gameData.myTower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x] = setHexToBinaryPosition(this.gameData.myTower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x], 8, 1, '0');
    
    localStorage.setItem(this.fileName,JSON.stringify(this.gameData));
};

