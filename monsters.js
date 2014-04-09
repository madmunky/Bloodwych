var MON_SPIDER = 16,
	MON_CRAB = 17;

var monster = new Array();

function Monster(id, level, type, form, colour, teamId, l, x, y, d) {
	this.id = id;
	this.level = level;
	this.type = type;
	this.form = form;
	this.colour = colour;
	this.teamId = teamId;
	this.x = x;
	this.y = y;
	this.d = d;
}

function initMonsters() {
	monster.length = 0;
	for(mn in twr.MonsterData) {
		console.log('Loaded monster: ' + mn);
		champion[mn] = new Champion(mn);
	}
}