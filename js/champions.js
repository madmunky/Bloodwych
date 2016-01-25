function Champion(id, firstName, lastName, prof, colour, level, stat, spellBook, pocket) {
    this.spellBook = new Array();
    this.pocket = pocket;
    this.id = id;
    this.recruitment = {
        playerId: -1,
        attached: false,
        position: 0,
        attackTimer: 0,
        called: false
    };
    this.firstName = firstName;
    this.lastName = lastName;
    this.level = level;
    this.prof = prof;
    this.colour = colour;
    this.spellBookPage = 0;
    this.selectedSpell = null;
    this.activeSpell = {
        id: -1,
        timer: 0,
        power: 0
    };
    this.stat = stat;
    this.food = 200;
    this.xp = 0;
    this.xp2 = 0;
    this.spellFatigue = 1.0;
    this.spellUp = 0;
    this.levelUp = 0;
    this.spellBook = spellBook;
}

Types.Champion = Champion;

Champion.prototype.toJSON = function() {
    return {
        __type: 'Champion',
        spellBook: this.spellBook,
        pocket: this.pocket,
        id: this.id,
        recruitment: this.recruitment,
        firstName: this.firstName,
        lastName: this.lastName,
        level: this.level,
        prof: this.prof,
        colour: this.colour,
        spellBookPage: this.spellBookPage,
        selectedSpell: this.selectedSpell,
        activeSpell: this.activeSpell,
        stat: this.stat,
        food: this.food,
        xp: this.xp,
        xp2: this.xp2,
        spellFatigue: this.spellFatigue,
        spellUp: this.spellUp,
        levelUp: this.levelUp,
        spellBook: this.spellBook
    }
}

Champion.revive = function(data) {
    var c = new Champion(data.id, data.firstName, data.lastName, data.prof, data.colour, data.level, data.stat, data.spellBook, data.pocket);
    c.recruitment = data.recruitment;
    c.spellBookPage = data.spellBookPage;
    c.selectedSpell = data.selectedSpell;
    c.activeSpell = data.activeSpell;
    c.food = data.food;
    c.xp = data.xp;
    c.xp2 = data.xp2;
    c.spellFatigue = data.spellFatigue;
    c.spellUp = data.spellUp;
    c.levelUp = data.levelUp;
    c.spellBook = data.spellBook;
    for (p in data.pocket) {
        data.pocket[p] = newPocketItem(data.pocket[p].id, data.pocket[p].quantity);
    }
    //        c.pocket = data.pocket;
    return c;
};

Champion.prototype.getName = function() {
    return this.firstName + " " + this.lastName;
}

Champion.prototype.getTrade = function() {
    return TEXT_TRADE[this.prof];
}

Champion.prototype.getMonster = function() {
    return monster[TOWER_CHAMPIONS][this.id];
}

//needed for knowing what armour type to wear
Champion.prototype.getGender = function() {
    var gen = [2, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
    return gen[this.id];
};

Champion.prototype.doDamageTo = function(def, dmg, aExh, dExh) {
    if (this.recruitment.playerId > -1) {
        this.writeAttackPoints(dmg);
        redrawUI(this.recruitment.playerId, UI_REDRAW_STATS);
    }
    if (typeof aExh !== "undefined") {
        this.addVit(-aExh);
    }
    if (def instanceof Champion) {
        if (typeof dExh !== "undefined") {
            def.addVit(-dExh);
        }
        def.getDamage(dmg);
    } else if (def instanceof Monster) {
        def.getDamage(dmg);
    }
}

//Damage is 'safe' when champ doesn't get killed by it (e.g. by low vitality)
Champion.prototype.getDamage = function(dmg, safe) {
    this.addHP(-dmg, safe);
    if (typeof safe === "undefined" || !safe) {
        if (this.getHP() < 0) {
            this.getMonster().die();
        }
        if (this.recruitment.playerId > -1 && this.recruitment.attached) {
            if (!player[this.recruitment.playerId].attacking) {
                this.writeAttackPoints(dmg, true);
            }
            player[this.recruitment.playerId].alertDamagedPlayer();
            player[this.recruitment.playerId].checkDead();
            player[this.recruitment.playerId].updateChampions();
            player[this.recruitment.playerId].startDrawHitDamage(this.id, dmg);
            redrawUI(this.recruitment.playerId);
        }
    }
}

Champion.prototype.getHP = function() {
    return this.stat.hp;
}

Champion.prototype.addHP = function(hp, safe) {
    if (!this.getMonster().dead) {
        this.stat.hp += hp;
        if (this.getHP() < 0) {
            if (typeof safe !== "undefined" && safe) {
                this.stat.hp = 0;
            } else {
                this.stat.hp = -1;
            }
        } else if (this.getHP() > this.stat.hpMax) {
            this.stat.hp = this.stat.hpMax;
        }
    }
}

Champion.prototype.getVit = function() {
    return this.stat.vit;
}

Champion.prototype.addVit = function(vit) {
    if (!this.getMonster().dead) {
        this.stat.vit += vit;
        if (this.getVit() < 0) {
            this.stat.vit = 0;
        } else if (this.getVit() > this.stat.vitMax) {
            this.stat.vit = this.stat.vitMax;
        }
    }
}

Champion.prototype.getSP = function() {
    return this.stat.sp;
}

Champion.prototype.addSP = function(sp) {
    if (!this.getMonster().dead) {
        this.stat.sp += sp;
        if (this.getSP() < 0) {
            this.stat.sp = 0;
        } else if (this.getSP() > this.stat.spMax) {
            this.stat.sp = this.stat.spMax;
        }
    }
}
Champion.prototype.getFood = function() {
    return this.food;
}
Champion.prototype.addFood = function(fd) {
    if (!this.getMonster().dead) {
        this.food += fd;
        if (this.getFood() < 0) {
            this.food = 0;
            return true;
        } else if (this.getFood() > 200) {
            this.food = 200;
        }
        return false;
    }
}

Champion.prototype.getWeaponPower = function(s) {
    var pow = this.pocket[s].getWeaponPower();
    if (this.pocket[POCKET_GLOVES].id === ITEM_CHAOS_GLOVES && this.pocket[s].id === ITEM_ACE_OF_SWORDS) {
        pow = pow * 1.25;
    }
    return 1.0 + 0.1 * pow;
}

Champion.prototype.getBowPower = function() {
    var bow = 0;
    var arr = 1.0;
    if (this.pocket[POCKET_LEFT_HAND].type === ITEM_TYPE_BOW && (this.pocket[POCKET_RIGHT_HAND].id === ITEM_ARROWS || this.pocket[POCKET_RIGHT_HAND].id === ITEM_ELF_ARROWS)) {
        bow = this.pocket[POCKET_LEFT_HAND].getBowPower();
        arr = this.pocket[POCKET_RIGHT_HAND].getArrowPower();
    } else if (this.pocket[POCKET_RIGHT_HAND].type === ITEM_TYPE_BOW && (this.pocket[POCKET_LEFT_HAND].id === ITEM_ARROWS || this.pocket[POCKET_LEFT_HAND].id === ITEM_ELF_ARROWS)) {
        bow = this.pocket[POCKET_RIGHT_HAND].getBowPower();
        arr = this.pocket[POCKET_LEFT_HAND].getArrowPower();
    }
    return Math.ceil(bow * arr * 0.5);
}

Champion.prototype.getArmourClass = function() {
    var ac = this.stat.ac;
    var arm = this.pocket[POCKET_ARMOUR].getArmourClass();
    var sld = this.pocket[POCKET_SHIELD].getArmourClass();
    var glv = this.pocket[POCKET_GLOVES].getArmourClass();
    if (ac > arm) {
        arm = ac;
    }
    return 10 - arm - sld - glv;
}

Champion.prototype.gainLevel = function() {
    if (this.levelUp > 0) {
        if(this.level < 57) {
            var prof = this.prof;
            var stat = new Array();
            stat[PROFESSION_WARRIOR] = {
                str: 8,
                agi: 5,
                int: 4,
                cha: 5,
                hp: 10,
                hpMax: 20,
                vit: 5,
                vitMax: 10,
                sp: 1,
                spMax: 3
            }
            stat[PROFESSION_WIZARD] = {
                str: 4,
                agi: 5,
                int: 8,
                cha: 5,
                hp: 5,
                hpMax: 10,
                vit: 5,
                vitMax: 10,
                sp: 3,
                spMax: 6
            }
            stat[PROFESSION_ADVENTURER] = {
                str: 6,
                agi: 6,
                int: 6,
                cha: 6,
                hp: 7,
                hpMax: 14,
                vit: 7,
                vitMax: 14,
                sp: 2,
                spMax: 4
            }
            stat[PROFESSION_CUTPURSE] = {
                    str: 5,
                    agi: 8,
                    int: 5,
                    cha: 4,
                    hp: 5,
                    hpMax: 10,
                    vit: 10,
                    vitMax: 20,
                    sp: 1,
                    spMax: 3
                }
                //for (l = 0; l < this.levelUp; l++) {
            this.stat.str += Math.floor(Math.random() * stat[prof].str) + 1;
            this.stat.agi += Math.floor(Math.random() * stat[prof].agi) + 1;
            this.stat.int += Math.floor(Math.random() * stat[prof].int) + 1;
            this.stat.cha += Math.floor(Math.random() * stat[prof].cha) + 1;
            this.stat.hpMax += Math.floor(Math.random() * stat[prof].hpMax) + stat[prof].hp;
            this.stat.vitMax += Math.floor(Math.random() * stat[prof].vitMax) + stat[prof].vit;
            this.stat.spMax += Math.floor(Math.random() * stat[prof].spMax) + stat[prof].sp;
            if (this.stat.str > 99) {
                this.stat.str = 99;
            }
            if (this.stat.agi > 99) {
                this.stat.agi = 99;
            }
            if (this.stat.int > 99) {
                this.stat.int = 99;
            }
            if (this.stat.cha > 99) {
                this.stat.cha = 99;
            }
            if (this.stat.hpMax > 999) {
                this.stat.hpMax = 999;
            }
            if (this.stat.vitMax > 999) {
                this.stat.vitMax = 999;
            }
            if (this.stat.spMax > 99) {
                this.stat.spMax = 99;
            }
            this.level++;
            //}
            var p = this.recruitment.playerId;
            if (p > -1) {
                player[p].message(this.firstName + TEXT_GAINED_LEVEL, COLOUR[COLOUR_RED]);
            }
        }
        this.levelUp--;
    }
}

Champion.prototype.restoreStats = function() {
    var alertPlayer = false;
    if (this.recruitment.playerId > -1) {
        var p = player[this.recruitment.playerId];
    }
    if (this !== null) {
        if (!monster[TOWER_CHAMPIONS][this.id].dead) {
            this.addHP(Math.floor((Math.random() * (this.stat.str / 16)) + 1));
            this.addVit(Math.floor((Math.random() * (this.stat.agi / 16)) + 1));
            this.addSP(Math.floor((Math.random() * (this.stat.int / 16)) + 1));
            if (this.stat.vitMax * 0.15 > this.stat.vit) {
                dmg = Math.ceil(this.stat.vitMax * 0.15) - this.stat.vit;
                this.getDamage(dmg, true);
                if (dmg > 0) {
                    alertPlayer = true;
                }
            }
        }
    }
    if (typeof p !== "undefined") {
        if (alertPlayer) {
            p.alertDamagedPlayer();
        }
        redrawUI(p.id, UI_REDRAW_STATS);
    }
}

Champion.prototype.addHunger = function() {
    if (this.recruitment.playerId > -1 && this.id !== CHA_MR_FLAY) {
        if (this.addFood(-1)) {
            this.addVit(-Math.floor(Math.random() * 9) + 3)
        }
    }
}

Champion.prototype.addSpellToSpellBook = function(sp) {
    this.getSpellInBook(sp).learnt = true;
}

Champion.prototype.getUnlearntSpellsByColour = function(cl) {
    var sb = new Array();
    for (pg = 0; pg < COLOUR_MAX; pg++) {
        for (rw = 0; rw < SPELL_MAX; rw++) {
            var sp = this.spellBook[pg][rw];
            if (!sp.learnt && sp.ref.colour === cl) {
                sb.push(sp.ref);
            }
        }
    }
    return sb.sort(function(a, b) {
        return (a.id - b.id);
    });
    return sb;
}

Champion.prototype.getSpellInBook = function(sp) {
    for (pg = 0; pg < COLOUR_MAX; pg++) {
        for (rw = 0; rw < SPELL_MAX; rw++) {
            var sb = this.spellBook[pg][rw];
            if (getSpellById(sb.id) === sp) {
                return sb;
            }
        }
    }
}

Champion.prototype.getSpellInBookById = function(id) {
    for (pg = 0; pg < COLOUR_MAX; pg++) {
        for (rw = 0; rw < SPELL_MAX; rw++) {
            var sb = this.spellBook[pg][rw];
            if (sb.id === id) {
                return sb;
            }
        }
    }
}

Champion.prototype.buySpell = function(sp) {
    if (this.recruitment.playerId > -1) {
        var p = player[this.recruitment.playerId];
        var pk = this.findPocketItem(ITEM_COINAGE);
        if (this.consumePocketItem(pk, p.fairyDetails.spell.cost)) {
            this.addSpellToSpellBook(sp);
            this.spellUp--;
            p.sleep();
        } else {
            p.message(TEXT_PAUPER, COLOUR[COLOUR_GREEN], false, 0);
        }
    }
}

//mainly used for finding coins
Champion.prototype.findPocketItem = function(i) {
    for (ip = 0; ip < this.pocket.length; ip++) {
        if (this.pocket[ip].id === i) {
            return ip;
        }
    }
    return null;
}

//used for arrows and coins
Champion.prototype.consumePocketItem = function(pk, q) {
    var it = this.pocket[pk];
    if (typeof it !== "undefined") {
        if (typeof q === "undefined") {
            q = 1;
        }
        if (it.quantity - q >= 0) {
            it.setPocketItem(it.id, it.quantity - q);
            return true;
        }
    }
    return false;
}

Champion.prototype.writeAttackPoints = function(pwr, def) {
    if (typeof pwr !== "undefined" && this.recruitment.playerId > -1) {
        var self = this;
        var p = player[this.recruitment.playerId];
        var x = 0,
            y = 0,
            w = 112;
        switch (this.recruitment.position) {
            case 0:
                x = 104;
                y = 88;
                w = 128;
                break;
            case 1:
                x = 0;
                y = 0;
                break;
            case 2:
                x = 112;
                y = 0;
                break;
            case 3:
                x = 216;
                y = 0;
                break;
        }
        ctx.clearRect((p.ScreenX + x - 8) * scale, (p.ScreenY + y - 10) * scale, w * scale, 8 * scale);
        writeFontImage(String.fromCharCode(this.prof + 3), (p.ScreenX + x + 2), (p.ScreenY + y - 9), CLASS_COLOUR[this.colour]);
        if (typeof def === "undefined" || def === false) {
            if (typeof pwr === 'number') {
                if (pwr > 0) {
                    writeFontImage(TEXT_HITS_FOR + pwr, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
                } else {
                    writeFontImage(TEXT_MISSES, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
                }
            } else if (pwr === 'spell') {
                writeFontImage(TEXT_CASTS_SPELL, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
            } else if (pwr === 'shoot') {
                writeFontImage(TEXT_SHOOTS, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
            }
        } else {
            writeFontImage(TEXT_DEFENDS, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
        }
        (function(p, x, y, w) {
            setTimeout(function() {
                //if (p.messageTimeout === 0 || self.recruitment.position === 0) {
                ctx.clearRect((p.ScreenX + x - 8) * scale, (p.ScreenY + y - 10) * scale, w * scale, 8 * scale);
                //}
            }, self.getAttackSpeed(1500));
        })(p, x, y, w);
    }
}

Champion.prototype.getAttackSpeed = function(fac) {
    var lvl = this.level;
    if (lvl > 20) {
        lvl = 20;
    }
    return Math.floor(fac / (1.0 + 0.02 * lvl));
}

Champion.prototype.toString = function() {
    sb = "";
    for (cl = 0; cl < COLOUR_MAX; cl++) {
        sb = sb + "[";
        for (i = 0; i < SPELL_MAX; i++) {
            if (this.spellBook[cl][i].learnt) {
                sb = sb + "1";
            } else {
                sb = sb + "0";
            }
            if (i < SPELL_MAX - 1) {
                sb = sb + ", ";
            }
        }
        sb = sb + "]";
        if (cl < COLOUR_MAX - 1) {
            sb = sb + ", ";
        }
    }
    return '[id:' + this.id + ', firstName:' + this.firstName + ', lastName:' + this.lastName + ', prof:' + this.prof + ', colour:' + this.colour + ', level:' + this.level + ', spellBook:[' + sb + '], stat:[str:' + this.stat.str + ', agi:' + this.stat.agi + ', int:' + this.stat.int + ', cha:' + this.stat.cha + ', hp:' + this.stat.hp + ', hpMax:' + this.stat.hpMax + ', vit:' + this.stat.vit + ', vitMax:' + this.stat.vitMax + ', hp:' + this.stat.hp + ', sp:' + this.stat.sp + ', spMax:' + this.stat.spMax + ', ac:' + this.stat.ac + ']]';
}

Champion.prototype.activateSpell = function(s, pow) {
    this.expireSpell();
    this.activeSpell.id = s;
    this.activeSpell.timer = pow * 5;
    this.activeSpell.power = pow;
    //if (this.recruitment.playerId > -1) {
    //	redrawUI(this.recruitment.playerId);
    //}
}

Champion.prototype.checkSpell = function() {
    this.spellFatigue += 0.1;
    if (this.spellFatigue > 1.0) {
        this.spellFatigue = 1.0;
    }
    if (this.activeSpell.id > -1) {
        this.activeSpell.timer--;
        if (this.activeSpell.timer <= 0) {
            this.expireSpell();
        }
    }
    var p = this.recruitment.playerId;
    if (p > -1) {
        if (player[p].uiRightPanel.mode === UI_RIGHT_PANEL_SPELLBOOK && player[p].selectedSpell !== null) {
            redrawUI(p, UI_REDRAW_SPELLBOOK);
        }
    }
}

Champion.prototype.expireSpell = function() {
    var p = this.recruitment.playerId;
    this.activeSpell.timer = 0;
    switch (this.activeSpell.id) {
        case SPELL_ARMOUR:
            break;
        case SPELL_COMPASS:
            break;
        case SPELL_LEVITATE:
            player[p].doPit();
            break;
        case SPELL_WARPOWER:
            break;
        case SPELL_ANTIMAGE:
            break;
        case SPELL_TRUEVIEW:
            break;
        case SPELL_VANISH:
            break;
        default:
            break;
    }
    this.activeSpell.id = -1;
    this.activeSpell.power = 0;
    redrawUI(p, UI_REDRAW_RIGHT);
}

//gets active spell, when spell id matches
Champion.prototype.getActiveSpellById = function(id) {
    if (id === this.activeSpell.id) {
        return this.activeSpell;
    }
    return {
        id: -1,
        power: 0,
        timer: 0
    };
}

Champion.prototype.selectSpell = function(id) {
    if (this.spellBook[this.spellBookPage][id].learnt) {
        this.selectedSpell = this.spellBook[this.spellBookPage][id];
        while (this.getSpellCastChance() >= 1.0 && this.selectedSpell.cost > 1.0) {
            this.setSpellCost(false);
        }
    } else {
        this.selectedSpell = null;
    }
    if (this.recruitment.playerId > -1) {
        player[this.recruitment.playerId].showSpellText = false;
    }
}

Champion.prototype.setSpellCost = function(ud) {
    p = this.recruitment.playerId;
    if (p > -1) {
        if (ud) {
            var to = Math.ceil(this.selectedSpell.cost * (1.1 + 0.1 * this.selectedSpell.ref.level));
            if (to < 100) {
                this.selectedSpell.cost = to;
                p.showSpellText = false;
            }
        } else {
            var to = Math.floor(this.selectedSpell.cost / (1.1 + 0.1 * this.selectedSpell.ref.level));
            if (to >= 1) {
                this.selectedSpell.cost = to;
                p.showSpellText = false;
            }
        }
    }
}

Champion.prototype.getSpellCastChance = function() {
    var res = this.getSpellPower();
    //PrintLog("COST: " + res + " f:" + this.spellFatigue);
    if (res > 1.0) {
        return 1.0;
    } else if (res < 0.0) {
        return 0.0;
    }
    return res;
}

Champion.prototype.getSpellPower = function() {
    var res = (this.selectedSpell.castSuccessful * 0.015 - 6.0 / (this.selectedSpell.cost + 6.0) + (this.stat.int + 5.0) * 0.015 - this.selectedSpell.ref.level * 0.15) + this.spellFatigue; // + (this.level - 1) * 0.1;
    //var res = (this.selectedSpell.castSuccessful * 0.01 - 7.5 / (this.selectedSpell.cost + 6.0) + this.stat.int * 0.02 - (this.selectedSpell.ref.level - 1.0) * 0.4) + this.spellFatigue; /* + (this.level - 1) * 0.1;*/
    PrintLog('pcast:' + this.selectedSpell.castSuccessful + ' scost:' + this.selectedSpell.cost + ' pint:' + this.stat.int + ' slvl:' + this.selectedSpell.ref.level + ' fat:' + this.spellFatigue + ' = res:' + res)
    return res;
}

Champion.prototype.getSpeed = function(fac) {
    return Math.floor(fac / (1.0 + 0.02 * this.level));
}

function getChampionClass(id) {
    return id % 4;
}

function getChampionColour(id) {
    return ((id + Math.floor(id / 4)) % 4);
}

function initChampions() {
    champion.length = 0;
    monster[TOWER_CHAMPIONS] = new Array();
    for (ch = 0; ch < CHAMPION_MAX; ch++) {
        var slot = new Array();
        var pk = championPocketData[ch].match(/.{1,2}/g);
        for (i = 0; i < 16; i++) {
            var a = hex2dec(pk[i].substr(0, 2));
            pk[i] = parseInt(a);
        }
        for (i = 0; i < POCKET_GLOVES; i++) {
            if (pk[i] >= 1 && pk[i] < 5) {
                slot[i] = newPocketItem(pk[i], pk[pk[i] + 11]);
            } else {
                slot[i] = newPocketItem(pk[i]);
            }
        }
        slot[POCKET_GLOVES] = newPocketItem();
        var md = championData[ch];
        var level = parseInt(hex2dec(md.substr(0, 2)));
        var str = parseInt(hex2dec(md.substr(2, 2)));
        var agi = parseInt(hex2dec(md.substr(4, 2)));
        var int = parseInt(hex2dec(md.substr(6, 2)));
        var cha = parseInt(hex2dec(md.substr(8, 2)));
        var hp = parseInt(hex2dec(md.substr(10, 2)));
        var hpMax = parseInt(hex2dec(md.substr(12, 2)));
        var vit = parseInt(hex2dec(md.substr(14, 2)));
        var vitMax = parseInt(hex2dec(md.substr(16, 2)));
        var sp = parseInt(hex2dec(md.substr(18, 2)));
        var spMax = parseInt(hex2dec(md.substr(20, 2)));
        var ac = parseInt(hex2dec(md.substr(22, 2)));
        var stat = {
            str: str,
            agi: agi,
            int: int,
            cha: cha,
            hp: hp,
            hpMax: hpMax,
            vit: vit,
            vitMax: vitMax,
            sp: sp,
            spMax: spMax,
            ac: ac
        };
        var x = parseInt(hex2dec(md.substr(44, 2)));
        var y = parseInt(hex2dec(md.substr(46, 2)));
        var d = parseInt(hex2dec(md.substr(48, 2)));
        var floor = parseInt(hex2dec(md.substr(52, 2)));

        var spellBin = hex2bin(md.substr(24, 2));
        spellBin = spellBin + hex2bin(md.substr(26, 2));
        spellBin = spellBin + hex2bin(md.substr(28, 2));
        spellBin = spellBin + hex2bin(md.substr(30, 2));
        var spellBook = {};
        for (pg = 0; pg < COLOUR_MAX; pg++) {
            spellBook[pg] = {};
            var spl = getSpellBookPage(pg);
            for (rw = 0; rw < SPELL_MAX; rw++) {
                spellBook[pg][rw] = {};
                spellBook[pg][rw].learnt = false;
                spellBook[pg][rw].castSuccessful = 0;
                spellBook[pg][rw].ref = spl[rw];
                spellBook[pg][rw].id = spl[rw].index;
                spellBook[pg][rw].cost = 2 + spl[rw].level * 2;
                if (spellBin !== null && spellBin.substr(rw + pg * SPELL_MAX, 1) == '1') {
                    //spellBook[pg][rw].castSuccessful = 4;
                    spellBook[pg][rw].learnt = true;
                }
            }
        }
        //spellBook[0][1].learnt = true;
        monster[TOWER_CHAMPIONS][ch] = new Monster(ch, level, 2, ch, TOWER_MOD0, floor, x, y, d, d, true, 0, ch);
        champion[ch] = new Champion(ch, TEXT_CHAMPION_NAME[ch], TEXT_CHAMPION_LASTNAME[ch], getChampionClass(ch), getChampionColour(ch), level, stat, spellBook, slot);
        PrintLog('Loaded champion: ' + champion[ch] + ', as monster: ' + monster[TOWER_CHAMPIONS][ch]);
    }
}
