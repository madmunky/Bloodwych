function Monster(id, level, type, form, tower, floor, x, y, d, square, teamId, champId, pocket) {
    this.id = id;
    if(level < 0) {
        level = 0;
    }
    this.level = level;
    this.type = type;
    var clr = 0;
    if (form >= MON_FORM_ILLUSION && form < MON_FORM_BEHEMOTH) {
        clr = Math.floor(level / 2);
        if (clr > 7) {
            clr = 7;
        }
    }
    this.colour = clr;
    this.form = form;
    this.ref = null; //monsterRef[form][clr];
    this.teamId = teamId;
    this.tower = tower;
    this.floor = floor;
    this.x = x;
    this.y = y;
    this.d = d;
    this.attacking = false;
    this.communicating = false;
    this.gesture = CHA_GESTURE_NONE;
    this.gestureTimer = 0;
    this.dead = false;
    this.timerMove = timerMaster;
    //this.timerAttack = timerMaster;
    this.timerTerror = 0;
    this.timerParalyze = 0;
    this.timerSpeed = 20;
    this.blur = 0;
    this.glow = 0;
    this.pocket = pocket;
    //this.holdingItemId = null;
    if (form === MON_FORM_ZENDIK) {
        this.square = CHAR_FRONT_SOLO;
    } else if (square > CHAR_FRONT_SOLO) {
        this.square = square;
    } else {
        this.square = CHAR_FRONT_SOLO;
    }
    this.champId = -1;
    if ((typeof champId !== "undefined") && (champId !== null)) {
        this.champId = champId; //optional Champion ID
        this.hp = 0;
    } else if (this.square === CHAR_FRONT_SOLO) {
        this.hp = level * 225 + 25;
    } else {
        this.hp = level * 150 + 25;
    }
}

Types.Monster = Monster;

Monster.prototype.toJSON = function() {
    return {
        __type: 'Monster',
        id: this.id,
        level: this.level,
        type: this.type,
        colour: this.colour,
        form: this.form,
        teamId: this.teamId,
        tower: this.tower,
        floor: this.floor,
        x: this.x,
        y: this.y,
        d: this.d,
        attacking: this.attacking,
        communicating: this.communicating,
        gesture: this.gesture,
        gestureTimer: this.gestureTimer,
        dead: this.dead,
        pocket: this.pocket,
        timerMove: this.timerMove,
        timerTerror: this.timerTerror,
        timerParalyze: this.timerParalyze,
        timerSpeed: this.timerSpeed,
        square: this.square,
        champId: this.champId,
        hp: this.hp
    }
}

Monster.revive = function(data) {
    var m = new Monster(data.id, data.level, data.type, data.form, data.tower, data.floor, data.x, data.y, data.d, data.square, data.teamId, data.champId, data.pocket);
    m.attacking = data.attacking;
    m.communicating = data.communicating;
    m.gesture = data.gesture;
    m.gestureTimer = data.gestureTimer;
    m.dead = data.dead;
    m.timerMove = data.timerMove;
    m.timerTerror = data.timerTerror;
    m.timerParalyze = data.timerParalyze;
    m.timerSpeed = data.timerSpeed;
    m.hp = data.hp;
    for(var p in data.pocket) {
        data.pocket[p] = newPocketItem(data.pocket[p].id, data.pocket[p].quantity);
    }
    return m;
};

Monster.prototype.getMonsterRef = function() {
    if (this.ref === null) {
        if (monsterRef[this.form][this.colour] === "undefined") {
            initMonsterGfxNew(this);
            return monsterRef[this.form][this.colour];
        } else {
            return monsterRef[this.form][this.colour];
        }
    } else {
        return monsterRef[this.form][this.colour];
    }
};

Monster.prototype.toString = function() {
    var cha = "";
    var torso = "null";
    var bodyId = "null";
    if (this.champId !== -1) {
        cha = ', champion:' + TEXT_CHAMPION_NAME[this.champId] + '(' + this.champId + ')';
    }
    return '[id:' + this.id + ', level:' + this.level + ', type:' + this.type + ', form:' + this.form + ', tower:' + this.tower + ', floor:' + this.floor + ', x:' + this.x + ', y:' + this.y + ', d:' + this.d + ', square:' + this.square + ', hp:' + this.getHP() + ', teamId:' + this.teamId + cha + ']';
}

Monster.prototype.canInteract = function() {
    //Check other player to attack
    var xy = getOffsetByRotation(this.d);
    var pl = getPlayerAt(this.floor, this.x + xy.x, this.y + xy.y);
    var ply = -1;
    if (pl !== null) {
        ply = pl.id;
    }
    /*ply = -1;
    if (this.floor === player[0].floor && this.x + xy.x === player[0].x && this.y + xy.y === player[0].y) {
        ply = 0;
    } else if (typeof player[1] !== 'undefined' && this.floor === player[1].floor && this.x + xy.x === player[1].x && this.y + xy.y === player[1].y) {
        ply = 1;
    }*/
    if (this.isAggressive() && !this.communicating) { //enemy
        //var hexNext = this.getBinaryView(15, 0, 16);
        if (ply > -1) {
            //attack player
            this.attack(true, pl);
            return ply;
        }
        var mon = getMonsterAt(this.floor, this.x + xy.x, this.y + xy.y);
        if (mon !== null) {
            if (mon.type === MON_TYPE_DRONE || this.type === MON_TYPE_DRONE || mon.type === MON_TYPE_DRONE_CASTER || this.type === MON_TYPE_DRONE_CASTER || mon.champId > -1) {
                //attack champion
                this.attack(true, mon);
                return 2;
            } else if (this.teamId === 0 && this.square > CHAR_FRONT_SOLO) {
                //interact with other monster, only monsters without a team can team up
                return this.assembleTeamWith(mon);
            }
        }
    } else if ((this.champId > -1 && !this.communicating) || this.timerTerror > 0) { //champion
        var ch = this.getChampion();
        if (ch !== null && ch.recruitment.called && ch.recruitment.playerId > -1 && ch.recruitment.playerId === ply) {
            ch.recruitment.attached = true;
            ch.recruitment.called = false;
            pl.updateChampions();
            redrawUI(ply);
            pl.message(ch.firstName + TEXT_REJOINS_THE_PARTY, colourData['GREEN']);
            return ply;
        }
    } else { //vendor and communicating monsters
        return ply;
    }
    return -1;
}

Monster.prototype.canMove = function() {
    var sq = this.getSquareByDir();

    if (this.teamId > 0 || sq === CHAR_FRONT_SOLO || sq === CHAR_FRONT_LEFT || sq === CHAR_FRONT_RIGHT) {
        var ob = canMove(this.floor, this.x, this.y, this.d);
        var xy = getOffsetByRotation(this.d);
        if (ob === OBJECT_WOOD && this.canOpenDoor()) {
            return OBJECT_WOOD_DOOR;
        } else if (ob === OBJECT_NONE && getObject(this.floor, this.x + xy.x, this.y + xy.y) === OBJECT_PIT && this.form !== MON_FORM_BEHOLDER && this.form !== MON_FORM_ENTITY) {
            return OBJECT_PIT;
        }
        return ob;
    }
    return OBJECT_NONE;
}

Monster.prototype.assembleTeamWith = function(m) {
    if (m.square != CHAR_FRONT_SOLO) {
        if (m.teamId === 0) { //create a new team
            monsterTeamIdMax++;
            m.teamId = monsterTeamIdMax;
            this.teamId = -monsterTeamIdMax;
        } else {
            if (getMonsterTeam(m.teamId).length === 4) { //full team
                return -1;
            } else { //join existing team
                this.teamId = -Math.abs(m.teamId);
            }
        }
        updateMonsterTeam(this.teamId);
        return 3;
    }
    return -1;
}

Monster.prototype.canOpenDoor = function() {
    var hexThis = this.getBinaryView(18, 0, 16);
    var hexNext = this.getBinaryView(15, 0, 16);
    //Check the space the monster is standing on
    if (getHexToBinaryPosition(hexThis, 13, 3) == '2' && getHexToBinaryPosition(hexThis, ((7 - this.d) % 4) * 2 + 1, 1) == '1') {
        if (this.isAggressive() && this.type !== MON_TYPE_DRONE && this.type !== MON_TYPE_DRONE_CASTER && getHexToBinaryPosition(hexThis, 11, 1) == '0' && getHexToBinaryPosition(hexThis, ((7 - this.d) % 4) * 2, 1) === '1') {
            //a door that can be opened
            this.setBinaryView(18, ((7 - this.d) % 4) * 2 + 1, 1, '0');
            return true;
        }
    }
    //Check the space the monster is moving to
    if (getHexToBinaryPosition(hexNext, 13, 3) == '2' && getHexToBinaryPosition(hexNext, ((5 - this.d) % 4) * 2 + 1, 1) == '1') {
        if (this.isAggressive() && this.type !== MON_TYPE_DRONE && this.type !== MON_TYPE_DRONE_CASTER && getHexToBinaryPosition(hexNext, 11, 1) == '0' && getHexToBinaryPosition(hexNext, ((5 - this.d) % 4) * 2, 1) === '1') {
            //a door that can be opened
            this.setBinaryView(15, ((5 - this.d) % 4) * 2 + 1, 1, '0');
            return true;
        }
    }
    return false;
}

Monster.prototype.move = function() {
    var ch = this.getChampion();
    if (this.x < 128) {
        if (this.type === MON_TYPE_LAUNCHER) {
            this.launchSpell();
        } else if (!this.dead && this.teamId >= 0 && (this.isRecruitedBy() === null || (ch !== null && ch.recruitment.called))) {
            this.attack(false);
            if (this.castSpell()) return;
            var canMove = this.canMove();
            if (canMove === OBJECT_CHARACTER && this.canInteract() > -1) return;
            if (canMove === OBJECT_NONE) {
                xy = getOffsetByRotation(this.d);
                if (this.teamId > 0 || this.square === CHAR_FRONT_SOLO) {
                    if (this.followPlayer()) return;
                    this.x += xy.x;
                    this.y += xy.y;
                    updateMonsterTeam(this.teamId);
                    this.doEvent();
                } else {
                    var sq = this.getSquareByDir();
                    switch (sq) {
                        case CHAR_FRONT_LEFT:
                        case CHAR_FRONT_RIGHT:
                            if (this.followPlayer()) return;
                            this.x += xy.x;
                            this.y += xy.y;
                            this.doEvent();
                            break;
                        default:
                            break;
                    }
                    this.square = this.getSquareByDirNext();
                }
            } else if (canMove !== OBJECT_WOOD_DOOR) {
                if (this.followPlayer()) {
                    return;
                } else {
                    var turn = Math.floor(Math.random() * 2) * 2 - 1;
                    this.rotateTo((this.d + turn + 4) % 4);
                }
            }
            for(var p in player) {
                player[p].redrawViewPort = true;
            }
        }
    }
}

Monster.prototype.doEvent = function() {
    hex18 = tower[towerThis].floor[this.floor].Map[this.y][this.x];
    switch (getHexToBinaryPosition(hex18, 13, 3)) {
        case '7':
            if (getHexToBinaryPosition(hex18, 6, 2) === '1') { //firepath
                var ds = getDungeonSpell(this.floor, this.x, this.y);
                if (ds !== null) {
                    var prc = hex2dec(getHexToBinaryPosition(hex18, 0, 6)) / 64.0;
                    ds.projectile.attack(this, prc);
                }
            }
            break;
        default:
            break;
    }
}

Monster.prototype.attack = function(attack, target) {
    if (attack) {
        var combat = calculateAttack(this, target);
        for(var com = 0; com < combat.length; com++) {
            var att = combat[com].attacker;
            var def = combat[com].defender;
            var pwr = combat[com].power;
            var dExh = combat[com].defExhaustion;
            att.attacking = true;
            att.doGesture(CHA_GESTURE_ATTACKING);
            att.doDamageTo(def, pwr, dExh);
            if (def instanceof Champion) {
                PrintLog('MONSTER #' + att.id + ' HITS CHAMPION ' + TEXT_CHAMPION_NAME[def.id] + ' FOR ' + pwr + '!');
            } else if (def instanceof Monster) {
                PrintLog('MONSTER #' + att.id + ' HITS HITS MONSTER #' + def.id + ' FOR ' + pwr + '!');
            }
            playSound('SOUND_ATTACK');
        }
        for(var p in player) {
            player[p].redrawViewPort = true;
        }
    } else {
        var team = getMonsterTeam(this.teamId);
        this.attacking = false;
        for(var i = 1; i < team.length; i++) {
            team[i].attacking = false;
        }
    }
}

Monster.prototype.doDamageTo = function(def, dmg, dExh) {
    if (def instanceof Champion) {
        if (typeof dExh !== "undefined") {
            def.stat.vit -= dExh;
            if (def.stat.vit <= 0) {
                def.stat.vit = 0;
            }
        }
        def.getDamage(dmg);
    } else if (def instanceof Monster) {
        def.getDamage(dmg);
    }
}

Monster.prototype.getDamage = function(dmg) {
    this.hp -= dmg;
    if (this.getHP() < 0) {
        this.die();
    }
}

Monster.prototype.getHP = function() {
    var ch = this.getChampion();
    if(ch !== null) {
        return ch.getHP();
    }
    return this.hp;
}

Monster.prototype.addHP = function(hp, safe) {
    var ch = this.getChampion();
    if(ch !== null) {
        ch.addHP(hp, safe);
    }
}

Monster.prototype.getVit = function() {
    var ch = this.getChampion();
    if(ch !== null) {
        return ch.getVit();
    }
    return 0;
}

Monster.prototype.addVit = function(vit) {
    var ch = this.getChampion();
    if(ch !== null) {
        ch.addVit(vit);
    }
}

Monster.prototype.getSP = function() {
    var ch = this.getChampion();
    if(ch !== null) {
        return ch.getSP();
    }
    return 0;
}

Monster.prototype.addSP = function(sp) {
    var ch = this.getChampion();
    if(ch !== null) {
        ch.addSP(sp);
    }
}

Monster.prototype.castSpell = function() {
    if (!this.communicating) {
        var sq = this.getSquareByDir();
        if ((this.type === MON_TYPE_CASTER || this.type === MON_TYPE_DRONE_CASTER) && Math.floor(Math.random() * 3) === 0 && (this.teamId > 0 || this.square === CHAR_FRONT_SOLO || sq === CHAR_FRONT_LEFT || sq === CHAR_FRONT_RIGHT)) {
            var id = SPELL_MISSILE;
            if (this.level >= 4 && Math.floor(Math.random() * 2) === 0) {
                id = SPELL_SPELLTAP;
            }
            if (this.level >= 8 && Math.floor(Math.random() * 3) === 0) {
                id = SPELL_FIREBALL;
            }
            if (this.level >= 12 && Math.floor(Math.random() * 4) === 0) {
                id = SPELL_CONFUSE;
            }
            if (this.level >= 16 && Math.floor(Math.random() * 5) === 0) {
                id = SPELL_ARC_BOLT;
            }
            if (this.level >= 18 && Math.floor(Math.random() * 6) === 0) {
                id = SPELL_DISRUPT;
            }
            castSpell(id, this, 15 + this.level);
            this.doGesture(CHA_GESTURE_SPELLCASTING);
            for(var p in player) {
                player[p].redrawViewPort = true;
            }
            return true;
        }
    }
    return false;
}

Monster.prototype.launchSpell = function() {
    if (this.type === MON_TYPE_LAUNCHER) {
        id = SPELL_ARC_BOLT;
        castSpell(id, this, Math.floor(this.level * 2 + 4 + getSpellById(id).level * 0.4));
    }
}

Monster.prototype.followPlayer = function() {
    //Move to player
    var ch = this.getChampion();
    if ((this.champId === -1 && this.type !== MON_TYPE_DRONE && this.type !== MON_TYPE_DRONE_CASTER) || (ch !== null && ch.recruitment.called)) {
        var rnd = Math.floor(Math.random() * 2);
        if (!player[0].dead && player[0].floor === this.floor && (typeof player[1] === 'undefined' || player[1].dead || Math.abs(player[0].x - this.x) + Math.abs(player[0].y - this.y) < Math.abs(player[1].x - this.x) + Math.abs(player[1].y - this.y))) {
            //player 1 is closer
            if (this.timerTerror > 0 && ((player[0].x > this.x && this.d === 3) || (player[0].x < this.x && this.d === 1) || (player[0].y > this.y && this.d === 0) || (player[0].y < this.y && this.d === 2))) {
                return false;
            } else if (player[0].x > this.x && this.d === 1) {
                return false;
            } else if (player[0].x < this.x && this.d === 3) {
                return false;
            } else if (player[0].y > this.y && this.d === 2) {
                return false;
            } else if (player[0].y < this.y && this.d === 0) {
                return false;
            } else if (rnd === 0) {
                if (player[0].x >= this.x && (this.d === 0 || this.d === 2)) {
                    this.rotateTo(1);
                    return true;
                } else if (player[0].x <= this.x && (this.d === 0 || this.d === 2)) {
                    this.rotateTo(3);
                    return true;
                } else if ((player[0].x < this.x && this.d === 1) || (player[0].x > this.x && this.d === 3)) {
                    this.rotateTo(Math.floor(Math.random() * 2) * 2);
                    return true;
                }
            } else if (rnd === 1) {
                if (player[0].y >= this.y && (this.d === 1 || this.d === 3)) {
                    this.rotateTo(2);
                    return true;
                } else if (player[0].y <= this.y && (this.d === 1 || this.d === 3)) {
                    this.rotateTo(0);
                    return true;
                } else if ((player[0].y < this.y && this.d === 2) || (player[0].y > this.y && this.d === 0)) {
                    this.rotateTo(Math.floor(Math.random() * 2) * 2 + 1);
                    return true;
                }
            }
        } else if (typeof player[1] !== 'undefined' && !player[1].dead && player[1].floor === this.floor) {
            //player 2 is closer
            if (player[1].x > this.x && (this.d === 1)) {
                return false;
            } else if (player[1].x < this.x && (this.d === 3)) {
                return false;
            } else if (player[1].y > this.y && (this.d === 2)) {
                return false;
            } else if (player[1].y < this.y && (this.d === 0)) {
                return false;
            } else if (rnd === 0) {
                if (player[1].x >= this.x && (this.d === 0 || this.d === 2)) {
                    this.rotateTo(1);
                    return true;
                } else if (player[1].x <= this.x && (this.d === 0 || this.d === 2)) {
                    this.rotateTo(3);
                    return true;
                } else if ((player[1].x < this.x && this.d === 1) || (player[1].x > this.x && this.d === 3)) {
                    this.rotateTo(Math.floor(Math.random() * 2) * 2);
                    return true;
                }
            } else if (rnd === 1) {
                if (player[1].y >= this.y && (this.d === 1 || this.d === 3)) {
                    this.rotateTo(2);
                    return true;
                } else if (player[1].y <= this.y && (this.d === 1 || this.d === 3)) {
                    this.rotateTo(0);
                    return true;
                } else if ((player[1].y < this.y && this.d === 2) || (player[1].y > this.y && this.d === 0)) {
                    this.rotateTo(Math.floor(Math.random() * 2) * 2 + 1);
                    return true;
                }
            }
        }
    }
    return false;
}

Monster.prototype.rotateTo = function(d) {
    if (this.timerTerror > 0) {
        d = (d + 2) % 4;
    }
    this.d = d;
    updateMonsterTeam(this.teamId);
}

//  CHAR_FRONT_LEFT = 0,
//  CHAR_FRONT_RIGHT = 1,
//  CHAR_BACK_RIGHT = 2,
//  CHAR_BACK_LEFT = 3,
//returns the sub square relative to the direction of the monster
Monster.prototype.getSquareByDir = function() {
    if (this.square > CHAR_FRONT_SOLO) {
        return (4 + this.square - this.d) % 4;
    } else {
        return -1;
    }
}

//returns the sub square relative to the direction of the monster, if the (small) monster would move 1 step forwards
Monster.prototype.getSquareByDirNext = function() {
    switch (this.square) {
        case 0:
            switch (this.d) {
                case 0:
                case 2:
                    return 3;
                case 1:
                case 3:
                    return 1;
            }
            break;
        case 1:
            switch (this.d) {
                case 0:
                case 2:
                    return 2;
                case 1:
                case 3:
                    return 0;
            }
            break;
        case 2:
            switch (this.d) {
                case 0:
                case 2:
                    return 1;
                case 1:
                case 3:
                    return 3;
            }
            break;
        case 3:
            switch (this.d) {
                case 0:
                case 2:
                    return 0;
                case 1:
                case 3:
                    return 2;
            }
            break;
    }
}

Monster.prototype.getChampion = function() {
    if (this.champId > -1) {
        return champion[this.champId];
    }
    return null;
}

Monster.prototype.isRecruitedBy = function() {
    var ch = this.getChampion();
    if (ch !== null && ch.recruitment.playerId > -1) {
        return player[ch.recruitment.playerId];
    }
    return null;
}

Monster.prototype.isAggressive = function() {
    if (this.champId > -1 || this.form === 21 || this.form === 22 || this.timerTerror > 0) {
        return false;
    }
    return true;
}

Monster.prototype.die = function() {
    if (!this.dead) {
        this.dead = true;
        this.attacking = false;
        this.hp = -1;
        updateMonsterTeam(this.teamId);
        var sq = this.square;
        if (sq === -1) {
            sq = 0;
        }
        if (this.champId > -1) {
            var ch = champion[this.champId];
            if (this.isRecruitedBy() === null || !ch.recruitment.attached) {
                dropItem(ch.pocket[POCKET_HIDDEN].id, 1, this.floor, this.x, this.y, sq);
            } else {
                playSound('SOUND_DEATH');
            }
        } else {
            newProjectile('PROJECTILE_BIG', paletteData['MOON_BIG'], null, -1, 0, this.floor, this.x, this.y, 0, null);
            if (this.type !== MON_TYPE_DRONE && this.type !== MON_TYPE_DRONE_CASTER) {
                var it = [];
                for(var i = 0; i < POCKET_MAX + 1; i++) {
                     if (this.pocket[i].id > 0 && typeof this.pocket !== 'undefined') {
                        it.push({
                            id: this.pocket[i].id,
                            quantity: this.pocket[i].quantity
                        });
                    }
                }
                for(var i in it) {
                    dropItem(it[i].id, it[i].quantity, this.floor, this.x, this.y, sq);
                }
            }
        }
    }
}

//check timers for paralyze and terror, and return a timer factor for slowing the monster down or freezing the monster
Monster.prototype.getCurseTimers = function() {
    if (this.timerParalyze > 0) {
        this.timerParalyze--;
    }
    if (this.timerTerror > 0) {
        this.timerTerror--;
    }
    if (this.timerParalyze === 0 && this.timerTerror === 0) {
        this.timerSpeed = 20;
    }
    var fac = this.timerSpeed;
    return this.getSpeed(fac);
}

Monster.prototype.getSpeed = function(fac) {
    var lvl = this.level;
    if (lvl > 20) {
        lvl = 20;
    }
    return Math.floor(fac / (1.0 + 0.02 * lvl));
}

Monster.prototype.doGesture = function(g) {
    this.gesture = g;
    this.gestureTimer = timerMaster;
}

Monster.prototype.setBinaryView = function(pos18, index, length, to) {
    var xy = posToCoordinates(pos18, this.x, this.y, this.d);
    tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length, to);
}
Monster.prototype.getBinaryView = function(pos18, index, length) {
    var xy = posToCoordinates(pos18, this.x, this.y, this.d);
    try {
        return getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length);
    } catch (e) {
        return '0001';
    }
}

Monster.prototype.setSpecialPocketItem = function(i) {
    this.pocket[POCKET_SLOT_0].setPocketItem(monsterItemData[i], 1, true);
}

function initMonsters() {
    var max = CHAMPION_MAX;
    var mi = 0;
    for (var t = 0; t < tower.length; t++) {
        var tw = tower[t];
        monster[tw.id] = new Array();
        var xLast = 0;
        var square = 0;
        for(var i = 0; i < tw.monsterData.length; i++) {
            var md = tw.monsterData[i];
            var level = parseInt(hex2dec(getHexToBinaryPosition(md, 24, 8)));
            var type = parseInt(hex2dec(getHexToBinaryPosition(md, 0, 4)));
            var form = parseInt(hex2dec(getHexToBinaryPosition(md, 32, 8)));
            var floor = parseInt(hex2dec(getHexToBinaryPosition(md, 4, 4))) - 1;
            var x = parseInt(hex2dec(getHexToBinaryPosition(md, 8, 8)));
            var y = parseInt(hex2dec(getHexToBinaryPosition(md, 16, 8)));
            var tid = parseInt(hex2dec(getHexToBinaryPosition(md, 40, 8)));
            if (md.substring(0, 1) > 7) {
                PrintLog("Match: " + md + " Bit:" + parseInt(hex2dec(getHexToBinaryPosition(md, 0, 1))) + " Type:" + type);
            }
            var hi = parseInt(hex2dec(getHexToBinaryPosition(md, 0, 1)));
            var teamId = 0;
            if (level != 0 || type != 0 || form != 0 || floor != -1 || x != 0 || y != 0) {
                if (tid != 255) {
                    if (x != 255) {
                        xLast = x;
                        monsterTeamIdMax++;
                        teamId = monsterTeamIdMax;
                    } else {
                        x = xLast;
                        square++;
                        teamId = -monsterTeamIdMax;
                    }
                } else if (form === MON_FORM_VENDOR_1 || form === MON_FORM_VENDOR_2 || form >= MON_FORM_BEHOLDER) {
                    square = -1;
                } else {
                    square = 0;
                }
                monster[tw.id][i] = new Monster(max, level, type, form, tw.id, floor, x, y, 0, square, teamId, null, createPocketSlots(POCKET_MAX + 1));
                var mon = monster[tw.id][i];
                if (hi === 1) {
                    mon.setSpecialPocketItem(mi);
                    mi++;
                } else {
                    var lvl = Math.floor(mon.level / 5.0);
                    if (lvl > 3) {
                        lvl = 3;
                    }
                    if (mon.form === MON_FORM_ZENDIK) {
                        lvl = 4;
                    } else if (mon.form === MON_FORM_BEHEMOTH) {
                        lvl = 5;
                    }
                    if(lvl > 3 || Math.floor(Math.random() * 2) === 1) {
                        var id = itemDropsJson[lvl][Math.floor(Math.random() * itemDropsJson[lvl].length)];
                        var qt = 1;
                        if (getItemType(id) === 'ITEM_TYPE_STACKABLE') {
                            qt = Math.floor(Math.random() * (mon.level + 2) * 1) + 1;
                        }
                        var it = mon.pocket[POCKET_HIDDEN];
                        if(typeof it !== "undefined") {
                            it.setPocketItem(id, qt, true);
                        }
                    }
                }
                max++;
                if (debug) {
                    //PrintLog('Loaded monster: ' + monster[tw.id][i] + " HoldingItem: " +hi+ " MD: " + md);
                }
            }
        }
    }

    //TESTING
    if(debug) {
        var testType = MON_FORM_BEHOLDER;
        var end = monster[TOWER_MOD0].length;
        monster[TOWER_MOD0][end] = new Monster(max, 0, MON_TYPE_CASTER, testType, TOWER_MOD0, 3, 15, 18, 0, CHAR_FRONT_SOLO, 0, null, createPocketSlots(POCKET_MAX + 1));
        monster[TOWER_MOD0][end].pocket[POCKET_SLOT_0].setPocketItem('ITEM_CRYSTAL_PLATE', 1, true);
        monster[TOWER_MOD0][end].pocket[POCKET_SLOT_1].setPocketItem('ITEM_WAR_SHIELD', 1, true);
        monster[TOWER_MOD0][end].pocket[POCKET_SLOT_2].setPocketItem('ITEM_CRYSTAL_GLOVES', 1, true);
        monster[TOWER_MOD0][end].pocket[POCKET_SLOT_3].setPocketItem('ITEM_DEATHBRINGER', 1, true);
        max++;end++;
        /*monster[TOWER_MOD0][end] = new Monster(max, 3, MON_TYPE_NORMAL, testType, TOWER_MOD0, 3, 13, 20, 2, CHAR_FRONT_SOLO, 0, null, createPocketSlots(POCKET_MAX + 1));
        max++;end++;
        monster[TOWER_MOD0][end] = new Monster(max, 6, MON_TYPE_NORMAL, testType, TOWER_MOD0, 3, 14, 16, 2, CHAR_FRONT_SOLO, 0, null, createPocketSlots(POCKET_MAX + 1));
        max++;end++;
        monster[TOWER_MOD0][end] = new Monster(max, 9, MON_TYPE_NORMAL, testType, TOWER_MOD0, 3, 11, 20, 0, CHAR_FRONT_SOLO, 0, null, createPocketSlots(POCKET_MAX + 1));
        max++;end++;*/
    }
    //END OF TESTING
}

function initMonsterPalettes() {

    for(var i = 0; i < monsterBodiesData.length; i++) {
        var body = CHA_BODY[monsterBodiesData[i][0]];
        var j = i * 5;
        monsterPalette[i] = {
            //gender: CHA_GENDER_MALE,
            head: monsterHeadsData[i][0],
            leg: body.leg,
            torso: body.torso,
            arm: body.arm,
            mini: body.mini,
            headPalette: [colourData[monsterPaletteData[j][0]], colourData[monsterPaletteData[j][1]], colourData[monsterPaletteData[j][2]], colourData[monsterPaletteData[j][3]]],
            legPalette: [colourData[monsterPaletteData[j + 1][0]], colourData[monsterPaletteData[j + 1][1]], colourData[monsterPaletteData[j + 1][2]], colourData[monsterPaletteData[j + 1][3]]],
            torsoPalette: [colourData[monsterPaletteData[j + 2][0]], colourData[monsterPaletteData[j + 2][1]], colourData[monsterPaletteData[j + 2][2]], colourData[monsterPaletteData[j + 2][3]]],
            armPalette: [colourData[monsterPaletteData[j + 3][0]], colourData[monsterPaletteData[j + 3][1]], colourData[monsterPaletteData[j + 3][2]], colourData[monsterPaletteData[j + 3][3]]],
            miniPalette: [colourData[monsterPaletteData[j + 4][0]], colourData[monsterPaletteData[j + 4][1]], colourData[monsterPaletteData[j + 4][2]], colourData[monsterPaletteData[j + 4][3]]],
            bodyId: monsterBodiesData[i][0]
        };
    }

    for(var i = 0; i < 6; i++) {
        monsterBigPalette[i] = new Array();
        for(var j = 0; j < 8; j++) { //palettes
            var k = 431;
            var b = monsterPaletteMetaData[i][j];
            monsterBigPalette[i][j] = [colourData[monsterPaletteData[k + b][0]], colourData[monsterPaletteData[k + b][1]], colourData[monsterPaletteData[k + b][2]], colourData[monsterPaletteData[k + b][3]]];
            //PrintLog("Loading Big Monster Palette: " + i.toString() + " - " + j.toString());
        }
        var b = monsterPaletteMetaData[i][0];
        monsterBigPalette[i][8] = [colourData[monsterPaletteData[430 + b][0]], colourData[monsterPaletteData[430 + b][1]], colourData[monsterPaletteData[430 + b][2]], colourData[monsterPaletteData[430 + b][3]]];
    }


}

//function initMonsterGfx() {
//
//  for(var frm = 0; frm <= MON_FORM_BEHEMOTH; frm++) {
//      if (frm >= MON_FORM_ILLUSION) {
//          if (frm === MON_FORM_BEHEMOTH) {
//              createMonsterRef(frm, 0, grabMonster(frm, 0));
//          } else {
//              for(var l = 0; l < 8; l++) {
//                  createMonsterRef(frm, l, grabMonster(frm, l));
//              }
//          }
//      } else {
//          var dGfx = [];
//          var disGfx = [];
//          var pGfx = [];
//          for(var part = 0; part < 5; part++) {
//              for(var dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
//                  for(var d = 0; d < 8; d++) {
//                      if (d < 4 || part === IMAGE_CHA_ARM) { //arms have four more 'directions': 2 front attack arms and 2 side attack arms
//                          dGfx.push(grabCharacter(frm, part, d, dis));
//                      }
//                  }
//                  disGfx.push(dGfx);
//                  dGfx = [];
//              }
//              pGfx.push(disGfx);
//              disGfx = [];
//          }
//          createMonsterRef(frm, 0, pGfx);
//          pGfx = [];
//      }
//  }
//}

function initMonsterGfxNew(m) {

    if (m.form <= MON_FORM_BEHEMOTH) {
        if (m.form >= MON_FORM_ILLUSION) {
            if (m.form === MON_FORM_BEHEMOTH) {
                createMonsterRef(m, 0, grabMonster(m.form, 0));
            } else {
                createMonsterRef(m, m.level, grabMonster(m.form, m.colour));
            }
        } else {
            var dGfx = [];
            var disGfx = [];
            var pGfx = [];
            for(var part = 0; part < 5; part++) {
                for(var dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
                    for(var d = 0; d < 8; d++) {
                        if (d < 4 || part === IMAGE_CHA_ARM) { //arms have four more 'directions': 2 front attack arms and 2 side attack arms
                            dGfx.push(grabCharacter(m.form, part, d, dis));
                        }
                    }
                    disGfx.push(dGfx);
                    dGfx = [];
                }
                pGfx.push(disGfx);
                disGfx = [];
            }
            createMonsterRef(m, 0, pGfx);
            pGfx = [];
        }
    }
}



function initArmourGfx() {

    //armour
    var dGfx = [];
    var disGfx = [];
    var pGfx = [];
    for (var id = 0; id < 9; id++) {
        for (var gen = 0; gen < 3; gen++) {
            for(var part = 0; part < 5; part++) {
                for(var dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
                    for(var d = 0; d < 8; d++) {
                        if (d < 4 || part === IMAGE_CHA_ARM) { //arms have four more 'directions': 2 front attack arms and 2 side attack arms
                            dGfx.push(grabCharacterArmour(id, gen, part, d, dis));
                        }
                    }
                    disGfx.push(dGfx);
                    dGfx = [];
                }
                pGfx.push(disGfx);
                disGfx = [];
            }
            createArmourRef(id, gen, pGfx);
            pGfx = [];
        }
    }
}

//Read out the items here

function createMonsterRef(m, level, gfx) {

    if (typeof monsterRef[m.form] === "undefined") {
        monsterRef[m.form] = new Array();
    }
    if (typeof monsterRef[m.form][level] === "undefined" || typeof monsterRef[m.form][level].gfx === "undefined") {
        if (typeof gfx !== "undefined") {
            monsterRef[m.form][level] = {
                id: m.form,
                level: level,
                gfx: gfx
            };
        }
    }
    m.ref = monsterRef[m.form][level];
}

function createArmourRef(id, gen, gfx) {
    if (typeof armourRef[id] === "undefined") {
        armourRef[id] = new Array();
    }
    if (typeof armourRef[id][gen] === "undefined" || typeof armourRef[id][gen].gfx === "undefined") {
        if (typeof gfx !== "undefined") {
            armourRef[id][gen] = {
                id: id,
                gen: gen,
                gfx: gfx
            };
        }
    }
}

//Gets the (leader) monster at floor, x, y

function getMonsterAt(floor, x, y) {
    mon = getMonstersInTower(towerThis, true);
    for(var m in mon) {
        if (!mon[m].dead && mon[m].teamId >= 0 && mon[m].floor === floor && mon[m].x === x && mon[m].y === y) {
            return mon[m];
        }
    }
    return null;
}

function getMonsterGfxOffset(pos, sub) {
    var xy = posToCoordinates(pos, 0, 0, 0);
    if (sub === CHAR_FRONT_SOLO) {
        subx = 0;
        suby = -1;
    } else if (sub === CHAR_FRONT_LEFT) {
        subx = 1;
        suby = -1;
    } else if (sub === CHAR_FRONT_RIGHT) {
        subx = -1;
        suby = -1;
    } else if (sub === CHAR_BACK_LEFT) {
        subx = 1;
        suby = 1;
    } else {
        subx = -1;
        suby = 1;
    }
    var offx = xy.x * 4 + subx;
    var offy = -xy.y * 4 + suby;

    var x = Math.round(offx * (190.0 / (offy + 6)));
    var y = Math.round(48 - 340.0 / (offy + 6));

    return {
        x: x,
        y: y
    }
}

function getMonsterDistanceByPos(pos, sq) {
    if (pos <= 4) {
        return DISTANCE_VERY_DISTANT;
    } else if (pos <= 9) {
        return DISTANCE_DISTANT;
    } else if (pos <= 12) {
        if (sq === 1) {
            return DISTANCE_FAR;
        } else {
            return DISTANCE_MID;
        }
    } else if (pos <= 15) {
        if (sq === 1) {
            return DISTANCE_CLOSE;
        } else {
            return DISTANCE_VERY_CLOSE;
        }
    } else {
        return -1;
    }
}

//Returns the number of members in this monster's team

function getMonsterTeam(id) {
    var team = new Array();
    if (id != 0) {
        for (var m = 0; m < monster[towerThis].length; m++) {
            if (typeof monster[towerThis][m] !== "undefined" && !monster[towerThis][m].dead) {
                if (monster[towerThis][m].teamId === Math.abs(id)) {
                    team.unshift(monster[towerThis][m]);
                } else if (monster[towerThis][m].teamId === -Math.abs(id)) {
                    team.push(monster[towerThis][m]);
                }
            }
        }
    }
    return team;
}

function updateMonsterTeam(id) {
    if (id != 0) {
        var team = getMonsterTeam(id);
        leader = team[0];
        if (team.length > 1) {
            leader.square = leader.d;
            leader.teamId = Math.abs(id);
            var s = 1;
            for(var i = 1; i < team.length; i++) {
                team[i].x = leader.x;
                team[i].y = leader.y;
                team[i].d = leader.d;
                team[i].square = (leader.d + s) % 4;
                team[i].teamId = -Math.abs(id);
                s++;
            }
        } else if (team.length === 1) {
            leader = team[0];
            leader.teamId = 0;
        }
    }
}



function getMonsterById(id) {
    for(var t = 0; t < 7; t++) {
        for(var m = 0; m < monster[t].length; m++) {
            if (id === monster[t][m].id) {
                return monster[t][m];
            }
        }
    }
    return null;
}

//returns a list of monsters on this tower. Includes champions on this tower
function getMonstersInTower(id, f) {
    var mon = new Array();
    var f1 = null;
    var f2 = null;
    if (typeof f !== 'undefined') {
        f1 = player[0].floor;
        if (typeof player[1] !== 'undefined') {
            f2 = player[1].floor;
        }
    }
    for(var m = 0; m < monster[id].length; m++) {
        if (f1 === null || f1 === monster[id][m].floor || (f2 !== null && f2 === monster[id][m].floor)) {
            mon.push(monster[id][m]);
        }
    }
    for(var m = 0; m < monster[TOWER_CHAMPIONS].length; m++) {
        if (monster[TOWER_CHAMPIONS][m].tower === id) {
            if (f1 === null || f1 === monster[TOWER_CHAMPIONS][m].floor || (f2 !== null && f2 === monster[TOWER_CHAMPIONS][m].floor)) {
                mon.push(monster[TOWER_CHAMPIONS][m]);
            }
        }
    }
    return mon;
}
