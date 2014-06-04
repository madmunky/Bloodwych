function grabUISprites(spriteSheetIMG) {

	var ImageArray = [];
	var i = 0;
	var extraColours = [];
	//Grab the ICONS
	for (y = 0; y < 6; y++) {
		for (x = 0; x < 20; x++) {
			if (i > 74 && i < 79) {
				extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, x * 16, y * 16, 16, 16, false), ITEM_PALETTE_DEFAULT, PALETTE_SERPENT));
				extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, x * 16, y * 16, 16, 16, false), ITEM_PALETTE_DEFAULT, PALETTE_CHAOS));
				extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, x * 16, y * 16, 16, 16, false), ITEM_PALETTE_DEFAULT, PALETTE_DRAGON));
				extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, x * 16, y * 16, 16, 16, false), ITEM_PALETTE_DEFAULT, PALETTE_MOON));
				extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, x * 16, y * 16, 16, 16, false), ITEM_PALETTE_DEFAULT, PALETTE_SELECTED));
				ImageArray.push(extraColours);
				extraColours = [];
			} else {
				ImageArray.push(grabImageAt(spriteSheetIMG, x * 16, y * 16, 16, 16, false));
			}
			i++;
		}
	}

	//Remove the blank images
	for (x = 0; x < 7; x++) {
		ImageArray.pop();
	}

	//Grab the SpellBook
	//var SpellBookAnim = [];
	for (x = 0; x < 5; x++) {
		ImageArray.push(grabImageAt(spriteSheetIMG, x * 94, 97, 94, 62, false));
	}

	//ImageArray.push(SpellBookAnim);

	//Grab the rest of the UI
	ImageArray.push(grabImageAt(spriteSheetIMG, 0, 161, 30, 41, false)); //Shield  
	ImageArray.push(grabImageAt(spriteSheetIMG, 31, 162, 37, 22, false)); //SpellBook Icon
	ImageArray.push(grabImageAt(spriteSheetIMG, 69, 161, 22, 22, false)); //Scroll
	ImageArray.push(grabImageAt(spriteSheetIMG, 92, 162, 28, 11, false)); //Attack
	ImageArray.push(grabImageAt(spriteSheetIMG, 123, 161, 6, 37, false)); //Chain
	ImageArray.push(grabImageAt(spriteSheetIMG, 406, 0, 43, 44, false)); //Stats
	ImageArray.push(grabImageAt(spriteSheetIMG, 131, 168, 60, 31, false)); //Red Actions
	ImageArray.push(grabImageAt(spriteSheetIMG, 193, 168, 60, 31, false)); //Blue Actions

	ImageArray.push(grabImageAt(spriteSheetIMG, 254, 161, 30, 41, false)); //Filled Shield
	ImageArray.push(grabImageAt(spriteSheetIMG, 287, 194, 92, 6, false)); //Long Chain
	ImageArray.push(grabImageAt(spriteSheetIMG, 324, 1, 48, 44, false)); //Character Box
	ImageArray.push(grabImageAt(spriteSheetIMG, 373, 1, 32, 24, false)); //Pocket Box
	ImageArray.push(grabImageAt(spriteSheetIMG, 324, 46, 94, 19, false)); //Blue Name Box
	ImageArray.push(grabImageAt(spriteSheetIMG, 324, 66, 94, 19, false)); //Red Name Box

	ImageArray.push(grabImageAt(spriteSheetIMG, 381, 160, 30, 41, false)); //Red Shield
	ImageArray.push(grabImageAt(spriteSheetIMG, 412, 160, 30, 41, false)); //Blue Shield

	//Grab the character Portraits
	var ImagePortraits = [];
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 0, 210, 32, 29, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 0, 240, 32, 30, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 0, 271, 32, 31, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 0, 303, 32, 30, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 0, 334, 32, 30, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 0, 365, 32, 29, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 33, 210, 32, 29, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 33, 240, 32, 30, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 33, 271, 32, 31, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 33, 303, 32, 30, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 33, 334, 32, 30, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 33, 365, 32, 29, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 66, 210, 32, 29, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 66, 240, 32, 30, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 66, 271, 32, 31, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 66, 303, 32, 30, false));

	ImageArray.push(ImagePortraits);
	ImagePortraits = [];

	//Grab the grey bar for the amour stat
	ImageArray.push(grabImageAt(spriteSheetIMG, 285, 201, 95, 8, false));

	//Grab the character Shields    
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 210, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 227, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 244, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 261, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 278, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 295, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 312, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 100, 329, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 210, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 227, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 244, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 261, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 278, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 295, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 312, 30, 16, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 133, 329, 30, 16, false));
	ImageArray.push(ImagePortraits);
	ImagePortraits = [];

	//Grab the shield type (heart, spade etc..)
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 165, 210, 28, 11, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 165, 224, 28, 11, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 165, 238, 28, 11, false));
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 165, 252, 28, 11, false));
	ImageArray.push(ImagePortraits);
	ImagePortraits = [];

	//Grab the bottom and top of the shield
	ImageArray.push(grabImageAt(spriteSheetIMG, 170, 269, 20, 9, false));
	ImageArray.push(grabImageAt(spriteSheetIMG, 164, 279, 30, 5, false));

	ImageArray.push(grabImageAt(spriteSheetIMG, 197, 212, 94, 87, false));

	//Grab Fairys
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 303, 215, 31, 41, false)); //Default Fairy
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 335, 215, 31, 41, false)); //Serpent Fairy
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 367, 215, 31, 41, false)); //Chaos Fairy
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 399, 215, 31, 41, false)); //Dragon Fairy
	ImagePortraits.push(grabImageAt(spriteSheetIMG, 431, 215, 31, 41, false)); //Moon Fairy
	ImageArray.push(ImagePortraits);
	ImagePortraits = [];

	ImageArray.push(grabImageAt(spriteSheetIMG, 93, 176, 4, 3, false)); //Food Bar Pointer

	//Movement Highlights
	ImageArray.push(grabImageAt(spriteSheetIMG, 170, 311, 12, 10, false)); //Rotate Left
	ImageArray.push(grabImageAt(spriteSheetIMG, 187, 311, 16, 9, false)); //Move Forward
	ImageArray.push(grabImageAt(spriteSheetIMG, 206, 311, 12, 10, false)); //Rotate Right
	ImageArray.push(grabImageAt(spriteSheetIMG, 170, 326, 11, 11, false)); //Move Left
	ImageArray.push(grabImageAt(spriteSheetIMG, 186, 326, 18, 9, false)); //Move Back
	ImageArray.push(grabImageAt(spriteSheetIMG, 207, 326, 11, 11, false)); //Move Right

	return ImageArray;

}

function drawUI(p) {
	if (redrawPlayerUiFlag === p.id + 1 || redrawPlayerUiFlag === 3) {
		if (typeof gfxUI !== "undefined" && gfxUI !== null) {
			ctx.clearRect(p.ScreenX * scale, (p.ScreenY - 3) * scale, 94 * scale, 91 * scale);
			ctx.clearRect((p.ScreenX + 225) * scale, (p.ScreenY - 3) * scale, 95 * scale, 91 * scale);
			switch (p.uiLeftPanel.mode) {
				case UI_LEFT_PANEL_MODE_STATS:
					leftUI(p);
					break;
				case UI_LEFT_PANEL_MODE_COMMAND:
					commandUI(p);
					break;
				default:
					break;
			}

			switch (p.uiRightPanel.mode) {
				case UI_RIGHT_PANEL_MAIN:
					rightUI(p);
					break;
				case UI_RIGHT_PANEL_POCKETS:
					drawPocketUI(p);
					break;
				case UI_RIGHT_PANEL_SPELLBOOK:
					spellBook(p);
					break;
				case UI_RIGHT_PANEL_STATS:
					drawStatsPage(p);
					break;
				default:
					break;
			}

			myDIx(ctx, gfx["misc"]["separator"], [0, 0, 320, 7, 0, 96]);
		}
	}
}

function spellBook(p, ui, dr) {
	ctx.drawImage(gfxUI[UI_GFX_SPELLBOOK], p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, gfxUI[UI_GFX_SPELLBOOK].width * scale, gfxUI[UI_GFX_SPELLBOOK].height * scale);
	var ch = champion[p.champion[p.championLeader]];

	for (x = 0; x < 8; x++) {
		var pg = ch.spellBookPage;
		if(typeof dr !== "undefined" && typeof ui !== "undefined") {
			if(x >= 4 && dr && ui <= 3) {
				pg = (pg + 1) % 4;
			} else if(x < 4 && !dr && ui >= 1) {
				pg = (pg + 3) % 4;
			} else if(x >= 4 && !dr && ui >= 4) {
				pg = (pg + 3) % 4;
			}
		}
		var sym = ch.spellBook[pg][x].ref.symbols;
		var col = getClassColour(ch.spellBook[pg][x].ref.colour, true);

		if (!ch.spellBook[pg][x].learnt) {
			col = COLOUR[COLOUR_GREY_DARKEST];
		}
		if (ch.selectedSpell === ch.spellBook[pg][x].ref) {
			col = COLOUR[COLOUR_WHITE];
		}

		if (x < 4) {
			writeSpellFont(sym.substring(0, 3), p.ScreenX + 234, (p.ScreenY + 15) + (x * 8), col);
			writeSpellFont(sym.substring(3, 4), p.ScreenX + 258, (p.ScreenY + 14) + (x * 8), col);
		} else {
			writeSpellFont(sym.substring(0, 1), p.ScreenX + 282, (p.ScreenY + 14) + ((x - 4) * 8), col);
			writeSpellFont(sym.substring(1, 4), p.ScreenX + 290, (p.ScreenY + 15) + ((x - 4) * 8), col);
		}
	}

	if (ch.selectedSpell === null) {

		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_GREY], p.ScreenX + 225 * scale, (p.ScreenY + 62) * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].width * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT], p.ScreenX + 241 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_LEFT], p.ScreenX + 257 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_LEFT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_LEFT].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_RIGHT], p.ScreenX + 273 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_RIGHT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_RIGHT].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT], p.ScreenX + 289 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_GREY], p.ScreenX + 305 * scale, (p.ScreenY + 62) * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].width * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].height * scale);
	} else {
		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_GREY + 1 + ch.selectedSpell.colour], p.ScreenX + 225 * scale, (p.ScreenY + 62) * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].width * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].height * scale);
		writeFontImage(ch.selectedSpell.name, p.ScreenX + 242, (p.ScreenY + 63), COLOUR[COLOUR_PINK]);
		writeFontImage("COST", p.ScreenX + 242, (p.ScreenY + 71), COLOUR[COLOUR_YELLOW]);
		//writeFontImage("COST", p.ScreenX + 242, (p.ScreenY + 71), COLOUR[COLOUR_RED]);
		ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_GREY + 1 + ch.selectedSpell.colour], p.ScreenX + 305 * scale, (p.ScreenY + 62) * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].width * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].height * scale);
	}

	writeFontImage(TEXT_SP_PTS, p.ScreenX + 226, (p.ScreenY + 79), COLOUR[COLOUR_PINK]);
	writeFontImage("0" + champion[p.champion[0]].stat.sp + "/0" + champion[p.champion[0]].stat.spMax, p.ScreenX + 280, (p.ScreenY + 79), COLOUR[COLOUR_GREEN]);


}

function changeSpellBookPage(p, dr) {
	if (p.timerSpellBookTurn === 0) {
		if(dr) {
			drawSpellBookPageTurn(p, 4, dr, 200);
			drawSpellBookPageTurn(p, 3, dr, 400);
			drawSpellBookPageTurn(p, 2, dr, 600);
			drawSpellBookPageTurn(p, 1, dr, 800, true);
		} else {
			drawSpellBookPageTurn(p, 1, dr, 200);
			drawSpellBookPageTurn(p, 2, dr, 400);
			drawSpellBookPageTurn(p, 3, dr, 600);
			drawSpellBookPageTurn(p, 4, dr, 800, true);			
		}

		/*spellBook(p)
		ctx.drawImage(gfxUI[UI_GFX_SPELLBOOK + 1], p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, gfxUI[UI_GFX_SPELLBOOK].width * scale, gfxUI[UI_GFX_SPELLBOOK].height * scale);
		p.timerSpellBookTurn = setTimeout(function() {
			spellBook(p)
			ctx.drawImage(gfxUI[UI_GFX_SPELLBOOK + 2], p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, gfxUI[UI_GFX_SPELLBOOK].width * scale, gfxUI[UI_GFX_SPELLBOOK].height * scale);
			p.timerSpellBookTurn = setTimeout(function() {
				spellBook(p)
				ctx.drawImage(gfxUI[UI_GFX_SPELLBOOK + 3], p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, gfxUI[UI_GFX_SPELLBOOK].width * scale, gfxUI[UI_GFX_SPELLBOOK].height * scale);
				p.timerSpellBookTurn = setTimeout(function() {
					spellBook(p)
					ctx.drawImage(gfxUI[UI_GFX_SPELLBOOK + 4], p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, gfxUI[UI_GFX_SPELLBOOK].width * scale, gfxUI[UI_GFX_SPELLBOOK].height * scale);
					p.timerSpellBookTurn = 0;
					redrawUI(p.id);
				}, 200);
			}, 200);
		}, 200);*/
	}
}

function drawSpellBookPageTurn(p, ui, dr, timer, stop) {
	if(typeof stop === "undefined") {
		stop = false;
	}
	(function(p, ui, dr, stop) {
		p.timerSpellBookTurn = setTimeout(function() {
			spellBook(p, ui, dr);
			ctx.drawImage(gfxUI[UI_GFX_SPELLBOOK + ui], p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, gfxUI[UI_GFX_SPELLBOOK + ui].width * scale, gfxUI[UI_GFX_SPELLBOOK + ui].height * scale);
			if(stop) {
				var ch = p.getChampion(p.championLeader);
				p.timerSpellBookTurn = 0;
				if (dr) {
					ch.spellBookPage = (ch.spellBookPage + 1) % 4;
				} else {
					ch.spellBookPage = (ch.spellBookPage + 3) % 4;
				}
				redrawUI(p.id);
			}
		}, timer);
	})(p, ui, dr, stop);
}

function redrawUI(p) {
	if (redrawPlayerUiFlag === 0 || (redrawPlayerUiFlag & (p + 1)) !== (p + 1)) {
		redrawPlayerUiFlag = redrawPlayerUiFlag + (p + 1);
	}
}

function leftUI(p) {

	ctx.drawImage(gfxUI[UI_GFX_STATSBOX], (p.ScreenX + 51) * scale, p.ScreenY * scale, gfxUI[UI_GFX_STATSBOX].width * scale, gfxUI[UI_GFX_STATSBOX].height * scale);
	leftUIStats(p);

	ctx.drawImage(gfxUI[UI_GFX_CHAIN_LONG], (p.ScreenX + 1) * scale, (p.ScreenY + 80) * scale, gfxUI[UI_GFX_CHAIN_LONG].width * scale, gfxUI[UI_GFX_CHAIN_LONG].height * scale);

	var c1 = p.getOrderedChampionIds();
	for (c = 0; c < p.champion.length; c++) {
		var c2 = c1[c];
		var cid = p.champion[c2];
		var ch = p.getChampion(c2);
		if (ch !== null) {
			if (c === 0) {
				if (p.uiLeftPanel.champs[c] === true) {
					ctx.drawImage(gfxUI[UI_GFX_CHAIN_VERT], (c + 2 * scale) + (p.ScreenX * scale), (p.ScreenY + 5) * scale, gfxUI[UI_GFX_CHAIN_VERT].width * scale, gfxUI[UI_GFX_CHAIN_VERT].height * scale);
					var t = drawCharacter(monster[6][cid], 0, 0, p, {
						x: 0,
						y: -1
					}, true, false)
					ctx.drawImage(t, (c - 38 * scale) + (p.ScreenX * scale) * scale, (p.ScreenY - 32) * scale, t.width * scale, t.height * scale);
					ctx.drawImage(gfxUI[UI_GFX_CHAIN_VERT], (c + 43 * scale) + (p.ScreenX * scale), (p.ScreenY + 5) * scale, gfxUI[UI_GFX_CHAIN_VERT].width * scale, gfxUI[UI_GFX_CHAIN_VERT].height * scale);
				} else {
					ctx.drawImage(gfxUI[UI_GFX_CHARACTER_BOX], p.ScreenX * scale, p.ScreenY * scale, gfxUI[UI_GFX_CHARACTER_BOX].width * scale, gfxUI[UI_GFX_CHARACTER_BOX].height * scale);
					ctx.drawImage(gfxUI[UI_GFX_PORTRAITS][cid], (p.ScreenX + 8) * scale, (p.ScreenY + 8) * scale, gfxUI[UI_GFX_PORTRAITS][cid].width * scale, gfxUI[UI_GFX_PORTRAITS][cid].height * scale);
				}
			} else {
				var t;
				if (ch.monster.dead) {
					t = createShield(cid, ch.prof, 4);
					ctx.drawImage(t, (((c - 1) * 32 + p.ScreenX) * scale), (p.ScreenY + 45) * scale, t.width * scale, t.height * scale);
				} else if (p.uiLeftPanel.champs[c] === true) {
					ctx.drawImage(gfxUI[UI_GFX_SHIELD], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI[UI_GFX_SHIELD].width * scale, gfxUI[UI_GFX_SHIELD].height * scale);
					t = drawCharacter(monster[6][cid], 0, 1, p, {
						x: 0,
						y: 0
					}, true, false);
					ctx.drawImage(t, ((c - 1) * 32 * scale) + (p.ScreenX * scale) - 49 * scale, (p.ScreenY + 45) * scale - 37 * scale, t.width * scale, t.height * scale);
				} else {
					t = createShield(cid, ch.prof, ch.colour);
					ctx.drawImage(t, (((c - 1) * 32 + p.ScreenX) * scale), (p.ScreenY + 45) * scale, t.width * scale, t.height * scale);
				}
			}
		} else {
			if (p === player[1]) {
				ctx.drawImage(gfxUI[UI_GFX_SHIELD_RED], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI[UI_GFX_SHIELD_RED].width * scale, gfxUI[UI_GFX_SHIELD_RED].height * scale);
			} else {
				ctx.drawImage(gfxUI[UI_GFX_SHIELD_BLUE], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI[UI_GFX_SHIELD_BLUE].width * scale, gfxUI[UI_GFX_SHIELD_BLUE].height * scale);
			}
		}
	}
}

function leftUIStats(p) {
	if (p.uiLeftPanel.champs[0] === true) {
		var ch = p.getOrderedChampionIds();
		for (c = 0; c < p.champion.length; c++) {
			var c1 = ch[c];
			var champ = p.getChampion(c1);
			if (champ !== null) {
				var rgb = getClassColour(champ.colour);
				var hp = Math.floor(21 * champ.stat.hp / champ.stat.hpMax);
				if (hp < 0) {
					hp = 0;
				}
				ctx.fillStyle = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
				ctx.fillRect((p.ScreenX + 55 + c * 9) * scale, (p.ScreenY + 35 - hp) * scale, 7 * scale, hp * scale);
			}
		}
	} else {
		var champ = p.getChampion(p.championLeader);
		if (champ !== null) {
			var rgb;
			var hp = Math.floor(35 * champ.stat.hp / champ.stat.hpMax);
			var vit = Math.floor(35 * champ.stat.vit / champ.stat.vitMax);
			var sp = Math.floor(35 * champ.stat.sp / champ.stat.spMax);
			if (hp < 0) {
				hp = 0;
			}
			if (vit < 0) {
				vit = 0;
			}
			if (sp < 0) {
				sp = 0;
			}
			if (p === player[0]) {
				rgb = getClassColour(CLASS_COLOUR_MOON);
			} else {
				rgb = getClassColour(CLASS_COLOUR_DRAG);
			}
			ctx.fillStyle = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
			ctx.fillRect((p.ScreenX + 55) * scale, (p.ScreenY + 15) * scale, hp * scale, 5 * scale);
			ctx.fillRect((p.ScreenX + 55) * scale, (p.ScreenY + 22) * scale, vit * scale, 5 * scale);
			ctx.fillRect((p.ScreenX + 55) * scale, (p.ScreenY + 29) * scale, sp * scale, 5 * scale);
		}
	}
}

function getClassColour(c, palette) {

	if (typeof palette === 'undefined') {
		palette = false;
	}

	var red = 255,
		grn = 255,
		blu = 255;
	switch (c) {
		case CLASS_COLOUR_SERP:
			red = COLOUR[COLOUR_GREEN][0];
			grn = COLOUR[COLOUR_GREEN][1];
			blu = COLOUR[COLOUR_GREEN][2];
			break;
		case CLASS_COLOUR_CHAOS:
			red = COLOUR[COLOUR_YELLOW][0];
			grn = COLOUR[COLOUR_YELLOW][1];
			blu = COLOUR[COLOUR_YELLOW][2];
			break;
		case CLASS_COLOUR_DRAG:
			red = COLOUR[COLOUR_RED][0];
			grn = COLOUR[COLOUR_RED][1];
			blu = COLOUR[COLOUR_RED][2];
			break;
		case CLASS_COLOUR_MOON:
			red = COLOUR[COLOUR_BLUE_DARK][0];
			grn = COLOUR[COLOUR_BLUE_DARK][1];
			blu = COLOUR[COLOUR_BLUE_DARK][2];
			break;
		default:
			break;
	}
	if (palette) {
		return new Array(red, grn, blu);
	}
	return {
		r: red,
		g: grn,
		b: blu
	};
}

function commandUI(p) {

	ctx.drawImage(gfxUI[UI_GFX_CHARACTER_BOX], p.ScreenX * scale, p.ScreenY * scale, gfxUI[UI_GFX_CHARACTER_BOX].width * scale, gfxUI[UI_GFX_CHARACTER_BOX].height * scale);
	ctx.drawImage(gfxUI[UI_GFX_PORTRAITS][p.champion[p.championLeader]], (p.ScreenX + 8) * scale, (p.ScreenY + 8) * scale, gfxUI[UI_GFX_PORTRAITS][p.champion[p.championLeader]].width * scale, gfxUI[UI_GFX_PORTRAITS][p.champion[p.championLeader]].height * scale);

	ctx.drawImage(gfxUI[UI_GFX_ICON_PAUSE], (p.ScreenX + 57) * scale, p.ScreenY * scale, gfxUI[UI_GFX_ICON_PAUSE].width * scale, gfxUI[UI_GFX_ICON_PAUSE].height * scale);
	ctx.drawImage(gfxUI[UI_GFX_ICON_SAVE], (p.ScreenX + 72) * scale, (p.ScreenY) * scale, gfxUI[UI_GFX_ICON_SAVE].width * scale, gfxUI[UI_GFX_ICON_SAVE].height * scale);
	ctx.drawImage(gfxUI[UI_GFX_ICON_SLEEP], (p.ScreenX + 57) * scale, (p.ScreenY + 16) * scale, gfxUI[UI_GFX_ICON_SLEEP].width * scale, gfxUI[UI_GFX_ICON_SLEEP].height * scale);
	ctx.drawImage(recolourUiGfx(gfxUI[UI_GFX_ICON_BACK], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), (p.ScreenX + 73) * scale, (p.ScreenY + 16) * scale, gfxUI[UI_GFX_ICON_BACK].width * scale, gfxUI[UI_GFX_ICON_BACK].height * scale);

	//ctx.drawImage(gfxUI[UI_GFX_ICON_SCROLL_UP],(p.ScreenX + 57)*scale,(p.ScreenY+32)*scale,gfxUI[UI_GFX_ICON_SCROLL_UP].width*scale,gfxUI[UI_GFX_ICON_SCROLL_UP].height*scale);    
	//ctx.drawImage(gfxUI[UI_GFX_ICON_SCROLL_DOWN],(p.ScreenX + 72)*scale,(p.ScreenY+32)*scale,gfxUI[UI_GFX_ICON_SCROLL_DOWN].width*scale,gfxUI[UI_GFX_ICON_SCROLL_DOWN].height*scale);    

	ctx.fillStyle = "#606060";

	ctx.fillRect((p.ScreenX + 50) * scale, (p.ScreenY) * scale, 1 * scale, 44 * scale);
	ctx.fillRect((p.ScreenX + 52) * scale, (p.ScreenY + 1) * scale, 1 * scale, 42 * scale);
	ctx.fillRect((p.ScreenX + 93) * scale, (p.ScreenY) * scale, 1 * scale, 44 * scale);
	ctx.fillRect((p.ScreenX + 91) * scale, (p.ScreenY + 1) * scale, 1 * scale, 42 * scale);

	ctx.fillRect((p.ScreenX + 1) * scale, (p.ScreenY + 47) * scale, 93 * scale, 7 * scale);
	writeFontImage(TEXT_COMMUNICATE, (p.ScreenX + 2), (p.ScreenY + 47), COLOUR[COLOUR_YELLOW]);
	ctx.fillRect((p.ScreenX + 1) * scale, (p.ScreenY + 55) * scale, 59 * scale, 7 * scale);
	writeFontImage(TEXT_COMMEND, (p.ScreenX + 2), (p.ScreenY + 55), COLOUR[COLOUR_YELLOW]);
	ctx.fillRect((p.ScreenX + 62) * scale, (p.ScreenY + 55) * scale, 32 * scale, 7 * scale);
	writeFontImage(TEXT_VIEW, (p.ScreenX + 64), (p.ScreenY + 55), COLOUR[COLOUR_YELLOW]);
	ctx.fillRect((p.ScreenX + 1) * scale, (p.ScreenY + 63) * scale, 34 * scale, 7 * scale);
	writeFontImage(TEXT_WAIT, (p.ScreenX + 2), (p.ScreenY + 63), COLOUR[COLOUR_YELLOW]);
	ctx.fillRect((p.ScreenX + 37) * scale, (p.ScreenY + 63) * scale, 57 * scale, 7 * scale);
	writeFontImage(TEXT_CORRECT, (p.ScreenX + 40), (p.ScreenY + 63), COLOUR[COLOUR_YELLOW]);
	ctx.fillRect((p.ScreenX + 1) * scale, (p.ScreenY + 71) * scale, 58 * scale, 7 * scale);
	writeFontImage(TEXT_DISMISS, (p.ScreenX + 2), (p.ScreenY + 71), COLOUR[COLOUR_YELLOW]);
	ctx.fillRect((p.ScreenX + 61) * scale, (p.ScreenY + 71) * scale, 33 * scale, 7 * scale);
	writeFontImage(TEXT_CALL, (p.ScreenX + 64), (p.ScreenY + 71), COLOUR[COLOUR_YELLOW]);

	ctx.drawImage(gfxUI[UI_GFX_CHAIN_LONG], (p.ScreenX + 1) * scale, (p.ScreenY + 80) * scale, gfxUI[UI_GFX_CHAIN_LONG].width * scale, gfxUI[UI_GFX_CHAIN_LONG].height * scale);

}

function rightUI(p) {

	if (p === player[0]) {
		ctx.drawImage(gfxUI[UI_GFX_NAME_BLUE], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI[UI_GFX_NAME_BLUE].width * scale, gfxUI[UI_GFX_NAME_BLUE].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_ARROWS_BLUE], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI[UI_GFX_ICON_ARROWS_BLUE].width * scale, gfxUI[UI_GFX_ICON_ARROWS_BLUE].height * scale);

	} else {
		ctx.drawImage(gfxUI[UI_GFX_NAME_RED], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI[UI_GFX_NAME_RED].width * scale, gfxUI[UI_GFX_NAME_RED].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_ARROWS_RED], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI[UI_GFX_ICON_ARROWS_RED].width * scale, gfxUI[UI_GFX_ICON_ARROWS_RED].height * scale);
	}

	writeFontImage(p.getChampion(p.championLeader).firstName, p.ScreenX / scale + 226, (p.ScreenY + 7), COLOUR[COLOUR_YELLOW]);
	ctx.drawImage(gfxUI[UI_GFX_ICON_SPELLBOOK], p.ScreenX + 226 * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_SPELLBOOK].width * scale, gfxUI[UI_GFX_ICON_SPELLBOOK].height * scale);
	ctx.drawImage(gfxUI[UI_GFX_ICON_SCROLL], p.ScreenX + 265 * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_SCROLL].width * scale, gfxUI[UI_GFX_ICON_SCROLL].height * scale);
	ctx.drawImage(gfxUI[UI_GFX_POCKETBOX], p.ScreenX + 288 * scale, (p.ScreenY + 21) * scale, gfxUI[UI_GFX_POCKETBOX].width * scale, gfxUI[UI_GFX_POCKETBOX].height * scale);

	if (p === player[0]) {
		ctx.drawImage(gfxUI[UI_GFX_ICON_OPENDOOR], (p.ScreenX + 289) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_OPENDOOR].width * scale, gfxUI[UI_GFX_ICON_OPENDOOR].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_POCKETS], (p.ScreenX + 305) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
	} else {
		ctx.drawImage(gfxUI[UI_GFX_ICON_OPENDOOR], (p.ScreenX + 289) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_OPENDOOR].width * scale, gfxUI[UI_GFX_ICON_OPENDOOR].height * scale);
		ctx.drawImage(gfxUI[UI_GFX_ICON_POCKETS], (p.ScreenX + 305) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
	}

	for (c = 0; c < p.champion.length; c++) {
		var ca = [0, 1, 3, 2];
		var c1 = ca[c];
		var ch = p.getChampion(c1);
		if (ch !== null) {
			var a = ch.prof;
			var b = ch.colour;
			if (!ch.monster.dead && ch.recruitment.attached) {
				if (c1 === p.championHighlite) {
					ctx.drawImage(gfxUI[UI_GFX_POCKET_SPADE + a][4], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
				} else {
					ctx.drawImage(gfxUI[UI_GFX_POCKET_SPADE + a][b], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
				}
			}
			if (c1 === p.championLeader) {
				drawRect(p.ScreenX + 289 + (c % 2) * 16, p.ScreenY + 46 + Math.floor(c / 2) * 15, 15 - (c % 2), 13, COLOUR[COLOUR_BLUE_DARK]);
				//if (c % 2 === 0) {
				//	ctx.drawImage(gfxUI[UI_GFX_ICON_SELECTED], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI[UI_GFX_ICON_SELECTED].width * scale, gfxUI[UI_GFX_ICON_SELECTED].height * scale);
				//} else {
				//	ctx.drawImage(gfxUI[UI_GFX_ICON_SELECTED], (p.ScreenX + 288 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI[UI_GFX_ICON_SELECTED].width * scale, gfxUI[UI_GFX_ICON_SELECTED].height * scale);
				//}

			}
		}
	}
	if (!p.attacking) {
		ctx.clearRect((p.ScreenX + 96) * scale, (p.ScreenY + 79) * scale, 128 * scale, 8 * scale);
		if (p.pocket.id > 0) {
			writeFontImage(p.pocket.itemRef.name, p.ScreenX + 98, p.ScreenY + 79, COLOUR[COLOUR_GREEN]);
		}
	}

	ctx.drawImage(gfxUI[UI_GFX_CHAIN_LONG], (p.ScreenX + 226) * scale, (p.ScreenY + 80) * scale, gfxUI[UI_GFX_CHAIN_LONG].width * scale, gfxUI[UI_GFX_CHAIN_LONG].height * scale);

}

function drawPocketUI(p) {

	if (p === player[0]) {
		ctx.drawImage(gfxUI[UI_GFX_NAME_BLUE], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI[UI_GFX_NAME_BLUE].width * scale, gfxUI[UI_GFX_NAME_BLUE].height * scale);
	} else {
		ctx.drawImage(gfxUI[UI_GFX_NAME_RED], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI[UI_GFX_NAME_RED].width * scale, gfxUI[UI_GFX_NAME_RED].height * scale);
	}

	var chp = p.getActivePocketChampion();
	//var ch = p.getOrderedChampionIds();
	//var cp = ch[p.uiRightPanel.activePocket];
	writeFontImage(chp.firstName, p.ScreenX / scale + 226, (p.ScreenY + 7), COLOUR[COLOUR_YELLOW]);

	var i = 0;
	for (y = 0; y < 2; y++) {
		for (x = 0; x < 6; x++) {
			var pocket = chp.pocket[i];
			var pocketId = pocket.id;
			if (pocketId === 0) {
				pocketId = UI_GFX_POCKET_EMPTY;
				if (y === 0) {
					switch (x) {
						case 0:
							pocketId = UI_GFX_POCKET_EMPTY_LEFT_HAND;
							break;
						case 1:
							pocketId = UI_GFX_POCKET_EMPTY_RIGHT_HAND;
							break;
						case 2:
							pocketId = UI_GFX_POCKET_EMPTY_AMOUR;
							break;
						case 3:
							pocketId = UI_GFX_POCKET_EMPTY_LARGE_SHIELD;
							break;
						default:
							break;
					}
				}
				if (pocketId === UI_GFX_POCKET_EMPTY_LEFT_HAND && chp.pocket[12].getType() === ITEM_TYPE_GLOVES) {
					ctx.drawImage(flipImageVert(recolourUiGfx(itemRef[chp.pocket[12].id].gfx, ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1])), ((p.ScreenX + 224) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, gfxUI[pocketId].width * scale, gfxUI[pocketId].height * scale);
				} else if (pocketId === UI_GFX_POCKET_EMPTY_RIGHT_HAND && chp.pocket[12].getType() === ITEM_TYPE_GLOVES) {
					ctx.drawImage(flipImageVert(flipImage(recolourUiGfx(itemRef[chp.pocket[12].id].gfx, ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]))), ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, gfxUI[pocketId].width * scale, gfxUI[pocketId].height * scale);
				} else {
					ctx.drawImage(recolourUiGfx(gfxUI[pocketId], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, gfxUI[pocketId].width * scale, gfxUI[pocketId].height * scale);
				}
			} else {
				ctx.drawImage(itemRef[pocketId].gfx, ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, itemRef[pocketId].gfx.width * scale, itemRef[pocketId].gfx.height * scale);
			}

			if (pocket.getType() === ITEM_TYPE_STACKABLE) {
				var qty = pocket.quantity;
				if (qty < 10) {
					qty = "0" + qty;
				}
				if (pocketId < 3) {
					writeFontImage(qty, ((p.ScreenX + 225) + (x * 16)), ((p.ScreenY + 23) + (y * 16)), COLOUR[COLOUR_GREEN]);
				} else {
					writeFontImage(qty, ((p.ScreenX + 225) + (x * 16)), ((p.ScreenY + 31) + (y * 16)), COLOUR[COLOUR_GREEN]);
				}

			}
			i++;
		}
	}

	ctx.drawImage(gfxUI[UI_GFX_GRAY_BAR], (p.ScreenX + 225) * scale, (p.ScreenY + 54) * scale, gfxUI[UI_GFX_GRAY_BAR].width * scale, gfxUI[UI_GFX_GRAY_BAR].height * scale);
	var ac = getArmourNotation(chp.getArmourClass());
	writeFontImage(TEXT_ARMOUR + ":", p.ScreenX / scale + 234, (p.ScreenY + 55), COLOUR[COLOUR_YELLOW]);
	writeFontImage(ac, p.ScreenX / scale + 289, (p.ScreenY + 55), COLOUR[COLOUR_WHITE]);

	var c1 = p.getOrderedChampionIds();
	for (c = 0; c < 6; c++) {
		var cid = c1[c];
		var g;
		var ch = p.getChampion(cid);

		if (c < 4 && ch !== null) {
			g = ch.prof + UI_GFX_POCKET_SPADE;
		}

		switch (c) {

			case 0:
			case 1:
			case 2:
			case 3:
				if (ch !== null) {
					if (ch.recruitment.attached) {
						ctx.drawImage(gfxUI[g][ch.colour], ((p.ScreenX + 225) + (c * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
					}
					if (chp.recruitment.recruited && c === p.uiRightPanel.activePocket) {
						drawRect(((p.ScreenX + 225) + (c * 16)), ((p.ScreenY + 63)), 15, 14, COLOUR[COLOUR_YELLOW]);
						//ctx.drawImage(gfxUI[UI_GFX_ICON_SELECTED], ((p.ScreenX + 225) + (c * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI[UI_GFX_ICON_SELECTED].width * scale, gfxUI[UI_GFX_ICON_SELECTED].height * scale);
					}
				}
				break
			case 4:
				{
					//pid = itemID(p.pocket.id);
					ctx.drawImage(itemRef[p.pocket.id].gfx, ((p.ScreenX + 225) + (c * 16)) * scale, (p.ScreenY + 63) * scale, itemRef[p.pocket.id].gfx.width * scale, itemRef[p.pocket.id].gfx.height * scale);
					if (p.pocket.getType() === ITEM_TYPE_STACKABLE) {
						var qty = p.pocket.quantity;
						if (qty < 10) {
							qty = "0" + qty;
						}
						if (p.pocket.id < 3) {
							writeFontImage(qty, ((p.ScreenX + 225) + (c * 16)), (p.ScreenY + 63), COLOUR[COLOUR_GREEN]);
						} else {
							writeFontImage(qty, ((p.ScreenX + 225) + (c * 16)), (p.ScreenY + 71), COLOUR[COLOUR_GREEN]);
						}
					}
					if (!p.attacking) {
						ctx.clearRect((p.ScreenX + 96) * scale, (p.ScreenY + 79) * scale, 128 * scale, 8 * scale);
						if (p.pocket.id > 0) {
							writeFontImage(p.pocket.itemRef.name, p.ScreenX + 98, p.ScreenY + 79, COLOUR[COLOUR_GREEN]);
							if (p.pocket.type === ITEM_TYPE_FOOD) {
								var t = foodBar(chp.food, 69);
								ctx.drawImage(t, (p.ScreenX + 146) * scale, (p.ScreenY + 80) * scale, t.width * scale, t.height * scale);
							}
						}
					}
					//ctx.drawImage(gfxUI[UI_GFX_POCKET_EMPTY], ((p.ScreenX + 225) + (c * 16)) * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
				};
				break
			case 5:
				{
					ctx.drawImage(recolourUiGfx(gfxUI[UI_GFX_ICON_BACK], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), ((p.ScreenX + 225) + (c * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
				};
				break

		}
	}


}

function highliteMovementArrow(p, m) {
	if (p.uiRightPanel.mode === UI_RIGHT_PANEL_MAIN) {
		var c = m + UI_CLICK_ROTATE_LEFT;
		var g = m + UI_GFX_MOVEMENT_ROTATE_LEFT;
		switch (m) {
			case 0:
				x = 228;
				y = 49;
				break;
			case 1:
				x = 239;
				y = 49;
				break;
			case 2:
				x = 254;
				y = 49;
				break;
			case 3:
				x = 226;
				y = 61;
				break;
			case 4:
				x = 238;
				y = 63;
				break;
			case 5:
				x = 257;
				y = 61;
				break;
			default:
				break;
		}
		ctx.drawImage(gfxUI[g], (p.ScreenX + x) * scale, (p.ScreenY + y) * scale, gfxUI[g].width * scale, gfxUI[g].height * scale);
		setTimeout(function() {
			if (p === player[0]) {
				ctx.drawImage(gfxUI[UI_GFX_ICON_ARROWS_BLUE], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI[UI_GFX_ICON_ARROWS_BLUE].width * scale, gfxUI[UI_GFX_ICON_ARROWS_BLUE].height * scale);
			} else {
				ctx.drawImage(gfxUI[UI_GFX_ICON_ARROWS_RED], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI[UI_GFX_ICON_ARROWS_RED].width * scale, gfxUI[UI_GFX_ICON_ARROWS_RED].height * scale);
			}
		}, 150);
	}
}

function drawStatsPage(p) {
	var ch = p.getChampion(p.championLeader);
	if (ch !== null) {
		ctx.drawImage(gfxUI[UI_GFX_SCRIPT], (p.ScreenX + 226) * scale, (p.ScreenY - 1) * scale, gfxUI[UI_GFX_SCRIPT].width * scale, gfxUI[UI_GFX_SCRIPT].height * scale);
		writeFontImage(TEXT_LEVEL, p.ScreenX + 242, (p.ScreenY + 15), COLOUR[COLOUR_YELLOW]);
		writeFontImage("~", p.ScreenX + 285, (p.ScreenY + 15), COLOUR[COLOUR_GREY_DARKEST]);
		writeFontImage("0" + ch.level.toString(), p.ScreenX + 297, (p.ScreenY + 15), COLOUR[COLOUR_WHITE]);

		writeFontImage(TEXT_ST, p.ScreenX + 242, (p.ScreenY + 23), COLOUR[COLOUR_BLUE_DARK]);
		writeFontImage(ch.stat.str.toString(), p.ScreenX + 258, (p.ScreenY + 23), COLOUR[COLOUR_YELLOW]);
		writeFontImage("-", p.ScreenX + 274, (p.ScreenY + 23), COLOUR[COLOUR_GREY_DARKEST]);
		writeFontImage(TEXT_AG, p.ScreenX + 281, (p.ScreenY + 23), COLOUR[COLOUR_BLUE_DARK]);
		writeFontImage(ch.stat.agi.toString(), p.ScreenX + 297, (p.ScreenY + 23), COLOUR[COLOUR_YELLOW]);

		writeFontImage(TEXT_IN, p.ScreenX + 242, (p.ScreenY + 31), COLOUR[COLOUR_BLUE_DARK]);
		writeFontImage(ch.stat.int.toString(), p.ScreenX + 258, (p.ScreenY + 31), COLOUR[COLOUR_YELLOW]);
		writeFontImage("-", p.ScreenX + 274, (p.ScreenY + 31), COLOUR[COLOUR_GREY_DARKEST]);
		writeFontImage(TEXT_CH, (p.ScreenX + 281), (p.ScreenY + 31), COLOUR[COLOUR_BLUE_DARK]);
		writeFontImage(ch.stat.cha.toString(), p.ScreenX + 297, (p.ScreenY + 31), COLOUR[COLOUR_YELLOW]);

		writeFontImage(TEXT_HP, p.ScreenX + 242, (p.ScreenY + 39), COLOUR[COLOUR_BLACK]);
		writeFontImage(ch.stat.hp.toString(), p.ScreenX + 282, (p.ScreenY + 39), COLOUR[COLOUR_WHITE], FONT_ALIGNMENT_RIGHT);
		writeFontImage("/", p.ScreenX + 282, (p.ScreenY + 39), COLOUR[COLOUR_GREY_DARKEST]);
		writeFontImage(ch.stat.hpMax.toString(), p.ScreenX + 290, (p.ScreenY + 39), COLOUR[COLOUR_GREEN]);

		writeFontImage(TEXT_VI, p.ScreenX + 242, (p.ScreenY + 47), COLOUR[COLOUR_BLACK]);
		writeFontImage(ch.stat.vit.toString(), p.ScreenX + 282, (p.ScreenY + 47), COLOUR[COLOUR_WHITE], FONT_ALIGNMENT_RIGHT);
		writeFontImage("/", p.ScreenX + 282, (p.ScreenY + 47), COLOUR[COLOUR_GREY_DARKEST]);
		writeFontImage(ch.stat.vitMax.toString(), p.ScreenX + 290, (p.ScreenY + 47), COLOUR[COLOUR_GREEN]);

		writeFontImage("FOOD", p.ScreenX + 258, (p.ScreenY + 55), COLOUR[COLOUR_YELLOW]);
		var t = foodBar(ch.food, 62);
		ctx.drawImage(t, (p.ScreenX + 242) * scale, (p.ScreenY + 64) * scale, t.width * scale, t.height * scale);
	}
}

function createShield(id, type, colour) {

	//ID = Characters ID i.e. 0 = Blodwyn
	//Type = 0 to 3 = Spade,Heart

	switch (colour) {

		case 0:
			{
				colour = PALETTE_SERPENT;
			};
			break;
		case 1:
			{
				colour = PALETTE_CHAOS;
			};
			break;
		case 2:
			{
				colour = PALETTE_DRAGON;
			};
			break;
		case 3:
			{
				colour = PALETTE_MOON;
			};
			break;
		default:
			{
				colour = PALETTE_DEAD;
			}

	}

	var can = document.createElement('canvas');
	can.width = 30;
	can.height = 41;
	var context = can.getContext("2d");
	if (colour === PALETTE_DEAD) {
		context.drawImage(recolourUiGfx(gfxUI[UI_GFX_SHIELD_TOP], SHIELD_PALETTE_DEFAULT[0], COLOUR[COLOUR_BLACK]), 0, 0);
		context.drawImage(recolourUiGfx(gfxUI[UI_GFX_SHIELD_CHARACTERS][id], SHIELD_PALETTE_DEFAULT[0], COLOUR[COLOUR_BLACK]), 0, 5);
		context.drawImage(recolourSprite(gfxUI[UI_GFX_SHIELD_TYPES][type], SHIELD_PALETTE_DEFAULT, colour), 1, 21);
		context.drawImage(recolourUiGfx(gfxUI[UI_GFX_SHIELD_BOTTOM], SHIELD_PALETTE_DEFAULT[0], COLOUR[COLOUR_BLACK]), 5, 32);
	} else {
		context.drawImage(recolourUiGfx(gfxUI[UI_GFX_SHIELD_TOP], SHIELD_PALETTE_DEFAULT[0], COLOUR[COLOUR_GREY_LIGHT]), 0, 0);
		context.drawImage(recolourUiGfx(gfxUI[UI_GFX_SHIELD_CHARACTERS][id], SHIELD_PALETTE_DEFAULT[0], COLOUR[COLOUR_GREY_LIGHT]), 0, 5);
		context.drawImage(recolourSprite(gfxUI[UI_GFX_SHIELD_TYPES][type], SHIELD_PALETTE_DEFAULT, colour), 1, 21);
		context.drawImage(recolourUiGfx(gfxUI[UI_GFX_SHIELD_BOTTOM], SHIELD_PALETTE_DEFAULT[0], COLOUR[COLOUR_GREY_LIGHT]), 5, 32);
	}

	context.save();
	return can;

}

function uiClickAreas() {

	//X , Y , WIDTH , HEIGHT

	var UCA = [];

	UCA.push({
		x: 0,
		y: 0,
		width: 50,
		height: 44
	}); //CHAMP 1
	UCA.push({
		x: 51,
		y: 0,
		width: 43,
		height: 44
	}); //STATS GRAPH
	UCA.push({
		x: 0,
		y: 45,
		width: 30,
		height: 41
	}); //CHAMP 2
	UCA.push({
		x: 32,
		y: 45,
		width: 30,
		height: 41
	}); //CHAMP 3
	UCA.push({
		x: 64,
		y: 45,
		width: 30,
		height: 41
	}); //CHAMP 4

	UCA.push({
		x: 96,
		y: 13,
		width: 128,
		height: 76
	}); //3D VIEWPORT

	UCA.push({
		x: 226,
		y: 1,
		width: 94,
		height: 19
	}); //NAME TAG AREA
	UCA.push({
		x: 226,
		y: 22,
		width: 37,
		height: 22
	}); //SPELLBOOK
	UCA.push({
		x: 265,
		y: 22,
		width: 22,
		height: 22
	}); //CHARACTER STATS
	UCA.push({
		x: 289,
		y: 22,
		width: 16,
		height: 16
	}); //INTERACT
	UCA.push({
		x: 305,
		y: 22,
		width: 16,
		height: 16
	}); //OPEN POCKETS
	UCA.push({
		x: 226,
		y: 47,
		width: 13,
		height: 13
	}); //ROTATE LEFT
	UCA.push({
		x: 239,
		y: 47,
		width: 16,
		height: 13
	}); //MOVE FORWARD
	UCA.push({
		x: 255,
		y: 47,
		width: 13,
		height: 13
	}); //ROTATE RIGHT
	UCA.push({
		x: 226,
		y: 60,
		width: 13,
		height: 14
	}); //MOVE LEFT
	UCA.push({
		x: 239,
		y: 60,
		width: 16,
		height: 14
	}); //MOVE BACKWARDS
	UCA.push({
		x: 255,
		y: 60,
		width: 13,
		height: 14
	}); //MOVE RIGHT
	UCA.push({
		x: 269,
		y: 45,
		width: 17,
		height: 16
	}); //ATTACK
	UCA.push({
		x: 269,
		y: 61,
		width: 17,
		height: 15
	}); //DEFEND

	UCA.push({
		x: 225,
		y: 23,
		width: 16,
		height: 16
	}); //POCKET SLOT 1
	UCA.push({
		x: 241,
		y: 23,
		width: 16,
		height: 16
	}); //POCKET SLOT 2
	UCA.push({
		x: 257,
		y: 23,
		width: 16,
		height: 16
	}); //POCKET SLOT 3
	UCA.push({
		x: 273,
		y: 23,
		width: 16,
		height: 16
	}); //POCKET SLOT 4
	UCA.push({
		x: 289,
		y: 23,
		width: 16,
		height: 16
	}); //POCKET SLOT 5
	UCA.push({
		x: 305,
		y: 23,
		width: 16,
		height: 16
	}); //POCKET SLOT 6    
	UCA.push({
		x: 225,
		y: 38,
		width: 16,
		height: 16
	}); //POCKET SLOT 7
	UCA.push({
		x: 241,
		y: 38,
		width: 16,
		height: 16
	}); //POCKET SLOT 8
	UCA.push({
		x: 257,
		y: 38,
		width: 16,
		height: 16
	}); //POCKET SLOT 9
	UCA.push({
		x: 273,
		y: 38,
		width: 16,
		height: 16
	}); //POCKET SLOT 10
	UCA.push({
		x: 289,
		y: 38,
		width: 16,
		height: 16
	}); //POCKET SLOT 11
	UCA.push({
		x: 305,
		y: 38,
		width: 16,
		height: 16
	}); //POCKET SLOT 12    
	UCA.push({
		x: 225,
		y: 63,
		width: 16,
		height: 15
	}); //POCKET CHARACTER 0
	UCA.push({
		x: 241,
		y: 63,
		width: 16,
		height: 15
	}); //POCKET CHARACTER 1
	UCA.push({
		x: 257,
		y: 63,
		width: 16,
		height: 15
	}); //POCKET CHARACTER 2
	UCA.push({
		x: 273,
		y: 63,
		width: 16,
		height: 15
	}); //POCKET CHARACTER 3
	UCA.push({
		x: 289,
		y: 63,
		width: 16,
		height: 15
	}); //POCKET HAND
	UCA.push({
		x: 305,
		y: 63,
		width: 16,
		height: 15
	}); //POCKET BACK

	UCA.push({
		x: 56,
		y: 0,
		width: 16,
		height: 16
	}); //PAUSE BUTTON
	UCA.push({
		x: 73,
		y: 0,
		width: 16,
		height: 16
	}); //SAVE BUTTON
	UCA.push({
		x: 56,
		y: 16,
		width: 16,
		height: 16
	}); //SLEEP BUTTON
	UCA.push({
		x: 73,
		y: 16,
		width: 16,
		height: 16
	}); //LEFT BACK BUTTON
	UCA.push({
		x: 58,
		y: 34,
		width: 16,
		height: 16
	}); //SCROLLUP BUTTON
	UCA.push({
		x: 73,
		y: 34,
		width: 16,
		height: 16
	}); //SCROLLDOWN BUTTON
	UCA.push({
		x: 289,
		y: 46,
		width: 16,
		height: 14
	}); //Character Front Left Icon
	UCA.push({
		x: 305,
		y: 46,
		width: 16,
		height: 14
	}); //Character Front Right Icon
	UCA.push({
		x: 289,
		y: 61,
		width: 16,
		height: 14
	}); //Character Back Left Icon
	UCA.push({
		x: 305,
		y: 61,
		width: 16,
		height: 14
	}); //Character Back Right Icon
	UCA.push({
		x: 225,
		y: 0,
		width: 95,
		height: 86
	}); //Character Stats Exit
	UCA.push({
		x: 255,
		y: -1,
		width: 35,
		height: 8
	}); //Spell Book Exit
	UCA.push({
		x: 0,
		y: 0,
		width: 320,
		height: 86
	}); //Player Area
	UCA.push({
		x: 135,
		y: 25,
		width: 50,
		height: 15
	}); //Portal - Shelf Top
	UCA.push({
		x: 135,
		y: 40,
		width: 50,
		height: 15
	}); //Portal - Shelf Bottom
	UCA.push({
		x: 135,
		y: 25,
		width: 50,
		height: 29
	}); //Portal - Switch
	UCA.push({
		x: 118,
		y: 12,
		width: 83,
		height: 53
	}); //Portal - Door
	UCA.push({
		x: 110,
		y: 71,
		width: 45,
		height: 7
	}); //Portal - Item Close Left
	UCA.push({
		x: 165,
		y: 71,
		width: 45,
		height: 7
	}); //Portal - Item Close Right
	UCA.push({
		x: 120,
		y: 62,
		width: 35,
		height: 9
	}); //Portal - Item Back Left
	UCA.push({
		x: 165,
		y: 62,
		width: 35,
		height: 9
	}); //Portal - Item Back Right
	UCA.push({
		x: 111,
		y: 8,
		width: 98,
		height: 63
	}); //Portal - Wooden Door       
	UCA.push({
		x: 113,
		y: 52,
		width: 15,
		height: 15
	}); //Fairy - Serpent Spell
	UCA.push({
		x: 129,
		y: 52,
		width: 15,
		height: 15
	}); //Fairy - Chaos Spell  
	UCA.push({
		x: 145,
		y: 52,
		width: 15,
		height: 15
	}); //Fairy - Dragon Spell  
	UCA.push({
		x: 161,
		y: 52,
		width: 15,
		height: 15
	}); //Fairy - Moon Spell  
	UCA.push({
		x: 192,
		y: 52,
		width: 15,
		height: 15
	}); //Fairy - Back Button   
	UCA.push({
		x: 136,
		y: 12,
		width: 85,
		height: 10
	}); //Fairy - Text Area 1 
	UCA.push({
		x: 136,
		y: 22,
		width: 85,
		height: 10
	}); //Fairy - Text Area 2 
	UCA.push({
		x: 226,
		y: -1,
		width: 30,
		height: 8
	}); //Spell Book - Turn Page Back 
	UCA.push({
		x: 290,
		y: -1,
		width: 30,
		height: 8
	}); //Spell Book - Turn Page Forward
	UCA.push({
		x: 232,
		y: 14,
		width: 34,
		height: 8
	}); //Spell Book - Spell 1  
	UCA.push({
		x: 232,
		y: 22,
		width: 34,
		height: 8
	}); //Spell Book - Spell 2
	UCA.push({
		x: 232,
		y: 30,
		width: 34,
		height: 8
	}); //Spell Book - Spell 3  
	UCA.push({
		x: 232,
		y: 38,
		width: 34,
		height: 8
	}); //Spell Book - Spell 4  
	UCA.push({
		x: 280,
		y: 14,
		width: 34,
		height: 8
	}); //Spell Book - Spell 5  
	UCA.push({
		x: 280,
		y: 22,
		width: 34,
		height: 8
	}); //Spell Book - Spell 6
	UCA.push({
		x: 280,
		y: 30,
		width: 34,
		height: 8
	}); //Spell Book - Spell 7  
	UCA.push({
		x: 280,
		y: 38,
		width: 34,
		height: 8
	}); //Spell Book - Spell 8  
	return UCA;

}

function uiClickInArea(x, y, ui, p) {
	if (x >= (p.ScreenX + uiClickArea[ui].x) * scale && x < (p.ScreenX + uiClickArea[ui].x + uiClickArea[ui].width) * scale && y >= (p.ScreenY + uiClickArea[ui].y) * scale && y < (p.ScreenY + uiClickArea[ui].y + uiClickArea[ui].height) * scale) {
		if (ui !== UI_CLICK_VIEWPORT && ui !== UI_CLICK_PLAYERS_AREA) {
			ctx.fillStyle = 'rgb(255, 255, 196)';
			ctx.fillRect((p.ScreenX + uiClickArea[ui].x) * scale, (p.ScreenY + uiClickArea[ui].y) * scale, uiClickArea[ui].width * scale, uiClickArea[ui].height * scale);
		}
		return true;
	}
	return false;
}

function toggleChampUI(i, p, set) {
	if (typeof set === "undefined") {
		if (p.uiLeftPanel.champs[i]) {
			p.uiLeftPanel.champs[i] = false;
		} else {
			p.uiLeftPanel.champs[i] = true;
		}
	} else {
		p.uiLeftPanel.champs[i] = set;
	}
}

function recolourUiGfx(img, colourFrom, colourTo) {

	var can = document.createElement('canvas');
	can.width = img.width;
	can.height = img.height;
	var canContent = can.getContext("2d");
	canContent.drawImage(img, 0, 0);
	var imageData = canContent.getImageData(0, 0, can.width, can.height);

	for (var i = 0; i < imageData.data.length; i += 4) {
		// is this pixel the old rgb?
		if (imageData.data[i] === colourFrom[0] &&
			imageData.data[i + 1] === colourFrom[1] &&
			imageData.data[i + 2] === colourFrom[2]
		) {
			// change to your new rgb
			imageData.data[i] = colourTo[0];
			imageData.data[i + 1] = colourTo[1];
			imageData.data[i + 2] = colourTo[2];
		}
	}

	canContent.putImageData(imageData, 0, 0);
	canContent.save();
	return can;
}

function foodBar(foodVal, width) {
	var can = document.createElement('canvas');
	can.width = width;
	can.height = 5;
	var canContent = can.getContext("2d");
	var t = Math.floor(foodVal / 200.0 * (width - 12));
	canContent.drawImage(gfxUI[UI_GFX_FOOD_POINTER], 0, 1);
	canContent.fillStyle = 'rgb(' + COLOUR[COLOUR_RED_DARK][0] + ',' + COLOUR[COLOUR_RED_DARK][1] + ',' + COLOUR[COLOUR_RED_DARK][2] + ')';
	canContent.fillRect(6, 0, t, 5);
	canContent.drawImage(flipImage(gfxUI[UI_GFX_FOOD_POINTER]), width - 4, 1);
	canContent.save();
	return can;
}

function coverViewPort(p) {

	p.Portal.fillStyle = 'rgb(0, 0, 0)';
	p.Portal.fillRect(0.5, 0.5, 128 * scale, 76 * scale);
	drawRect(1, 0, 125, 74, COLOUR[COLOUR_GREY_DARK], p);
	drawRect(0, 0, 127, 75, COLOUR[COLOUR_GREY_LIGHT], p);
	drawRect(2, 1, 123, 72, COLOUR[COLOUR_GREY_LIGHT], p);

}

function gotoFairyMode(p, m) {
	if (p.uiCenterPanel.mode !== m) {
		var ch = p.fairyDetails.champ;
		if (m === UI_CENTER_PANEL_FAIRY) {
			p.message(ch.firstName + " MAY BUY A SPELL-PICK A CLASS", COLOUR[COLOUR_GREEN], false, 0);
		} else if (m === UI_CENTER_PANEL_FAIRY_SERPENT || m === UI_CENTER_PANEL_FAIRY_CHAOS || m === UI_CENTER_PANEL_FAIRY_DRAGON || m === UI_CENTER_PANEL_FAIRY_MOON) {
			p.message("SELECT THY NEW SPELL, " + ch.firstName, COLOUR[COLOUR_GREEN], false, 0);
		} else if (m === UI_CENTER_PANEL_FAIRY_SPELLDETAILS) {

		}
		p.uiCenterPanel.mode = m;
		showFairy(ch, p);
	}
}

function showFairy(c, p) {

	//ctx.clearRect(p.ScreenX * scale, (p.ScreenY -10) * scale, 320 * scale, 6 * scale);
	coverViewPort(p);

	if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY) {
		//ctx.clearRect(p.ScreenX, p.ScreenY, 320 * scale, 8 * scale);
		//p.message(c.firstName + " MAY BUY A SPELL-PICK A CLASS", COLOUR[COLOUR_GREEN], false, 3000);
		//writeFontImage(c.firstName + " MAY BUY A SPELL-PICK A CLASS", p.ScreenX, (p.ScreenY -10) * scale, COLOUR[COLOUR_GREEN]);
		p.Portal.drawImage(gfxUI[UI_GFX_FAIRIES][0], 8 * scale, 5 * scale, gfxUI[UI_GFX_FAIRIES][0].width * scale, gfxUI[UI_GFX_FAIRIES][0].height * scale);
		for (x = 0; x < 5; x++) {
			if (x < 4) {
				p.Portal.drawImage(gfxUI[80 + x], (17 + (x * 16)) * scale, 50 * scale, gfxUI[80 + x].width * scale, gfxUI[80 + x].height * scale);
			} else {
				p.Portal.drawImage(recolourUiGfx(gfxUI[UI_GFX_ICON_BACK], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), (32 + (x * 16)) * scale, 50 * scale, gfxUI[UI_GFX_ICON_BACK].width * scale, gfxUI[UI_GFX_ICON_BACK].height * scale);
			}
		}
	} else {
		//writeFontImage("SELECT THY NEW SPELL, "+c.firstName, p.ScreenX, (p.ScreenY -10) * scale, COLOUR[COLOUR_GREEN]);
	}
	if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_SERPENT) {
		showFairySpellScreen(0, p, c);
	}
	if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_CHAOS) {
		showFairySpellScreen(1, p, c);
	}
	if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_DRAGON) {
		showFairySpellScreen(2, p, c);
	}
	if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_MOON) {
		showFairySpellScreen(3, p, c);
	}
	if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_SPELLDETAILS) {
		showFairySpellDetailsScreen(p.fairyDetails.spell, p, c);
	}

}

function showFairySpellScreen(spellClass, p, c) {

	p.Portal.drawImage(gfxUI[UI_GFX_FAIRIES][spellClass + 1], 8 * scale, 5 * scale, gfxUI[UI_GFX_FAIRIES][spellClass + 1].width * scale, gfxUI[UI_GFX_FAIRIES][spellClass + 1].height * scale);

	var mySpells = c.getUnlearntSpellsByColour(spellClass);
	var spellColour = null;

	switch (spellClass) {

		case 0:
			{
				spellColour = COLOUR[COLOUR_GREEN];
			};
			break
		case 1:
			{
				spellColour = COLOUR[COLOUR_YELLOW];
			};
			break
		case 2:
			{
				spellColour = COLOUR[COLOUR_RED];
			};
			break
		case 3:
			{
				spellColour = COLOUR[COLOUR_BLUE];
			};
			break

	}
	writeFontImage(mySpells[0].name, 43, 12, spellColour, FONT_ALIGNMENT_LEFT, p.Portal);
	writeFontImage(mySpells[1].name, 43, 22, spellColour, FONT_ALIGNMENT_LEFT, p.Portal);
	p.Portal.drawImage(recolourUiGfx(gfxUI[UI_GFX_ICON_BACK], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), (32 + (4 * 16)) * scale, 50 * scale, gfxUI[UI_GFX_ICON_BACK].width * scale, gfxUI[UI_GFX_ICON_BACK].height * scale);
}

function showFairySpellDetailsScreen(spell, p, c) {

	var spellColour = [];
	var spellClass = spell.colour;

	p.Portal.drawImage(gfxUI[UI_GFX_FAIRIES][spellClass + 1], 8 * scale, 5 * scale, gfxUI[UI_GFX_FAIRIES][spellClass + 1].width * scale, gfxUI[UI_GFX_FAIRIES][spellClass + 1].height * scale);

	switch (spellClass) {

		case 0:
			{
				spellColour = COLOUR[COLOUR_GREEN];
			};
			break
		case 1:
			{
				spellColour = COLOUR[COLOUR_YELLOW];
			};
			break
		case 2:
			{
				spellColour = COLOUR[COLOUR_RED];
			};
			break
		case 3:
			{
				spellColour = COLOUR[COLOUR_BLUE];
			};
			break

	}

	writeFontImage(spell.name, 43, 12, spellColour, FONT_ALIGNMENT_LEFT, p.Portal);
	writeFontImage("LEVEL " + spell.level, 43, 23, COLOUR[COLOUR_GREY_LIGHT], FONT_ALIGNMENT_LEFT, p.Portal);
	writeFontImage(spell.cost + " GOLD", 43, 31, COLOUR[COLOUR_GREY_LIGHT], FONT_ALIGNMENT_LEFT, p.Portal);
	p.message(spell.description, COLOUR[COLOUR_GREEN], false, 0);

	for (x = 0; x < 5; x++) {
		if (x < 4) {
			if (x === spellClass) {
				p.Portal.drawImage(gfxUI[80 + x], 17 * scale, 50 * scale, gfxUI[80 + x].width * scale, gfxUI[80 + x].height * scale);
			}
		} else {
			p.Portal.drawImage(recolourUiGfx(gfxUI[UI_GFX_ICON_BACK], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), (32 + (x * 16)) * scale, 50 * scale, gfxUI[UI_GFX_ICON_BACK].width * scale, gfxUI[UI_GFX_ICON_BACK].height * scale);
		}
	}

	writeFontImage("OK ?", 43, 55, COLOUR[COLOUR_RED], FONT_ALIGNMENT_LEFT, p.Portal);

}
