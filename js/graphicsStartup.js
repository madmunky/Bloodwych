function startScreen() {
    $('canvas').attr('data-game-status', 'menu');
    canvas.addEventListener('keydown', doKeyDown, true);
    //checkClickEvents();
    canvas.focus();

    configCanvas();
    clearCanvas();

    writeFontImage("BLOODWYCH HTML", 122, 18, colourData['RED'], FONT_ALIGNMENT_LEFT);
    writeFontImage(" 1   START ONE PLAYER GAME", 34, 50, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
    writeFontImage(" 2   START TWO PLAYER GAME", 34, 66, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
    writeFontImage(" 3   QUICKSTART ONE PLAYER GAME", 34, 90, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
    writeFontImage(" 4   QUICKSTART TWO PLAYER GAME", 34, 106, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
    if(getGameName(99) !== '') {
        writeFontImage(" 5   RESUME LAST GAME", 34, 130, colourData['YELLOW'], FONT_ALIGNMENT_LEFT);
    }
    writeFontImage("MIRRORSOFT 1989", 114, 178, colourData['GREY_DARK'], FONT_ALIGNMENT_LEFT);
    writeFontImage("RECREATED BY MAD BONE 2016", 74, 190, colourData['WHITE'], FONT_ALIGNMENT_LEFT);

}

function preStartScreen() {
    $('canvas').attr('data-game-status', 'menu');
    canvas.addEventListener('keydown', doKeyDown, true);
    checkClickEvents();
    canvas.focus();

    configCanvas();
    clearCanvas();

    writeFontImage("BLOODWYCH HTML", 122, 18, colourData['RED'], FONT_ALIGNMENT_LEFT);
    writeFontImage("    1   BLOODWYCH", 34, 50, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
    writeFontImage("    2   EXTENDED LEVELS (WIP)", 34, 66, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
    writeFontImage("    3   BOOK OF SKULLS (WIP)", 34, 90, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
    writeFontImage("    4   CUSTOM DATA SET (WIP)", 34, 106, colourData['GREY_DARK'], FONT_ALIGNMENT_LEFT);
    writeFontImage("    5   MAP VIEWER/EDITOR (WIP)", 34, 129, colourData['GREY_DARK'], FONT_ALIGNMENT_LEFT);

    writeFontImage("MIRRORSOFT 1989", 114, 178, colourData['GREY_DARK'], FONT_ALIGNMENT_LEFT);
    writeFontImage("RECREATED BY MAD BONE 2016", 74, 190, colourData['WHITE'], FONT_ALIGNMENT_LEFT);

}

function loadingScreen(objProgress){

	//$('canvas').attr('data-game-status', 'menu');
    canvas.addEventListener('keydown', doKeyDown, true);
    canvas.focus();

    configCanvas();
    clearCanvas();

    writeFontImage("BLOODWYCH HTML", 122, 18, colourData['RED'], FONT_ALIGNMENT_LEFT);
	if (objProgress.type === "fileprogress"){
		writeFontImage("LOADING DATA...", 122, 80, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
		writeFontImage("   FILE: " + objProgress.item.src, 34, 100, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
	}else{
		writeFontImage("PROCESSING DATA...", 120, 80, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
		writeFontImage("   FILE: " + objProgress.src, 34, 100, colourData['GREEN'], FONT_ALIGNMENT_LEFT);
	}
    
	//writeFontImage(" PROGRESS: " + objProgress.progress, 34, 140, colourData['GREEN'], FONT_ALIGNMENT_LEFT);

    writeFontImage("MIRRORSOFT 1989", 114, 178, colourData['GREY_DARK'], FONT_ALIGNMENT_LEFT);
    writeFontImage("RECREATED BY MAD BONE 2016", 74, 190, colourData['WHITE'], FONT_ALIGNMENT_LEFT);

}

function progressScreen(strDetails){

	//$('canvas').attr('data-game-status', 'menu');
    canvas.addEventListener('keydown', doKeyDown, true);
    canvas.focus();

    configCanvas();
    clearCanvas();

    writeFontImage("BLOODWYCH HTML", 122, 18, colourData['RED'], FONT_ALIGNMENT_LEFT);
	writeFontImage(strDetails+"...", 120, 80, colourData['GREEN'], FONT_ALIGNMENT_LEFT);

    writeFontImage("MIRRORSOFT 1989", 114, 178, colourData['GREY_DARK'], FONT_ALIGNMENT_LEFT);
    writeFontImage("RECREATED BY MAD BONE 2016", 74, 190, colourData['WHITE'], FONT_ALIGNMENT_LEFT);

}

function drawQuickStartUI(pl) {

    clearCanvas();
    if (currentPlayer === 1) {
        writeFontImage("PLAYER 2, " + TEXT_SELECT_CHAMPION, 2, 0, colourData['GREEN']);
    } else {
        writeFontImage(TEXT_SELECT_CHAMPION, 2, 0, colourData['GREEN']);
    }
    var chN = 0;

    for(var col = 0; col < 4; col++) {
        for(var row = 0; row < 4; row++) {
            var ch = champion[chN];
            var t = createShield(ch.id, ch.prof, ch.colour);
            if (players === 2 && currentPlayer === 1 && ch.id === championSelect[0].champID) {
                ctx.drawImage(gfxUI[UI_GFX_SHIELD_BLUE], (col * 40) * scale, ((row * 48) + 15) * scale, gfxUI[UI_GFX_SHIELD_BLUE].width * scale, gfxUI[UI_GFX_SHIELD_BLUE].height * scale);
            } else {
                if (championSelect[pl].champID !== -1) {
                    if (championSelect[pl].champID !== -1 && ch.id === championSelect[pl].champID) {
                        showCharacterDetails(ch, pl);
                    } else {
                        ctx.drawImage(t, (col * 40) * scale, ((row * 48) + 15) * scale, t.width * scale, t.height * scale);
                    }
                } else {
                    ctx.drawImage(t, (col * 40) * scale, ((row * 48) + 15) * scale, t.width * scale, t.height * scale);
                }
            }

            if (champSelectGrid.length < champion.length) {
                createSelectGrid(champSelectGrid, (col * 40), (row * 48) + 15, t.width, t.height, chN);
            }
            chN++;
        }
    }
    var imageColour;

    if (pl === 0) {
        imageColour = UI_GFX_CHARACTER_NAME_BLUE;
    } else {
        imageColour = UI_GFX_CHARACTER_NAME_RED;
    }
    if (championSelect[pl].champID === -1) {
        var myY = 50,
            myX = 0;

        ctx.drawImage(gfxUI[imageColour], 168 * scale, (myY + 75) * scale, gfxUI[UI_GFX_CHARACTER_NAME_BLUE].width * scale, gfxUI[UI_GFX_CHARACTER_NAME_BLUE].height * scale);
        ctx.drawImage(gfxUI[UI_GFX_CHARACTER_BOX], 168 * scale, (myY) * scale, gfxUI[UI_GFX_CHARACTER_BOX].width * scale, gfxUI[UI_GFX_CHARACTER_BOX].height * scale);
        ctx.drawImage(gfxUI[UI_GFX_CHARACTER_SCROLL], (myX + 226) * scale, (myY - 1) * scale, gfxUI[UI_GFX_CHARACTER_SCROLL].width * scale, gfxUI[UI_GFX_CHARACTER_SCROLL].height * scale);

    }

}

function showCharacterDetails(ch, pl) {

    var myY = 50,
        myX = 0;

    var a = ch.prof;
    var b = ch.colour;

    ctx.drawImage(gfxUI[UI_GFX_POCKET_SPADE + a][b], 198 * scale, (myY + 57) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
    if (pl === 0) {
        ctx.drawImage(gfxUI[UI_GFX_SHIELD_BLUE], (col * 40) * scale, ((row * 48) + 15) * scale, gfxUI[UI_GFX_SHIELD_BLUE].width * scale, gfxUI[UI_GFX_SHIELD_BLUE].height * scale);
        ctx.drawImage(gfxUI[UI_GFX_CHARACTER_NAME_BLUE], 168 * scale, (myY + 75) * scale, gfxUI[UI_GFX_CHARACTER_NAME_BLUE].width * scale, gfxUI[UI_GFX_CHARACTER_NAME_BLUE].height * scale);
    } else {
        ctx.drawImage(gfxUI[UI_GFX_SHIELD_RED], (col * 40) * scale, ((row * 48) + 15) * scale, gfxUI[UI_GFX_SHIELD_BLUE].width * scale, gfxUI[UI_GFX_SHIELD_BLUE].height * scale);
        ctx.drawImage(gfxUI[UI_GFX_CHARACTER_NAME_RED], 168 * scale, (myY + 75) * scale, gfxUI[UI_GFX_CHARACTER_NAME_BLUE].width * scale, gfxUI[UI_GFX_CHARACTER_NAME_BLUE].height * scale);
    }
    ctx.drawImage(gfxUI[UI_GFX_CHARACTER_BOXES], 170 * scale, (myY + 54) * scale, gfxUI[UI_GFX_CHARACTER_BOXES].width * scale, gfxUI[UI_GFX_CHARACTER_BOXES].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_CHARACTER_BOX], 168 * scale, (myY) * scale, gfxUI[UI_GFX_CHARACTER_BOX].width * scale, gfxUI[UI_GFX_CHARACTER_BOX].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_PORTRAITS][ch.id], 176 * scale, (myY + 7) * scale, gfxUI[UI_GFX_PORTRAITS][ch.id].width * scale, gfxUI[UI_GFX_PORTRAITS][ch.id].height * scale);


    switch (championSelect[pl].mode) {

        case UI_CHARACTER_SELECT_SPELLBOOK:
            writeFontImage(ch.getName(), 170, (myY + 80), colourData['YELLOW']);
            drawSpellBook(player[pl]);
            ctx.drawImage(gfxUI[UI_GFX_ICON_UNKNOWN], 174 * scale, (myY + 56) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
            break;
        case UI_CHARACTER_SELECT_POCKET:
            drawPocketUI(player[pl], champion[ch.id], true);
            writeFontImage(ch.getName(), 170, (myY + 80), colourData['YELLOW']);
            ctx.drawImage(gfxUI[UI_GFX_ICON_BOOKOFSKULLS], 174 * scale, (myY + 56) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
            break;
        case UI_CHARACTER_SELECT_SCROLL:
            drawStatsPage(player[pl], champion[ch.id], true);
            writeFontImage(ch.getName(), 170, (myY + 80), colourData['YELLOW']);
            ctx.drawImage(gfxUI[UI_GFX_ICON_POCKETS], 174 * scale, (myY + 56) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
            break;
        case UI_CHARACTER_SELECT_START_GAME:
            var t = TEXT_PLAYER;
            if (pl === 1) {
                t += TEXT_PLURAL + ' ';
            } else {
                t += ' ' + (pl + 1) + ' ';
            }
            t += ';' + TEXT_READY_QUEST;
            var txt = t.split(';');
            drawScroll(txt, player[pl].ScreenX + 226, player[pl].ScreenY - 1, true);
            break;

    }
}
