//Declare Arrays for the Graphics
var gfx = [];
var player = new Array();
var tower = new Array();
var cursorType = 0;
var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

//Setup some global Varibles for needed
var gameStarted = false;
var scale = 3;
var scaleReal = 3;
var debug = false;
var debugHigh = false;
var debugWindow;
var game;
var characterGfx = [null, null, null, null, null];
var characterImages = [];
var testDistance = 0;
var testDirection = 0;
var testPalette = 0;
var timerMaster = 0;
var timerMonsterMove = 0;
var timerMonsterAttack = 0;
var timerChampionStats = 0;
var timerChampionAttack = 16;
var cutpurseTrueview = 0;
var towerSwitchesData = new Array();
var loadingInterval = 0;
var gfxUI = [];
var font;
var uiClickArea = [];
var itemsGfxD = [];
var redrawPlayerUiFlag = 0;

//mobile settings
var mobileMenuOpen = false;

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

var cursorBlue = 0,
        cursorRed = 1;

//COLOURS AND PALETTES
var COLOUR_MAX = 4,
	COLOUR_SERP = 0,
	COLOUR_DRAG = 1,
	COLOUR_MOON = 2,
	COLOUR_CHAOS = 3;

var PROFESSION_MAX = 4,
	PROFESSION_WARRIOR = 0,
	PROFESSION_WIZARD = 1,
	PROFESSION_ADVENTURER = 2,
	PROFESSION_CUTPURSE = 3;

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

var COLOUR_PLAYER = new Array();
COLOUR_PLAYER[0] = [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]];
COLOUR_PLAYER[1] = [COLOUR[COLOUR_WHITE], COLOUR[COLOUR_RED], COLOUR[COLOUR_RED_DARK]];

var CLASS_COLOUR_SERP = 0,
	CLASS_COLOUR_CHAOS = 1,
	CLASS_COLOUR_DRAG = 2,
	CLASS_COLOUR_MOON = 3;

var CLASS_COLOUR = new Array();
CLASS_COLOUR[CLASS_COLOUR_SERP] = COLOUR[COLOUR_GREEN],
CLASS_COLOUR[CLASS_COLOUR_CHAOS] = COLOUR[COLOUR_YELLOW],
CLASS_COLOUR[CLASS_COLOUR_DRAG] = COLOUR[COLOUR_RED],
CLASS_COLOUR[CLASS_COLOUR_MOON] = COLOUR[COLOUR_BLUE];

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

var DISTANCE_VERY_CLOSE = 0,
	DISTANCE_CLOSE = 1,
	DISTANCE_MID = 2,
	DISTANCE_FAR = 3,
	DISTANCE_DISTANT = 4,
	DISTANCE_VERY_DISTANT = 5;

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

var OBJECT_NONE = 0,
	OBJECT_CHARACTER = 1,
	OBJECT_MISC = 2,
	OBJECT_WOOD = 3,
	OBJECT_WALL = 4,
	OBJECT_WOOD_DOOR = 5,
	OBJECT_SHELF = 6,
	OBJECT_SCROLL = 7,
	OBJECT_SWITCH = 8,
	OBJECT_GEM = 9,
	OBJECT_STAIRS = 10,
	OBJECT_DOOR = 11;

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
var chamionPocketData = [];
var champion = new Array();

//MONSTERS AND CHARACTERS
var IMAGE_CHA_LEG = 0,
	IMAGE_CHA_TORSO = 1,
	IMAGE_CHA_HEAD = 2,
	IMAGE_CHA_ARM = 3,
	IMAGE_CHA_MINI = 4;

var PART_CHA_LEG = 0,
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

var IMAGE_MON_TORSO = 0,
	IMAGE_MON_ARM = 1,
	IMAGE_MON_MINI = 2;

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

var MON_TYPE_NORMAL = 0,
	MON_TYPE_SPELLCASTER = 1,
	MON_TYPE_LAUNCHER = 2,
	MON_TYPE_MAGICAL = 3;

var MON_FORM_VENDOR_1 = 21,
	MON_FORM_VENDOR_2 = 22,
	MON_FORM_ILLUSION = 100,
	MON_FORM_SUMMON = 101,
	MON_FORM_BEHOLDER = 102,
	MON_FORM_ENTITY = 103,
	MON_FORM_CRAB = 104,
	MON_FORM_DRAGON = 105,
	MON_FORM_DRAGON_SMALL = 106,
	MON_FORM_BEHEMOTH = 107;

var PALETTE_SERPENT = new Array(COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREEN], COLOUR[COLOUR_GREEN_DARK]),
	PALETTE_CHAOS = new Array(COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK]),
	PALETTE_DRAGON = new Array(COLOUR[COLOUR_WHITE], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_PINK], COLOUR[COLOUR_RED]),
	PALETTE_MOON = new Array(COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_BLUE_DARK]),
	PALETTE_DEAD = new Array(COLOUR[COLOUR_BLACK], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_GREY_DARK], COLOUR[COLOUR_GREY_DARKEST]),
	PALETTE_SELECTED = new Array(COLOUR[COLOUR_BLACK], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_GREY_MEDIUM]),
	PALETTE_BRONZE = new Array(COLOUR[COLOUR_PINK], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_BROWN], COLOUR[COLOUR_RED_DARK]),
	
	PALETTE_CHAOS_BIG = new Array(COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_PINK]),
	PALETTE_DRAGON_BIG = new Array(COLOUR[COLOUR_PINK], COLOUR[COLOUR_YELLOW], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_RED]),
	PALETTE_MOON_BIG = new Array(COLOUR[COLOUR_BLUE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_WHITE], COLOUR[COLOUR_BLUE_DARK]),
	PALETTE_DEAD_BIG = new Array(COLOUR[COLOUR_GREY_DARK], COLOUR[COLOUR_GREY_MEDIUM], COLOUR[COLOUR_BLACK], COLOUR[COLOUR_GREY_DARKEST]);

var MON_PALETTE_DEFAULT = [COLOUR[COLOUR_BLACK], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_RED]],
	SHIELD_PALETTE_DEFAULT = new Array([255, 0, 255, 255], COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]),
	ITEM_PALETTE_DEFAULT = new Array(COLOUR[COLOUR_GREEN], COLOUR[COLOUR_RED], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLUE]),
	DUN_ITEM_PALETTE_DEFAULT = new Array(COLOUR[COLOUR_RED], COLOUR[COLOUR_BLUE], COLOUR[COLOUR_GREY_LIGHT], COLOUR[COLOUR_BLACK]);

var monsterPaletteData;
var monsterPaletteMetaData;
var monsterHeadsData;
var monsterBodiesData;
var monsterPalette = new Array();
var monsterBigPalette = new Array();

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
var monsterRef = new Array();

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
	SWITCH_FLOOR_CREATE_PAD = 32, // (F/X/Y)34, // X,Y TO PLAYER X-1,Y-1 (SPECIAL **
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

var UI_GFX_POCKET_EMPTY = 0,
	UI_GFX_POCKET_COIN = 1,
	UI_GFX_POCKET_COMMON_KEY = 2,
	UI_GFX_POCKET_ARROW = 3,
	UI_GFX_POCKET_ELF_ARROW = 4,
	UI_GFX_POCKET_GEM_GREY = 5,
	UI_GFX_POCKET_GEM_SERPENT = 6,
	UI_GFX_POCKET_GEM_CHAOS = 7,
	UI_GFX_POCKET_GEM_DRAGON = 8,
	UI_GFX_POCKET_GEM_MOON = 9,
	UI_GFX_POCKET_RING = 10,
	UI_GFX_POCKET_POTION = 11,
	UI_GFX_POCKET_KEY = 12,
	UI_GFX_POCKET_STAFF = 13,
	UI_GFX_POCKET_WAND = 14,
	UI_GFX_POCKET_SHIELD_1 = 15,
	UI_GFX_POCKET_SHIELD_2 = 16,
	UI_GFX_POCKET_SHIELD_3 = 17,
	UI_GFX_POCKET_SHIELD_4 = 18,
	UI_GFX_POCKET_SHIELD_5 = 19,
	UI_GFX_POCKET_SHIELD_6 = 20,
	UI_GFX_POCKET_SHIELD_7 = 21,
	UI_GFX_POCKET_AMOUR_LEATHER = 22,
	UI_GFX_POCKET_AMOUR_CHAIN = 23,
	UI_GFX_POCKET_AMOUR_PLATE = 24,
	UI_GFX_POCKET_PERMIT = 25,
	UI_GFX_POCKET_HAND_LEFT_AMOUR = 26,
	UI_GFX_POCKET_HAND_RIGHT_AMOUR = 27,
	UI_GFX_POCKET_DAGGER = 28,
	UI_GFX_POCKET_RING_SHINNY = 29,
	UI_GFX_POCKET_SHORT_SWORD = 30,
	UI_GFX_POCKET_GEM_GREENISH = 31,
	UI_GFX_POCKET_GEM_BROWN = 32,
	UI_GFX_POCKET_GEM_TAN = 33,
	UI_GFX_POCKET_SWORD_1 = 34,
	UI_GFX_POCKET_SWORD_2 = 35,
	UI_GFX_POCKET_SWORD_3 = 36,
	UI_GFX_POCKET_SWORD_4 = 37,
	UI_GFX_POCKET_SWORD_5 = 38,
	UI_GFX_POCKET_AXE_1 = 39,
	UI_GFX_POCKET_AXE_2 = 40,
	UI_GFX_POCKET_AXE_3 = 41,
	UI_GFX_POCKET_AXE_4 = 42,
	UI_GFX_POCKET_BOW = 43,
	UI_GFX_POCKET_CROSS_BOW = 44,
	UI_GFX_POCKET_APPLE_1 = 45,
	UI_GFX_POCKET_APPLE_2 = 46,
	UI_GFX_POCKET_APPLE_3 = 47,
	UI_GFX_POCKET_BISCUIT_1 = 48,
	UI_GFX_POCKET_BISCUIT_2 = 49,
	UI_GFX_POCKET_BISCUIT_3 = 50,
	UI_GFX_POCKET_CHICKEN_1 = 51,
	UI_GFX_POCKET_CHICKEN_2 = 52,
	UI_GFX_POCKET_CHICKEN_3 = 53,
	UI_GFX_POCKET_NEGG = 54,
	UI_GFX_POCKET_WATER_1 = 55,
	UI_GFX_POCKET_WATER_2 = 56,
	UI_GFX_POCKET_WATER_3 = 57,
	UI_GFX_POCKET_BONES = 58,
	UI_GFX_ICON_SPELL_1 = 59,
	UI_GFX_ICON_SPELL_2 = 60,
	UI_GFX_ICON_SPELL_3 = 61,
	UI_GFX_ICON_SPELL_4 = 62,
	UI_GFX_ICON_SPELL_COMPASS_NORTH = 64,
	UI_GFX_ICON_SPELL_COMPASS_EAST = 65,
	UI_GFX_ICON_SPELL_COMPASS_SOUTH = 66,
	UI_GFX_ICON_SPELL_COMPASS_WEST = 67,
	UI_GFX_ICON_SPELL_LEVITATE = 68,
	UI_GFX_ICON_SPELL_5 = 69,
	UI_GFX_ICON_SPELL_6 = 70,
	UI_GFX_ICON_SPELL_7 = 71,
	UI_GFX_POCKET_GLOVE = 72,
	UI_GFX_POCKET_BLANK = 73,
	UI_GFX_POCKET_SLECTION = 74,
	UI_GFX_POCKET_SPADE = 75,
	UI_GFX_POCKET_CLUB = 76,
	UI_GFX_POCKET_HEART = 77,
	UI_GFX_POCKET_DIAMOND = 78,
	UI_GFX_ICON_SPELL_GREY = 79,
	UI_GFX_ICON_SPELL_SERPENT = 80,
	UI_GFX_ICON_SPELL_CHAOS = 81,
	UI_GFX_ICON_SPELL_DRAGON = 82,
	UI_GFX_ICON_SPELL_MOON = 83,
	UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT = 84,
	UI_GFX_ICON_SPELL_BOOK_LEFT = 85,
	UI_GFX_ICON_SPELL_BOOK_RIGHT = 86,
	UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT = 87,
	UI_GFX_POCKET_EMPTY_LEFT_HAND = 88,
	UI_GFX_POCKET_EMPTY_RIGHT_HAND = 89,
	UI_GFX_POCKET_EMPTY_AMOUR = 90,
	UI_GFX_POCKET_EMPTY_LARGE_SHIELD = 91,
	UI_GFX_POCKET_EMPTY_SMALL_SHEILD = 92,
	UI_GFX_ICON_PAUSE = 93,
	UI_GFX_ICON_SAVE = 94,
	UI_GFX_ICON_SLEEP = 95,
	UI_GFX_ICON_BOOKOFSKULLS = 96,
	UI_GFX_ICON_UNKNOWN = 97,
	UI_GFX_ICON_POCKETS = 98,
	UI_GFX_ICON_OPENDOOR = 99,
	UI_GFX_ICON_BACK = 100,
	UI_GFX_ICON_SCROLL_UP = 101,
	UI_GFX_ICON_SCROLL_DOWN = 102,
	UI_GFX_ICON_SPELL_8 = 103,
	UI_GFX_ICON_SPELL_9 = 104,
	UI_GFX_ICON_SPELL_10 = 105,
	UI_GFX_ICON_SPELL_11 = 106,
	UI_GFX_ICON_SPELL_12 = 107,
	UI_GFX_ICON_SPELL_13 = 108,
	UI_GFX_ICON_SPELL_14 = 109,
	UI_GFX_ICON_SPELL_15 = 110,
	UI_GFX_ICON_SPELL_16 = 111,
	UI_GFX_ICON_SELECTED = 112,
	UI_GFX_SPELLBOOK = 113,
	UI_GFX_SPELLBOOK_TURNPAGE_1 = 114,
	UI_GFX_SPELLBOOK_TURNPAGE_2 = 115,
	UI_GFX_SPELLBOOK_TURNPAGE_3 = 116,
	UI_GFX_SPELLBOOK_TURNPAGE_4 = 117,
	UI_GFX_SHIELD = 118,
	UI_GFX_ICON_SPELLBOOK = 119,
	UI_GFX_ICON_SCROLL = 120,
	UI_GFX_ICON_ATTACK = 121,
	UI_GFX_CHAIN_VERT = 122,
	UI_GFX_STATSBOX = 123,
	UI_GFX_ICON_ARROWS_RED = 124,
	UI_GFX_ICON_ARROWS_BLUE = 125,
	UI_GFX_SHIELD_FILLED = 126,
	UI_GFX_CHAIN_LONG = 127,
	UI_GFX_CHARACTER_BOX = 128,
	UI_GFX_POCKETBOX = 129,
	UI_GFX_NAME_BLUE = 130,
	UI_GFX_NAME_RED = 131,
	UI_GFX_SHIELD_RED = 132,
	UI_GFX_SHIELD_BLUE = 133,
	UI_GFX_PORTRAITS = 134,
	UI_GFX_GRAY_BAR = 135,
	UI_GFX_SHIELD_CHARACTERS = 136,
	UI_GFX_SHIELD_TYPES = 137,
	UI_GFX_SHIELD_BOTTOM = 138,
	UI_GFX_SHIELD_TOP = 139,
	UI_GFX_SCRIPT = 140,
	UI_GFX_FAIRIES = 141,
	UI_GFX_FOOD_POINTER = 142,
	UI_GFX_MOVEMENT_ROTATE_LEFT = 143,
	UI_GFX_MOVEMENT_MOVE_FORWARD = 144,
	UI_GFX_MOVEMENT_ROTATE_RIGHT = 145,
	UI_GFX_MOVEMENT_MOVE_LEFT = 146,
	UI_GFX_MOVEMENT_MOVE_BACKWARDS = 147,
	UI_GFX_MOVEMENT_MOVE_RIGHT = 148;

var UI_LEFT_PANEL_MODE_STATS = 0,
	UI_LEFT_PANEL_MODE_COMMAND = 1;

var UI_RIGHT_PANEL_MAIN = 0,
	UI_RIGHT_PANEL_SPELLBOOK = 1,
	UI_RIGHT_PANEL_POCKETS = 2,
	UI_RIGHT_PANEL_STATS = 3,
	UI_RIGHT_PANEL_SCROLL = 4;

var UI_CENTER_PANEL_SLEEPING = 0,
	UI_CENTER_PANEL_DEAD = 1,
	UI_CENTER_PANEL_FAIRY = 2,
	UI_CENTER_PANEL_FAIRY_DRAGON = 3,
	UI_CENTER_PANEL_FAIRY_SERPENT = 4,
	UI_CENTER_PANEL_FAIRY_MOON = 5,
	UI_CENTER_PANEL_FAIRY_CHAOS = 6,
	UI_CENTER_PANEL_FAIRY_SPELLDETAILS = 7,
	UI_CENTER_PANEL_VIEWPORT = 8;


var UI_CLICK_CHAMP1 = 0,
	UI_CLICK_STATS_BOX = 1,
	UI_CLICK_CHAMP2 = 2,
	UI_CLICK_CHAMP3 = 3,
	UI_CLICK_CHAMP4 = 4,
	UI_CLICK_VIEWPORT = 5,
	UI_CLICK_NAMETAG = 6,
	UI_CLICK_SPELLBOOK_ICON = 7,
	UI_CLICK_CHARACTER_STATS = 8,
	UI_CLICK_INTERACT = 9,
	UI_CLICK_OPEN_POCKETS = 10,
	UI_CLICK_ROTATE_LEFT = 11,
	UI_CLICK_MOVE_FORWARD = 12,
	UI_CLICK_ROTATE_RIGHT = 13,
	UI_CLICK_MOVE_LEFT = 14,
	UI_CLICK_MOVE_BACKWARDS = 15,
	UI_CLICK_MOVE_RIGHT = 16,
	UI_CLICK_ATTACK = 17,
	UI_CLICK_DEFEND = 18,
	UI_CLICK_POCKET_SLOT_1 = 19,
	UI_CLICK_POCKET_SLOT_2 = 20,
	UI_CLICK_POCKET_SLOT_3 = 21,
	UI_CLICK_POCKET_SLOT_4 = 22,
	UI_CLICK_POCKET_SLOT_5 = 23,
	UI_CLICK_POCKET_SLOT_6 = 24,
	UI_CLICK_POCKET_SLOT_7 = 25,
	UI_CLICK_POCKET_SLOT_8 = 26,
	UI_CLICK_POCKET_SLOT_9 = 27,
	UI_CLICK_POCKET_SLOT_10 = 28,
	UI_CLICK_POCKET_SLOT_11 = 29,
	UI_CLICK_POCKET_SLOT_12 = 30,
	UI_CLICK_POCKET_CHARACTER_0 = 31,
	UI_CLICK_POCKET_CHARACTER_1 = 32,
	UI_CLICK_POCKET_CHARACTER_2 = 33,
	UI_CLICK_POCKET_CHARACTER_3 = 34,
	UI_CLICK_POCKET_HAND = 35,
	UI_CLICK_POCKET_BACK = 36,
	UI_CLICK_PAUSE = 37,
	UI_CLICK_SAVE = 38,
	UI_CLICK_SLEEP = 39,
	UI_CLICK_BACK = 40,
	UI_CLICK_TOGGLEUP = 41,
	UI_CLICK_TOGGLEDOWN = 42,
	UI_CLICK_CHAMP_FRONT_LEFT = 43,
	UI_CLICK_CHAMP_FRONT_RIGHT = 44,
	UI_CLICK_CHAMP_BACK_LEFT = 45,
	UI_CLICK_CHAMP_BACK_RIGHT = 46,
	UI_CLICK_CLOSE_SCRIPT = 47,
	UI_CLICK_CLOSE_SPELLBOOK = 48,
	UI_CLICK_PLAYERS_AREA = 49,
	UI_CLICK_PORTAL_SHELF_TOP = 50,
	UI_CLICK_PORTAL_SHELF_BOTTOM = 51,
	UI_CLICK_PORTAL_SWITCH = 52,
	UI_CLICK_PORTAL_DOOR = 53,
	UI_CLICK_PORTAL_ITEM_LEFT_CLOSE = 54,
	UI_CLICK_PORTAL_ITEM_RIGHT_CLOSE = 55,
	UI_CLICK_PORTAL_ITEM_LEFT_BACK = 56,
	UI_CLICK_PORTAL_ITEM_RIGHT_BACK = 57,
	UI_CLICK_PORTAL_WOODEN_DOOR = 58,
	UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL = 59,
	UI_CLICK_PORTAL_FAIRY_CHAOS_SPELL = 60,
	UI_CLICK_PORTAL_FAIRY_DRAGON_SPELL = 61,
	UI_CLICK_PORTAL_FAIRY_MOON_SPELL = 62,
	UI_CLICK_PORTAL_FAIRY_BACK = 63,
	UI_CLICK_PORTAL_FAIRY_TEXTAREA_0 = 64,
	UI_CLICK_PORTAL_FAIRY_TEXTAREA_1 = 65,
	UI_CLICK_SPELLBOOK_TURNPAGE_BACK = 66,
	UI_CLICK_SPELLBOOK_TURNPAGE_FORWARD = 67,
	UI_CLICK_SPELLBOOK_SPELL_0 = 68,
	UI_CLICK_SPELLBOOK_SPELL_1 = 69,
	UI_CLICK_SPELLBOOK_SPELL_2 = 70,
	UI_CLICK_SPELLBOOK_SPELL_3 = 71,
	UI_CLICK_SPELLBOOK_SPELL_4 = 72,
	UI_CLICK_SPELLBOOK_SPELL_5 = 73,
	UI_CLICK_SPELLBOOK_SPELL_6 = 74,
	UI_CLICK_SPELLBOOK_SPELL_7 = 75,
	UI_CLICK_SPELLBOOK_SPELL_FIRE_1 = 76,
	UI_CLICK_SPELLBOOK_SPELL_FIRE_2 = 77,
	UI_CLICK_SPELLBOOK_SPELL_COST_UP = 78,
	UI_CLICK_SPELLBOOK_SPELL_COST_DOWN = 79,
	UI_CLICK_START_ONE_PLAYER = 80,
	UI_CLICK_START_TWO_PLAYER = 81,
	UI_CLICK_START_QUICK_ONE_PLAYER = 82,
	UI_CLICK_START_QUICK_TWO_PLAYER = 83,
        UI_CLICK_COMMUNICATION_AREA = 84,
        UI_CLICK_COMMUNICATION_AREA_FIRST_ROW = 85,
        UI_CLICK_COMMUNICATION_AREA_SECOND_ROW = 86,
        UI_CLICK_COMMUNICATION_AREA_THIRD_ROW = 87,
        UI_CLICK_COMMUNICATION_AREA_FORTH_ROW = 88;

var UI_REDRAW_ALL = 0,
	UI_REDRAW_LEFT = 1,
	UI_REDRAW_RIGHT = 2,
	UI_REDRAW_STATS = 3,
	UI_REDRAW_POCKETS = 4,
	UI_REDRAW_SPELLBOOK = 5,
	UI_REDRAW_COMMAND = 6,
	UI_REDRAW_TEXTBAR = 7;

var FONT_ALIGNMENT_LEFT = 0,
	FONT_ALIGNMENT_CENTER = 1,
	FONT_ALIGNMENT_RIGHT = 2;

var KEYPAD_4 = 100,
	KEYPAD_5 = 101,
	KEYPAD_6 = 102,
	KEYPAD_7 = 103,
	KEYPAD_8 = 104,
	KEYPAD_9 = 105,
	KEY_END = 96,
	KEYPAD_PLUS = 107,
	KEY_L = 76,
	KEY_T = 84,
	KEY_SPACEBAR = 32,
	KEY_G = 71,
	KEY_W = 87,
	KEY_S = 83,
	KEY_A = 65,
	KEY_D = 68,
	KEY_Q = 81,
	KEY_E = 69,
	KEY_R = 82,
	KEY_F = 70,
        KEY_1 = 49,
        KEY_2 = 50,
        KEY_3 = 51,
        KEY_4 = 52,
	KEY_5 = 53,
	KEY_6 = 54,
	KEY_7 = 55,
	KEY_8 = 56,
	KEY_9 = 57,
	KEY_0 = 48,
	KEY_MINUS = 189,
	KEY_PLUS = 187;

//items
var item = new Array();
var itemGfxD = new Array();
var itemRef = new Array(109);

var POCKET_LEFT_HAND = 0,
	POCKET_RIGHT_HAND = 1,
	POCKET_TORSO = 2,
	POCKET_SHIELD = 3,
	POCKET_SLOT_0 = 4,
	POCKET_SLOT_1 = 5,
	POCKET_SLOT_2 = 6,
	POCKET_SLOT_3 = 7,
	POCKET_SLOT_4 = 8,
	POCKET_SLOT_5 = 9,
	POCKET_SLOT_6 = 10,
	POCKET_SLOT_7 = 11,
	POCKET_GLOVES = 12;

var ITEM_NONE = 0,
	ITEM_COIN = 1,
	ITEM_KEY = 2;

var ITEM_TYPE_EMPTY = 0,
	ITEM_TYPE_STACKABLE = 1,
	ITEM_TYPE_FOOD = 2,
	ITEM_TYPE_POTION = 3,
	ITEM_TYPE_ARMOUR = 4,
	ITEM_TYPE_SHIELD = 5,
	ITEM_TYPE_GLOVES = 6,
	ITEM_TYPE_WEAPON = 7,
	ITEM_TYPE_RIP = 8,
	ITEM_TYPE_KEY = 9,
	ITEM_TYPE_WAND = 10,
	ITEM_TYPE_BOW = 11,
	ITEM_TYPE_PERMIT = 12,
	ITEM_TYPE_CRYSTAL = 13,
	ITEM_TYPE_GEM = 14,
	ITEM_TYPE_RING = 15,
	ITEM_TYPE_BOOK = 16,
	ITEM_TYPE_SCROLL = 17;

//messages
var TEXT_DOOR_LOCKED = "THE DOOR IS LOCKED",
	TEXT_ARMOUR = "ARMOUR",
	TEXT_LEVEL = "LEVEL",
	TEXT_ST = "ST",
	TEXT_AG = "AG",
	TEXT_IN = "IN",
	TEXT_CH = "CH",
	TEXT_HP = "HP",
	TEXT_VI = "VI",
	TEXT_SP_PTS = "SP.PTS",
	TEXT_HITS_FOR = "HITS FOR ",
	TEXT_MISSES = "MISSES",
	TEXT_DEFENDS = "DEFENDS",
	TEXT_THOU = "THOU",
	TEXT_ART_DEAD = "ART DEAD",
	TEXT_GAINED_LEVEL = " GAINED A LEVEL",
	TEXT_THOU_ART = "THOU ART",
	TEXT_ASLEEP = "ASLEEP",
	TEXT_PAUPER = "I FIND THEE A PAUPER",
	TEXT_SPELL_FAILED = "SPELL FAILED",
	TEXT_COST_TOO_HIGH = "COST TOO HIGH",
	TEXT_CHAMPION_NAME = ["BLODWYN", "MURLOCK", "ELEANOR", "ROSANNE", "ASTROTH", "ZOTHEN", "BALDRICK", "ELFRIC", "SIR EDWARD", "MEGRIM", "SETHRA", "MR. FLAY", "ULRICH", "ZASTAPH", "HENGIST", "THAI CHANG"],
	TEXT_CHAMPION_LASTNAME = ["STONEMAIDEN", "DARKENHEART", "OF AVALON", "SWIFTHAND", "SLAEMWORT", "RUNECASTER", "THE DUNG", "FALAENDOR", "LION", "OF MOONWYCH", "BHOAGHAIL", "SEPULCRAST", "STERNAXE", "MANTRIC", "MELDANASH", "OF YINN"],
	TEXT_SPELL_NAME = [
		"ARMOUR",
		"PARALYZE",
		"COMPASS",
		"LEVITATE",
		"WARPOWER",
		"RENEW",
		"ARC BOLT",
		"FORMWALL",
		"DEFLECT",
		"TERROR",
		"ANTIMAGE",
		"SPELLTAP",
		"ALCHEMY",
		"SUMMON",
		"VIVIFY",
		"DISRUPT",
		"MISSILE",
		"MAGELOCK",
		"VITALISE",
		"DISPELL",
		"FIREBALL",
		"FIREPATH",
		"RECHARGE",
		"BLAZE",
		"BEGUILE",
		"CONFUSE",
		"CONCEAL",
		"TRUEVIEW",
		"VANISH",
		"ILLUSION",
		"MINDROCK",
		"WYCHWIND"
	],
	TEXT_SPELL_BOOK = [
		"MARY",
		"ZEDN",
		"ISCR",
		"ITWE",
		"UDDU",
		"MIST",
		"NISH",
		"ACOU",

		"ANEE",
		"HADA",
		"RAWU",
		"APWH",
		"OWTE",
		"PLEO",
		"ILLH",
		"ITHO",

		"TNER",
		"ITWE",
		"LITT",
		"AVIN",
		"UGHT",
		"TOTY",
		"DDUN",
		"FLIN",

		"LELA",
		"COZZ",
		"RRAG",
		"WHYA",
		"EWAN",
		"PETH",
		"ESQX",
		"IDFI"
	],
	TEXT_SPELL_DESCRIPTION = [
		"WEAR THIS SPELL WITH PRIDE",
		"A FROZEN LIFE MAY WELL BE A SHORT ONE",
		"NEVER GET LOST AGAIN",
		"A GENUINELY LIGHT SPELL",
		"YOU TOO CAN HAVE THE STRENGTH OF TEN",
		"CURES EVERYTHING EXCEPT CRAMP",
		"AN ELECTRIFYING EXPERIENCE",
		"FOR THOSE WHO LOVE WALLS",
		"A SPELL A DAY KEEPS AN ARROW AWAY",
		"BOO!",
		"NEVERMORE WORRY ABOUT SPELLCASTERS",
		"THE BANE OF ALL MAGIC USERS",
		"THE HAND OF MIDAS",
		"YOU'LL NEVER WALK ALONE",
		"MAKES DEATH BUT A MINOR INCONVENIENCE",
		"KNOWN TO SOME AS DEATHSTRIKE",
		"ONE IN THE EYE FOR ARCHERS",
		"WHY BOTHER WITH ALL THOSE SILLY KEYS?",
		"YOU'LL NEVER FEEL SO GOOD",
		"WHAT MAGIC MAKES, MAGIC CAN DESTROY",
		"A BLAST AT PARTIES",
		"LAY DOWN THE RED CARPET",
		"BOOSTS THE FLATTEST OF RINGS!",
		"NONE SHALL PASS THIS FIERY BLAST",
		"COAT THY TONGUE WITH SILVER!",
		"THEY WON'T KNOW WHAT HIT THEM",
		"WHAT CANNOT BE SEEN CANNOT BE STOLEN",
		"NEVER AGAIN LOSE AT HIDE AND SEEK",
		"NOW YOU SEE ME...NOW YOU DON'T",
		"REAL ENOUGH TO HURT!",
		"FOR THOSE WHO THINK THEY LOVE WALLS",
		"JUST BLOW THEM AWAY"
	],
        TEXT_COMMUNICATION = {MAIN: ["COMMUNICATE","COMMEND","VIEW","WAIT","CORRECT","DISMISS","CALL"],
                              COMMUNICATE_0: ["RECRUIT","IDENTIFY","INQUIRY","WHEREABOUTS"],
                              COMMUNICATE_1: ["TRADING","SMALLTALK","YES","NO","BRIBE","THREAT"],
                              IDENTIFY: ["WHO GOES?","THY TRADE?","NAME SELF","REVEAL SELF"],
                              INQUIRY: ["FOLK LORE","MAGIC ITEMS","OBJECTS","PERSONS"],
                              TRADING: ["OFFER","PURCHASE","EXCHANGE","SELL"],
                              SMALLTALK: ["PRAISE","CURSE","BOAST","RETORT"]
                         },

	scrollData = null;

var COMMUNICATION_PAGE_MAIN = 0,
        COMMUNICATION_PAGE_COMMUNICATE_0 = 1,
        COMMUNICATION_PAGE_COMMUNICATE_1 = 2,
        COMMUNICATION_PAGE_IDENTIFY = 3,
        COMMUNICATION_PAGE_INQUITY = 4,
        COMMUNICATION_PAGE_TRADING = 5,
        COMMUNICATION_PAGE_SMALLTALK = 6,
        COMMUNICATION_PAGE_NAMES = 7;

//Dungeon Items
var DUNGEON_ITEM_POTION = 0,
	DUNGEON_ITEM_RIP = 1,
	DUNGEON_ITEM_SMALL_SHIELD = 2,
	DUNGEON_ITEM_KEY = 3,
	DUNGEON_ITEM_COIN = 4,
	DUNGEON_ITEM_AMOUR = 5,
	DUNGEON_ITEM_APPLE = 6,
	DUNGEON_ITEM_BISCUIT = 7,
	DUNGEON_ITEM_CHICKEN = 8,
	DUNGEON_ITEM_SWORD = 9,
	DUNGEON_ITEM_AXE = 10,
	DUNGEON_ITEM_BOW = 11,
	DUNGEON_ITEM_CROSS_BOW = 12,
	DUNGEON_ITEM_ARROW = 13,
	DUNGEON_ITEM_STAFF = 14,
	DUNGEON_ITEM_DAGGER = 15,
	DUNGEON_ITEM_LARGE_SHIELD = 16,
	DUNGEON_ITEM_DRINK = 17,
	DUNGEON_ITEM_RING = 18,
	DUNGEON_ITEM_GEM = 19,
	DUNGEON_ITEM_GLOVE = 20,
	DUNGEON_ITEM_PERMIT = 21,
	DUNGEON_ITEM_BOOK_OF_SKULLS = 22,
	DUNGEON_ITEM_BONE = 23,
	DUNGEON_ITEM_WAND = 24,
	DUNGEON_ITEM_NEGG = 25,
	DUNGEON_ITEM_APPLE_HALF = 26;

//Bloodwych Items
var ITEM_EMPTY = 0,
	ITEM_COINAGE = 1,
	ITEM_COMMON_KEYS = 2,
	ITEM_ARROWS = 3,
	ITEM_ELF_ARROWS = 4,
	ITEM_APPLE_1 = 5,
	ITEM_APPLE_2 = 6,
	ITEM_APPLE = 7,
	ITEM_BISCUIT_1 = 8,
	ITEM_BISCUIT_2 = 9,
	ITEM_BISCUIT = 10,
	ITEM_CHICKEN_1 = 11,
	ITEM_CHICKEN_2 = 12,
	ITEM_CHICKEN = 13,
	ITEM_MEAD_1 = 14,
	ITEM_MEAD_2 = 15,
	ITEM_MEAD = 16,
	ITEM_WATER_1 = 17,
	ITEM_WATER_2 = 18,
	ITEM_WATER = 19,
	ITEM_NEGG_GREEN = 20,
	ITEM_NEGG_BLUE = 21,
	ITEM_NEGG_RED = 22,
	ITEM_SERPENT_SLIME = 23,
	ITEM_BRIMSTONE_BROTH = 24,
	ITEM_DRAGON_ALE = 25,
	ITEM_MOON_ELIXIR = 26,
	ITEM_LEATHER_ARMOUR = 27,
	ITEM_CHAIN_MAIL = 28,
	ITEM_PLATE_MAIL = 29,
	ITEM_MITHRIL_CHAIN = 30,
	ITEM_MITHRIL_PLATE = 31,
	ITEM_ADAMANT_CHAIN = 32,
	ITEM_ADAMANT_PLATE = 33,
	ITEM_CRYSTAL_CHAIN = 34,
	ITEM_CRYSTAL_PLATE = 35,
	ITEM_LEATHER_SHIELD = 36,
	ITEM_BUCKLER = 37,
	ITEM_RUNE_SHIELD = 38,
	ITEM_LARGE_SHIELD = 39,
	ITEM_MOON_SHIELD = 40,
	ITEM_DRAGON_SCALE = 41,
	ITEM_WAR_SHIELD = 42,
	ITEM_CHAOS_GLOVES = 43,
	ITEM_BATTLE_GLOVES = 44,
	ITEM_MITHRIL_GLOVES = 45,
	ITEM_ADAMANT_GLOVES = 46,
	ITEM_CRYSTAL_GLOVES = 47,
	ITEM_DAGGER = 48,
	ITEM_STEALTH_BLADE = 49,
	ITEM_SHORT_SWORD = 50,
	ITEM_LONG_SWORD = 51,
	ITEM_MITHRIL_SWORD = 52,
	ITEM_FLESHBANE = 53,
	ITEM_DEMON_BLADE = 54,
	ITEM_ACE_OF_SWORDS = 55,
	ITEM_BATTLE_AXE = 56,
	ITEM_MITHRIL_AXE = 57,
	ITEM_TROLLS_AXE = 58,
	ITEM_BRAINBITER = 59,
	ITEM_DEATHBRINGER = 60,
	ITEM_STAFF = 61,
	ITEM_BATTLE_STAFF = 62,
	ITEM_POWER_STAFF = 63,
	ITEM_BLODWYN_RIP = 64,
	ITEM_MURLOCK_RIP = 65,
	ITEM_ELEANOR_RIP = 66,
	ITEM_ROSANNE_RIP = 67,
	ITEM_ASTROTH_RIP = 68,
	ITEM_ZOTHEN_RIP = 69,
	ITEM_BALDRICK_RIP = 70,
	ITEM_ELFRIC_RIP = 71,
	ITEM_SIR_EDWARD_RIP = 72,
	ITEM_MEGRIM_RIP = 73,
	ITEM_SETHRA_RIP = 74,
	ITEM_MR_FLAY_RIP = 75,
	ITEM_ULRICH_RIP = 76,
	ITEM_ZASTAPH_RIP = 77,
	ITEM_HENGIST_RIP = 78,
	ITEM_THAI_CHANG_RIP = 79,
	ITEM_BRONZE_KEY = 80,
	ITEM_IRON_KEY = 81,
	ITEM_SERPENT_KEY = 82,
	ITEM_CHAOS_KEY = 83,
	ITEM_DRAGON_KEY = 84,
	ITEM_MOON_KEY = 85,
	ITEM_CHROMATIC_KEY = 86,
	ITEM_SERPENT_WAND = 87,
	ITEM_CHAOS_WAND = 88,
	ITEM_DRAGON_WAND = 89,
	ITEM_MOON_WAND = 90,
	ITEM_HEAL_WAND = 91,
	ITEM_LONG_BOW = 92,
	ITEM_FROST_BOW = 93,
	ITEM_CROSS_BOW = 94,
	ITEM_PERMIT = 95,
	ITEM_SERPENT_CRYSTAL = 96,
	ITEM_CHAOS_CRYSTAL = 97,
	ITEM_DRAGON_CRYSTAL = 98,
	ITEM_MOON_CRYSTAL = 99,
	ITEM_GREY_GEM = 100,
	ITEM_BLUISH_GEM = 101,
	ITEM_BROWN_GEM = 102,
	ITEM_TAN_GEM = 103,
	ITEM_GREY_RING = 104,
	ITEM_SERPENT_RING = 105,
	ITEM_CHAOS_RING = 106,
	ITEM_DRAGON_RING = 107,
	ITEM_MOON_RING = 108,
	ITEM_BOOK_OF_SKULLS = 109;

//spells
var spell = new Array();
var dungeonSpellTimer = 0;
var dungeonSpellList = new Array();
var activeSpellTimer = 0;
var SPELL_MAX = 8;

//Serpent spells
var SPELL_ARMOUR = 0,
	SPELL_PARALYZE = 1,
	SPELL_COMPASS = 2,
	SPELL_LEVITATE = 3,
	SPELL_WARPOWER = 4,
	SPELL_RENEW = 5,
	SPELL_ARC_BOLT = 6,
	SPELL_FORMWALL = 7,

	//Chaos spells
	SPELL_DEFLECT = 8,
	SPELL_TERROR = 9,
	SPELL_ANTIMAGE = 10,
	SPELL_SPELLTAP = 11,
	SPELL_ALCHEMY = 12,
	SPELL_SUMMON = 13,
	SPELL_VIVIFY = 14,
	SPELL_DISRUPT = 15,

	//Dragon spells
	SPELL_MISSILE = 16,
	SPELL_MAGELOCK = 17,
	SPELL_VITALISE = 18,
	SPELL_DISPELL = 19,
	SPELL_FIREBALL = 20,
	SPELL_FIREPATH = 21,
	SPELL_RECHARGE = 22,
	SPELL_BLAZE = 23,

	//Moon spells
	SPELL_BEGUILE = 24,
	SPELL_CONFUSE = 25,
	SPELL_CONCEAL = 26,
	SPELL_TRUEVIEW = 27,
	SPELL_VANISH = 28,
	SPELL_ILLUSION = 29,
	SPELL_MINDROCK = 30,
	SPELL_WYCHWIND = 31;

//projectiles
var projectile = new Array();
var projectileTimer = 0;

var DUNGEON_PROJECTILE_BIG = 27,
	DUNGEON_PROJECTILE_EXPLODE = 28,
	DUNGEON_PROJECTILE_ARROW = 29;
