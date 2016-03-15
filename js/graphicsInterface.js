function drawUI(p) {
    if (redrawPlayerUiFlag === p.id + 1 || redrawPlayerUiFlag === 3) {
        if (typeof gfxUI !== "undefined" && gfxUI !== null) {
            if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_STATS) {
                if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_LEFT || p.redrawLeftRightUiFlag === UI_REDRAW_STATS) {
                    ctx.clearRect(p.ScreenX * scale, (p.ScreenY - 3) * scale, 94 * scale, 89 * scale);
                    leftUI(p);
                }
            } else if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_COMMAND) {
                if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_LEFT || p.redrawLeftRightUiFlag === UI_REDRAW_COMMAND) {
                    ctx.clearRect(p.ScreenX * scale, (p.ScreenY - 3) * scale, 94 * scale, 89 * scale);
                    commandUI(p);
                }
            }

            if (p.uiRightPanel.mode === UI_RIGHT_PANEL_MAIN) {
                if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_RIGHT) {
                    ctx.clearRect((p.ScreenX + 225) * scale, (p.ScreenY - 3) * scale, 95 * scale, 89 * scale);
                    rightUI(p);
                }
                if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_RIGHT || p.redrawLeftRightUiFlag === UI_REDRAW_ACTIVESPELL) {
                    drawActiveSpell(p);
                }
            } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_POCKETS) {
                if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_RIGHT || p.redrawLeftRightUiFlag === UI_REDRAW_POCKETS) {
                    ctx.clearRect((p.ScreenX + 225) * scale, (p.ScreenY - 3) * scale, 95 * scale, 89 * scale);
                    drawPocketUI(p);
                }
            } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SPELLBOOK) {
                if (p.timerSpellBookTurn === 0) {
                    if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_RIGHT || p.redrawLeftRightUiFlag === UI_REDRAW_SPELLBOOK) {
                        ctx.clearRect((p.ScreenX + 225) * scale, (p.ScreenY - 3) * scale, 95 * scale, 89 * scale);
                        drawSpellBook(p);
                    }
                }
            } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_STATS) {
                if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_RIGHT || p.redrawLeftRightUiFlag === UI_REDRAW_STATS) {
                    ctx.clearRect((p.ScreenX + 225) * scale, (p.ScreenY - 3) * scale, 95 * scale, 89 * scale);
                    drawStatsPage(p);
                }
            } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SCROLL) {
                if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL || p.redrawLeftRightUiFlag === UI_REDRAW_RIGHT) {
                    ctx.clearRect((p.ScreenX + 225) * scale, (p.ScreenY - 3) * scale, 95 * scale, 89 * scale);
                    drawWallScroll(p);
                }
            }
            if (p.redrawLeftRightUiFlag === UI_REDRAW_ALL) {
                if (typeof player[1] !== 'undefined') {
                    myDIx(ctx, gfx["misc"]["separator"], [0, 0, 320, 7, 0, 96]);
                } else {
                    myDIx(ctx, gfx["misc"]["separator"], [0, 0, 320, 7, 0, player[0].ScreenY + 96]);
                    myDIx(ctx, gfx["misc"]["separator"], [0, 0, 320, 7, 0, player[0].ScreenY - 20]);
                }
            }
            p.redrawLeftRightUiFlag = -1;
            return true;
        }
    }
    return false;
}

function redrawUI(p, lr) {
    if (redrawPlayerUiFlag === 0 || (redrawPlayerUiFlag & (p + 1)) !== (p + 1)) {
        redrawPlayerUiFlag = redrawPlayerUiFlag + (p + 1);
    }
    if (typeof lr === "undefined") {
        lr = 0;
    }
    if (p === 2) {
        if (typeof player[0] !== "undefined") {
            if (player[0].redrawLeftRightUiFlag > -1 && player[0].redrawLeftRightUiFlag !== lr) {
                player[0].redrawLeftRightUiFlag = UI_REDRAW_ALL;
            } else {
                player[0].redrawLeftRightUiFlag = lr;
            }
        }
        if (typeof player[1] !== "undefined") {
            if (player[1].redrawLeftRightUiFlag > -1 && player[1].redrawLeftRightUiFlag !== lr) {
                player[1].redrawLeftRightUiFlag = UI_REDRAW_ALL;
            } else {
                player[1].redrawLeftRightUiFlag = lr;
            }
        }
    } else {
        if (typeof player[p] !== "undefined") {
            if (player[p].redrawLeftRightUiFlag > -1 && player[p].redrawLeftRightUiFlag !== lr) {
                player[p].redrawLeftRightUiFlag = UI_REDRAW_ALL;
            } else {
                player[p].redrawLeftRightUiFlag = lr;
            }
        }
    }
}

function grabUISprites(spriteSheetIMG) {

    var ret = [];

    for (var item in uiJson){
        var g;
        if (typeof uiJson[item].gfx.recolour !== 'undefined'){
            var iFrom = getObjectByKeys(uiJson[item], 'gfx', 'recolour', 'from');
            var iTo = getObjectByKeys(uiJson[item], 'gfx', 'recolour', 'to');
            g = grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false);
            if(typeof iFrom !== "undefined" && typeof iTo !== "undefined") {
                for(var f in iFrom) {
                    g = recolourUiGfx(g, colourData[iFrom[f]], colourData[iTo[f]]);
                }
            }

        }else{
            if (typeof uiJson[item].gfx.classColours !== 'undefined'){
                if (uiJson[item].gfx.classColours){
                    var extraColours = [];
                    extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false), paletteData['DEFAULT_ITEM'], paletteData['SERPENT']));
                    extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false), paletteData['DEFAULT_ITEM'], paletteData['CHAOS']));
                    extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false), paletteData['DEFAULT_ITEM'], paletteData['DRAGON']));
                    extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false), paletteData['DEFAULT_ITEM'], paletteData['MOON']));
                    extraColours.push(recolourSprite(grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false), paletteData['DEFAULT_ITEM'], paletteData['SELECTED']));
                    g = extraColours;
                }
            }else if (typeof uiJson[item].gfx.multiple !== 'undefined'){
                var extraItems = [];

                if (uiJson[item].gfx.multiple.direction == "x"){
                    for (var x=0;x < uiJson[item].gfx.multiple.size;x++){
                        extraItems.push(grabImageAt(spriteSheetIMG, uiJson[item].gfx.x+(x*uiJson[item].gfx.width), uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false));
                    }
                }else{
                    for (var y=0;y < uiJson[item].gfx.multiple.size;y++){
                        extraItems.push(grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y+(y*uiJson[item].gfx.height), uiJson[item].gfx.width, uiJson[item].gfx.height, false));
                    }
                }

                g = extraItems;
            }else{
                g = grabImageAt(spriteSheetIMG, uiJson[item].gfx.x, uiJson[item].gfx.y, uiJson[item].gfx.width, uiJson[item].gfx.height, false);
            }
        }

        ret[uiJson[item].id] = g;
    }

    return ret;

}

function drawSpellBook(p, ui, dr) {

    //Check if the have the image stored in the buffer and use that unless we need to redraw it.
//    if (p.spellBookCanvas == null || p.redrawSpellBook){
//        var img = p.spellBookCanvas.getContext('2d');
//    }else{
//
//    }

    ctx.drawImage(gfxUI['SPELLBOOK'][0], p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, gfxUI['SPELLBOOK'][0].width * scale, gfxUI['SPELLBOOK'][0].height * scale);

    var ch;
    var start = false;

    if (championSelect[currentPlayer].champID >= 0) {
        ch = champion[championSelect[currentPlayer].champID];
        start = true;
    } else {
        ch = p.getChampion(p.championLeader);
    }

    //var ch = champion[p.champion[p.championLeader]];

    for(var x = 0; x < 8; x++) {
        var pg = ch.spellBookPage;
        if (typeof dr !== "undefined" && typeof ui !== "undefined") {
            if (x >= 4 && dr && ui <= 3) {
                pg = (pg + 1) % SPELL_PAGE_MAX;
            } else if (x < 4 && !dr && ui >= 1) {
                pg = (pg + SPELL_PAGE_MAX - 1) % SPELL_PAGE_MAX;
            } else if (x >= 4 && !dr && ui >= 4) {
                pg = (pg + SPELL_PAGE_MAX - 1) % SPELL_PAGE_MAX;
            }
        }
        var sym = ch.spellBook[pg][x].ref.symbols;
        var col = getClassColour(ch.spellBook[pg][x].ref.colour);

        if (!ch.spellBook[pg][x].learnt) {
            col = colourData['GREY_DARKEST'];
        }
        if (ch.selectedSpell === ch.spellBook[pg][x]) {
            col = colourData['WHITE'];
        }

        if (x < 4) {
            writeSpellFont(sym.substring(0, 3), p.ScreenX + 234, (p.ScreenY + 15) + (x * 8), col);
            writeSpellFont(sym.substring(3, 4), p.ScreenX + 258, (p.ScreenY + 14) + (x * 8), col);
        } else {
            writeSpellFont(sym.substring(0, 1), p.ScreenX + 282, (p.ScreenY + 14) + ((x - 4) * 8), col);
            writeSpellFont(sym.substring(1, 4), p.ScreenX + 290, (p.ScreenY + 15) + ((x - 4) * 8), col);
        }
    }

    if (ch.selectedSpell === null && !start) {

        ctx.drawImage(gfxUI['ICON_SPELL_0'], p.ScreenX + 225 * scale, (p.ScreenY + 62) * scale, gfxUI['ICON_SPELL_0'].width * scale, gfxUI['ICON_SPELL_0'].height * scale);
        ctx.drawImage(gfxUI['ICON_SPELL_BOOK_DRAGON_LEFT'], p.ScreenX + 241 * scale, (p.ScreenY + 63) * scale, gfxUI['ICON_SPELL_BOOK_DRAGON_LEFT'].width * scale, gfxUI['ICON_SPELL_BOOK_DRAGON_LEFT'].height * scale);
        ctx.drawImage(gfxUI['ICON_SPELL_BOOK_LEFT'], p.ScreenX + 257 * scale, (p.ScreenY + 63) * scale, gfxUI['ICON_SPELL_BOOK_LEFT'].width * scale, gfxUI['ICON_SPELL_BOOK_LEFT'].height * scale);
        ctx.drawImage(gfxUI['ICON_SPELL_BOOK_RIGHT'], p.ScreenX + 273 * scale, (p.ScreenY + 63) * scale, gfxUI['ICON_SPELL_BOOK_RIGHT'].width * scale, gfxUI['ICON_SPELL_BOOK_RIGHT'].height * scale);
        ctx.drawImage(gfxUI['ICON_SPELL_BOOK_DRAGON_RIGHT'], p.ScreenX + 289 * scale, (p.ScreenY + 63) * scale, gfxUI['ICON_SPELL_BOOK_DRAGON_RIGHT'].width * scale, gfxUI['ICON_SPELL_BOOK_DRAGON_RIGHT'].height * scale);
        ctx.drawImage(gfxUI['ICON_SPELL_0'], p.ScreenX + 305 * scale, (p.ScreenY + 62) * scale, gfxUI['ICON_SPELL_0'].width * scale, gfxUI['ICON_SPELL_0'].height * scale);
        drawPocketInfo(p);
    } else if (ch.selectedSpell !== null && start) { //start screen
        if (currentPlayer === 0) {
            drawFillRect(168, player[0].ScreenY + 79, 155, 8, colourData['BLUE_DARK']);
        } else {
            drawFillRect(168, player[0].ScreenY + 79, 155, 8, colourData['RED_DARK']);
        }
        writeFontImage(ch.selectedSpell.ref.name, 170, (player[0].ScreenY + 80), colourData['YELLOW']);
    } else if (ch.selectedSpell !== null) {
        //var ic = $.inArray('ICON_SPELL_0', UI_GFX_ID) + 1 + ch.selectedSpell.ref.colour;
        //if (ch.selectedSpell.ref.colour == 4){
            ctx.drawImage(gfxUI['ICON_SPELL_' + (ch.selectedSpell.ref.colour + 1)], p.ScreenX + 225 * scale, (p.ScreenY + 62) * scale, gfxUI['ICON_SPELL_0'].width * scale, gfxUI['ICON_SPELL_0'].height * scale);
        //}else{
        //    ctx.drawImage(gfxUI[ic], p.ScreenX + 225 * scale, (p.ScreenY + 62) * scale, gfxUI['ICON_SPELL_0'].width * scale, gfxUI['ICON_SPELL_0'].height * scale);
        //}

        writeFontImage(ch.selectedSpell.ref.name, p.ScreenX + 242, (p.ScreenY + 63), colourData['PINK']);
        writeFontImage("COST " + doubleDigits(ch.selectedSpell.cost), p.ScreenX + 242, (p.ScreenY + 71), colourData['YELLOW']);
        t = recolourUiGfx(font[94], colourData['GREEN'], colourData['RED']);
        ctx.drawImage(t, (p.ScreenX + 274) * scale, (p.ScreenY + 71) * scale, t.width * scale, t.height * scale);
        t = flipImageVert(t);
        ctx.drawImage(t, (p.ScreenX + 298) * scale, (p.ScreenY + 71) * scale, t.width * scale, t.height * scale);

        //if (ch.selectedSpell.ref.colour == 4){
            ctx.drawImage(gfxUI['ICON_SPELL_' + (ch.selectedSpell.ref.colour + 1)], p.ScreenX + 305 * scale, (p.ScreenY + 62) * scale, gfxUI['ICON_SPELL_0'].width * scale, gfxUI['ICON_SPELL_0'].height * scale);
        //}else{
        //    ctx.drawImage(gfxUI[ic], p.ScreenX + 305 * scale, (p.ScreenY + 62) * scale, gfxUI['ICON_SPELL_0'].width * scale, gfxUI['ICON_SPELL_0'].height * scale);
        //}

        if (!p.showSpellText) {
            var ch = champion[p.champion[p.championLeader]];
            ctx.clearRect((p.ScreenX + 96) * scale, (p.ScreenY + 88 - 10) * scale, 128 * scale, 8 * scale);
            writeFontImage("CAST % ", p.ScreenX + 96 + 2, (p.ScreenY + 79), colourData['YELLOW']);
            var cst = ch.getSpellCastChance();
            var t = showStatusBar(cst, 1.0, 62, colourData['RED']);
            ctx.drawImage(t, (p.ScreenX + 154) * scale, (p.ScreenY + 80) * scale, t.width * scale, t.height * scale);
        }
    } else if (ch.selectedSpell === null && start) { //start screen
        if (currentPlayer === 0) {
            drawFillRect(168, player[currentPlayer].ScreenY + 79, 155, 8, colourData['BLUE_DARK']);
        } else {
            drawFillRect(168, player[currentPlayer].ScreenY + 79, 155, 8, colourData['RED_DARK']);
        }
        writeFontImage(ch.getName(), 170, (player[currentPlayer].ScreenY + 80), colourData['YELLOW']);
    }

    if (!start) {
        writeFontImage(TEXT_SP_PTS, p.ScreenX + 226, (p.ScreenY + 79), colourData['PINK']);
        writeFontImage(getSpellNotation(p.getChampion(p.championLeader).stat.sp) + "/" + getSpellNotation(p.getChampion(p.championLeader).stat.spMax), p.ScreenX + 282, (p.ScreenY + 79), colourData['GREEN']);
    } else {
        writeFontImage(TEXT_SP_PTS, p.ScreenX + 226, (p.ScreenY + 63), colourData['PINK']);
        writeFontImage(getSpellNotation(champion[championSelect[currentPlayer].champID].stat.sp) + "/" + getSpellNotation(champion[championSelect[currentPlayer].champID].stat.spMax), p.ScreenX + 282, (p.ScreenY + 63), colourData['GREEN']);
    }
}

function changeSpellBookPage(p, dr) {
    if (p.timerSpellBookTurn === 0) {
        if (dr) {
            drawSpellBookPageTurn(p, 4, dr, 150);
            drawSpellBookPageTurn(p, 3, dr, 300);
            drawSpellBookPageTurn(p, 2, dr, 450);
            drawSpellBookPageTurn(p, 1, dr, 600, true);
        } else {
            drawSpellBookPageTurn(p, 1, dr, 150);
            drawSpellBookPageTurn(p, 2, dr, 300);
            drawSpellBookPageTurn(p, 3, dr, 450);
            drawSpellBookPageTurn(p, 4, dr, 600, true);
        }
    }
}

function drawSpellBookPageTurn(p, ui, dr, timer, stop, full) {
    if (typeof stop === "undefined") {
        stop = false;
    }
    if (typeof full === "undefined") {
        full = true;
    }
    (function(p, ui, dr, stop) {
        p.timerSpellBookTurn = setTimeout(function() {
            drawSpellBook(p, ui, dr);
            var sb = gfxUI['SPELLBOOK'][ui];
            if (dr) {
                ctx.drawImage(colourSpellPage(true, champion[p.champion[p.championLeader]], sb), p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, sb.width * scale, sb.height * scale);
            } else {
                ctx.drawImage(colourSpellPage(false, champion[p.champion[p.championLeader]], sb), p.ScreenX + 226 * scale, (p.ScreenY - 1) * scale, sb.width * scale, sb.height * scale);
            }
            if (stop) {
                (function(p, dr) {
                    p.timerSpellBookTurn = setTimeout(function() {
                        var ch = p.getChampion(p.championLeader);
                        p.timerSpellBookTurn = 0;
                        if (dr) {
                            ch.spellBookPage = (ch.spellBookPage + 1) % SPELL_PAGE_MAX;
                        } else {
                            ch.spellBookPage = (ch.spellBookPage + SPELL_PAGE_MAX - 1) % SPELL_PAGE_MAX;
                        }
                        if (championSelect[0].champID > -1) {
                            drawSpellBook(p);
                        } else {
                            redrawUI(p.id, UI_REDRAW_SPELLBOOK);
                        }

                    }, 100);
                })(p, dr);
            }
        }, timer);
    })(p, ui, dr, stop);
}

function leftUI(p) {

    ctx.drawImage(gfxUI['STATSBOX'], (p.ScreenX + 51) * scale, p.ScreenY * scale, gfxUI['STATSBOX'].width * scale, gfxUI['STATSBOX'].height * scale);
    leftUIStats(p);

    ctx.drawImage(gfxUI['CHAIN_LONG'], (p.ScreenX + 1) * scale, (p.ScreenY + 80) * scale, gfxUI['CHAIN_LONG'].width * scale, gfxUI['CHAIN_LONG'].height * scale);

    var c1 = p.getOrderedChampionIds(true);
    for(var c = 0; c < p.champion.length; c++) {
        var c2 = c1[c];
        var cid = p.champion[c2];
        var ch = p.getChampion(c2);
        if (ch !== null) {
            if (c === 0) {
                if (p.uiLeftPanel.champs[c].opened) {
                    ctx.drawImage(gfxUI['CHAIN_VERT'], (c + 2 * scale) + (p.ScreenX * scale), (p.ScreenY + 5) * scale, gfxUI['CHAIN_VERT'].width * scale, gfxUI['CHAIN_VERT'].height * scale);
                    var t = drawCharacter(monster[TOWER_CHAMPIONS][cid], 0, 0, p, {
                        x: 0,
                        y: -1
                    }, true, false);
                    ctx.drawImage(t, (c - 38 * scale) + (p.ScreenX * scale) * scale, (p.ScreenY - 32) * scale, t.width * scale, t.height * scale);
                    ctx.drawImage(gfxUI['CHAIN_VERT'], (c + 43 * scale) + (p.ScreenX * scale), (p.ScreenY + 5) * scale, gfxUI['CHAIN_VERT'].width * scale, gfxUI['CHAIN_VERT'].height * scale);
                    if (p.uiLeftPanel.champs[c].damage > 0) {
                        ctx.drawImage(gfxUI['ICON_ATTACK'], (p.ScreenX + 13) * scale, (p.ScreenY + 8) * scale, gfxUI['ICON_ATTACK'].width * scale, gfxUI['ICON_ATTACK'].height * scale);
                        writeFontImage(p.uiLeftPanel.champs[c].damage, p.ScreenX / scale + 28, p.ScreenY + 10, colourData['YELLOW'], FONT_ALIGNMENT_CENTER);
                    }
                } else {
                    ctx.drawImage(gfxUI['CHARACTER_BOX'], p.ScreenX * scale, p.ScreenY * scale, gfxUI['CHARACTER_BOX'].width * scale, gfxUI['CHARACTER_BOX'].height * scale);
                    ctx.drawImage(gfxUI['PORTRAITS'][cid], (p.ScreenX + 8) * scale, (p.ScreenY + 8) * scale, gfxUI['PORTRAITS'][cid].width * scale, gfxUI['PORTRAITS'][cid].height * scale);
                    if (ch.activeSpell.id > -1) {
                        var sp = getSpellById(ch.activeSpell.id);
                        drawRect(p.ScreenX + 6, p.ScreenY + 5, 35, 33, paletteData['CLASS'][sp.colour]);
                    }
                }
            } else {
                var t;
                if (ch.getMonster() !== null && ch.getMonster().dead) {
                    t = createShield(cid, ch.prof, 4);
                    ctx.drawImage(t, (((c - 1) * 32 + p.ScreenX) * scale), (p.ScreenY + 45) * scale, t.width * scale, t.height * scale);
                } else if (p.uiLeftPanel.champs[c].opened) {
                    ctx.drawImage(gfxUI['SHIELD'], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI['SHIELD'].width * scale, gfxUI['SHIELD'].height * scale);
                    t = drawCharacter(monster[TOWER_CHAMPIONS][cid], 0, 1, p, {
                        x: 0,
                        y: 0
                    }, true, false);
                    ctx.drawImage(t, ((c - 1) * 32 * scale) + (p.ScreenX * scale) - 49 * scale, (p.ScreenY + 45) * scale - 37 * scale, t.width * scale, t.height * scale);
                    if (p.uiLeftPanel.champs[c].damage > 0) {
                        ctx.drawImage(gfxUI['ICON_ATTACK'], (p.ScreenX + (c - 1) * 32 + 1) * scale, (p.ScreenY + 53) * scale, gfxUI['ICON_ATTACK'].width * scale, gfxUI['ICON_ATTACK'].height * scale);
                        writeFontImage(p.uiLeftPanel.champs[c].damage, p.ScreenX / scale + ((c - 1) * 32 + 16), (p.ScreenY + 55), colourData['YELLOW'], FONT_ALIGNMENT_CENTER);
                    }
                } else {
                    t = createShield(cid, ch.prof, ch.colour);
                    ctx.drawImage(t, (((c - 1) * 32 + p.ScreenX) * scale), (p.ScreenY + 45) * scale, t.width * scale, t.height * scale);
                }
            }
        } else {
            if (p === player[1]) {
                ctx.drawImage(gfxUI['SHIELD_RED'], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI['SHIELD_RED'].width * scale, gfxUI['SHIELD_RED'].height * scale);
            } else {
                ctx.drawImage(gfxUI['SHIELD_BLUE'], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI['SHIELD_BLUE'].width * scale, gfxUI['SHIELD_BLUE'].height * scale);
            }
        }
    }
}

function leftUIStats(p) {
    if (p.uiLeftPanel.champs[0].opened) {
        var ch = p.getOrderedChampionIds(true);
        for(var c = 0; c < p.champion.length; c++) {
            var c1 = ch[c];
            var champ = p.getChampion(c1);
            if (champ !== null) {
                var rgb = getClassColour(champ.colour);
                var hp = Math.floor(21 * champ.stat.hp / champ.stat.hpMax);
                if (hp < 0) {
                    hp = 0;
                }
                ctx.fillStyle = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
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
                rgb = paletteData['PLAYER'][0][2];
            } else {
                rgb = paletteData['PLAYER'][1][1];
            }
            ctx.fillStyle = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
            ctx.fillRect((p.ScreenX + 55) * scale, (p.ScreenY + 15) * scale, hp * scale, 5 * scale);
            ctx.fillRect((p.ScreenX + 55) * scale, (p.ScreenY + 22) * scale, vit * scale, 5 * scale);
            ctx.fillRect((p.ScreenX + 55) * scale, (p.ScreenY + 29) * scale, sp * scale, 5 * scale);
        }
    }
}

function getClassColour(c) {
    return paletteData['CLASS'][c];
/*    if (typeof palette === 'undefined') {
        palette = false;
    }

    var red = 255,
        grn = 255,
        blu = 255,
        aph = 255;

    switch (c) {
        case CLASS_COLOUR_SERP:
            red = colourData['GREEN'][0];
            grn = colourData['GREEN'][1];
            blu = colourData['GREEN'][2];
            break;
        case CLASS_COLOUR_CHAOS:
            red = colourData['YELLOW'][0];
            grn = colourData['YELLOW'][1];
            blu = colourData['YELLOW'][2];
            break;
        case CLASS_COLOUR_DRAG:
            red = colourData['RED'][0];
            grn = colourData['RED'][1];
            blu = colourData['RED'][2];
            break;
        case CLASS_COLOUR_MOON:
            red = colourData['BLUE_DARK'][0];
            grn = colourData['BLUE_DARK'][1];
            blu = colourData['BLUE_DARK'][2];
            break;
        case CLASS_COLOUR_ANCIENT:
            red = colourData['PINK'][0];
            grn = colourData['PINK'][1];
            blu = colourData['PINK'][2];
            break;
        default:
            break;
    }
    if (palette) {
        return new Array(red, grn, blu, aph);
    }
    return {
        r: red,
        g: grn,
        b: blu
    };*/
}

function commandUI(p) {
    var ch = p.getChampion(p.championLeader);
    ctx.drawImage(gfxUI['CHARACTER_BOX'], p.ScreenX * scale, p.ScreenY * scale, gfxUI['CHARACTER_BOX'].width * scale, gfxUI['CHARACTER_BOX'].height * scale);
    ctx.drawImage(gfxUI['PORTRAITS'][p.champion[p.championLeader]], (p.ScreenX + 8) * scale, (p.ScreenY + 8) * scale, gfxUI['PORTRAITS'][p.champion[p.championLeader]].width * scale, gfxUI['PORTRAITS'][p.champion[p.championLeader]].height * scale);
    if (ch.activeSpell.id > -1) {
        var sp = getSpellById(ch.activeSpell.id);
        drawRect(p.ScreenX + 6, p.ScreenY + 5, 35, 33, paletteData['CLASS'][sp.colour]);
    }
    ctx.drawImage(gfxUI['ICON_PAUSE'], (p.ScreenX + 57) * scale, p.ScreenY * scale, gfxUI['ICON_PAUSE'].width * scale, gfxUI['ICON_PAUSE'].height * scale);
    ctx.drawImage(gfxUI['ICON_SAVE'], (p.ScreenX + 72) * scale, (p.ScreenY) * scale, gfxUI['ICON_SAVE'].width * scale, gfxUI['ICON_SAVE'].height * scale);
    ctx.drawImage(gfxUI['ICON_SLEEP'], (p.ScreenX + 57) * scale, (p.ScreenY + 16) * scale, gfxUI['ICON_SLEEP'].width * scale, gfxUI['ICON_SLEEP'].height * scale);
    ctx.drawImage(recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), (p.ScreenX + 73) * scale, (p.ScreenY + 16) * scale, gfxUI['ICON_BACK'].width * scale, gfxUI['ICON_BACK'].height * scale);

    ctx.fillStyle = "#606060";
    ctx.fillRect((p.ScreenX + 50) * scale, (p.ScreenY) * scale, 1 * scale, 44 * scale);
    ctx.fillRect((p.ScreenX + 52) * scale, (p.ScreenY + 1) * scale, 1 * scale, 42 * scale);
    ctx.fillRect((p.ScreenX + 93) * scale, (p.ScreenY) * scale, 1 * scale, 44 * scale);
    ctx.fillRect((p.ScreenX + 91) * scale, (p.ScreenY + 1) * scale, 1 * scale, 42 * scale);

    ctx.drawImage(gfxUI['CHAIN_LONG'], (p.ScreenX + 1) * scale, (p.ScreenY + 80) * scale, gfxUI['CHAIN_LONG'].width * scale, gfxUI['CHAIN_LONG'].height * scale);
    drawCommunicationBox(p, p.communication.highlighted, true);
}

function drawActiveSpell(p) {
    var ch = p.getChampion(p.championLeader);
    var id = ch.activeSpell.id;
    if (id !== -1) {
        var spellImage = '';
        ac = ch.activeSpell.action;
        if(typeof ac !== "undefined") {
            var en = ac.enchant;
            if(typeof en !== "undefined") {
                spellImage = en;
                var dir = ac.directional; //compass
                if(typeof dir !== "undefined") {
                    spellImage = spellImage.replace('_0', '_' + p.d);
                }
            }
        } else {
            switch (id) {
                case SPELL_ARMOUR:
                    spellImage = 'ICON_SPELL_ARMOUR';
                    break;
                case SPELL_COMPASS:
                    switch (p.d) {
                        case DIRECTION_NORTH:
                            spellImage = 'ICON_SPELL_COMPASS_0';
                            break;
                        case DIRECTION_EAST:
                            spellImage = 'ICON_SPELL_COMPASS_1';
                            break;
                        case DIRECTION_SOUTH:
                            spellImage = 'ICON_SPELL_COMPASS_2';
                            break;
                        case DIRECTION_WEST:
                            spellImage = 'ICON_SPELL_COMPASS_3';
                            break;
                    }
                    break;
                case SPELL_LEVITATE:
                    spellImage = 'ICON_SPELL_LEVITATE';
                    break;
                case SPELL_WARPOWER:
                    spellImage = 'ICON_SPELL_WARPOWER';
                    break;
                case SPELL_DEFLECT:
                    spellImage = 'ICON_SPELL_DEFLECT';
                    break;
                case SPELL_VANISH:
                    spellImage = 'ICON_SPELL_VANISH';
                    break;
                case SPELL_ANTIMAGE:
                    spellImage = 'ICON_SPELL_ANTIMAGE';
                    break;
                case SPELL_TRUEVIEW:
                    spellImage = 'ICON_SPELL_TRUEVIEW';
                    break;
                case SPELL_PROTECT:
                    spellImage = 'ICON_SPELL_PROTECT';
                    break;
                case SPELL_ENHANCE:
                    spellImage = 'ICON_SPELL_ENHANCE';
                    break;
            }
        }
        ctx.drawImage(gfxUI[spellImage], (p.ScreenX + 289) * scale, (p.ScreenY + 22) * scale, gfxUI[spellImage].width * scale, gfxUI[spellImage].height * scale);
    }
}

function rightUI(p) {

    var ch = champion[p.champion[p.championLeader]];

    if (p === player[0]) {
        ctx.drawImage(gfxUI['NAME_BLUE'], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI['NAME_BLUE'].width * scale, gfxUI['NAME_BLUE'].height * scale);
        ctx.drawImage(gfxUI['ICON_ARROWS_BLUE'], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI['ICON_ARROWS_BLUE'].width * scale, gfxUI['ICON_ARROWS_BLUE'].height * scale);

    } else {
        ctx.drawImage(gfxUI['NAME_RED'], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI['NAME_RED'].width * scale, gfxUI['NAME_RED'].height * scale);
        ctx.drawImage(gfxUI['ICON_ARROWS_RED'], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI['ICON_ARROWS_RED'].width * scale, gfxUI['ICON_ARROWS_RED'].height * scale);
    }

    writeFontImage(p.getChampion(p.championLeader).firstName, p.ScreenX / scale + 226, (p.ScreenY + 7), colourData['YELLOW']);
    ctx.drawImage(gfxUI['ICON_SPELLBOOK'], p.ScreenX + 226 * scale, (p.ScreenY + 22) * scale, gfxUI['ICON_SPELLBOOK'].width * scale, gfxUI['ICON_SPELLBOOK'].height * scale);
    ctx.drawImage(gfxUI['ICON_SCROLL'], p.ScreenX + 265 * scale, (p.ScreenY + 22) * scale, gfxUI['ICON_SCROLL'].width * scale, gfxUI['ICON_SCROLL'].height * scale);
    ctx.drawImage(gfxUI['POCKETBOX'], p.ScreenX + 288 * scale, (p.ScreenY + 21) * scale, gfxUI['POCKETBOX'].width * scale, gfxUI['POCKETBOX'].height * scale);

    if (ch.activeSpell.id !== -1) {
        //drawActiveSpell(ch.activeSpell.id,p);
    } else {
        if (ch.selectedSpell === null) {
            ctx.drawImage(gfxUI['ICON_OPENDOOR'], (p.ScreenX + 289) * scale, (p.ScreenY + 22) * scale, gfxUI['ICON_OPENDOOR'].width * scale, gfxUI['ICON_OPENDOOR'].height * scale);
        } else {
            ctx.drawImage(gfxUI['ICON_SPELL_' + (1 + ch.selectedSpell.ref.colour)], (p.ScreenX + 289) * scale, (p.ScreenY + 22) * scale, gfxUI['ICON_SPELL_0'].width * scale, gfxUI['ICON_SPELL_0'].height * scale);
        }
    }
    ctx.drawImage(gfxUI['ICON_POCKETS'], (p.ScreenX + 305) * scale, (p.ScreenY + 22) * scale, gfxUI['ICON_POCKETS'].width * scale, gfxUI['ICON_POCKETS'].height * scale);
    for(var c = 0; c < p.champion.length; c++) {
        var ca = [0, 1, 3, 2];
        var c1 = ca[c];
        var ch = p.getChampion(c1);
        if (ch !== null) {
            var a = ch.prof;
            var b = ch.colour;
            if (!monster[TOWER_CHAMPIONS][ch.id].dead && ch.recruitment.attached) {
                if (c1 === p.championHighlite) {
                    ctx.drawImage(gfxUI['ITEM_' + a][4], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI['ITEM_EMPTY'].width * scale, gfxUI['ITEM_EMPTY'].height * scale);
                } else {
                    ctx.drawImage(gfxUI['ITEM_' + a][b], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI['ITEM_EMPTY'].width * scale, gfxUI['ITEM_EMPTY'].height * scale);
                }
            }
            if (c1 === p.championLeader) {
                drawRect(p.ScreenX + 289 + (c % 2) * 16, p.ScreenY + 46 + Math.floor(c / 2) * 15, 15 - (c % 2), 13, colourData['BLUE_DARK']);
                //if (c % 2 === 0) {
                //	ctx.drawImage(gfxUI['ICON_SELECTED'], (p.ScreenX + 289 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI['ICON_SELECTED'].width * scale, gfxUI['ICON_SELECTED'].height * scale);
                //} else {
                //	ctx.drawImage(gfxUI['ICON_SELECTED'], (p.ScreenX + 288 + (c % 2) * 16) * scale, (p.ScreenY + 46 + Math.floor(c / 2) * 15) * scale, gfxUI['ICON_SELECTED'].width * scale, gfxUI['ICON_SELECTED'].height * scale);
                //}

            }
        }
    }
    drawPocketInfo(p);

    ctx.drawImage(gfxUI['CHAIN_LONG'], (p.ScreenX + 226) * scale, (p.ScreenY + 80) * scale, gfxUI['CHAIN_LONG'].width * scale, gfxUI['CHAIN_LONG'].height * scale);

}

function drawPocketInfo(p, chp) {
    if (!p.attacking && !p.showSpellText) {
        ctx.clearRect((p.ScreenX + 96) * scale, (p.ScreenY + 78) * scale, 128 * scale, 8 * scale);
        if (p.pocket.id > 0) {
            writeFontImage(itemJson[p.pocket.id].name, p.ScreenX + 98, p.ScreenY + 79, colourData['GREEN']);
            if (typeof chp !== 'undefined' && p.pocket.type === 'ITEM_TYPE_FOOD') {
                var t = showStatusBar(chp.getFood(), 200, 69);
                ctx.drawImage(t, (p.ScreenX + 146) * scale, (p.ScreenY + 80) * scale, t.width * scale, t.height * scale);
            }
        }
    }
}

function drawPocketUI(p, chp, start) {
    if (typeof chp === 'undefined') {
        chp = p.getActivePocketChampion();
        start = false;
    }

    if (!start) {
        if (p === player[0]) {
            ctx.drawImage(gfxUI['NAME_BLUE'], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI['NAME_BLUE'].width * scale, gfxUI['NAME_BLUE'].height * scale);
        } else {
            ctx.drawImage(gfxUI['NAME_RED'], p.ScreenX + 226 * scale, (p.ScreenY + 0) * scale, gfxUI['NAME_RED'].width * scale, gfxUI['NAME_RED'].height * scale);
        }
        writeFontImage(chp.firstName, p.ScreenX / scale + 226, (p.ScreenY + 7), colourData['YELLOW']);
    }

    var i = 0;
    for(var y = 0; y < 2; y++) {
        for(var x = 0; x < 6; x++) {
            var pocket = chp.pocket[i];
            var pocketId = pocket.id;
            if (pocketId === 0) {
                pocketId = 'ITEM_EMPTY';
                if (y === 0) {
                    switch (x) {
                        case 0:
                            pocketId = 'ITEM_EMPTY_LEFT_HAND';
                            break;
                        case 1:
                            pocketId = 'ITEM_EMPTY_RIGHT_HAND';
                            break;
                        case 2:
                            pocketId = 'ITEM_EMPTY_ARMOUR';
                            break;
                        case 3:
                            if (chp.prof === PROFESSION_WARRIOR || chp.prof === PROFESSION_ADVENTURER) {
                                pocketId = 'ITEM_EMPTY_LARGE_SHIELD';
                            } else {
                                pocketId = 'ITEM_EMPTY_SMALL_SHIELD';
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (pocketId === 'ITEM_EMPTY_LEFT_HAND' && chp.pocket[12].type === 'ITEM_TYPE_GLOVES') {
                    ctx.drawImage(flipImageVert(itemJson[chp.pocket[12].id].gfx, paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), ((p.ScreenX + 224) + (x * 16)) * scale, ((p.ScreenY + 21) + (y * 16)) * scale, gfxUI[pocketId].width * scale, gfxUI[pocketId].height * scale);
                } else if (pocketId === 'ITEM_EMPTY_RIGHT_HAND' && chp.pocket[12].type === 'ITEM_TYPE_GLOVES') {
                    ctx.drawImage(flipImageVert(flipImage(itemJson[chp.pocket[12].id].gfx, paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1])), ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 21) + (y * 16)) * scale, gfxUI[pocketId].width * scale, gfxUI[pocketId].height * scale);
                } else {
                    ctx.drawImage(recolourUiGfx(gfxUI[pocketId], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, gfxUI[pocketId].width * scale, gfxUI[pocketId].height * scale);
                }
            } else {
                //itemJson[pocketId].gfx
                ctx.drawImage(pocket.getGfx(), ((p.ScreenX + 225) + (x * 16)) * scale, ((p.ScreenY + 23) + (y * 16)) * scale, itemJson[pocketId].gfx.width * scale, itemJson[pocketId].gfx.height * scale);
            }

            if (pocket.type === 'ITEM_TYPE_STACKABLE') {
                var qty = pocket.quantity;
                if (pocketId < 3) {
                    writeFontImage(doubleDigits(qty), ((p.ScreenX + 225) + (x * 16)), ((p.ScreenY + 23) + (y * 16)), colourData['GREEN']);
                } else {
                    writeFontImage(doubleDigits(qty), ((p.ScreenX + 225) + (x * 16)), ((p.ScreenY + 31) + (y * 16)), colourData['GREEN']);
                }

            }
            i++;
        }
    }

    if (start) {
        ctx.drawImage(gfxUI['CHAIN_LONG'], (p.ScreenX + 226) * scale, (p.ScreenY + 7) * scale, gfxUI['CHAIN_LONG'].width * scale, gfxUI['CHAIN_LONG'].height * scale);
        ctx.drawImage(gfxUI['GRAY_BAR'], (p.ScreenX + 225) * scale, (p.ScreenY + 14) * scale, gfxUI['GRAY_BAR'].width * scale, gfxUI['GRAY_BAR'].height * scale);
        writeFontImage(TEXT_INVENTORY, p.ScreenX / scale + 234, (p.ScreenY + 15), colourData['YELLOW']);
        ctx.drawImage(gfxUI['CHAIN_LONG'], (p.ScreenX + 226) * scale, (p.ScreenY + 63) * scale, gfxUI['CHAIN_LONG'].width * scale, gfxUI['CHAIN_LONG'].height * scale);
    }

    ctx.drawImage(gfxUI['GRAY_BAR'], (p.ScreenX + 225) * scale, (p.ScreenY + 54) * scale, gfxUI['GRAY_BAR'].width * scale, gfxUI['GRAY_BAR'].height * scale);
    var ac = getArmourNotation(chp.getArmourClass());
    writeFontImage(TEXT_ARMOUR + ":", p.ScreenX / scale + 234, (p.ScreenY + 55), colourData['YELLOW']);
    writeFontImage(ac, p.ScreenX / scale + 289, (p.ScreenY + 55), colourData['WHITE']);

    if (!start) {

        var c1 = p.getOrderedChampionIds();
        for(var c = 0; c < 6; c++) {
            var cid = c1[c];
            var g;
            var ch = p.getChampion(cid);

            if (c < 4 && ch !== null) {
                g = 'ITEM_' + ch.prof;
            }

            switch (c) {

                case 0:
                case 1:
                case 2:
                case 3:
                    if (ch !== null) {
                        if (ch.recruitment.attached) {
                            ctx.drawImage(gfxUI[g][ch.colour], ((p.ScreenX + 225) + (c * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI['ITEM_EMPTY'].width * scale, gfxUI['ITEM_EMPTY'].height * scale);
                        }
                        if (chp.recruitment.playerId > -1 && c === p.uiRightPanel.activePocket) {
                            drawRect(((p.ScreenX + 225) + (c * 16)), ((p.ScreenY + 63)), 15, 14, colourData['YELLOW']);
                            //ctx.drawImage(gfxUI['ICON_SELECTED'], ((p.ScreenX + 225) + (c * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI['ICON_SELECTED'].width * scale, gfxUI['ICON_SELECTED'].height * scale);
                        }
                    }
                    break
                case 4:
                    {
                        var g = p.pocket.getGfx();
                        if(typeof g !== "undefined") {
                            ctx.drawImage(g, ((p.ScreenX + 226) + (c * 16)) * scale, (p.ScreenY + 63) * scale, itemJson[p.pocket.id].gfx.width * scale, itemJson[p.pocket.id].gfx.height * scale);
                        }
                        if (p.pocket.type === 'ITEM_TYPE_STACKABLE') {
                            var qty = p.pocket.quantity;
                            if (p.pocket.id < 3) {
                                writeFontImage(doubleDigits(qty), ((p.ScreenX + 226) + (c * 16)), (p.ScreenY + 63), colourData['GREEN']);
                            } else {
                                writeFontImage(doubleDigits(qty), ((p.ScreenX + 226) + (c * 16)), (p.ScreenY + 71), colourData['GREEN']);
                            }
                        }
                        drawPocketInfo(p, chp);
                        //ctx.drawImage(gfxUI['ITEM_EMPTY'], ((p.ScreenX + 225) + (c * 16)) * scale, (p.ScreenY + 63) * scale, gfxUI['ITEM_EMPTY'].width * scale, gfxUI['ITEM_EMPTY'].height * scale);
                    };
                    break
                case 5:
                    {
                        ctx.drawImage(recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), ((p.ScreenX + 225) + (c * 16)) * scale, ((p.ScreenY + 63)) * scale, gfxUI['ITEM_EMPTY'].width * scale, gfxUI['ITEM_EMPTY'].height * scale);
                    };
                    break

            }
        }
    }
}

function highliteMovementArrow(p, m) {
    if (p.uiRightPanel.mode === UI_RIGHT_PANEL_MAIN) {
        var c = UI_CLICK_ROTATE_LEFT + m;
        var g = 'MOVEMENT_' + m;
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
                ctx.drawImage(gfxUI['ICON_ARROWS_BLUE'], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI['ICON_ARROWS_BLUE'].width * scale, gfxUI['ICON_ARROWS_BLUE'].height * scale);
            } else {
                ctx.drawImage(gfxUI['ICON_ARROWS_RED'], p.ScreenX + 226 * scale, (p.ScreenY + 45) * scale, gfxUI['ICON_ARROWS_RED'].width * scale, gfxUI['ICON_ARROWS_RED'].height * scale);
            }
        }, 150);
    }
}

function drawStatsPage(p, ch, start) {
    if (typeof ch === 'undefined') {
        ch = p.getChampion(p.championLeader);
    }
    if (typeof start === 'undefined') {
        start = false;
    }

    //var ch = p.getChampion(p.championLeader);
    if (ch !== null) {
        if (start) {
            ctx.drawImage(gfxUI['CHARACTER_SCROLL'], (p.ScreenX + 226) * scale, (p.ScreenY - 1) * scale, gfxUI['CHARACTER_SCROLL'].width * scale, gfxUI['CHARACTER_SCROLL'].height * scale);
        } else {
            ctx.drawImage(gfxUI['SCRIPT'], (p.ScreenX + 226) * scale, (p.ScreenY - 1) * scale, gfxUI['SCRIPT'].width * scale, gfxUI['SCRIPT'].height * scale);
        }

        writeFontImage(TEXT_LEVEL, p.ScreenX + 242, (p.ScreenY + 15), colourData['YELLOW']);
        ctx.drawImage(gfxUI['SCROLL_WAVE'], (p.ScreenX + 282) * scale, (p.ScreenY + 17) * scale, gfxUI['SCROLL_WAVE'].width * scale, gfxUI['SCROLL_WAVE'].height * scale);
        //writeFontImage("~", p.ScreenX + 285, (p.ScreenY + 15), colourData['GREY_DARKEST']);
        writeFontImage(doubleDigits(ch.level), p.ScreenX + 297, (p.ScreenY + 15), colourData['WHITE']);

        writeFontImage(TEXT_ST, p.ScreenX + 242, (p.ScreenY + 23), colourData['BLUE_DARK']);
        writeFontImage(ch.stat.str.toString(), p.ScreenX + 258, (p.ScreenY + 23), colourData['YELLOW']);
        writeFontImage("-", p.ScreenX + 274, (p.ScreenY + 23), colourData['GREY_DARKEST']);
        writeFontImage(TEXT_AG, p.ScreenX + 281, (p.ScreenY + 23), colourData['BLUE_DARK']);
        writeFontImage(ch.stat.agi.toString(), p.ScreenX + 297, (p.ScreenY + 23), colourData['YELLOW']);

        writeFontImage(TEXT_IN, p.ScreenX + 242, (p.ScreenY + 31), colourData['BLUE_DARK']);
        writeFontImage(ch.stat.int.toString(), p.ScreenX + 258, (p.ScreenY + 31), colourData['YELLOW']);
        writeFontImage("-", p.ScreenX + 274, (p.ScreenY + 31), colourData['GREY_DARKEST']);
        writeFontImage(TEXT_CH, (p.ScreenX + 281), (p.ScreenY + 31), colourData['BLUE_DARK']);
        writeFontImage(ch.stat.cha.toString(), p.ScreenX + 297, (p.ScreenY + 31), colourData['YELLOW']);

        writeFontImage(TEXT_HP, p.ScreenX + 242, (p.ScreenY + 39), colourData['BLACK']);
        writeFontImage(ch.stat.hp.toString(), p.ScreenX + 282, (p.ScreenY + 39), colourData['WHITE'], FONT_ALIGNMENT_RIGHT);
        writeFontImage("/", p.ScreenX + 282, (p.ScreenY + 39), colourData['GREY_DARKEST']);
        writeFontImage(ch.stat.hpMax.toString(), p.ScreenX + 290, (p.ScreenY + 39), colourData['GREEN']);

        writeFontImage(TEXT_VI, p.ScreenX + 242, (p.ScreenY + 47), colourData['BLACK']);
        writeFontImage(ch.stat.vit.toString(), p.ScreenX + 282, (p.ScreenY + 47), colourData['WHITE'], FONT_ALIGNMENT_RIGHT);
        writeFontImage("/", p.ScreenX + 282, (p.ScreenY + 47), colourData['GREY_DARKEST']);
        writeFontImage(ch.stat.vitMax.toString(), p.ScreenX + 290, (p.ScreenY + 47), colourData['GREEN']);

        if (!start) {
            writeFontImage("FOOD", p.ScreenX + 258, (p.ScreenY + 55), colourData['YELLOW']);
            var t = showStatusBar(ch.getFood(), 200, 62, colourData['RED_DARK']);
            ctx.drawImage(t, (p.ScreenX + 242) * scale, (p.ScreenY + 64) * scale, t.width * scale, t.height * scale);
        }
    }
    //drawPocketInfo(p);
}

function createShield(id, type, colour) {

    //ID = Characters ID i.e. 0 = Blodwyn
    //Type = 0 to 3 = Spade,Heart

    switch (colour) {

        case 0:
            {
                colour = paletteData['SERPENT'];
            };
            break;
        case 1:
            {
                colour = paletteData['CHAOS'];
            };
            break;
        case 2:
            {
                colour = paletteData['DRAGON'];
            };
            break;
        case 3:
            {
                colour = paletteData['MOON'];
            };
            break;
        default:
            {
                colour = paletteData['DEAD'];
            }

    }

    var can = document.createElement('canvas');
    can.width = 30;
    can.height = 41;
    var context = can.getContext("2d");
    if (colour === paletteData['DEAD']) {
        context.drawImage(recolourUiGfx(gfxUI['SHIELD_TOP'], paletteData['DEFAULT_SHIELD'][0], colourData['BLACK']), 0, 0);
        context.drawImage(recolourUiGfx(gfxUI['SHIELD_CHARACTERS'][id], paletteData['DEFAULT_SHIELD'][0], colourData['BLACK']), 0, 5);
        context.drawImage(recolourSprite(gfxUI['SHIELD_TYPES'][type], paletteData['DEFAULT_SHIELD'], colour), 1, 21);
        context.drawImage(recolourUiGfx(gfxUI['SHIELD_BOTTOM'], paletteData['DEFAULT_SHIELD'][0], colourData['BLACK']), 5, 32);
    } else {
        context.drawImage(recolourUiGfx(gfxUI['SHIELD_TOP'], paletteData['DEFAULT_SHIELD'][0], colourData['GREY_LIGHT']), 0, 0);
        context.drawImage(recolourUiGfx(gfxUI['SHIELD_CHARACTERS'][id], paletteData['DEFAULT_SHIELD'][0], colourData['GREY_LIGHT']), 0, 5);
        context.drawImage(recolourSprite(gfxUI['SHIELD_TYPES'][type], paletteData['DEFAULT_SHIELD'], colour), 1, 21);
        context.drawImage(recolourUiGfx(gfxUI['SHIELD_BOTTOM'], paletteData['DEFAULT_SHIELD'][0], colourData['GREY_LIGHT']), 5, 32);
    }

    context.save();
    return can;

}

function toggleChampUI(i, p, set) {
    if (typeof set === "undefined") {
        if (p.uiLeftPanel.champs[i].opened) {
            p.uiLeftPanel.champs[i].opened = false;
        } else {
            p.uiLeftPanel.champs[i].opened = true;
        }
    } else {
        p.uiLeftPanel.champs[i].opened = set;
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

function showStatusBar(thisVal, maxVal, width, colour) {

    if (typeof colour === "undefined") {
        colour = colourData['RED_DARK'];
    }

    var can = document.createElement('canvas');
    can.width = width;
    can.height = 5;
    var canContent = can.getContext("2d");
    var t = Math.floor(thisVal / maxVal * (width - 12));
    canContent.drawImage(gfxUI['FOOD_POINTER'], 0, 1);
    canContent.fillStyle = 'rgb(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ')';
    canContent.fillRect(6, 0, t, 5);
    canContent.drawImage(flipImage(gfxUI['FOOD_POINTER']), width - 4, 1);
    canContent.save();
    return can;
}

function showEndGame(p) {

    coverViewPort(p);

    if (p.uiCenterPanel.mode === UI_CENTER_PANEL_ENDGAME) {
        p.message(TEXT_ACCURSED_BLOODWYCH, colourData['GREEN'],0,100000);
        writeFontImage(TEXT_CONGRATS, (p.ScreenX+32.4) * scale, (p.ScreenY+6.5) * scale, colourData['PINK']);
        var t = drawMonster(getMonsterById(478),0,0,player[0],{x:0,y:10},true)
        myDIx(p.Portal, t, {sx:0, sy:0, w:t.width, h:t.height, x:0,y:0});
        p.Portal.save()
    }

}

function gotoFairyMode(p, m) {
    if (p.uiCenterPanel.mode !== m) {
        var ch = p.fairyDetails.champ;
        if (m === UI_CENTER_PANEL_FAIRY) {
            p.message(ch.firstName + TEXT_MAY_BUY_SPELL, colourData['GREEN'], false, 0);
        } else if (m === UI_CENTER_PANEL_FAIRY_SERPENT || m === UI_CENTER_PANEL_FAIRY_CHAOS || m === UI_CENTER_PANEL_FAIRY_DRAGON || m === UI_CENTER_PANEL_FAIRY_MOON) {

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
        //p.message(c.firstName + " MAY BUY A SPELL-PICK A CLASS", colourData['GREEN'], false, 3000);
        //writeFontImage(c.firstName + " MAY BUY A SPELL-PICK A CLASS", p.ScreenX, (p.ScreenY -10) * scale, colourData['GREEN']);
        //p.Portal.drawImage(gfxUI['FAIRIES'][0], 8 * scale, 5 * scale, gfxUI['FAIRIES'][0].width * scale, gfxUI['FAIRIES'][0].height * scale);
        myDXi(p.Portal, gfxUI['FAIRIES'][0], {sx:8, sy:5, w:gfxUI['FAIRIES'][0].width, h:gfxUI['FAIRIES'][0].height, x:0,y:0});
        for(var x = 0; x < 5; x++) {
            if (x < 4) {
                //p.Portal.drawImage(gfxUI[80 + x], (17 + (x * 16)) * scale, 50 * scale, gfxUI[80 + x].width * scale, gfxUI[80 + x].height * scale);
                myDIx(p.Portal, gfxUI[80 + x], {sx:(17 + (x * 16)), sy:50, w:gfxUI[80 + x].width, h:gfxUI[80 + x].height, x:0,y:0});
            } else {
                //p.Portal.drawImage(recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), (32 + (x * 16)) * scale, 50 * scale, gfxUI['ICON_BACK'].width * scale, gfxUI['ICON_BACK'].height * scale);
                myDIx(p.Portal, recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), {sx:(32 + (x * 16)), sy:50, w:gfxUI['ICON_BACK'].width, h:gfxUI['ICON_BACK'].height, x:0,y:0});
            }
        }
    } else {
        //writeFontImage("SELECT THY NEW SPELL, "+c.firstName, p.ScreenX, (p.ScreenY -10) * scale, colourData['GREEN']);
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

    //p.Portal.drawImage(gfxUI['FAIRIES'][spellClass + 1], 8 * scale, 5 * scale, gfxUI['FAIRIES'][spellClass + 1].width * scale, gfxUI['FAIRIES'][spellClass + 1].height * scale);
    myDIx(p.Portal, gfxUI['FAIRIES'][spellClass + 1], {sx:8, sy:5, w:gfxUI['FAIRIES'][spellClass + 1].width, h:gfxUI['FAIRIES'][spellClass + 1].height, x:0, y:0});

    var mySpells = c.getUnlearntSpellsByColour(spellClass);
    var spellColour = null;

    switch (spellClass) {

        case 0:
            {
                spellColour = colourData['GREEN'];
            };
            break
        case 1:
            {
                spellColour = colourData['YELLOW'];
            };
            break
        case 2:
            {
                spellColour = colourData['RED'];
            };
            break
        case 3:
            {
                spellColour = colourData['BLUE'];
            };
            break

    }
    if (mySpells.length > 0) {
        p.message(TEXT_SELECT_SPELL + ch.firstName, colourData['GREEN'], false, 0);
        writeFontImage(mySpells[0].name, 43, 12, spellColour, FONT_ALIGNMENT_LEFT, p.Portal);
        if (mySpells.length > 1) {
            writeFontImage(mySpells[1].name, 43, 22, spellColour, FONT_ALIGNMENT_LEFT, p.Portal);
        }
    } else {
        p.message(TEXT_ALL_I_HAVE + ch.firstName, colourData['GREEN'], false, 0);
    }
    //p.Portal.drawImage(recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), (32 + (4 * 16)) * scale, 50 * scale, gfxUI['ICON_BACK'].width * scale, gfxUI['ICON_BACK'].height * scale);
    myDIx(p.Portal, recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), {sx:(32 + (4 * 16)), sy:50, w:gfxUI['ICON_BACK'].width, h:gfxUI['ICON_BACK'].height, x:0, y:0});
}

function showFairySpellDetailsScreen(spell, p, c) {

    var spellColour = [];
    var spellClass = spell.colour;

    //p.Portal.drawImage(gfxUI['FAIRIES'][spellClass + 1], 8 * scale, 5 * scale, gfxUI['FAIRIES'][spellClass + 1].width * scale, gfxUI['FAIRIES'][spellClass + 1].height * scale);
    myDIx(p.Portal, gfxUI['FAIRIES'][spellClass + 1], {sx:8, sy:5, w:gfxUI['FAIRIES'][spellClass + 1].width, h:gfxUI['FAIRIES'][spellClass + 1].height, x:0, y:0});

    /*switch (spellClass) {

        case 0:
            {
                spellColour = colourData['GREEN'];
            };
            break
        case 1:
            {
                spellColour = colourData['YELLOW'];
            };
            break
        case 2:
            {
                spellColour = colourData['RED'];
            };
            break
        case 3:
            {
                spellColour = colourData['BLUE'];
            };
        case 4:
            {
                spellColour = colourData['PINK'];
            };
            break

    }*/

    writeFontImage(spell.name, 43, 12, paletteData['CLASS'][spellClass], FONT_ALIGNMENT_LEFT, p.Portal);
    writeFontImage("LEVEL " + spell.level, 43, 23, colourData['GREY_LIGHT'], FONT_ALIGNMENT_LEFT, p.Portal);
    writeFontImage(spell.cost + " GOLD", 43, 31, colourData['GREY_LIGHT'], FONT_ALIGNMENT_LEFT, p.Portal);
    p.message(spell.description, colourData['GREEN'], false, 0);

    for(var x = 0; x < 5; x++) {
        if (x < 4) {
            if (x === spellClass) {
                //p.Portal.drawImage(gfxUI[80 + x], 17 * scale, 50 * scale, gfxUI[80 + x].width * scale, gfxUI[80 + x].height * scale);
                myDIx(p.Portal, gfxUI[80 + x], {sx:17, sy:50, w:gfxUI[80 + x].width, h:gfxUI[80 + x].height, x:0,y:0});
            }
        } else {
            //p.Portal.drawImage(recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), (32 + (x * 16)) * scale, 50 * scale, gfxUI['ICON_BACK'].width * scale, gfxUI['ICON_BACK'].height * scale);
            myDIx(p.Portal, recolourUiGfx(gfxUI['ICON_BACK'], paletteData['DEFAULT_ITEM'][0], paletteData['PLAYER'][p.id][1]), {sx:(32 + (x * 16)), sy:50, w:gfxUI['ICON_BACK'].width, h:gfxUI['ICON_BACK'].height, x:0,y:0});
        }
    }

    writeFontImage("OK ?", 43, 55, colourData['RED'], FONT_ALIGNMENT_LEFT, p.Portal);

}

function colourSpellPage(dr, ch, img) {

    //dr = Direction - False = Backwards
    var pal = [];
    var page = null;

    if (dr) {
        var page = (ch.spellBookPage + 1) % SPELL_PAGE_MAX;
    } else {
        var page = ch.spellBookPage;
    }

    for(var x = 0; x < SPELL_PAGE_MAX; x++) {
        if (ch.spellBook[page][x].learnt) {
            if (ch.spellBook[page][x] === getSpellById(ch.selectedSpell)) {
                pal.push(colourData['WHITE']);
            } else {
                pal.push(getClassColour(ch.spellBook[page][x].ref.colour));

            }
        } else {
            pal.push(colourData['GREY_DARKEST']);
        }
    }

    return recolourSprite(img, paletteData['DEFAULT_MON'], pal);

}

function drawWallScroll(p) {
    try {

        var pos = 15;
        var xy = posToCoordinates(pos, p.x, p.y, p.d);
        var f = p.floor,
            x = xy.x,
            y = xy.y;

        if (x >= 0 && x < tower[towerThis].floor[f].Height && y >= 0 && y < tower[towerThis].floor[f].Width) {
            var off = [0, 21, 33, 41, 49, 59],
                hex = tower[towerThis].floor[f].Map[y][x],
                A = parseInt(hex.substring(0, 1), 16),
                B = parseInt(hex.substring(1, 2), 16),
                scrollRef = Math.floor((((A * 16) + B) / 4) - 4) - 1 + off[towerThis];

            drawScroll(scrollData[scrollRef], p.ScreenX + 226, p.ScreenY - 1);
        }
    } catch (e) {
        p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
        redrawUI(p.id, UI_REDRAW_SCROLL);
    };
}

function drawScroll(text, x, y, small) {
    if (typeof small === 'undefined') {
        var small = false;
    }
    if (small) {
        var rm = 5;
        ctx.drawImage(gfxUI['CHARACTER_SCROLL'], x * scale, y * scale, gfxUI['CHARACTER_SCROLL'].width * scale, gfxUI['CHARACTER_SCROLL'].height * scale);
    } else {
        var rm = 7;
        ctx.drawImage(gfxUI['SCRIPT'], x * scale, y * scale, gfxUI['SCRIPT'].width * scale, gfxUI['SCRIPT'].height * scale);
    }

    //Scroll page can hold 7 (or 5 for small scrolls) Lines, im sure Jorg can do some math to make the start Y be the center if scrollData[scrollRef].length < 7
    var l = Math.floor((rm - text.length) / 2);

    for (var r = 0; r < text.length; r++) {
        var col = colourData['BLACK'];
        if (r === 0 && small) {
            col = colourData['YELLOW'];
        }
        writeFontImage(text[r], x + 52, y + 16 + (l * 8), col, FONT_ALIGNMENT_CENTER);
        l++;
    }
}

function drawCommunicationBox(p, item, forced) {

    //We meed the commincation box to be drawn on its own and not with the UI as this will be updated more offern
    //we can do a check on the player.communication.highlighted and see if it matches the current x/y then redraw if needed to hightligh the new word

    //Check if we actually need to redraw...
    if (typeof item === "undefined") {
        item === null;
    }
    if (typeof forced === "undefined") {
        forced === false;
    }

    if (p.communication.highlighted !== item || forced) {

        if (p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_0 || p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_1) {
            ctx.drawImage(gfxUI['ICON_SCROLL_UP'], (p.ScreenX + 57) * scale, (p.ScreenY + 32) * scale, gfxUI['ICON_SCROLL_UP'].width * scale, gfxUI['ICON_SCROLL_UP'].height * scale);
            ctx.drawImage(gfxUI['ICON_SCROLL_DOWN'], (p.ScreenX + 72) * scale, (p.ScreenY + 32) * scale, gfxUI['ICON_SCROLL_DOWN'].width * scale, gfxUI['ICON_SCROLL_DOWN'].height * scale);
        } else {
            ctx.clearRect((p.ScreenX + 57) * scale, (p.ScreenY + 32) * scale, 30 * scale, 14 * scale);
        }

        //if (p.communication.mode !== COMMUNICATION_PAGE_NAMES) {

        var myPage = p.communication.mode;
        for(var r = 0; r < TEXT_COMMUNICATION_COMMANDS[myPage].length; r++) {
            ctx.fillStyle = 'rgb(' + colourData['GREY_DARK'][0] + ', ' + colourData['GREY_DARK'][1] + ', ' + colourData['GREY_DARK'][2] + ')';
            var myColour = colourData['YELLOW'];

            if (r === item) {
                ctx.fillStyle = 'rgb(' + colourData['BLUE_DARK'][0] + ', ' + colourData['BLUE_DARK'][1] + ', ' + colourData['BLUE_DARK'][2] + ')';
                myColour = colourData['WHITE'];
            }

            if (TEXT_COMMUNICATION_COMMANDS[myPage][r].left) {
                var x = (p.ScreenX + 1);
                var al = FONT_ALIGNMENT_LEFT;
                var t = 1;
            } else {
                var x = (p.ScreenX + 1) + (TEXT_COMMUNICATION_COMMANDS[myPage][r - 1].width + 1);
                var al = FONT_ALIGNMENT_RIGHT;
                var t = TEXT_COMMUNICATION_COMMANDS[myPage][r].width + 2;
            }
            var y = (p.ScreenY + 47) + (TEXT_COMMUNICATION_COMMANDS[myPage][r].row * 8);
            ctx.fillRect(x * scale, y * scale, TEXT_COMMUNICATION_COMMANDS[myPage][r].width * scale, 7 * scale);
            if (myPage === COMMUNICATION_PAGE_NAMES) {
                var c1 = p.getOrderedChampionIds();
                var c2 = c1[r + 1];
                var cid = p.champion[c2];
                var ch = p.getChampion(c2);
                if (ch !== null) {
                    writeFontImage(ch.firstName, (x + 1), y, myColour, al);
                }
            } else {
                writeFontImage(TEXT_COMMUNICATION_COMMANDS[myPage][r].text, (x + t), y, myColour, al);
            }
        }
        p.communication.highlighted = item;
    }


}

function showGameStateMenu(p) {

    gameStateSelectGrid = [];

    if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_MENU) {
        coverViewPort(p);
        writeFontImage("LOAD GAME", 30, 16, colourData['GREEN'], FONT_ALIGNMENT_LEFT, p.Portal);
        createSelectGrid(gameStateSelectGrid, 100, 14, 120, 16, null);
        writeFontImage("SAVE GAME", 30, 32, colourData['GREEN'], FONT_ALIGNMENT_LEFT, p.Portal);
        createSelectGrid(gameStateSelectGrid, 100, 30, 120, 16, null);
        writeFontImage("RESTART", 38, 56, colourData['RED'], FONT_ALIGNMENT_LEFT, p.Portal);
        createSelectGrid(gameStateSelectGrid, 100, 54, 120, 16, null);
        //pauseGame(false)
    }
    if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_SAVE) {
        createStateGrid(p, "SAVE");
    }
    if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_LOAD) {
        createStateGrid(p, "LOAD");
    }

}

function createStateGrid(p, state) {
    coverViewPort(p);
    p.message(state + " GAME - PLEASE SELECT A SLOT...", colourData['GREEN'], false, 0);
    //writeFontImage(state + " GAME", 28, 2, colourData['GREEN'], FONT_ALIGNMENT_LEFT, p.Portal);
    for (var x = 0; x < 8; x++) {
        var clr = colourData['GREY_LIGHT'];
        var name = getGameName(x);
        if (name === '') {
            clr = colourData['GREY_DARKEST'];
            name = 'EMPTY SLOT';
        }
        writeFontImage((x + 1) + '.' + name, 8, x * 8 + 6, clr, FONT_ALIGNMENT_LEFT, p.Portal);
        createSelectGrid(gameStateSelectGrid, 100, x * 8 + 7, 120, 8, null);
    }
}

/*function uiGameStateMenu(x, y, p) {

    if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_SAVE) {
        for (var slot = 0; slot < 8; slot++) {
            if (uiClickInArea(x, y, slot, p, gameStateSelectGrid)) {
                p.message("SAVE GAME - CHANGE NAME OR ENTER TO SAVE", colourData['GREEN'], false, 0);
                var inp = $('input.save-game');
                inp.val(getGameName(slot));
                inp.data('player-id', p.id);
                inp.data('slot-id', slot);
                inp.show();
                inp.trigger('click');
                return;
            }
        }
    } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_LOAD) {
        for (var slot = 0; slot < 8; slot++) {
            if (uiClickInArea(x, y, slot, p, gameStateSelectGrid)) {
                if (getGameName(slot) !== '') {
                    pauseGame(false);
                    loadGame(slot);
                    redrawUI(2);
                    return;
                }
            }
        }
    } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_MENU) {
        if (uiClickInArea(x, y, 0, p, gameStateSelectGrid)) {
            p.uiCenterPanel.mode = UI_CENTER_PANEL_GAMESTATE_LOAD;
            showGameStateMenu(p);
        } else if (uiClickInArea(x, y, 1, p, gameStateSelectGrid)) {
            p.uiCenterPanel.mode = UI_CENTER_PANEL_GAMESTATE_SAVE;
            showGameStateMenu(p);
        } else if (uiClickInArea(x, y, 2, p, gameStateSelectGrid)) {
            location.reload();
        }
    }


}*/

function uiChampSelectArea(x, y, pl) {

    var px = 0;
    var py = 0;

    for(var ui = 0; ui < champSelectGrid.length; ui++) {
        if (x >= (px + champSelectGrid[ui].x) * 1 && x < (px + champSelectGrid[ui].x + champSelectGrid[ui].width) * 1 && y >= (py + champSelectGrid[ui].y) * 1 && y < (py + champSelectGrid[ui].y + champSelectGrid[ui].height) * 1) {
            if (debug) {
                ctx.fillStyle = 'rgba(255, 255, 196, 0.75)';
                ctx.fillRect((px + champSelectGrid[ui].x) * scale, (py + champSelectGrid[ui].y) * scale, champSelectGrid[ui].width * scale, champSelectGrid[ui].height * scale);
            }

            if (players === 2 && currentPlayer === 1 && champSelectGrid[ui].champID === championSelect[0].champID) {
                //championSelect[pl].champID = champSelectGrid[ui].champID;
            } else {
                championSelect[pl].champID = champSelectGrid[ui].champID;
                if (players === 1) {
                    player[0] = new Player(0, 0, 50);
                    player[0].champion[0] = champSelectGrid[ui].champID;
                } else {
                    if (currentPlayer === 0) {
                        player[0] = new Player(0, 0, 50);
                        player[0].champion[0] = champSelectGrid[ui].champID;
                    } else {
                        player[1] = new Player(0, 0, 50);
                        player[1].champion[0] = champSelectGrid[ui].champID;
                    }
                }
                drawQuickStartUI(pl);
            }
        }
    }

    if (uiClickInArea(x, y, UI_CLICK_CHAMPION_SELECT_1_PLAYER_ACTION)) {
        var t = (championSelect[pl].mode + 1) % 3;
        championSelect[pl].mode = t;
        drawQuickStartUI(pl);
    } else if (uiClickInArea(x, y, UI_CLICK_CHAMPION_SELECT_1_START)) {
        if (players === 2 && currentPlayer === 0) {
            currentPlayer = 1;
            drawQuickStartUI(1);
        } else {
            championSelect[pl].mode = UI_CHARACTER_SELECT_START_GAME;
            drawQuickStartUI(pl);
            if (players === 2 && currentPlayer === 1) {
                startGame(false, false, championSelect[0].champID, championSelect[1].champID);
            } else {
                startGame(true, false, championSelect[0].champID);
            }
        }
    }
}

function drawHitDamage(p, myCh, hitPt) {
    var c1 = p.getOrderedChampionIds();
    for(var c = 0; c < p.champion.length; c++) {
        var c2 = c1[c];
        var ch = p.getChampion(c2);
        if (ch !== null) {
            if (p.uiLeftPanel.champs[c].opened === true) {
                if (ch.id === myCh) {
                    if (c === 0) {
                        ctx.drawImage(gfxUI['ICON_ATTACK'], (c - 38 * scale) + (p.ScreenX * scale) * scale, (p.ScreenY - 32) * scale, gfxUI['ICON_ATTACK'].width * scale, gfxUI['ICON_ATTACK'].height * scale);
                    } else {
                        ctx.drawImage(gfxUI['ICON_ATTACK'], ((c - 1) * 32 * scale) + (p.ScreenX * scale), (p.ScreenY + 45) * scale, gfxUI['ICON_ATTACK'].width * scale, gfxUI['ICON_ATTACK'].height * scale);
                    }
                }
            }
        }
    }
}
