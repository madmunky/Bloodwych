//Setup some global Varibles for needed
var scale = 3;
var debug = true;
var debugHigh = false;
var game;
var characterGfx = [null, null, null, null, null];
var drawMonsters = true;
var testDistance = 0;
var testDirection = 0;
var timerMaster = 0;
var timerMonsterMove = 0;


//Flags for determining whether some asycnhronous file calls were succesfully loaded (see fileloader.js "getFileData")
var gameGfxLoaded = {
	monsterHeads: false,
	monsterLegs: false,
	monsterArms: false,
	monsterTorsos: false,
	monsterPeople: false
};
var towerDataLoaded = {
	monsterPalette: false,
	floor: false,
	switches: false,
	triggers: false,
	monsters: false,
	champions: false
};

//COLOURS AND PALETTES
var CLASS_SERP = 0,
	CLASS_DRAG = 1,
	CLASS_MOON = 2,
	CLASS_CHAOS = 3;
/*
$0: 0000 000000
$1: 0444 404040
$2: 0666 606060
$3: 0888 808080
$4: 0AAA A0A0A0
$5: 0292 209020
$6: 01C1 10C010
$7: 000E 0000E0
$8: 048E 4080E0
$9: 0821 802010
$A: 0B31 B03010
$B: 0E96 E09060
$C: 0D00 D00000
$D: 0FD0 F0D000
$E: 0EEE E0E0E0
$F: 0000 000000
*/

var COLOUR_BLACK = 0,
	COLOUR_GREY_DARKEST = 1,
	COLOUR_GREY_DARK = 2,
	COLOUR_GREY_MEDIUM = 3,
	COLOUR_GREY_LIGHT = 4,
	COLOUR_GREEN_DARK = 5,
	COLOUR_GREEN = 6,
	COLOUR_BLUE_DARK = 7,
	COLOUR_BLUE = 8,
	COLOUR_RED_DARK = 9,
	COLOUR_BROWN = 10,
	COLOUR_PINK = 11,
	COLOUR_RED = 12,
	COLOUR_YELLOW = 13,
	COLOUR_WHITE = 14,
	COLOUR_TRANSPARENT = 15;

var COLOUR = new Array();
	COLOUR[COLOUR_BLACK] = [0, 0, 0, 255];
	COLOUR[COLOUR_GREY_DARKEST] = [64, 64, 64, 255];
	COLOUR[COLOUR_GREY_DARK] = [96, 96, 96, 255];
	COLOUR[COLOUR_GREY_MEDIUM] = [128, 128, 128, 255];
	COLOUR[COLOUR_GREY_LIGHT] = [160, 160, 160, 255];
	COLOUR[COLOUR_GREEN_DARK] = [32, 144, 32, 255];
	COLOUR[COLOUR_GREEN] = [16, 192, 16, 255];
	COLOUR[COLOUR_BLUE_DARK] = [0, 0, 224, 255];
	COLOUR[COLOUR_BLUE] = [64, 128, 224, 255];
	COLOUR[COLOUR_RED_DARK] = [128, 32, 16, 255];
	COLOUR[COLOUR_BROWN] = [176, 48, 16, 255];
	COLOUR[COLOUR_PINK] = [224, 144, 96, 255];
	COLOUR[COLOUR_RED] = [208, 0, 0, 255];
	COLOUR[COLOUR_YELLOW] = [224, 192, 0, 255];
	COLOUR[COLOUR_WHITE] = [224, 224, 224, 255];
	COLOUR[COLOUR_TRANSPARENT] = [0, 0, 0, 0];

var COLOUR_DOOR_NORMAL = 0,
	COLOUR_DOOR_BRONZE = 1,
	COLOUR_DOOR_IRON = 2,
	COLOUR_DOOR_SERPENT = 3,
	COLOUR_DOOR_CHAOS = 4,
	COLOUR_DOOR_DRAGON = 5,
	COLOUR_DOOR_MOON = 6,
	COLOUR_DOOR_CHROMATIC = 7,
	COLOUR_DOOR_VOID = 8;

var COLOUR_DECO_BRONZE = 0,
	COLOUR_DECO_SERPENT = 1,
	COLOUR_DECO_DRAGON = 2,
	COLOUR_DECO_MOON = 3,
	COLOUR_DECO_CHAOS = 4,
	COLOUR_DECO_IRON = 5,
	COLOUR_DECO_BROWN = 6,
	COLOUR_DECO_TAN = 7;

var COLOUR_SWITCH_SERPENT = 0,
	COLOUR_SWITCH_CHAOS = 1,
	COLOUR_SWITCH_DRAGON = 2,
	COLOUR_SWITCH_MOON = 3,
	COLOUR_SWITCH_GREY = 4,
	COLOUR_SWITCH_BLUEISH = 5,
	COLOUR_SWITCH_BROWN = 6,
	COLOUR_SWITCH_TAN = 7,
	COLOUR_SWITCH_BLACK = 8;

var DIRECTION_NORTH = 0,
	DIRECTION_EAST = 1,
	DIRECTION_SOUTH = 2,
	DIRECTION_WEST = 3;

var CHAR_DISTANCE_VERY_CLOSE = 0,
	CHAR_DISTANCE_CLOSE = 1,
	CHAR_DISTANCE_MID = 2,
	CHAR_DISTANCE_FAR = 3,
	CHAR_DISTANCE_DISTANT = 4,
	CHAR_DISTANCE_VERY_DISTANT = 5;

var CHAR_FRONT_SOLO = -1,
	CHAR_FRONT_LEFT = 0,
	CHAR_FRONT_RIGHT = 1,
	CHAR_BACK_RIGHT = 2,
	CHAR_BACK_LEFT = 3;

var objectPalette = {};
	objectPalette["switch"] = new Array();
	objectPalette["switch"]["default"] = 				[COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], null];
	objectPalette["switch"]["default-off"] = 			[COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_RED], null, COLOUR[COLOUR_BLUE]];
	objectPalette["switch"][COLOUR_SWITCH_SERPENT] = 	[COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_MOON] = 		[COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_DRAGON] = 	[COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_CHAOS] = 		[COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_BLUEISH] = 	[COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_BROWN] = 		[COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_GREY] = 		[COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_TAN] = 		[COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
	objectPalette["switch"][COLOUR_SWITCH_BLACK] = 		[COLOUR[COLOUR_BLACK], COLOUR[COLOUR_BLACK], COLOUR[COLOUR_BLACK], COLOUR[COLOUR_BLACK]];
	objectPalette["deco"] = new Array();
	objectPalette["deco"]["default"] = 					[COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT]];
	objectPalette["deco"][COLOUR_DECO_BRONZE] = 		[COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]];
	objectPalette["deco"][COLOUR_DECO_SERPENT] = 		[COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]];
	objectPalette["deco"][COLOUR_DECO_DRAGON] = 		[COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]];
	objectPalette["deco"][COLOUR_DECO_MOON] = 			[COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]];
	objectPalette["deco"][COLOUR_DECO_CHAOS] = 			[COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]];
	objectPalette["deco"][COLOUR_DECO_IRON] = 			[COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]];
	objectPalette["deco"][COLOUR_DECO_BROWN] = 			[COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]];
	objectPalette["deco"][COLOUR_DECO_TAN] = 			[COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED_DARK]];
	objectPalette["door"] = new Array();
	objectPalette["door"]["default"] = 					COLOUR[COLOUR_BLUE];
	objectPalette["door"][COLOUR_DOOR_NORMAL] = 		COLOUR[COLOUR_GREY_DARKEST];
	objectPalette["door"][COLOUR_DOOR_BRONZE] = 		COLOUR[COLOUR_RED_DARK];
	objectPalette["door"][COLOUR_DOOR_IRON] = 			COLOUR[COLOUR_GREY_LIGHT];
	objectPalette["door"][COLOUR_DOOR_SERPENT] = 		COLOUR[COLOUR_GREEN];
	objectPalette["door"][COLOUR_DOOR_CHAOS] = 			COLOUR[COLOUR_YELLOW];
	objectPalette["door"][COLOUR_DOOR_DRAGON] = 		COLOUR[COLOUR_RED];
	objectPalette["door"][COLOUR_DOOR_MOON] = 			COLOUR[COLOUR_BLUE];
	objectPalette["door"][COLOUR_DOOR_CHROMATIC] = 		COLOUR[COLOUR_WHITE];
	objectPalette["door"][COLOUR_DOOR_VOID] = 			COLOUR[COLOUR_BLACK];



var Maps = ["MOD0", "MOON", "CHAOS", "DRAGON", "ZENDIK", "SERP", "BWEXTTW1", "BWEXTTW2", "BWEXTTW3", "BWEXTTW4", "horace_mod0", "horace_moon", "horace_drag", "horace_serp", "horace_zendik", "horace_chaos"];

//Background gfx
var CurrentMap = 0;
var background = new Array();
background[0] = new Array(0, 0, 128, 76, 0, 0);
background[1] = new Array(128, 0, 128, 76, 0, 0);

//Touch Screen Stuff
var canvas_x;
var canvas_y;

//CHAMPIONS
var CHAMPION_MAX = 16;

var CHA_BLODWYN = 0,
	CHA_MURLOCK = 1,
	CHA_ELEANOR = 2,
	CHA_ROSANNE = 3,
	CHA_ASTROTH = 4,
	CHA_ZOTHEN = 5,
	CHA_BALDRICK = 6,
	CHA_ELFRIC = 7,
	CHA_SIR_EDWARD = 8,
	CHA_MEGRIM = 9,
	CHA_SETHRA = 10,
	CHA_MR_FLAY = 11,
	CHA_ULRICH = 12,
	CHA_ZASTAPH = 13,
	CHA_HENGIST = 14,
	CHA_THAI_CHANG = 15;

var championData = new Array();
var champion = new Array();

//MONSTERS AND CHARACTERS
var IMAGE_CHA_HEAD = 0,
	IMAGE_CHA_TORSO = 1,
		IMAGE_CHA_LEG = 2,
	IMAGE_CHA_ARM = 3,
	IMAGE_CHA_PEOPLE = 4;

var IMAGE_CHA_DISTANCE_1 = 0,
	IMAGE_CHA_DISTANCE_2 = 1,
	IMAGE_CHA_DISTANCE_3 = 2,
	IMAGE_CHA_DISTANCE_4 = 3;

var NUMBER_OF_DISTANCES = 6,
	NUMBER_OF_HEADS = 18,
	NUMBER_OF_TORSOS = 6,
	NUMBER_OF_LEGS = 9,
	NUMBER_OF_ARMS = 3,
	NUMBER_OF_WHOLEPEOPLE = 8;

//Character body part types
var CHA_HEAD_ASTROTH = 0,
	CHA_HEAD_SETHRA = 1,
	CHA_HEAD_MR_FLAY = 2,
	CHA_HEAD_BALDRICK = 3,
	CHA_HEAD_ZENDIK = 4,
	CHA_HEAD_ZASTAPH = 5,
	CHA_HEAD_ROSANNE = 6,
	CHA_HEAD_BLODWYN = 7,
	CHA_HEAD_DEMON = 8,
	CHA_HEAD_ULRICH = 9,
	CHA_HEAD_SIR_EDWARD = 10,
	CHA_HEAD_THAI_CHANG = 11,
	CHA_HEAD_ELFRIC = 12,
	CHA_HEAD_HENGIST = 13,
	CHA_HEAD_ZOTHEN = 14,
	CHA_HEAD_MEGRIM = 15,
	CHA_HEAD_ELEANOR = 16,
	CHA_HEAD_MURLOCK = 17;

var CHA_TORSO_MALE_NAKED = 0,
	CHA_TORSO_MALE = 1,
	CHA_TORSO_MALE_CHAIN = 2,
	CHA_TORSO_SKELETON = 3,
	CHA_TORSO_FEMALE_NAKED = 4,
	CHA_TORSO_FEMALE = 5;

var CHA_ARM_MALE = 0,
	CHA_ARM_SKELETON = 1,
	CHA_ARM_FEMALE = 2;

var CHA_LEG_MALE = 0,
	CHA_LEG_MALE_CHAIN = 1,
	CHA_LEG_SKELETON = 2,
	CHA_LEG_FEMALE_NAKED = 3,
	CHA_LEG_DEMON = 4,
	CHA_LEG_FEMALE = 5,
	CHA_LEG_FEMALE_PLATE = 6,
	CHA_LEG_FEMALE_CHAIN = 7,
	CHA_LEG_FEMALE_LEATHER = 8;

var CHA_BODY_MALE = 0,
	CHA_BODY_MALE_AMOUR = 1,
	CHA_BODY_MR_FLAY = 2,
	CHA_BODY_BLOODWYN = 3,
	CHA_BODY_GOAT = 4,
	CHA_BODY_FEMALE_DRESS = 5,
	CHA_BODY_FEMALE_AMOUR = 6,
	CHA_BODY_LEGGY = 7;

var CHA_GENDER_MALE = 0,
	CHA_GENDER_FEMALE = 1;

var MON_SPIDER = 16,
	MON_CRAB = 17;

var MON_PALETTE_DEFAULT = [COLOUR[COLOUR_BLACK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_RED]];

var monsterPaletteData;
var monsterPalette = new Array();

/*
monsterPalette[CHA_MURLOCK] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_MURLOCK,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]]
};
monsterPalette[CHA_ELEANOR] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_ELEANOR,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[CHA_ROSANNE] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_ROSANNE,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREEN_DARK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]]
};
monsterPalette[CHA_ASTROTH] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ASTROTH,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]],
	torsoPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREY_DARKEST]],
	armPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREEN]],
	legPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREY_DARKEST]]
};
monsterPalette[CHA_ZOTHEN] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ZOTHEN,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[CHA_BALDRICK] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_BALDRICK,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]],
	armPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]]
};
monsterPalette[CHA_ELFRIC] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ELFRIC,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]]
};
monsterPalette[CHA_SIR_EDWARD] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SIR_EDWARD,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[CHA_MEGRIM] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_MEGRIM,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]],
	armPalette: [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]]
};
monsterPalette[CHA_SETHRA] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SETHRA,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREEN_DARK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREY_DARKEST]],
	armPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREEN]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]]
};
monsterPalette[CHA_MR_FLAY] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_MR_FLAY,
	torso: CHA_TORSO_SKELETON,
	arm: CHA_ARM_SKELETON,
	leg: CHA_LEG_SKELETON,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_WHITE]],
	armPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE]],
	legPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK]]
};
monsterPalette[CHA_ULRICH] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ULRICH,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[CHA_ZASTAPH] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ZASTAPH,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]]
};
monsterPalette[CHA_HENGIST] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_HENGIST,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[CHA_THAI_CHANG] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_THAI_CHANG,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[16] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_THAI_CHANG,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]],
	armPalette: [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]]
};
monsterPalette[17] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_MR_FLAY,
	torso: CHA_TORSO_SKELETON,
	arm: CHA_ARM_SKELETON,
	leg: CHA_LEG_SKELETON,
	headPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLACK]],
	armPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_WHITE]],
	legPalette: [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[18] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ELFRIC,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BROWN]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]]
};
monsterPalette[19] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SETHRA,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	armPalette: [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[20] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_MURLOCK,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_TRANSPARENT]],
	torsoPalette: [COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_BLUE_DARK]],
	armPalette: [COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_BLUE_DARK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_TRANSPARENT], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[21] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_BALDRICK,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[22] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SETHRA,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	armPalette: [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_LIGHT]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[23] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_DEMON,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	armPalette: [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_LIGHT]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[24] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_DEMON,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREY_DARKEST]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREY_DARKEST]],
	armPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREY_DARKEST]]
};
monsterPalette[25] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_DEMON,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]],
	armPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_YELLOW]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]]
};
monsterPalette[26] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_DEMON,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[27] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_DEMON,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[28] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_THAI_CHANG,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	armPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[29] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_THAI_CHANG,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]]
};
monsterPalette[30] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_THAI_CHANG,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED]],
	armPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED]]
};
monsterPalette[31] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_ROSANNE,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE_CHAIN,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_RED]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_PINK]]
};
monsterPalette[32] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_MEGRIM,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE_CHAIN,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_BLUE]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREEN_DARK]]
};
monsterPalette[33] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_MEGRIM,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE,
	headPalette: [COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_RED]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_DARK]],
	armPalette: [COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]]
};
monsterPalette[34] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_MEGRIM,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREEN_DARK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]],
	armPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[35] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_MEGRIM,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE,
	headPalette: [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_GREY_MEDIUM]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]]
};
monsterPalette[36] = {
	gender: CHA_GENDER_FEMALE,
	head: CHA_HEAD_MEGRIM,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	leg: CHA_LEG_FEMALE_PLATE,
	headPalette: [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLUE_DARK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_BLACK]]
};
monsterPalette[37] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SETHRA,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BROWN]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]]
};
monsterPalette[38] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SETHRA,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BROWN]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[39] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ASTROTH,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]]
};
monsterPalette[40] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ASTROTH,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_DEMON,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_BLUE]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]]
};
monsterPalette[41] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SIR_EDWARD,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE_CHAIN,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_BLUE]]
};
monsterPalette[42] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SIR_EDWARD,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE_CHAIN,
	headPalette: [COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_BROWN]]
};
monsterPalette[43] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SIR_EDWARD,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE_CHAIN,
	headPalette: [COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BLUE]]
};
monsterPalette[44] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SIR_EDWARD,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE_CHAIN,
	headPalette: [COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_GREEN_DARK]]
};
monsterPalette[45] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SIR_EDWARD,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE_CHAIN,
	headPalette: [COLOUR[COLOUR_BROWN], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_BROWN]]
};
monsterPalette[46] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_SIR_EDWARD,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE_CHAIN,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_PINK]],
	armPalette: [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_BROWN], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_RED_DARK]]
};
monsterPalette[47] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_ASTROTH,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]],
	torsoPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]],
	armPalette: [COLOUR[COLOUR_PINK], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_PINK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]]
};*/

/*monsterPalette[999] = {
	gender: CHA_GENDER_MALE,
	head: CHA_HEAD_MURLOCK,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_MALE,
	headPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]],
	torsoPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]],
	armPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]],
	legPalette: [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]]
};*/

var monsterMax = 0;
var monster = new Array();
