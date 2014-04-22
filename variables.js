//Setup some global Varibles for needed
var scale = 3;
var debug = true;
var debugHigh = false;
var game;
var DIRECTION = 0,
    DISTANCE = 0,
    TYPE = 0,
    COLOUR = 0;

//Flags for determining whether some asycnhronous file calls were succesfully loaded (see fileloader.js "getFileData")
var gameGfxLoaded = {
    monsterHeads: false,
    monsterLegs: false,
    monsterArms: false,
    monsterTorsos: false
};
var towerDataLoaded = {
    floor: false,
    switches: false,
    triggers: false,
    monsters: false,
    champions: false
};

//Constants
var CLASS_SERP = 0,
    CLASS_DRAG = 1,
    CLASS_MOON = 2,
    CLASS_CHAOS = 3;

var COLOUR_WHITE = [224, 224, 224, 255],
    COLOUR_GREY_LIGHT = [160, 160, 160, 255],
    COLOUR_GREY_MEDIUM = [128, 128, 128, 255],
    COLOUR_GREY_DARK = [96, 96, 96, 255],
    COLOUR_GREY_DARKEST = [64, 64, 64, 255],
    COLOUR_GREEN = [0, 192, 0, 255],
    COLOUR_GREEN_DARK = [0, 128, 0, 255],
    COLOUR_BLUE = [64, 128, 224, 255],
    COLOUR_BLUE_DARK = [32, 32, 224, 255],
    COLOUR_YELLOW = [224, 192, 0, 255],
    COLOUR_ORANGE = [224, 128, 96, 255],
    COLOUR_BROWN = [160, 64, 32, 255],
    COLOUR_RED = [208, 0, 0, 255],
    COLOUR_RED_DARK = [128, 32, 0, 255],
    COLOUR_BLACK = [0, 0, 0, 255],
    COLOUR_TRANSPARENT = [0, 0, 0, 0];

var COLOUR_DOOR_NORMAL = 0,
    COLOUR_DOOR_BRONZE = 1,
    COLOUR_DOOR_IRON = 2,
    COLOUR_DOOR_SERPENT = 3,
    COLOUR_DOOR_CHAOS = 4,
    COLOUR_DOOR_DRAGON = 5,
    COLOUR_DOOR_MOON = 6,
    COLOUR_DOOR_CHROMATIC = 7,
    COLOUR_DOOR_VOID = 8;

var COLOUR_DECO_SERPENT = 0,
    COLOUR_DECO_CHAOS = 1,
    COLOUR_DECO_DRAGON = 2,
    COLOUR_DECO_MOON = 3,
    COLOUR_DECO_BRONZE = 4,
    COLOUR_DECO_IRON = 5,
    COLOUR_DECO_BROWN = 6,
    COLOUR_DECO_TAN = 7,
    COLOUR_DECO_BLACK = 8;


var IMAGE_CHA_HEAD = 0,
	IMAGE_CHA_TORSO = 1,
	IMAGE_CHA_ARM = 3,
	IMAGE_CHA_LEG = 2;

var IMAGE_CHA_DISTANCE_1 = 0,
	IMAGE_CHA_DISTANCE_2 = 1,
	IMAGE_CHA_DISTANCE_3 = 2,
	IMAGE_CHA_DISTANCE_4 = 3;

var NUMBER_OF_DISTANCES = 12,
	NUMBER_OF_HEADS = 19,
	NUMBER_OF_TORSOS = 4,
	NUMBER_OF_LEGS = 4,
	NUMBER_OF_ARMS = 1,
	NUMBER_OF_COLORS = 9;

//Character body part types
var CHA_HEAD_ASTROTH = 0,
	CHA_HEAD_SETHRA = 1,
	CHA_HEAD_MR_FLAY = 2,
	CHA_HEAD_BALDRICK = 3,
	CHA_HEAD_ZENDIK = 4,
	CHA_HEAD_ZASTAPH = 5,
	CHA_HEAD_ROSEANNE = 6,
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
	CHA_TORSO_MALE_CHEST = 1,
	CHA_TORSO_MALE_CHAIN = 2,
	CHA_TORSO_SKELETON = 3,
	CHA_TORSO_FEMALE_NAKED = 4,
	CHA_TORSO_FEMALE_CHEST = 5;

var CHA_ARM_MALE = 0,
	CHA_ARM_SKELETON = 1,
	CHA_ARM_FEMALE = 2;

var CHA_LEG_MALE_CLOTH = 0,
	CHA_LEG_MALE_ARMOUR = 1,
	CHA_LEG_SKELETON = 2,
	CHA_LEG_FEMALE_NAKED = 3,
	CHA_LEG_DEMON = 4,
	CHA_LEG_FEMALE_DRESS = 5,
	CHA_LEG_FEMALE_CHEST = 6,
	CHA_LEG_FEMALE_CHAIN = 7,
	CHA_LEG_FEMALE_CLOTH = 8;

//REMOVE LATER:
var PALETTE_YEL1_GRN1_GRN2_GRY4 = 0,
    PALETTE_GRN1_GRN2_GRN1_GRN1 = 1,
    PALETTE_3 = 2,
    PALETTE_4 = 3,
    PALETTE_5 = 4,
    PALETTE_6 = 5,
    PALETTE_7 = 6,
    PALETTE_8 = 7,
    PALETTE_9 = 8,
    PALETTE_10 = 9,
    PALETTE_11 = 10,
    PALETTE_12 = 11,
    PALETTE_13 = 12,
    PALETTE_14 = 13,
    PALETTE_15 = 14,
    PALETTE_16 = 15,
    PALETTE_17 = 16,
    PALETTE_18 = 17,
    PALETTE_19 = 18,
    PALETTE_20 = 19,
    PALETTE_21 = 20,
    PALETTE_22 = 21,
    PALETTE_23 = 22,
    PALETTE_24 = 23,
    PALETTE_25 = 24,
    PALETTE_26 = 25,
    PALETTE_27 = 26,
    PALETTE_28 = 27,
    PALETTE_29 = 28;

var DIRECTION_NORTH = 0,
    DIRECTION_EAST = 1,
    DIRECTION_SOUTH = 2,
    DIRECTION_WEST = 3;

var CHAR_DISTANCE_CLOSE = 0,
    CHAR_DISTANCE_MID = 1,
    CHAR_DISTANCE_FAR = 2,
    CHAR_DISTANCE_DISTANT = 3;

var CHAR_SOLO = 0,
    CHAR_FRONT_LEFT = 1,
    CHAR_FRONT_RIGHT = 2;

var Maps = ["MOD0", "MOON", "CHAOS", "DRAGON", "ZENDIK", "SERP", "BWEXTTW1", "BWEXTTW2", "BWEXTTW3", "BWEXTTW4", "horace_mod0", "horace_moon", "horace_drag", "horace_serp", "horace_zendik", "horace_chaos"];

//Background gfx
var CurrentMap = 0;
var background = new Array();
background[0] = new Array(0, 0, 128, 76, 0, 0);
background[1] = new Array(128, 0, 128, 76, 0, 0);

//Touch Screen Stuff
var canvas_x;
var canvas_y;

//Champions
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

//Monsters
var MON_SPIDER = 16,
	MON_CRAB = 17;

//[COLOUR_RED, COLOUR_BLUE,   COLOUR_GREY_LIGHT,      COLOUR_BLACK]
var MON_PALETTE_DEFAULT = [COLOUR_RED, COLOUR_BLUE, COLOUR_GREY_LIGHT, COLOUR_BLACK];

var monsterPalette = new Array();
monsterPalette[CHA_BLODWYN] = {
	head: CHA_HEAD_BLODWYN,
	torso: CHA_TORSO_FEMALE_NAKED,
	arm: CHA_ARM_MALE,
	leg: CHA_LEG_FEMALE_NAKED,
	headPalette: [COLOUR_BLACK, COLOUR_BLUE, COLOUR_GREY_LIGHT, COLOUR_WHITE],
	torsoPalette: [COLOUR_GREY_MEDIUM, COLOUR_BLUE, COLOUR_GREY_LIGHT, COLOUR_WHITE],
	armPalette: [COLOUR_WHITE, COLOUR_GREY_LIGHT, COLOUR_BLUE, COLOUR_GREY_LIGHT],
	legPalette: [COLOUR_GREY_MEDIUM, COLOUR_BLUE, COLOUR_GREY_LIGHT, COLOUR_WHITE]
};

var monsterMax = 0;
var monster = new Array();

