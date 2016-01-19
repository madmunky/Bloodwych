function startScreen() {
	$('canvas').attr('data-game-status', 'menu');
	canvas.addEventListener('keydown', doKeyDown, true);
	checkClickEvents();
	canvas.focus();

	configCanvas();
	clearCanvas();

	writeFontImage("BLOODWYCH HTML", 122, 18, COLOUR[COLOUR_RED], FONT_ALIGNMENT_LEFT);
	writeFontImage(" 1   START ONE PLAYER GAME", 34, 50, COLOUR[COLOUR_GREEN], FONT_ALIGNMENT_LEFT);
	writeFontImage(" 2   START TWO PLAYER GAME", 34, 66, COLOUR[COLOUR_GREEN], FONT_ALIGNMENT_LEFT);
	writeFontImage(" 3   QUICKSTART ONE PLAYER GAME", 34, 90, COLOUR[COLOUR_GREEN], FONT_ALIGNMENT_LEFT);
	writeFontImage(" 4   QUICKSTART TWO PLAYER GAME", 34, 106, COLOUR[COLOUR_GREEN], FONT_ALIGNMENT_LEFT);
	if(getGameName(99) !== '') {
		writeFontImage(" 5   RESUME LAST GAME", 34, 130, COLOUR[COLOUR_YELLOW], FONT_ALIGNMENT_LEFT);
	}
	writeFontImage("MIRRORSOFT 1989", 114, 178, COLOUR[COLOUR_GREY_DARK], FONT_ALIGNMENT_LEFT);
	writeFontImage("RECREATED BY MAD BONE PRODUCTIONS 2014", 10, 190, COLOUR[COLOUR_WHITE], FONT_ALIGNMENT_LEFT);

}

function drawQuickStartUI(pl) {

	clearCanvas();
	if (currentPlayer === 1) {
		writeFontImage("PLAYER 2, " + TEXT_SELECT_CHAMPION, 2, 0, COLOUR[COLOUR_GREEN]);
	} else {
		writeFontImage(TEXT_SELECT_CHAMPION, 2, 0, COLOUR[COLOUR_GREEN]);
	}
	var chN = 0;

	for (col = 0; col < 4; col++) {
		for (row = 0; row < 4; row++) {
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
			writeFontImage(ch.getName(), 170, (myY + 80), COLOUR[COLOUR_YELLOW]);
			drawSpellBook(player[pl]);
			ctx.drawImage(gfxUI[UI_GFX_ICON_UNKNOWN], 174 * scale, (myY + 56) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
			break;
		case UI_CHARACTER_SELECT_POCKET:
			drawPocketUI(player[pl], champion[ch.id], true);
			writeFontImage(ch.getName(), 170, (myY + 80), COLOUR[COLOUR_YELLOW]);
			ctx.drawImage(gfxUI[UI_GFX_ICON_BOOKOFSKULLS], 174 * scale, (myY + 56) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
			break;
		case UI_CHARACTER_SELECT_SCROLL:
			drawStatsPage(player[pl], champion[ch.id], true);
			writeFontImage(ch.getName(), 170, (myY + 80), COLOUR[COLOUR_YELLOW]);
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