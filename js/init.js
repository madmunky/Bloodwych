//var loadingIntervalTimer = 0;
function initGame() {
    $('canvas').attr('data-game-status', 'loading');
    loadGfxUIData();
    uiClickArea = uiClickAreas();
}

function loadGFXData() {
    preload.loadFile({
        src: 'data/' + GAME_ID[GAME_BLOODWYCH] + '/json/graphics.json',
        callback: "loadJSONData",
        type: "manifest",
        loadTimeout: 1000
    }, true);
}

function loadDefaultGfx(event) {
    defaultManifest = event;
    if(gameType !== GAME_BLOODWYCH) {
        preload = new createjs.LoadQueue(false);
        preload.loadFile({
            src: 'data/' + GAME_ID[gameType] + '/json/graphics.json',
            callback: "loadJSONData1",
            type: "manifest",
            loadTimeout: 1000
        }, true);
    } else {
        loadCustomGfx(event);
    }
}

function loadCustomGfx(event) {
    for(var i in event.manifest) {
        for(var x in defaultManifest.manifest) {
            if (defaultManifest.manifest[x].id === event.manifest[i].id) {
                defaultManifest.manifest[x] = event.manifest[i];
            }
        }
    }
    var preload = new createjs.LoadQueue(false);
    preload.maintainScriptOrder = true;
    if(gameType !== GAME_BLOODWYCH) {
        loadDefaultJSONFiles(GAME_ID[gameType]);
    }
    loadDefaultJSONFiles(GAME_ID[GAME_BLOODWYCH]);
    preload.loadManifest(defaultManifest.manifest, false, defaultManifest.path);
    preload.on("fileprogress", handleFileProgress);
    preload.on("error", handleError);
    preload.on("fileload", handleFileLoad);
    preload.on("complete", checkCompleted);
    preload.load();
}

function checkCompleted(event){

//    initJSONData();

}

function loadTowerData(event) {
    jsonDataLoaded = 0;
    tower = event.towers;
    initTowers();
    preload.on("fileprogress", handleFileProgress);
    preload.on("error", handleError);
    preload.on("fileload", handleFileLoad);
    preload.on("complete", handleComplete);
    preload.loadManifest(event.manifest, true, event.path);
}

function stop() {
    if (preload != null) {
        preload.close();
    }
}

function handleFileProgress(event) {
    loadingScreen(event);
}

function handleError(event) {
    PrintLog("Preload " + event.title + ": " + event.data.id)
}

function handleFileLoad(event) {
    var item = event.item;
    if (debug) {
        PrintLog("Loaded File: " + item.src);
    }
    switch (item.type) {
        case createjs.AbstractLoader.IMAGE:
            if (!jsonLoaded){
                initJSONData();
                jsonLoaded = true;
            }
            gfxLoadImages(item, event.result);
            break;
        case createjs.AbstractLoader.BINARY:
            loadBinaryFiles(item, event.result);
            break;
        case createjs.AbstractLoader.JSON:
            processJSONFiles(item, event.result);
            break;
    }
}

function handleComplete(event) {
    loadingScreen({
        src: "Creating Towers..."
    });
    setTimeout(function () {
        initMenuData();
    }, 1000);
}

function updateLoadingScreen(msg, percent) {
    clearCanvas();
    ctx.font = "normal 14px \"Bookman Old Style\", verdana, sans-serif";
    ctx.fillStyle = "#FFF";
    ctx.fillText(percent + "% - " + msg + "...", 0, 15);
}

function loadGfxUIData() {
    gfxLoadImage("misc", "font", "", null);
}

function initMenuData() {
    projectile[towerThis] = new Array();
    initData();
    if (typeof game === "undefined") {
        startScreen();
    }
}

function initData() {
    gfx['character']['heads'] = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 13, 13, 16);
    gfx['character']['legs'] = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 17, 27, 17);
    gfx['character']['arms'] = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 13, 19, 13);
    gfx['character']['minis'] = getCharacterSprite(NUMBER_OF_MINIS, 'character', 'minis', 13, 22, 16);
    gfx['character']['torsos'] = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 17, 14, 17);
    gfxUI = grabUISprites(gfx['misc']['uistuff']);
    itemGfxD = initItemGfxD();
    audioFiles = loadSounds();
    initMonsterPalettes();
    initArmourGfx();
    initMonsters();
    initSpells();
    initItemRefs();
    for (var i = 0; i < tower.length; i++) {
        initItems(tower[i]);
    }
    initChampions();
}

function initJSONData() {
    var i = 0;
    for(var c in colourData) {
        colourData[i] = colourData[c];
        i++;
    }
    parseJSONValues(paletteData, colourData);
    parseJSONValues(itemJson, paletteData, 'recolour');
    parseJSONValues(itemJson, colourData, 'recolour');

    preload = new createjs.LoadQueue(false);
    preload.loadFile({
        src: 'data/' + GAME_ID[gameType] + '/json/tower.json',
        callback: "loadJSONData2",
        type: "manifest",
        loadTimeout: 1000
    }, true);
}

//finds absolute value defined in obj, from o2
function parseJSONValues(obj, o2, from) {
    if(typeof from === "undefined") {
        var from = '';
    }
    for(var c in obj) {
        if(typeof obj[c] === 'string') {
            if(from === '') {
                var val = o2[obj[c]];
                if(typeof val !== "undefined") {
                    obj[c] = val;
                }
            }
        } else {
            if(from === c) {
                from = '';
            }
            parseJSONValues(obj[c], o2, from);
        }
    }
}

function startGame(singlePlayer, quickStart, p1_cid, p2_cid) {
    progressScreen("STARTING GAME");
    if (typeof god === "undefined") {
        god = false;
    }
    progressScreen("INIT PLAYERS");
    initPlayers(singlePlayer, quickStart, p1_cid, p2_cid);
    if (god && !resumeLoadGame) {
        godMode();
    }
    progressScreen("INIT TOWER SWITCHES");
    initTowerSwitches();
    switchTower(0);
    //        if (isMobile){
    //            var mon = getMonstersInTower(towerThis, true);
    //            for(var m in mon){
    //                initMonsterGfxNew(monster[towerThis][m]);
    //            }
    //        }
    gameStarted = true;
    progressScreen("PROCESSING CHAMPIONS");
    for(var pl in championSelect) {
        if (championSelect[pl].champID > -1) {
            champion[championSelect[pl].champID].selectedSpell = null;
            championSelect[pl].champID = -1;
        }
    }
    $('canvas').attr('data-game-status', 'started');
    //for(var p in player) {
    //      player[p].message("WELCOME THEE TRAVELLER, TO THE REMAKE OF", colourData['YELLOW'], true);
    //      player[p].message("   BLOODWYCH - REWRITTEN BY MAD BONE    ", colourData['YELLOW'], true);
    //      player[p].message("          WWW.BLOODWYCH.CO.UK           ", colourData['YELLOW'], true);
    //  }
    //saveGame(99, 'autosave');
    if (resumeLoadGame) {
        loadGame(99);
    }
    progressScreen("RUN GAME");
    Run();
    switch (gameType) {
        case GAME_BLOODWYCH:
            ;
            break;
        case GAME_EXTENDED_LEVELS:
            startExtendedLevel();
            break;
        case GAME_BOOK_OF_SKULLS:
            startBOS();
            break;
        case GAME_CUSTOM:
            ;
            break;
    }
    if (debug && mapEnabled) {
        setTimeout(function () {
            window.setInterval(createDebugWindow(), 1000);
        }, 1500);
    }
    setTimeout(function () {
        playSoundLoop(SOUND_PCMUSIC);
    }, 500);
}

function checkMergeJSON(objStorage, objNewData){

    if (typeof objStorage !== 'undefined'){
        if (objStorage.length > 0){
            var newItems = new Array();
            for (var i in objNewData){
                var matched = false;
                for (var x in objStorage){
                    if (objStorage[x].id === objNewData[i].id){
                        objStorage[x] = objNewData[i];
                        matched = true;
                    }
                }
                if (!matched){
                    newItems.push(objNewData[x]);
                }
            }
            objStorage.concat(newItems);
        }else{
            objStorage = objNewData;
        }
    }else{
        objStorage = objNewData;
    }

    return objStorage;

}

function processJSONFiles(item, result) {
    switch (item.typeID) {
        case 'Colours':
            colourData = result.colours;
            break;
        case 'Palettes':
            paletteData = result.palettes;
            break;
        case 'Characters':
            break;
        case 'Communication':
            break;
        case 'Input':
            break;
        case 'Items':
            itemJson = checkMergeJSON(itemJson, result.items);
            itemDropsJson = checkMergeJSON(itemDropsJson, result.itemDrops);
            break;
        case 'Sounds':
            break;
        case 'Spells':
            spellJson = checkMergeJSON(spellJson, result.spells);
            break;
        case 'Text':
            break;
        case 'UI':
            break;
        case 'Sprites':
            spriteData = checkMergeJSON(spriteData, result);
            gfxPos = spriteData.Sprites[0].locations;
            break;
    };
}

function loadDefaultJSONFiles(path) {
    defaultManifest.manifest.unshift({
        src: 'data/'+path+'/json/colours.json',
        type: "json",
        typeID: "Colours"
    }, {
        src: 'data/'+path+'/json/palettes.json',
        type: "json",
        typeID: "Palettes"
    }, {
        src: 'data/'+path+'/json/characters.json',
        type: "json",
        typeID: "Characters"
    }, {
        src: 'data/'+path+'/json/communication.json',
        type: "json",
        typeID: "Communication"
    }, {
        src: 'data/'+path+'/json/input.json',
        type: "json",
        typeID: "Input"
    }, {
        src: 'data/'+path+'/json/items.json',
        type: "json",
        typeID: "Items"
    }, {
        src: 'data/'+path+'/json/sounds.json',
        type: "json",
        typeID: "Sounds"
    }, {
        src: 'data/'+path+'/json/spells.json',
        type: "json",
        typeID: "Spells"
    }, {
        src: 'data/'+path+'/json/text.json',
        type: "json",
        typeID: "Text"
    }, {
        src: 'data/'+path+'/json/ui.json',
        type: "json",
        typeID: "UI"
    }, {
        src: 'data/'+path+'/json/sprites.json',
        type: "json",
        typeID: "Sprites"
    });
}

