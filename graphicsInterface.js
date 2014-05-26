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

    return ImageArray;

}

function drawUI(p) {
    if (redrawPlayerUiFlag === p.id + 1 || redrawPlayerUiFlag === 3) {
        if (typeof gfxUI !== "undefined" && gfxUI !== null) {
            ctx.clearRect(p.ScreenX * scale, (p.ScreenY - 2) * scale, 94 * scale, 90 * scale);
            ctx.clearRect((p.ScreenX + 225) * scale, (p.ScreenY - 2) * scale, 95 * scale, 90 * scale);
            switch (p.uiLeftPanel.mode) {
                case LEFT_PANEL_MODE_STATS:
                    {
                        leftUI(p);
                    };
                    break
                case LEFT_PANEL_MODE_COMMAND:
                    {
                        commandUI(p);
                    };
                    break
            }

            switch (p.uiRightPanel.view) {
                case UI_RIGHT_PANEL_MAIN:
                    {
                        rightUI(p);
                    };
                    break
                case UI_RIGHT_PANEL_POCKETS:
                    {
                        drawPocketUI(p);
                    };
                    break
                case UI_RIGHT_PANEL_SPELLBOOK:
                    {
                        spellBook(p);
                    };
                    break
                case UI_RIGHT_PANEL_STATS:
                    {
                        drawStatsPage(p);
                    };
                    break
            }

            myDIx(ctx, gfx["misc"]["separator"], [0, 0, 320, 7, 0, 96]);
        }
    }
}

function spellBook(p) {

    ctx.drawImage(gfxUI[UI_GFX_SPELLBOOK], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI[UI_GFX_SPELLBOOK].width * scale, gfxUI[UI_GFX_SPELLBOOK].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_GREY], p.ScreenX + 226 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].width * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT], p.ScreenX + 241 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_LEFT], p.ScreenX + 257 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_LEFT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_LEFT].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_RIGHT], p.ScreenX + 273 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_RIGHT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_RIGHT].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT], p.ScreenX + 289 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT].width * scale, gfxUI[UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT].height * scale);
    ctx.drawImage(gfxUI[UI_GFX_ICON_SPELL_GREY], p.ScreenX + 305 * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].width * scale, gfxUI[UI_GFX_ICON_SPELL_GREY].height * scale);

    writeFontImage(TEXT_SP_PTS, p.ScreenX + 226, (p.ScreenY + 78), COLOUR[COLOUR_PINK]);
    writeFontImage("0" + champion[p.champion[0]].stat.sp + "/0" + champion[p.champion[0]].stat.spMax, p.ScreenX + 280, (p.ScreenY + 78), COLOUR[COLOUR_GREEN]);

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

    var ch = p.getOrderedChampionIds();
    for (c = 0; c < 4; c++) {
        var c1 = ch[c];
        var champ = p.champion[c1];
        if (c === 0) {
            if (p.uiLeftPanel.champs[c] === true) {
                ctx.drawImage(gfxUI[UI_GFX_CHAIN_VERT], (c + 2 * scale) + (p.ScreenX * scale), (p.ScreenY + 5) * scale, gfxUI[UI_GFX_CHAIN_VERT].width * scale, gfxUI[UI_GFX_CHAIN_VERT].height * scale);
                var t = drawCharacter(monster[6][champ], 0, 0, p, {
                    x: 0,
                    y: -1
                }, true, false)
                ctx.drawImage(t, (c - 38 * scale) + (p.ScreenX * scale) * scale, (p.ScreenY - 32) * scale, t.width * scale, t.height * scale);
                ctx.drawImage(gfxUI[UI_GFX_CHAIN_VERT], (c + 43 * scale) + (p.ScreenX * scale), (p.ScreenY + 5) * scale, gfxUI[UI_GFX_CHAIN_VERT].width * scale, gfxUI[UI_GFX_CHAIN_VERT].height * scale);
            } else {
                ctx.drawImage(gfxUI[UI_GFX_CHARACTER_BOX], p.ScreenX * scale, p.ScreenY * scale, gfxUI[UI_GFX_CHARACTER_BOX].width * scale, gfxUI[UI_GFX_CHARACTER_BOX].height * scale);
                ctx.drawImage(gfxUI[UI_GFX_PORTRAITS][champ], (p.ScreenX + 8) * scale, (p.ScreenY + 8) * scale, gfxUI[UI_GFX_PORTRAITS][champ].width * scale, gfxUI[UI_GFX_PORTRAITS][champ].height * scale);
            }
        } else {
            var t;
            if (champion[champ].monster.dead) {
                t = createShield(champ, champion[champ].prof, 4);
                ctx.drawImage(t, (((c - 1) * 32 + p.ScreenX) * scale), (p.ScreenY + 45) * scale, t.width * scale, t.height * scale);
            } else if (p.uiLeftPanel.champs[c] === true) {
                ctx.drawImage(gfxUI[UI_GFX_SHIELD], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI[UI_GFX_SHIELD].width * scale, gfxUI[UI_GFX_SHIELD].height * scale);
                t = drawCharacter(monster[6][champ], 0, 1, p, {
                    x: 0,
                    y: 0
                }, true, false);
                ctx.drawImage(t, ((c - 1) * 32 * scale) + (p.ScreenX * scale) - 49 * scale, (p.ScreenY + 45) * scale - 37 * scale, t.width * scale, t.height * scale);
            } else {
                t = createShield(champ, champion[champ].prof, champion[champ].colour);
                ctx.drawImage(t, (((c - 1) * 32 + p.ScreenX) * scale), (p.ScreenY + 45) * scale, t.width * scale, t.height * scale);
            }
        }
    }
}

function leftUIStats(p) {
    if (p.uiLeftPanel.champs[0] === true) {
        var ch = p.getOrderedChampionIds();
        for (c = 0; c < p.champion.length; c++) {
            var c1 = ch[c];
            var champ = champion[p.champion[c1]];
            var rgb = getClassColour(champ.colour);
            var hp = Math.floor(21 * champ.stat.hp / champ.stat.hpMax);
            if (hp < 0) {
                hp = 0;
            }
            ctx.fillStyle = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
            ctx.fillRect((p.ScreenX + 55 + c * 9) * scale, (p.ScreenY + 35 - hp) * scale, 7 * scale, hp * scale);
        }
    } else {
        var champ = champion[p.champion[p.championLeader]];
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
    ctx.drawImage(gfxUI[UI_GFX_POCKETBOX], p.ScreenX + 290 * scale, (p.ScreenY + 21) * scale, gfxUI[UI_GFX_POCKETBOX].width * scale, gfxUI[UI_GFX_POCKETBOX].height * scale);

    if (p === player[0]) {
        ctx.drawImage(gfxUI[UI_GFX_ICON_OPENDOOR], (p.ScreenX + 289) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_OPENDOOR].width * scale, gfxUI[UI_GFX_ICON_OPENDOOR].height * scale);
        ctx.drawImage(gfxUI[UI_GFX_ICON_POCKETS], (p.ScreenX + 305) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
    } else {
        ctx.drawImage(gfxUI[UI_GFX_ICON_OPENDOOR], (p.ScreenX + 289) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_OPENDOOR].width * scale, gfxUI[UI_GFX_ICON_OPENDOOR].height * scale);
        ctx.drawImage(gfxUI[UI_GFX_ICON_POCKETS], (p.ScreenX + 305) * scale, (p.ScreenY + 22) * scale, gfxUI[UI_GFX_ICON_POCKETS].width * scale, gfxUI[UI_GFX_ICON_POCKETS].height * scale);
    }
    
    for (c = 0;c < 4;c++){
        var a = p.getChampion(c).prof;
        var b = p.getChampion(c).colour;
        ctx.drawImage(gfxUI[UI_GFX_POCKET_SPADE+a][b], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
        if (c === p.championLeader){
            ctx.drawImage(gfxUI[UI_GFX_ICON_SELECTED], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI[UI_GFX_ICON_SELECTED].width * scale, gfxUI[UI_GFX_ICON_SELECTED].height * scale);
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
                ctx.drawImage(recolourUiGfx(gfxUI[pocketId], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, gfxUI[pocketId].width * scale, gfxUI[pocketId].height * scale);
            } else {
                ctx.drawImage(itemRef[pocketId].gfx, ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, itemRef[pocketId].gfx.width * scale, itemRef[pocketId].gfx.height * scale);
            }

            if (pocket.getType() === ITEM_TYPE_STACKABLE) {
                var qty = pocket.quantity;
                if (qty < 10) {
                    qty = "0" + qty;
                }
                writeFontImage(qty, ((p.ScreenX + 225) + (x * 16)), ((p.ScreenY + 23) + (y * 16)), COLOUR[COLOUR_GREEN]);
            }
            i++;
        }
    }

    ctx.drawImage(gfxUI[UI_GFX_GRAY_BAR], (p.ScreenX + 226) * scale, (p.ScreenY + 54) * scale, gfxUI[UI_GFX_GRAY_BAR].width * scale, gfxUI[UI_GFX_GRAY_BAR].height * scale);
    var ac = "" + chp.getArmourClass();
    if (ac >= 0) {
        ac = "+" + ac;
    } else {
        ac = "-" + ac;
    }
    writeFontImage(TEXT_ARMOUR + ":", p.ScreenX / scale + 233, (p.ScreenY + 55), COLOUR[COLOUR_YELLOW]);
    writeFontImage(ac, p.ScreenX / scale + 289, (p.ScreenY + 55), COLOUR[COLOUR_WHITE]);

    var ch = p.getOrderedChampionIds();
    for (x = 0; x < 6; x++) {
        var cid = ch[x];
        var g;

        if (x < 4) {
            g = champion[p.champion[cid]].prof + UI_GFX_POCKET_SPADE;
        }

        switch (x) {

            case 0: case 1: case 2: case 3:
                {
                    ctx.drawImage(gfxUI[g][champion[p.champion[cid]].colour], ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
                    if (chp.recruitment.recruited && cid === chp.recruitment.position){
                        ctx.drawImage(gfxUI[UI_GFX_ICON_SELECTED], ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI[UI_GFX_ICON_SELECTED].width * scale, gfxUI[UI_GFX_ICON_SELECTED].height * scale);
                    }                    
                };
                break
            case 4:
                {
                    //pid = itemID(p.pocket.id);
                    ctx.drawImage(itemRef[p.pocket.id].gfx, ((p.ScreenX + 225) + (x * 16)) * scale, (p.ScreenY + 63) * scale, itemRef[p.pocket.id].gfx.width * scale, itemRef[p.pocket.id].gfx.height * scale);
                    if (p.pocket.getType() === ITEM_TYPE_STACKABLE) {
                        var qty = p.pocket.quantity;
                        if (qty < 10) {
                            qty = "0" + qty;
                        }
                        writeFontImage(qty, ((p.ScreenX + 225) + (x * 16)), (p.ScreenY + 63), COLOUR[COLOUR_GREEN]);
                    }
                    ctx.clearRect((p.ScreenX + 96) * scale, (p.ScreenY + 79) * scale, 128 * scale, 8 * scale);
                    if (p.pocket.id > 0) {
                        writeFontImage(p.pocket.itemRef.name, p.ScreenX + 98, p.ScreenY + 79, COLOUR[COLOUR_GREEN]);
                    }
                    //ctx.drawImage(gfxUI[UI_GFX_POCKET_EMPTY], ((p.ScreenX + 225) + (x * 16)) * scale, (p.ScreenY + 63) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
                };
                break
            case 5:
                {
                    ctx.drawImage(recolourUiGfx(gfxUI[UI_GFX_ICON_BACK], ITEM_PALETTE_DEFAULT[0], COLOUR_PLAYER[p.id][1]), ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI[UI_GFX_POCKET_EMPTY].width * scale, gfxUI[UI_GFX_POCKET_EMPTY].height * scale);
                };
                break

        }
    }


}

function drawStatsPage(p) {
    ctx.drawImage(gfxUI[UI_GFX_SCRIPT], (p.ScreenX + 226) * scale, (p.ScreenY) * scale, gfxUI[UI_GFX_SCRIPT].width * scale, gfxUI[UI_GFX_SCRIPT].height * scale);
    writeFontImage(TEXT_LEVEL, p.ScreenX + 242, (p.ScreenY + 17), COLOUR[COLOUR_YELLOW]);
    writeFontImage("~", p.ScreenX + 285, (p.ScreenY + 17), COLOUR[COLOUR_GREY_DARKEST]);
    writeFontImage("0" + champion[p.champion[p.championLeader]].level.toString(), p.ScreenX + 297, (p.ScreenY + 17), COLOUR[COLOUR_WHITE]);

    writeFontImage(TEXT_ST, p.ScreenX + 242, (p.ScreenY + 25), COLOUR[COLOUR_BLUE_DARK]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.str.toString(), p.ScreenX + 258, (p.ScreenY + 25), COLOUR[COLOUR_YELLOW]);
    writeFontImage("-", p.ScreenX + 274, (p.ScreenY + 25), COLOUR[COLOUR_GREY_DARKEST]);
    writeFontImage(TEXT_AG, p.ScreenX + 281, (p.ScreenY + 25), COLOUR[COLOUR_BLUE_DARK]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.agi.toString(), p.ScreenX + 297, (p.ScreenY + 25), COLOUR[COLOUR_YELLOW]);

    writeFontImage(TEXT_IN, p.ScreenX + 242, (p.ScreenY + 33), COLOUR[COLOUR_BLUE_DARK]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.int.toString(), p.ScreenX + 258, (p.ScreenY + 33), COLOUR[COLOUR_YELLOW]);
    writeFontImage("-", p.ScreenX + 274, (p.ScreenY + 33), COLOUR[COLOUR_GREY_DARKEST]);
    writeFontImage(TEXT_CH, (p.ScreenX + 281), (p.ScreenY + 33), COLOUR[COLOUR_BLUE_DARK]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.cha.toString(), p.ScreenX + 297, (p.ScreenY + 33), COLOUR[COLOUR_YELLOW]);

    writeFontImage(TEXT_HP, p.ScreenX + 242, (p.ScreenY + 41), COLOUR[COLOUR_BLACK]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.hp.toString(), p.ScreenX + 282, (p.ScreenY + 41), COLOUR[COLOUR_WHITE], FONT_ALIGNMENT_RIGHT);
    writeFontImage("/", p.ScreenX + 282, (p.ScreenY + 41), COLOUR[COLOUR_GREY_DARKEST]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.hpMax.toString(), p.ScreenX + 290, (p.ScreenY + 41), COLOUR[COLOUR_GREEN]);

    writeFontImage(TEXT_VI, p.ScreenX + 242, (p.ScreenY + 49), COLOUR[COLOUR_BLACK]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.vit.toString(), p.ScreenX + 282, (p.ScreenY + 49), COLOUR[COLOUR_WHITE], FONT_ALIGNMENT_RIGHT);
    writeFontImage("/", p.ScreenX + 282, (p.ScreenY + 49), COLOUR[COLOUR_GREY_DARKEST]);
    writeFontImage(champion[p.champion[p.championLeader]].stat.vitMax.toString(), p.ScreenX + 290, (p.ScreenY + 49), COLOUR[COLOUR_GREEN]);
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
        x: 2,
        y: 1,
        width: 47,
        height: 44
    }); //CHAMP 1
    UCA.push({
        x: 52,
        y: 7,
        width: 41,
        height: 32
    }); //STATS GRAPH
    UCA.push({
        x: 0,
        y: 46,
        width: 30,
        height: 41
    }); //CHAMP 2
    UCA.push({
        x: 32,
        y: 46,
        width: 30,
        height: 41
    }); //CHAMP 3
    UCA.push({
        x: 64,
        y: 46,
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
        y: 23,
        width: 37,
        height: 22
    }); //SPELLBOOK
    UCA.push({
        x: 265,
        y: 23,
        width: 22,
        height: 22
    }); //CHARACTER STATS
    UCA.push({
        x: 290,
        y: 24,
        width: 14,
        height: 14
    }); //INTERACT
    UCA.push({
        x: 306,
        y: 25,
        width: 14,
        height: 12
    }); //OPEN POCKETS
    UCA.push({
        x: 228,
        y: 49,
        width: 9,
        height: 11
    }); //ROTATE LEFT
    UCA.push({
        x: 238,
        y: 49,
        width: 18,
        height: 11
    }); //MOVE FORWARD
    UCA.push({
        x: 257,
        y: 49,
        width: 9,
        height: 11
    }); //ROTATE RIGHT
    UCA.push({
        x: 269,
        y: 48,
        width: 17,
        height: 13
    }); //ATTACK
    UCA.push({
        x: 226,
        y: 61,
        width: 11,
        height: 13
    }); //MOVE LEFT
    UCA.push({
        x: 238,
        y: 63,
        width: 18,
        height: 11
    }); //MOVE BACKWARDS
    UCA.push({
        x: 257,
        y: 61,
        width: 11,
        height: 13
    }); //MOVE RIGHT
    UCA.push({
        x: 269,
        y: 63,
        width: 17,
        height: 13
    }); //DEFEND

    UCA.push({
        x: 227,
        y: 24,
        width: 14,
        height: 14
    }); //POCKET SLOT 1
    UCA.push({
        x: 244,
        y: 24,
        width: 14,
        height: 14
    }); //POCKET SLOT 2
    UCA.push({
        x: 258,
        y: 24,
        width: 14,
        height: 14
    }); //POCKET SLOT 3
    UCA.push({
        x: 274,
        y: 24,
        width: 14,
        height: 14
    }); //POCKET SLOT 4
    UCA.push({
        x: 290,
        y: 24,
        width: 14,
        height: 14
    }); //POCKET SLOT 5
    UCA.push({
        x: 306,
        y: 24,
        width: 14,
        height: 14
    }); //POCKET SLOT 6    
    UCA.push({
        x: 227,
        y: 41,
        width: 14,
        height: 14
    }); //POCKET SLOT 7
    UCA.push({
        x: 244,
        y: 41,
        width: 14,
        height: 14
    }); //POCKET SLOT 8
    UCA.push({
        x: 258,
        y: 41,
        width: 14,
        height: 14
    }); //POCKET SLOT 9
    UCA.push({
        x: 274,
        y: 41,
        width: 14,
        height: 14
    }); //POCKET SLOT 10
    UCA.push({
        x: 290,
        y: 41,
        width: 14,
        height: 14
    }); //POCKET SLOT 11
    UCA.push({
        x: 306,
        y: 41,
        width: 14,
        height: 14
    }); //POCKET SLOT 12    
    UCA.push({
        x: 227,
        y: 66,
        width: 14,
        height: 14
    }); //POCKET CHARACTER 0
    UCA.push({
        x: 244,
        y: 66,
        width: 14,
        height: 14
    }); //POCKET CHARACTER 1
    UCA.push({
        x: 258,
        y: 66,
        width: 14,
        height: 14
    }); //POCKET CHARACTER 2
    UCA.push({
        x: 274,
        y: 66,
        width: 14,
        height: 14
    }); //POCKET CHARACTER 3
    UCA.push({
        x: 290,
        y: 66,
        width: 14,
        height: 14
    }); //POCKET HAND
    UCA.push({
        x: 306,
        y: 66,
        width: 14,
        height: 14
    }); //POCKET BACK

    UCA.push({
        x: 58,
        y: 2,
        width: 16,
        height: 16
    }); //PAUSE BUTTON
    UCA.push({
        x: 73,
        y: 2,
        width: 16,
        height: 16
    }); //SAVE BUTTON
    UCA.push({
        x: 58,
        y: 18,
        width: 16,
        height: 16
    }); //SLEEP BUTTON
    UCA.push({
        x: 73,
        y: 18,
        width: 16,
        height: 16
    }); //BACK BUTTON
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
        y: 96,
        width: 16,
        height: 16
    }); //Character Front Left Icon
        UCA.push({
        x: 305,
        y: 96,
        width: 16,
        height: 16
    }); //Character Front Right Icon
        UCA.push({
        x: 289,
        y: 112,
        width: 16,
        height: 16
    }); //Character Back Left Icon
        UCA.push({
        x: 305,
        y: 112,
        width: 16,
        height: 16
    }); //Character Back Right Icon
    return UCA;

}

function uiClickInArea(x, y, ui, p) {
    if (x >= (p.ScreenX + uiClickArea[ui].x) * scale && x <= (p.ScreenX + uiClickArea[ui].x + uiClickArea[ui].width - 1) * scale && y >= (p.ScreenY + uiClickArea[ui].y) * scale && y <= (p.ScreenY + uiClickArea[ui].y + uiClickArea[ui].height - 1) * scale) {
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
