//Declare Arrays for the Graphics
var gfx = [];
var player = new Array();
var tower = new Array();

//Setup some global Varibles for needed
var scale = 3;
var debug = true;
var debugHigh = false;
var game;
var characterGfx = [null, null, null, null, null];
var characterImages = [];
var testDistance = 0;
var testDirection = 0;
var testPalette = 0;
var timerMaster = 0;
var timerMonsterMove = 0;
var timerMonsterAttack = 0;
//var players = 0;
var towerSwitchesData = new Array();
var loadingInterval = 0;
var gfxUI = [];

//Flags for determining whether some asycnhronous file calls were succesfully loaded (see fileloader.js "getFileData")
//When a file is called, we increase 'count'
//When a file is loaded, we increase 'max'
//When count == max (all is loaded), we increase 'done'
var dataLoaded = {
	count: 0,
	max: 0,
	done: 0
};
var gfxLoaded = {
	count: 0,
	max: 0,
	done: 0
};

//COLOURS AND PALETTES
var CLASS_SERP = 0,
	CLASS_DRAG = 1,
	CLASS_MOON = 2,
	CLASS_CHAOS = 3;

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
objectPalette["switch"]["default"] = [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], null];
objectPalette["switch"]["default-off"] = [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_RED], null, COLOUR[COLOUR_BLUE]];
objectPalette["switch"][COLOUR_SWITCH_SERPENT] = [COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_MOON] = [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_DRAGON] = [COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_CHAOS] = [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_BLUEISH] = [COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_BROWN] = [COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_GREY] = [COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_TAN] = [COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLACK]];
objectPalette["switch"][COLOUR_SWITCH_BLACK] = [COLOUR[COLOUR_BLACK], COLOUR[COLOUR_BLACK], COLOUR[COLOUR_BLACK], COLOUR[COLOUR_BLACK]];
objectPalette["deco"] = new Array();
objectPalette["deco"]["default"] = [COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT]];
objectPalette["deco"][COLOUR_DECO_BRONZE] = [COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]];
objectPalette["deco"][COLOUR_DECO_SERPENT] = [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]];
objectPalette["deco"][COLOUR_DECO_DRAGON] = [COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]];
objectPalette["deco"][COLOUR_DECO_MOON] = [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]];
objectPalette["deco"][COLOUR_DECO_CHAOS] = [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]];
objectPalette["deco"][COLOUR_DECO_IRON] = [COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK]];
objectPalette["deco"][COLOUR_DECO_BROWN] = [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN]];
objectPalette["deco"][COLOUR_DECO_TAN] = [COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED_DARK]];
objectPalette["door"] = new Array();
objectPalette["door"]["default"] = COLOUR[COLOUR_BLUE];
objectPalette["door"][COLOUR_DOOR_NORMAL] = COLOUR[COLOUR_GREY_DARKEST];
objectPalette["door"][COLOUR_DOOR_BRONZE] = COLOUR[COLOUR_RED_DARK];
objectPalette["door"][COLOUR_DOOR_IRON] = COLOUR[COLOUR_GREY_LIGHT];
objectPalette["door"][COLOUR_DOOR_SERPENT] = COLOUR[COLOUR_GREEN];
objectPalette["door"][COLOUR_DOOR_CHAOS] = COLOUR[COLOUR_YELLOW];
objectPalette["door"][COLOUR_DOOR_DRAGON] = COLOUR[COLOUR_RED];
objectPalette["door"][COLOUR_DOOR_MOON] = COLOUR[COLOUR_BLUE];
objectPalette["door"][COLOUR_DOOR_CHROMATIC] = COLOUR[COLOUR_WHITE];
objectPalette["door"][COLOUR_DOOR_VOID] = COLOUR[COLOUR_BLACK];

//Towers
var TOWER_NAME = ["MOD0", "SERP", "MOON", "DRAGON", "CHAOS", "ZENDIK"];
var TOWER_MOD0 = 0,
	TOWER_SERPENT = 1,
	TOWER_MOON = 2,
	TOWER_DRAGON = 3,
	TOWER_CHAOS = 4,
	TOWER_ZENDIK = 5,
	TOWER_CHAMPIONS = 6; //dummy tower to store champions
var towerThis = TOWER_MOD0;

//Background gfx
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
var IMAGE_CHA_LEG = 0,
	IMAGE_CHA_TORSO = 1,
	IMAGE_CHA_HEAD = 2,
	IMAGE_CHA_ARM = 3,
	IMAGE_CHA_MINI = 4;

var	PART_CHA_LEG = 0,
	PART_CHA_TORSO = 1,
	PART_CHA_ARM_LEFT = 2,
	PART_CHA_HEAD = 3,
	PART_CHA_MINI = 4,
	PART_CHA_ARM_RIGHT = 5,
	PART_CHA_ARM_LEFT_ATTACK = 6,
	PART_CHA_ARM_RIGHT_ATTACK = 7;

var IMAGE_CHA_DISTANCE_1 = 0,
	IMAGE_CHA_DISTANCE_2 = 1,
	IMAGE_CHA_DISTANCE_3 = 2,
	IMAGE_CHA_DISTANCE_4 = 3;

var NUMBER_OF_DISTANCES = 6,
	NUMBER_OF_HEADS = 18,
	NUMBER_OF_TORSOS = 6,
	NUMBER_OF_LEGS = 9,
	NUMBER_OF_ARMS = 3,
	NUMBER_OF_MINIS = 8;

//Character body part types
var CHA_HEAD_ASTROTH = 1,
	CHA_HEAD_SETHRA = 3,
	CHA_HEAD_MR_FLAY = 5,
	CHA_HEAD_BALDRICK = 7,
	CHA_HEAD_ZENDIK = 9,
	CHA_HEAD_ZASTAPH = 11,
	CHA_HEAD_ROSANNE = 13,
	CHA_HEAD_BLODWYN = 15,
	CHA_HEAD_DEMON = 17,
	CHA_HEAD_ULRICH = 0,
	CHA_HEAD_SIR_EDWARD = 2,
	CHA_HEAD_THAI_CHANG = 4,
	CHA_HEAD_ELFRIC = 6,
	CHA_HEAD_HENGIST = 8,
	CHA_HEAD_ZOTHEN = 10,
	CHA_HEAD_MEGRIM = 12,
	CHA_HEAD_ELEANOR = 14,
	CHA_HEAD_MURLOCK = 16;

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

var CHA_MINI_MALE = 0,
	CHA_MINI_MALE_NAKED = 1,
	CHA_MINI_SKELETON = 2,
	CHA_MINI_FEMALE_NAKED = 3,
	CHA_MINI_DEMON = 4,
	CHA_MINI_FEMALE = 5,
	CHA_MINI_FEMALE_PLATE = 6,
	CHA_MINI_FEMALE_CHAIN = 7;

var CHA_BODY = new Array();

var CHA_GENDER_MALE = 0,
	CHA_GENDER_FEMALE = 1;

var MON_PALETTE_DEFAULT = [COLOUR[COLOUR_BLACK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_RED]];

var monsterPaletteData;
var monsterHeadsData;
var monsterBodiesData;
var monsterPalette = new Array();

CHA_BODY[0] = {
	leg: CHA_LEG_FEMALE_NAKED,
	torso: CHA_TORSO_FEMALE_NAKED,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_FEMALE_NAKED
};
CHA_BODY[1] = {
	leg: CHA_LEG_SKELETON,
	torso: CHA_TORSO_SKELETON,
	arm: CHA_ARM_SKELETON,
	mini: CHA_MINI_SKELETON
};
CHA_BODY[2] = {
	leg: CHA_LEG_MALE,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_MALE_NAKED
};
CHA_BODY[3] = {
	leg: CHA_LEG_MALE,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_MALE
};
CHA_BODY[4] = {
	leg: CHA_LEG_FEMALE,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	mini: CHA_MINI_FEMALE
};
CHA_BODY[5] = {
	leg: CHA_LEG_MALE,
	torso: CHA_TORSO_MALE,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_MALE_NAKED
};
CHA_BODY[6] = {
	leg: CHA_LEG_FEMALE_PLATE,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	mini: CHA_MINI_FEMALE_PLATE
};
CHA_BODY[7] = {
	leg: CHA_LEG_MALE_CHAIN,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_FEMALE_NAKED
};
CHA_BODY[8] = {
	leg: CHA_LEG_FEMALE_CHAIN,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	mini: CHA_MINI_FEMALE_CHAIN
};
CHA_BODY[9] = {
	leg: CHA_LEG_MALE_CHAIN,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_MALE
};
CHA_BODY[10] = {
	leg: CHA_LEG_FEMALE_PLATE,
	torso: CHA_TORSO_FEMALE,
	arm: CHA_ARM_FEMALE,
	mini: CHA_MINI_FEMALE_PLATE
};
CHA_BODY[11] = {
	leg: CHA_LEG_MALE,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_MALE
};
CHA_BODY[12] = {
	leg: CHA_LEG_DEMON,
	torso: CHA_TORSO_MALE_NAKED,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_DEMON
};
CHA_BODY[13] = {
	leg: CHA_LEG_DEMON,
	torso: CHA_TORSO_MALE_CHAIN,
	arm: CHA_ARM_MALE,
	mini: CHA_MINI_DEMON
};

var monsterMax = new Array();
var monsterTeamIdMax = 0;
var monsterAttackSequence = 0;
var monster = new Array();

//Switches
var SWITCH_WALL_NONE = 0,
	SWITCH_WALL_REMOVE = 2,
	SWITCH_WALL_TOGGLE_STONE_WALL = 4,
	SWITCH_WALL_OPEN_VOID_DOOR = 6,
	SWITCH_WALL_ROTATE_STONE_WALL = 8,
	SWITCH_WALL_TOGGLE_PILLAR = 10,
	SWITCH_WALL_PLACE_PILLAR = 12,
	SWITCH_WALL_ROTATE_WOOD_WALLS = 14;

var SWITCH_FLOOR_NONE = 0,
	SWITCH_FLOOR_SPIN_180 = 2,
	SWITCH_FLOOR_SPIN_RANDOM = 4,
	SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR = 6,
	SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL = 8,
	SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL = 10,
	SWITCH_FLOOR_WOOD_DOOR_CLOSER_1 = 12,
	SWITCH_FLOOR_WOOD_DOOR_CLOSER_2 = 14,
	SWITCH_FLOOR_TRADER_DOOR = 16,
	SWITCH_FLOOR_TOWER_ENTRANCE_SIDE_PAD = 18, //(X/Y OF OPPOSITE PAD)
	SWITCH_FLOOR_TOWER_ENTRANCE = 20, // (CENTRAL PAD) 
	SWITCH_FLOOR_REMOVE = 22, // (X/Y) *
	SWITCH_FLOOR_CLOSE_VOID_LOCK_DOOR = 24, // (X/Y) *
	SWITCH_FLOOR_TOGGLE_PILLAR = 26, // (X/Y) *
	SWITCH_FLOOR_CREATE_SPINNER = 28, // (OR OTHER) (X/Y) *
	SWITCH_FLOOR_OPEN_CREATE_WALL_WITH_SWITCHES = 30, //? (X/Y) *
	SWITCH_FLOOR_CREATE_PAD = 32, // (F/X/Y) 
	SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER = 34, // X,Y TO PLAYER X-1,Y-1 (SPECIAL CASE) **
	SWITCH_FLOOR_CREATE_PILLAR = 36, // (X/Y) *
	SWITCH_FLOOR_KEEP_ENTRANCE_SIDEPAD = 38, // (X/Y OF OPPOSITE PAD)
	SWITCH_FLOOR_KEEP_ENTRANCE_CENTRAL_PAD = 40,
	SWITCH_FLOOR_FLASH_TELEPORT = 42, // (F/X/Y)
	SWITCH_FLOOR_ROTATE_STONE_WALL = 44, // (X/Y) *
	SWITCH_FLOOR_TOGGLE_WALL = 46, // (X/Y) *
	SWITCH_FLOOR_SPINNER = 48, // (UNKNOWN DIFFERENCE) (X/Y) *
	SWITCH_FLOOR_CLICK_TELEPORT = 50, // (F/X/Y)
	SWITCH_FLOOR_TOGGLE_GREEN_PAD = 52, // (X/Y) *
	SWITCH_FLOOR_ROTATE_WOOD_WALL_COUNTER_CLOCKWISE = 54, // (X/Y) *
	SWITCH_FLOOR_TOGGLE_HOLE = 56, // (X/Y) *
	SWITCH_FLOOR_GAME_COMPLETION_PAD = 58, // **
	SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT = 60; // (X/Y) **
        
var UI_POCKET_EMPTY = 0,
        UI_POCKET_COIN = 1,
        UI_POCKET_COMMON_KEY = 2,
        UI_POCKET_ARROW = 3,
        UI_POCKET_ELF_ARROW = 4,
        UI_POCKET_GEM_GREY = 5,
        UI_POCKET_GEM_SERPENT = 6,
        UI_POCKET_GEM_CHAOS = 7,
        UI_POCKET_GEM_DRAGON =8,
        UI_POCKET_GEM_MOON = 9,
        UI_POCKET_RING = 10,
        UI_POCKET_POTION = 11,
        UI_POCKET_KEY = 12,
        UI_POCKET_STAFF = 13,
        UI_POCKET_WAND = 14,
        UI_POCKET_SHIELD_1 = 15,
        UI_POCKET_SHIELD_2 = 16,
        UI_POCKET_SHIELD_3 = 17,
        UI_POCKET_SHIELD_4 = 18,
        UI_POCKET_SHIELD_5 = 19,
        UI_POCKET_SHIELD_6 = 20,
        UI_POCKET_SHIELD_7 = 21,
        UI_POCKET_AMOUR_LEATHER = 22,
        UI_POCKET_AMOUR_CHAIN = 23,
        UI_POCKET_AMOUR_PLATE = 24,
        UI_POCKET_PERMIT = 25,
        UI_POCKET_HAND_LEFT_AMOUR = 26,
        UI_POCKET_HAND_RIGHT_AMOUR = 27,
        UI_POCKET_DAGGER = 28,
        UI_POCKET_RING_SHINNY = 29,
        UI_POCKET_SHORT_SWORD = 30,
        UI_POCKET_GEM_GREENISH = 31,
        UI_POCKET_GEM_BROWN = 32,
        UI_POCKET_GEM_TAN = 33,
        UI_POCKET_SWORD_1 = 34,
        UI_POCKET_SWORD_2 = 35,
        UI_POCKET_SWORD_3 = 36,
        UI_POCKET_SWORD_4 = 37,
        UI_POCKET_SWORD_5 = 38,
        UI_POCKET_AXE_1 = 39,
        UI_POCKET_AXE_2 = 40,
        UI_POCKET_AXE_3 = 41,
        UI_POCKET_AXE_4 = 42,
        UI_POCKET_BOW = 43,
        UI_POCKET_CROSS_BOW = 44,
        UI_POCKET_APPLE_1 = 46,
        UI_POCKET_APPLE_2 = 47,
        UI_POCKET_APPLE_3 = 48,
        UI_POCKET_BISCUIT_1 = 49,
        UI_POCKET_BISCUIT_2 = 50,
        UI_POCKET_BISCUIT_3 = 51,
        UI_POCKET_CHICKEN_1 = 52,
        UI_POCKET_CHICKEN_2 = 53,
        UI_POCKET_CHICKEN_3 = 54,
        UI_POCKET_NEGG = 55,
        UI_POCKET_WATER_1 = 56,
        UI_POCKET_WATER_2 = 57,
        UI_POCKET_WATER_3 = 58,
        UI_POCKET_BONES = 59,
        UI_ICON_SPELL_1 = 60,
        UI_ICON_SPELL_2 = 61,
        UI_ICON_SPELL_3 = 62,
        UI_ICON_SPELL_4 = 63,
        UI_ICON_SPELL_COMPASS_NORTH = 64,
        UI_ICON_SPELL_COMPASS_EAST = 65,
        UI_ICON_SPELL_COMPASS_SOUTH = 66,
        UI_ICON_SPELL_COMPASS_WEST = 67,
        UI_ICON_SPELL_LEVITATE = 68,
        UI_ICON_SPELL_5 = 69,
        UI_ICON_SPELL_6 = 70,
        UI_ICON_SPELL_7 = 71,
        UI_POCKET_GLOVE = 72,
        UI_POCKET_BLANK = 73,
        UI_POCKET_SLECTION = 74,
        UI_POCKET_CLUB = 75,
        UI_POCKET_SPADE = 76,
        UI_POCKET_HEART = 77,
        UI_POCKET_DIMOND = 78,
        UI_ICON_SPELL_GREY = 79,
        UI_ICON_SPELL_SERPENT = 80,
        UI_ICON_SPELL_CHAOS = 81,
        UI_ICON_SPELL_DRAGON = 82,
        UI_ICON_SPELL_MOON = 83,
        UI_ICON_SPELL_BOOK_DRAGON_LEFT = 84,
        UI_ICON_SPELL_BOOK_LEFT = 85,
        UI_ICON_SPELL_BOOK_RIGHT = 86,
        UI_ICON_SPELL_BOOK_DRAGON_RIGHT = 87,
        UI_POCKET_EMPTY_LEFT_HAND = 88,
        UI_POCKET_EMPTY_RIGHT_HAND = 89,
        UI_POCKET_EMPTY_AMOUR = 90,
        UI_POCKET_EMPTY_LARGE_SHIELD = 91,
        UI_POCKET_EMPTY_SMALL_SHEILD = 92,
        UI_ICON_PAUSE = 93,
        UI_ICON_SAVE = 94,
        UI_ICON_SLEEP = 95,
        UI_ICON_BOOKOFSKULLS = 96,
        UI_ICON_UNKNOWN = 97,
        UI_ICON_POCKETS = 98,
        UI_ICON_OPENDOOR = 99,
        UI_ICON_BACK = 100,
        UI_ICON_SCROLL_UP = 101,
        UI_ICON_SCROLL_DOWN = 102,
        UI_ICON_SPELL_8 = 103,
        UI_ICON_SPELL_9 = 104,
        UI_ICON_SPELL_10 = 105,
        UI_ICON_SPELL_11 = 106,
        UI_ICON_SPELL_12 = 107,
        UI_ICON_SPELL_13 = 108,
        UI_ICON_SPELL_14 = 109,
        UI_ICON_SPELL_15 = 110,
        UI_ICON_SPELL_16 = 111,
        UI_ICON_SELECTED = 112,
        UI_SPELLBOOK = 113,
        UI_SPELLBOOK_TURNPAGE_1 = 114,
        UI_SPELLBOOK_TURNPAGE_2 = 115,
        UI_SPELLBOOK_TURNPAGE_3 = 116,
        UI_SPELLBOOK_TURNPAGE_4 = 117,
        UI_SHIELD = 118,
        UI_ICON_SPELLBOOK = 119,
        UI_ICON_SCROLL = 120,
        UI_ICON_ATTACK = 121,
        UI_CHAIN_VERT = 122,
        UI_STATSBOX = 123,
        UI_ICON_ARROWS_RED = 124,
        UI_ICON_ARROWS_BLUE = 125,
        UI_SHIELD_FILLED = 126,
        UI_CHAIN_LONG = 127,
        UI_CHARACTER_BOX = 128,
        UI_POCKETBOX = 129,
        UI_NAME_BLUE = 130,
        UI_NAME_RED = 131,
        UI_SHIELD_RED = 132,
        UI_SHIELD_BLUE = 133,
        UI_PORTRAITS = 134,
        UI_GRAY_BAR = 135;