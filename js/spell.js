function Spell(colour, grade, name, description, symbols, level) {
    this.colour = colour;
    this.grade = grade;
    this.id = grade + colour * SPELL_LEVEL_MAX;
    this.name = name;
    this.description = description;
    this.symbols = symbols;
    this.level = level;
    this.cost = this.level * SPELL_COLOUR_MAX;
    var pr = getSpellPageAndRow(colour, grade);
    this.page = pr.page;
    this.row = pr.row;
    this.power = getSpellPower(this.id);
}
Spell.prototype.toString = function () {
    return '[colour:' + this.colour + ', grade:' + this.grade + ', name:' + this.name + ', description:' + this.description + ', level:' + this.level + ', cost:' + this.cost + ']';
}

function initSpells() {
    for (var cl = 0; cl < SPELL_COLOUR_MAX; cl++) {
        spell[cl] = new Array();
        for (var id = 0; id < SPELL_LEVEL_MAX; id++) {
            var name = TEXT_SPELL_NAME[id + cl * SPELL_LEVEL_MAX];
            var description = TEXT_SPELL_DESCRIPTION[id + cl * SPELL_LEVEL_MAX];
            var symbols = TEXT_SPELL_BOOK[id + cl * SPELL_LEVEL_MAX];
            var level = getSpellLevel(id + cl * SPELL_LEVEL_MAX);
            spell[cl][id] = new Spell(cl, id, name, description, symbols, level);
        }
    }
    for (var id = 0; id < spellJson.length; id++) {
        var sp = spell[Math.floor(id / SPELL_LEVEL_MAX)][id % SPELL_LEVEL_MAX];
        var n = spellJson[id].name;
        var d = spellJson[id].description;
        var c = spellJson[id].class;
        var g = spellJson[id].grade;
        var l = spellJson[id].level;
        var pw = spellJson[id].power;
        var s = spellJson[id].book.symbols;
        var pg = spellJson[id].book.page;
        var r = spellJson[id].book.row;
        sp.id = id;
        if (typeof n !== "undefined") {
            sp.name = n;
        }
        if (typeof d !== "undefined") {
            sp.description = d;
        }
        if (typeof c !== "undefined") {
            sp.class = c.getVar();
        }
        if (typeof g !== "undefined") {
            sp.grade = g;
        }
        if (typeof l !== "undefined") {
            sp.level = l;
        }
        if (typeof pw !== "undefined") {
            sp.power = pw;
        }
        if (typeof s !== "undefined") {
            sp.symbols = s;
        }
        if (typeof pg !== "undefined") {
            sp.page = pg;
        }
        if (typeof r !== "undefined") {
            sp.row = r;
        }
    }
}

function getSpellLevel(id) {
    var s = spellJson[id];
    if (typeof s !== "undefined") { //JSON
        return s.level;
    }
    var sl = [
        [1, 2, 2, 2, 3, 3, 4, 5],
        [1, 2, 4, 5, 5, 6, 7, 8],
        [1, 2, 2, 3, 3, 4, 5, 6],
        [1, 2, 2, 3, 3, 4, 4, 7],
        [6, 7, 7, 8, 8, 10, 12, 18]
    ];
    return sl[Math.floor(id / SPELL_LEVEL_MAX)][id % SPELL_LEVEL_MAX];
}
/*
"ARMOUR",		"ARMOUR",
"TERROR",		"PARALYZE",
"VITALISE",		"COMPASS",
"BEGUILE",		"LEVITATE",
"DEFLECT",		"WARPOWER",
"MAGELOCK",		"RENEW",
"CONCEAL",		"ARC BOLT",
"WARPOWER",		"FORMWALL",

"MISSILE",		"BEGUILE",
"VANISH",		"CONFUSE",
"PARALYZE",		"CONCEAL",
"ALCHEMY",		"TRUEVIEW",
"CONFUSE",		"VANISH",
"LEVITATE",		"ILLUSION",
"ANTIMAGE",		"MINDROCK",
"RECHARGE",		"WYCHWIND",

"TRUEVIEW",		"MISSILE",
"RENEW",		"MAGELOCK",
"VIVIFY",		"VITALISE",
"DISPELL",		"DISPELL",
"FIREPATH",		"FIREBALL",
"ILLUSION",		"FIREPATH",
"COMPASS",		"RECHARGE",
"SPELLTAP",		"BLAZE",

"DISRUPT",		"DEFLECT",
"FIREBALL",		"TERROR",
"WYCHWIND",		"ANTIMAGE",
"ARC BOLT",		"SPELLTAP",
"FORMWALL",		"ALCHEMY",
"SUMMON",		"SUMMON",
"BLAZE",		"VIVIFY",
"MINDROCK"		"DISRUPT"
*/
function getSpellPageAndRow(c, i) {
    var sp = [
        [0, 1, 2, 1, 0, 2, 3, 3],
        [0, 0, 1, 2, 1, 3, 2, 3],
        [1, 0, 0, 2, 3, 2, 1, 3],
        [0, 1, 0, 2, 1, 2, 3, 3],
        [4, 4, 4, 4, 4, 4, 4, 4]
    ];
    var sr = [
        [0, 2, 6, 5, 7, 1, 3, 4],
        [4, 1, 6, 7, 3, 5, 2, 0],
        [0, 5, 2, 3, 1, 4, 7, 6],
        [3, 4, 6, 0, 1, 5, 7, 2],
        [0, 1, 2, 3, 4, 5, 6, 7]
    ];
    return {
        page: sp[c][i],
        row: sr[c][i]
    };
}

function getSpellById(id) {
    if (id > -1) {
        var cl = Math.floor(id / SPELL_LEVEL_MAX);
        var s = id % SPELL_LEVEL_MAX;
        if (typeof spell[cl] !== "undefined" && typeof spell[cl][s] !== "undefined") {
            return spell[cl][s];
        }
    }
    return null;
}

function getSpellBookPage(p) {
    var sb = new Array();
    for (var cl = 0; cl < SPELL_COLOUR_MAX; cl++) {
        for (var id = 0; id < SPELL_LEVEL_MAX; id++) {
            var sp = spell[cl][id];
            if (sp.page === p) {
                sb.push(sp);
            }
        }
    }
    return sb.sort(function (a, b) {
        return (a.row - b.row);
    });
}

function getSpellPower(id) {
    var sp = spellJson[id];
    if (typeof sp !== "undefined" && typeof sp.power !== "undefined") {
        return sp.power;
    }
    switch (id) {
        case SPELL_ARMOUR:
            return 1;
        case SPELL_PARALYZE:
            return 4;
        case SPELL_COMPASS:
            return 2;
        case SPELL_LEVITATE:
            return 2;
        case SPELL_WARPOWER:
            return 1;
        case SPELL_RENEW:
            return 1;
        case SPELL_ARC_BOLT:
            return 2;
        case SPELL_FORMWALL:
            return 1;
            //chaos
        case SPELL_DEFLECT:
            return 1;
        case SPELL_TERROR:
            return 1;
        case SPELL_ANTIMAGE:
            return 1;
        case SPELL_SPELLTAP:
            return 1;
        case SPELL_ALCHEMY:
            return 1;
        case SPELL_SUMMON:
            return 1;
        case SPELL_VIVIFY:
            return 1;
        case SPELL_DISRUPT:
            return 4;
            //dragon
        case SPELL_MISSILE:
            return 2;
        case SPELL_MAGELOCK:
            return 1;
        case SPELL_VITALISE:
            return 1;
        case SPELL_DISPELL:
            return 1;
        case SPELL_FIREBALL:
            return 2;
        case SPELL_FIREPATH:
            return 2;
        case SPELL_RECHARGE:
            return 1;
        case SPELL_BLAZE:
            return 2;
            //moon
        case SPELL_BEGUILE:
            return 2;
        case SPELL_CONFUSE:
            return 1;
        case SPELL_CONCEAL:
            return 1;
        case SPELL_TRUEVIEW:
            return 1;
        case SPELL_VANISH:
            return 1;
        case SPELL_ILLUSION:
            return 1;
        case SPELL_MINDROCK:
            return 1;
        case SPELL_WYCHWIND:
            return 2;
            //ancient
        case SPELL_PROTECT:
            return 1;
        case SPELL_PHASE:
            return 1;
        case SPELL_ENHANCE:
            return 1;
        case SPELL_INFERNO:
            return 2;
        case SPELL_NULLIFY:
            return 1;
        case SPELL_SPRAY:
            return 4;
        case SPELL_VORTEX:
            return 2;
        case SPELL_RESTORE:
            return 1;
        default:
            return 1;
    }
}

//add onFail to execute when spell didnt do its effect
//check projectile target's power
function executeSpell(s, act, tar, pow) {
    if (typeof act !== "undefined") {
        var spl = spellJson[s];
        if (typeof pow === "undefined") {
            pow = 0;
        }
        if (typeof spl !== "undefined") { //JSON
            if (typeof tar.attacker !== "undefined") { //combat
                var att = tar.attacker;
                if(typeof att.monster !== "undefined") { //projectile
                    att = att.monster;
                }
                var def = tar.defender;
                var pow = tar.power;
                var dExh = tar.defExhaustion;
                if (def instanceof Champion) {
                    tar = def.getMonster();
                } else if (typeof def !== "undefined" && def !== null) {
                    tar = def;
                } else if (typeof att !== "undefined" && att !== null) {
                    tar = att;
                }
            }
            var f = tar.floor;
            var x = tar.x;
            var y = tar.y;
            var d = tar.d;
            var xy = getOffsetByRotation(d);
            var x1 = x + xy.x;
            var y1 = y + xy.y;
            if (typeof act.bounce !== "undefined") {
                if(act.bounce === "WALL") { //arc bolt
                    var ob = getObject(f, x, y, d);
                    var obNext = canMove(f, x, y, d);
                    var msc = (ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR);
                    if (obNext > OBJECT_MISC && !msc) {
                        var dNew = Math.floor(Math.random() * 2) * 2 + 1;
                        obNext = canMove(f, x, y, (d + dNew) % 4);
                        if (obNext > OBJECT_MISC) {
                            dNew = 4 - dNew;
                            obNext = canMove(f, x, y, (d + dNew) % 4);
                            if (obNext > OBJECT_MISC) {
                                dNew = 2;
                                obNext = canMove(f, x, y, (d + dNew) % 4);
                                if (obNext > OBJECT_MISC) {
                                    res = true;
                                }
                            }
                        }
                        tar.d = (d + dNew) % 4;
                    }
                } else if(act.bounce === "FIRE") { //blaze
                    if (canMoveByFirepath(f, x, y) && !canMoveByFirepath(f, x, y, d)) {
                        tar.d = (d + 2) % 4;
                        if (!canMoveByFirepath(f, x, y, d)) {
                            res = true;
                        }
                    }
                }
            }
            var viv = act.revive;
            if (typeof viv !== "undefined") { //vivify
                if (getMonsterAt(f, x, y) === null) {
                    for (var i = item[towerThis].length - 1; i >= 0; i--) {
                        var it = item[towerThis][i];
                        if (it.location.tower === towerThis && it.location.floor === f && it.location.x === x && it.location.y === y) {
                            var rv = itemJson[it.id].revive;
                            if (typeof rv !== "undefined") {
                                var c = $.inArray(rv, CHAMPION_ID); //it.id - 'ITEM_BLODWYN_RIP';
                                if (c > -1) {
                                    item[towerThis].splice(i, 1);
                                    champion[c].stat.hp = 0;
                                    champion[c].getMonster().floor = f;
                                    champion[c].getMonster().x = x;
                                    champion[c].getMonster().y = y;
                                    champion[c].getMonster().d = d;
                                    champion[c].getMonster().hp = 0;
                                    champion[c].getMonster().dead = false;
                                    if (!champion[c].recruitment.attached && champion[c].recruitment.playerId > -1) {
                                        var p = player[champion[c].recruitment.playerId];
                                        if (p.dead) {
                                            champion[c].recruitment.attached = true;
                                            var i = p.getChampionPosition(c);
                                            p.exchangeChampionPosition(0, i);
                                            p.championLeader = 0;
                                            p.tower = towerThis;
                                            p.floor = f;
                                            p.x = x;
                                            p.y = y;
                                            p.d = d;
                                            p.dead = false;
                                            p.updateChampions();
                                            redrawUI(2);
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                for (var p in player) {
                    var pl = player[p];
                    if (!pl.dead && f === pl.floor && x === pl.x && y === pl.y) {
                        for (var c = 0; c < pl.champion.length; c++) {
                            var ch1 = pl.getChampion(c);
                            if (ch1 !== null && ch1.getMonster().dead && ch1.recruitment.attached) {
                                ch1.stat.hp = 0;
                                ch1.getMonster().dead = false;
                                redrawUI(2);
                                if(typeof act.areaOfEffect !== "undefined" && act.areaOfEffect === 'single') {
                                    break;
                                }
                            }
                        }
                        pl.updateChampions();
                        break;
                    }
                }
            }
            var lck = act.unlock;
            if(typeof lck !== "undefined") {
                if(lck === 'DOOR_COMMON') { //magelock
                    if (getDungeonHex(f, x - xy.x, y - xy.y, 13, 3) === '2' && getDungeonHex(f, x - xy.x, y - xy.y, ((5 + 2 - d) % 4) * 2) === '1') {
                        setDungeonHex(f, x - xy.x, y - xy.y, 11, 1);
                    } else if (getDungeonHex(f, x, y, 13, 3) === '2' && getDungeonHex(f, x, y, ((5 + 0 - d) % 4) * 2) === '1') {
                        setDungeonHex(f, x, y, 11, 1);
                    } else if (getDungeonHex(f, x, y, 13, 3) === '5' && getDungeonHex(f, x, y, 4) === '0') {
                        setDungeonHex(f, x, y, 11, 1);
                    }
                } else { //solid doors
                    var dun = getDungeonHex(f, x, y, 1, 3);
                    lck = '' + lck.getVar();
                    if (dun === '0' || dun === lck) {
                        setDungeonHex(f, x, y, 11, 1);
                        if(dun === '0') {
                            setDungeonHex(f, x, y, 1, 3, lck);
                        } else {
                            setDungeonHex(f, x, y, 1, 3, '0');
                        }
                    }
                }
            }
            var mob = act.setObject;
            if (typeof mob !== "undefined") { //change dungeon
                if(mob === 'NONE') { //dispell
                    if (getDungeonHex(f, x, y, 12, 1) === '1') {
                        setDungeonHex(f, x, y, 12, 1, '0');
                    }
                    if (getDungeonHex(f, x, y, 13, 3) === '7') {
                        setDungeonHex(f, x, y, 0, 16, '0000');
                        deleteDungeonSpells(f, x, y);
                    }
                } else if (getDungeonHex(f, x, y, 0, 16) === '0000') { //firepath, formwall, mindrock
                    var tim = act.timer;
                    if (typeof tim !== "undefined" && tim > 0.0) {
                        pow *= tim;
                    }
                    setDungeonHex(f, x, y, 13, 3, '7');
                    setDungeonHex(f, x, y, 6, 2, '' + SPELL_DUNGEON[mob]);
                    setDungeonHex(f, x, y, 0, 6, dec2hex(pow));
                    var tim = act.timer;
                    if (typeof tim !== "undefined" && tim > 0.0) {
                        if (tar instanceof Projectile) {
                            setDungeonSpell(s, f, x, y, tar);
                        } else {
                            setDungeonSpell(s, f, x, y);
                        }
                    }
                }
            }
            var mon = act.setMonster;
            if (typeof mon !== "undefined") { //summon, illusion
                var ob = getObject(f, x, y);
                if (ob === OBJECT_CHARACTER || ob === OBJECT_PROJECTILE || ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR) {
                    //executeSpell(s, act, tar, pow);
                } else if (ob === OBJECT_NONE) {
                    var lvl = mon.level;
                    if (typeof lvl === "undefined") {
                        lvl = 0;
                    }
                    var lfc = mon.levelFactor;
                    if (typeof lfc === "undefined") {
                        lfc = 1.0;
                    }
                    var typ = mon.type;
                    if (typeof typ === "undefined") {
                        typ = "MON_TYPE_DRONE";
                    } else if (typeof typ === "string") {
                        typ = typ.getVar();
                    }
                    var frm = mon.form;
                    if (typeof frm === "undefined") {
                        frm = "MON_FORM_SUMMON";
                    } else if (typeof frm === "string") {
                        frm = frm.getVar();
                    }
                    var hp = mon.hp;
                    if (typeof hp === "undefined") {
                        hp = -1;
                    }
                    var max = monster[towerThis].length;
                    monster[towerThis][max] = new Monster(null, Math.floor(pow * lfc) + lvl, typ, frm, towerThis, f, x, y, d, (d + Math.floor(Math.random() * 2) + 2) % 4, 0, null, createPocketSlots(POCKET_MAX + 1));
                    if (hp > -1) {
                        monster[towerThis][max].hp = hp;
                    }
                    monster[towerThis][max].doGesture(CHA_GESTURE_SPELLCASTING);
                }
            }
            var dmg = act.damage;
            if (typeof dmg !== "undefined" && typeof att !== "undefined" && typeof def !== "undefined") { //damage spells
                if (typeof att !== "undefined" && att !== null) {
                    var pl = att.isRecruitedBy();
                    var ch = att.getChampion();
                    if(dmg === "fatal") { //when it is not fatal, it will only damage for 1 hit (disrupt)
                        if(pow > 1 && pow < def.getHP()) {
                            pow = 1;
                        }
                    }
                    att.doDamageTo(def, pow, dExh);
                    if (pl !== null && ch !== null) {
                        if (def instanceof Monster) {
                            pl.gainChampionXp(pow, ch);
                            if (def.dead) {
                                pl.gainChampionXp(128);
                            }
                        }
                    }
                }
            }

            var prt = act.castSpellPart;
            if(typeof prt !== "undefined" && prt.length > 0) {
                for(p in prt) {
                    var id = prt[p].id;
                    if(typeof id !== "undefined") {
                        if(typeof prt[p].power !== "undefined") {
                            pow = prt[p].power;
                        }
                        var src = clone(tar);
                        var pos = prt[p].position;
                        if(typeof pos !== "undefined") {
                            var xy1 = getOffsetByRotation(src.d);
                            var d = 0;
                            var x = 0;
                            var y = 0;
                            if(typeof pos.d !== "undefined") {
                                d = pos.d;
                                if(pos.d === "random") {
                                    d = Math.floor(Math.random() * 4);
                                }
                            }
                            if(typeof pos.x !== "undefined") {
                                x = pos.x;
                            }
                            if(typeof pos.y !== "undefined") {
                                y = pos.y;
                            }
                            src.x = src.x + (x * -xy1.y) + (y * -xy1.x);
                            src.y = src.y + (x * xy1.x) + (y * -xy1.y);
                            src.d = (src.d + d) % 4;
                        }
                        castSpell(s, src, pow, id);
                    }
                }
            }
            if (tar instanceof Monster) {
                var ch = tar.getChampion();
                if (ch !== null) {
                    if (typeof act.enchant !== "undefined") {
                        ch.activateSpell(s, pow);
                    }
                    var chi = act.changeItem; //alchemy, recharge
                    if (typeof chi !== "undefined") {
                        var pck = chi.pocket;
                        var fTyp = chi.fromType;
                        var fId = chi.fromId;
                        if (typeof pck !== "undefined" && pck.length > 0) {
                            for (var p in pck) {
                                var slot = pck[p].getVar();
                                var itm = itemJson[ch.pocket[slot].id];
                                if (typeof itm !== "undefined") {
                                    if ((typeof fTyp !== "undefined" && $.inArray(itm.type, fTyp) > -1) || (typeof fId !== "undefined" && $.inArray(itm.id, fId) > -1)) {
                                        var tId = chi.toId;
                                        if(typeof tId === "undefined") {
                                            tId = [null];
                                        }
                                        if (typeof tId !== "undefined") {
                                            var to = tId[Math.floor(Math.random() * tId.length)];
                                            if(to === null) { //same from as to
                                                to = ch.pocket[slot].id;
                                            }
                                            var it = parseItem(to);
                                            var q = 1;
                                            if (typeof itemJson[it] !== "undefined" && (itemJson[it].type === 'ITEM_TYPE_STACKABLE') || typeof itemJson[it].quantity !== "undefined") {
                                                var qf = chi.toQuantityFactor;
                                                if (typeof qf === "undefined") {
                                                    qf = 1.0;
                                                }
                                                q = Math.floor(Math.random() * pow * qf) + 1;
                                                var slot2 = ch.findPocketItem(it);
                                                if (slot2 !== null) {
                                                    var it2 = ch.pocket[slot2];
                                                    q = q + it2.quantity;
                                                    it2.setPocketItem();
                                                }
                                                var qm = itemJson[it].quantity;
                                                if(typeof qm === "undefined") {
                                                    qm = 99;
                                                }
                                                if(q < 0) {
                                                    q = 0;
                                                } else if(q > qm) {
                                                    q = qm;
                                                }
                                            }
                                            ch.pocket[slot].setPocketItem(to, q);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (typeof act.steal !== "undefined" && act.steal) {
                    if (typeof act.hpFactor !== "undefined") {
                        if (pow > -tar.getHP() * act.hpFactor) {
                            pow = tar.getHP() + 1;
                        }
                        att.addHP(-pow * act.hpFactor);
                    }
                    if (typeof act.vitFactor !== "undefined") {
                        if (pow > -tar.getVit() * act.vitFactor) {
                            pow = tar.getVit();
                        }
                        att.addVit(-pow * act.vitFactor);
                    }
                    if (typeof act.spFactor !== "undefined") {
                        if (pow > -tar.getSP() * act.spFactor) {
                            pow = tar.getSP();
                        }
                        att.addSP(-pow * act.spFactor);
                    }
                }
                if (typeof act.hpFactor !== "undefined") {
                    tar.addHP(pow * act.hpFactor);
                }
                if (typeof act.vitFactor !== "undefined") {
                    tar.addVit(pow * act.vitFactor);
                }
                if (typeof act.spFactor !== "undefined") {
                    tar.addSP(pow * act.spFactor);
                }
                if (typeof act.speedFactor !== "undefined") {
                    tar.timerSpeed = act.speedFactor;
                    if (act.speedFactor === 0.0) {
                        tar.timerParalyze = pow;
                    }
                }
                if (typeof act.terrorFactor !== "undefined") {
                    tar.timerTerror = pow * act.terrorFactor;
                }
            }
        }
    }
}

function castSpell(s, src, pw, part) {
    var sp = getSpellById(s);
    var pow = (Math.random() * pw * 0.25) + pw;
    pow = Math.ceil(pow * sp.power);
    var f = src.floor;
    var x = src.x;
    var y = src.y;
    var d = src.d;
    var xy = getOffsetByRotation(d);
    var x1 = x + xy.x;
    var y1 = y + xy.y;
    if (src.champId > -1) {
        var ch = champion[src.champId];
        PrintLog('SPELLPOWER: ' + pow + ' ' + sp.power);
    }
    var spl = spellJson[s];
    if(typeof part !== "undefined") {
        spl = spellPartJson[part];
    }
    if (typeof spl !== "undefined") { //JSON
        var ac = spl.action;
        if (typeof ac !== "undefined") {
            if (typeof ac.type !== "undefined") {
                if (ac.type === 'self') {
                    executeSpell(s, ac, src, pow);
                } else if (ac.type === 'group') {
                    if (typeof ch !== "undefined" && ch.recruitment.playerId > -1) {
                        var pl = player[ch.recruitment.playerId];
                        var chs = pl.getOrderedChampions();
                        for (var c in chs) {
                            if (chs[c].recruitment.attached) {
                                executeSpell(s, ac, chs[c].getMonster(), pow);
                            }
                        }
                    }
                } else if (ac.type === 'front') {
                    executeSpell(s, ac, {
                        floor: f,
                        x: x1,
                        y: y1,
                        d: d
                    }, pow);
                } else if (ac.type === 'projectile') {
                    var pr = ac.projectile;
                    if (typeof pr !== "undefined") {
                        var id = pr.id;
                        var snd = pr.sound;
                        var col = pr.recolour;
                        if (typeof col !== "undefined") {
                            //var from = col.from;
                            var to = col.to;
                        }
                    }
                    if(typeof id === "undefined") {
                        var id = 'PROJECTILE_ARROW';
                    }
                    if (typeof snd === "undefined") {
                        var snd = 'SOUND_FLASH';
                    }
                    if(typeof to === "undefined") {
                        var to = paletteData['SERPENT_ARROW'];
                    }
                    newProjectile(id, to, snd, s, pow, f, x, y, d, src, ac);
                }
            }
        }
    } else {
        switch (s) {
            //serpent
            case SPELL_ARMOUR:
                ch.activateSpell(s, pow);
                break;
            case SPELL_PARALYZE:
                newProjectile('PROJECTILE_ARROW', paletteData['SERPENT_ARROW'], 'SOUND_FLASH', s, pow, f, x, y, d, src);
                break;
            case SPELL_COMPASS:
                ch.activateSpell(s, pow);
                break;
            case SPELL_LEVITATE:
                ch.activateSpell(s, pow);
                break;
            case SPELL_WARPOWER:
                ch.activateSpell(s, pow);
                break;
            case SPELL_RENEW:
                if (ch.recruitment.playerId > -1) {
                    var pl = player[ch.recruitment.playerId];
                    var chs = pl.getOrderedChampions();
                    for (var c in chs) {
                        if (chs[c].recruitment.attached) {
                            chs[c].addHP(pow);
                        }
                    }
                }
                break;
            case SPELL_ARC_BOLT:
                newProjectile('PROJECTILE_BIG', paletteData['SERPENT_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, d, src);
                break;
            case SPELL_FORMWALL:
                if (src.getBinaryView(15, 0, 16) === '0000') {
                    src.setBinaryView(15, 13, 3, '7');
                    src.setBinaryView(15, 6, 2, '3');
                    src.setBinaryView(15, 0, 6, dec2hex(pow));
                    var xy = posToCoordinates(15, x, y, d);
                    setDungeonSpell(s, f, xy.x, xy.y);
                }
                break;
                //chaos
            case SPELL_DEFLECT:
                ch.activateSpell(s, pow);
                break;
            case SPELL_TERROR:
                newProjectile('PROJECTILE_ARROW', paletteData['CHAOS_ARROW'], 'SOUND_FLASH', s, pow, f, x, y, d, src);
                break;
            case SPELL_ANTIMAGE:
                ch.activateSpell(s, pow);
                break;
            case SPELL_SPELLTAP:
                newProjectile('PROJECTILE_ARROW', paletteData['GOLD_ARROW'], 'SOUND_FLASH', s, pow, f, x, y, d, src);
                break;
            case SPELL_ALCHEMY:
                var validItems = ['ITEM_TYPE_WEAPON', 'ITEM_TYPE_ARMOUR', 'ITEM_TYPE_SHIELD', 'ITEM_TYPE_GLOVES'];
                if (validItems.indexOf(ch.pocket[POCKET_LEFT_HAND].type) > -1) {
                    ch.pocket[POCKET_LEFT_HAND].setPocketItem('ITEM_COINAGE', pow);
                } else if (validItems.indexOf(ch.pocket[POCKET_RIGHT_HAND].type) > -1) {
                    ch.pocket[POCKET_RIGHT_HAND].setPocketItem('ITEM_COINAGE', pow);
                }
                break;
            case SPELL_SUMMON:
                var ob = canMove(f, x, y, d);
                if (ob === OBJECT_CHARACTER || ob === OBJECT_PROJECTILE || ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR) {
                    castSpell(SPELL_FIREBALL, src, pw);
                } else if (ob === OBJECT_NONE) {
                    var max = monster[towerThis].length;
                    monster[towerThis][max] = new Monster(null, Math.floor(pow * 0.2) - 10, MON_TYPE_DRONE, MON_FORM_SUMMON, towerThis, f, x1, y1, d, (d + Math.floor(Math.random() * 2) + 2) % 4, 0, null, createPocketSlots(POCKET_MAX + 1));
                    monster[towerThis][max].doGesture(CHA_GESTURE_SPELLCASTING);
                }
                break;
            case SPELL_VIVIFY:
                newProjectile('PROJECTILE_ARROW', paletteData['CHAOS'], 'SOUND_FLASH', s, 0, f, x, y, d, src);
                for (var p in player) {
                    var pl = player[p];
                    if (!pl.dead && f === pl.floor && x === pl.x && y === pl.y) {
                        for (var c = 0; c < pl.champion.length; c++) {
                            var ch1 = pl.getChampion(c);
                            if (ch1 !== null && ch1.getMonster().dead && ch1.recruitment.attached) {
                                ch1.stat.hp = 0;
                                ch1.getMonster().dead = false;
                                redrawUI(2);
                            }
                        }
                        pl.updateChampions();
                        break;
                    }
                }
                break;
            case SPELL_DISRUPT:
                newProjectile('PROJECTILE_BIG', paletteData['DISRUPT_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, d, src);
                break;
                //dragon
            case SPELL_MISSILE:
                newProjectile('PROJECTILE_ARROW', paletteData['DRAGON_ARROW'], 'SOUND_ATTACK', s, pow, f, x, y, d, src);
                break;
            case SPELL_MAGELOCK:
                if (src.getBinaryView(18, 13, 3) === '2' && src.getBinaryView(18, ((5 + 2 - d) % 4) * 2) === '1') {
                    src.setBinaryView(18, 11, 1);
                } else if (src.getBinaryView(15, 13, 3) === '2' && src.getBinaryView(15, ((5 + 0 - d) % 4) * 2) === '1') {
                    src.setBinaryView(15, 11, 1);
                } else if (src.getBinaryView(15, 13, 3) === '5' && src.getBinaryView(15, 4) === '0') {
                    src.setBinaryView(15, 11, 1);
                }
                break;
            case SPELL_VITALISE:
                if (ch.recruitment.playerId > -1) {
                    var pl = player[ch.recruitment.playerId];
                    var chs = pl.getOrderedChampions();
                    for (var c in chs) {
                        if (chs[c].recruitment.attached) {
                            chs[c].addVit(pow);
                        }
                    }
                }
                break;
            case SPELL_DISPELL:
                if (src.setBinaryView(15, 12, 1) === '1') {
                    src.setBinaryView(15, 12, 1, '0');
                }
                if (src.getBinaryView(15, 13, 3) === '7') {
                    src.setBinaryView(15, 0, 16, '0000');
                    deleteDungeonSpells(f, x1, y1);
                }
                break;
            case SPELL_FIREBALL:
                newProjectile('PROJECTILE_BIG', paletteData['DRAGON_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, d, src);
                break;
            case SPELL_FIREPATH:
                newProjectile('PROJECTILE_ARROW', paletteData['DRAGON_ARROW'], 'SOUND_ATTACK', s, pow, f, x, y, d, src);
                break;
            case SPELL_RECHARGE:
                if (ch.recruitment.playerId > -1) {
                    var it = ch.getEquippedItems();
                    for (var i = 0; i < it.length; i++) {
                        var qm = getObjectByKeys(itemJson[it[i].id], 'quantity');
                        if (typeof qm !== "undefined" && qm > 1 && it[i].quantity < qm) {
                            var q = it[i].quantity + Math.ceil(pow * 0.02);
                            if (q > qm) {
                                q = qm;
                            }
                            it[i].setQuantity(q);
                        }
                    }
                }
                break;
            case SPELL_BLAZE:
                newProjectile('PROJECTILE_BIG', paletteData['BLAZE_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, d, src);
                break;
                //moon
            case SPELL_BEGUILE:
                break;
            case SPELL_CONFUSE:
                newProjectile('PROJECTILE_ARROW', paletteData['MOON_ARROW'], 'SOUND_FLASH', s, pow, f, x, y, d, src);
                break;
            case SPELL_CONCEAL:
                src.setBinaryView(15, 12, 1);
                break;
            case SPELL_TRUEVIEW:
                ch.activateSpell(s, pow);
                break;
            case SPELL_VANISH:
                ch.activateSpell(s, pow);
                break;
            case SPELL_ILLUSION:
                var ob = canMove(f, x, y, d);
                if (ob === OBJECT_CHARACTER || ob === OBJECT_PROJECTILE || ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR) {
                    castSpell(SPELL_FIREBALL, src, pw);
                } else if (ob === OBJECT_NONE) {
                    var max = monster[towerThis].length;
                    monster[towerThis][max] = new Monster(null, Math.floor(pow * 0.2) - 10, MON_TYPE_DRONE_CASTER, MON_FORM_ILLUSION, towerThis, f, x1, y1, d, (d + Math.floor(Math.random() * 2) + 2) % 4, 0, null, createPocketSlots(POCKET_MAX + 1));
                    monster[towerThis][max].hp = 0;
                    monster[towerThis][max].doGesture(CHA_GESTURE_SPELLCASTING);
                }
                break;
            case SPELL_MINDROCK:
                if (src.getBinaryView(15, 0, 16) === '0000') {
                    src.setBinaryView(15, 13, 3, '7');
                    src.setBinaryView(15, 6, 2, '2');
                    src.setBinaryView(15, 0, 6, dec2hex(pow));
                }
                break;
            case SPELL_WYCHWIND:
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x - xy.y, y - xy.x, d, src);
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, d, src);
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x + xy.y, y + xy.x, d, src);
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x + xy.y, y + xy.x, (d + 2) % 4, src);
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, (d + 2) % 4, src);
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x - xy.y, y - xy.x, (d + 2) % 4, src);
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, (d + 1) % 4, src);
                newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, (d + 3) % 4, src);
                break;
                //ancient
            case SPELL_PROTECT:
                ch.activateSpell(s, pow);
                break;
            case SPELL_PHASE:
                var pl = player[ch.recruitment.playerId];
                var ob = canMove(f, x, y, d, DIRECTION_NORTH);
                var ob2 = canMove(f, x1, y1, d, DIRECTION_NORTH);
                var x2 = x;
                var y2 = y;
                if (ob <= OBJECT_PROJECTILE && ob2 <= OBJECT_PIT) {
                    x2 = x2 + xy.x * 2;
                    y2 = y2 + xy.y * 2;
                    pl.setPlayerPosition(f, x2, y2);
                }
                newProjectile('NONE', paletteData['TELEPORT_FLASH'], 'SOUND_FLASH', -1, 0, f, x2, y2, d, null);
                break;
            case SPELL_ENHANCE:
                ch.activateSpell(s, pow);
                break;
            case SPELL_INFERNO:
                newProjectile('PROJECTILE_BIG', paletteData['BLAZE_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, d, src);
                break;
            case SPELL_NULLIFY:
                newProjectile('PROJECTILE_ARROW', paletteData['DRAGON_ARROW'], 'SOUND_FLASH', s, pow, f, x, y, d, src);
                break;
            case SPELL_SPRAY:
                newProjectile('PROJECTILE_BIG', paletteData['DISRUPT_BIG'], 'SOUND_EXPLODE', s, pow, f, x - xy.y, y - xy.x, d, src);
                newProjectile('PROJECTILE_BIG', paletteData['DISRUPT_BIG'], 'SOUND_EXPLODE', s, pow, f, x, y, d, src);
                newProjectile('PROJECTILE_BIG', paletteData['DISRUPT_BIG'], 'SOUND_EXPLODE', s, pow, f, x + xy.y, y + xy.x, d, src);
                break;
            case SPELL_VORTEX:
                break;
            case SPELL_RESTORE:
                break;
            default:
                break;
        }
    }
}

function setDungeonSpell(sid, f, x, y, proj) {
    var max = dungeonSpellList.length;
    var p = null;
    var pid = null;
    if (typeof proj !== "undefined") {
        p = proj;
        pid = proj.id;
    }
    dungeonSpellList[max] = {
        tower: towerThis,
        floor: f,
        x: x,
        y: y,
        spellId: sid,
        projectile: p,
        projectileId: pid
    };
}

function getDungeonSpell(f, x, y) {
    for (var d in dungeonSpellList) {
        ds = dungeonSpellList[d];
        if (ds.tower === towerThis && ds.floor === f && ds.x === x && ds.y === y) {
            return ds;
        }
    }
    return null;
}

function deleteDungeonSpells(f, x, y) {
    for (var d in dungeonSpellList) {
        deleteDungeonSpell(d, f, x, y);
    }
    return null;
}

function deleteDungeonSpell(d, f, x, y) {
    ds = dungeonSpellList[d];
    if (ds !== null && ds.tower === towerThis && ds.floor === f && ds.x === x && ds.y === y) {
        var id = ds.spellId;
        if (id > -1) {
            var act = getObjectByKeys(spellJson[id], 'action', 'onComplete');
            if (typeof act !== "undefined") {
                executeSpell(id, act, {
                    floor: f,
                    x: x,
                    y: y,
                    d: Math.floor(Math.random() * 4)
                }, 0);
            }
        }
        delete dungeonSpellList[d];
    }
}

function updateDungeonSpells() {
    for (var s in dungeonSpellList) {
        var ds = dungeonSpellList[s];
        if (ds !== null && ds.tower === towerThis) {
            if (ds.projectile !== null && typeof ds.projectile.spell !== 'number' && (ds.projectile.spell.id === SPELL_FIREPATH || ds.projectile.spell.id === SPELL_BLAZE || ds.projectile.spell.id === SPELL_INFERNO)) {
                for (var p in player) {
                    if (ds.floor === player[p].floor && ds.x === player[p].x && ds.y === player[p].y) {
                        ds.projectile.attack(player[p]);
                    }
                }
                var mon = getMonsterAt(ds.floor, ds.x, ds.y);
                if (mon !== null) {
                    ds.projectile.attack(mon);
                }
            }
            var hex = tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x];
            var tm = parseInt(hex2dec(getHexToBinaryPosition(hex, 0, 6)) - 1);
            if (tm > 0) {
                tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x] = setHexToBinaryPosition(hex, 0, 6, dec2hex(tm));
            } else {
                tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x] = setHexToBinaryPosition(hex, 0, 16, '0000');
                deleteDungeonSpell(s, ds.floor, ds.x, ds.y);
            }
        }
    }
}

