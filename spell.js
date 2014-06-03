function Spell(id, name, description, prof, level) {
	this.name = name;
	this.level = level;
	this.prof = prof;
	this.description = description;
	this.cost = this.level * 5;
}

function initSpells() {
    
    getSpellDetails();
    
	for(id = 0; id < SPELL_MAX; id++) {
		var name = spellDetails[id].name;
		var description = spellDetails[id].description;
		var prof = Math.floor(id / 8);
		var level = id % 8;
		spell[id] = new Spell(id, name, description, prof, level);
	}
        
    spellDetails = [];
    
}

function castSpell(s, src) {
	var f = src.f;
	var x = src.x;
	var y = src.y;
	var d = src.d;
	switch(s) {
		case SPELL_VIVIFY:
		if(getMonsterAt(f, x, y) === null) {
			for (i = item[towerThis].length - 1; i >= 0; i--) {
				var it = item[towerThis][i];
				if(it.id >= ITEM_BLODWYN_RIP && it.id <= ITEM_THAI_CHANG_RIP && it.location.tower === towerThis && it.location.floor === f && it.location.x === x && it.location.y === y) {
					var ch = it.id - ITEM_BLODWYN_RIP;
					item[towerThis].splice(i, 1);
					champion[ch].stat.hp = 0;
					champion[ch].monster.floor = f;
					champion[ch].monster.x = x;
					champion[ch].monster.y = y;
					champion[ch].monster.d = (d + 2) % 4;
					champion[ch].monster.hp = 0;
					champion[ch].monster.dead = false;
					if(champion[ch].recruitment.recruited && !champion[ch].recruitment.attached && champion[ch].recruitment.playerId > -1) {
						var p = player[champion[ch].recruitment.playerId];
						if(p.dead) {
							champion[ch].recruitment.attached = true;
							var i = p.getChampionPosition(ch);
							p.exchangeChampionPosition(0, i);
							p.championLeader = 0;
							p.tower = towerThis;
							p.floor = f;
							p.x = x;
							p.y = y
							p.d = (d + 2) % 4;
							p.dead = false;
							p.updateChampions();
							redrawUI(p.id);
						}
					}
					return;
				}
			}
		}
		break;
		default:
		break;
	}
}

function getSpellDetails(){
    
        createSpellName(0,TEXT_SPELL_0_NAME,TEXT_SPELL_0_DESCRIPTION);
        createSpellName(1,TEXT_SPELL_1_NAME,TEXT_SPELL_1_DESCRIPTION);
        createSpellName(2,TEXT_SPELL_2_NAME,TEXT_SPELL_2_DESCRIPTION);
        createSpellName(3,TEXT_SPELL_3_NAME,TEXT_SPELL_3_DESCRIPTION);
        createSpellName(4,TEXT_SPELL_4_NAME,TEXT_SPELL_4_DESCRIPTION);
        createSpellName(5,TEXT_SPELL_5_NAME,TEXT_SPELL_5_DESCRIPTION);
        createSpellName(6,TEXT_SPELL_6_NAME,TEXT_SPELL_6_DESCRIPTION);
        createSpellName(7,TEXT_SPELL_7_NAME,TEXT_SPELL_7_DESCRIPTION);
        createSpellName(8,TEXT_SPELL_8_NAME,TEXT_SPELL_8_DESCRIPTION);
        createSpellName(9,TEXT_SPELL_9_NAME,TEXT_SPELL_9_DESCRIPTION);
        createSpellName(10,TEXT_SPELL_10_NAME,TEXT_SPELL_10_DESCRIPTION);
        createSpellName(11,TEXT_SPELL_11_NAME,TEXT_SPELL_11_DESCRIPTION);
        createSpellName(12,TEXT_SPELL_12_NAME,TEXT_SPELL_12_DESCRIPTION);
        createSpellName(13,TEXT_SPELL_13_NAME,TEXT_SPELL_13_DESCRIPTION);
        createSpellName(14,TEXT_SPELL_14_NAME,TEXT_SPELL_14_DESCRIPTION);
        createSpellName(15,TEXT_SPELL_15_NAME,TEXT_SPELL_15_DESCRIPTION);
        createSpellName(16,TEXT_SPELL_16_NAME,TEXT_SPELL_16_DESCRIPTION);
        createSpellName(17,TEXT_SPELL_17_NAME,TEXT_SPELL_17_DESCRIPTION);
        createSpellName(18,TEXT_SPELL_18_NAME,TEXT_SPELL_18_DESCRIPTION);
        createSpellName(19,TEXT_SPELL_19_NAME,TEXT_SPELL_19_DESCRIPTION);
        createSpellName(20,TEXT_SPELL_20_NAME,TEXT_SPELL_20_DESCRIPTION);
        createSpellName(21,TEXT_SPELL_21_NAME,TEXT_SPELL_21_DESCRIPTION);
        createSpellName(22,TEXT_SPELL_22_NAME,TEXT_SPELL_22_DESCRIPTION);
        createSpellName(23,TEXT_SPELL_23_NAME,TEXT_SPELL_23_DESCRIPTION);
        createSpellName(24,TEXT_SPELL_24_NAME,TEXT_SPELL_24_DESCRIPTION);
        createSpellName(25,TEXT_SPELL_25_NAME,TEXT_SPELL_25_DESCRIPTION);
        createSpellName(26,TEXT_SPELL_26_NAME,TEXT_SPELL_26_DESCRIPTION);
        createSpellName(27,TEXT_SPELL_27_NAME,TEXT_SPELL_27_DESCRIPTION);
        createSpellName(28,TEXT_SPELL_28_NAME,TEXT_SPELL_28_DESCRIPTION);
        createSpellName(29,TEXT_SPELL_29_NAME,TEXT_SPELL_29_DESCRIPTION);
        createSpellName(30,TEXT_SPELL_30_NAME,TEXT_SPELL_30_DESCRIPTION);
        createSpellName(31,TEXT_SPELL_31_NAME,TEXT_SPELL_31_DESCRIPTION);
    
}

function createSpellName(id,n,des){
    spellDetails[id] = {
        name: n,
        description: des    
    };    
}

function getNextSpells(cID,spellClass){
    //JORG NEED YOU TO DO THIS?
    //Please return an array of two spells for a champ id passed in and the class of spell
    
    
}

