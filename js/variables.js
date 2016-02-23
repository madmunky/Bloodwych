//General
var god = true;
var debug = true;
var mapEnabled = false;
var iosDebug = false;
var showFPS = false;
var game;
var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
if(isMobile) {
    debug = true;
}

//Preloader stuff
var preload = new createjs.LoadQueue(false);
var defaultManifest;

//Declare Arrays for the Graphics
var gfxPos;
var gfx = [];
window.player = new Array();
window.tower = new Array();
var cursorType = 0;
var champSelectGrid = [];
var gameStateSelectGrid = [];
var players = 0;
var currentPlayer = 0;
var paused = false;
var pausedByBrowser = false;
var checkStarted = true;
var resumeLoadGame = false;
var gfxStage = 0;
var startMenu = true;
//var BOS = false;
var WalkThroughWalls = false;

//Setup some global variables for needed
var VERSION = 0.50;
var versionThis = 0.50;
var Types = {};
var gameStarted = false;
var scale = 3;
var scaleReal = scale;
var debugWindow;
var game;
var characterGfx = [null, null, null, null, null];
var characterImages = [];
var testDistance = 0;
var testDirection = 0;
var testPalette = 0;
var timerMaster = 0;
var timerMonsterMove = 0;
var timerChampionStats = 0;
var cutpurseTrueview = 0;
var towerSwitchesData = new Array();
var gemSwitchesData = new Array();
var crystalSwitchesData = new Array();
var armourData = new Array();
var monsterItemData = [];
var loadingInterval = 0;
var gfxUI = [];
var font;
var uiClickArea = [];
var redrawPlayerUiFlag = 0;
var audioFiles = [];
var gameType = GAME_BLOODWYCH;
var spriteData = [];
var jsonLoaded = false;
//var DataLocationPrefix;

//GAME MODES
var GAME_BLOODWYCH = 0,
    GAME_EXTENDED_LEVELS = 1,
    GAME_BOOK_OF_SKULLS = 2,
    GAME_CUSTOM = 3;
var GAME_ID = ['BW', 'EXT', 'BOS', 'CUSTOM'];

//sounds
var soundEnabled = true;
var SOUND_NONE = 0,
    SOUND_DOOR = 1,
    SOUND_ATTACK = 2,
    SOUND_FLASH = 3,
    SOUND_DEATH = 4,
    SOUND_EXPLODE = 5,
    SOUND_SWITCH = 6,
    SOUND_PCMUSIC = 7;

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
var jsonDataLoaded = 0;

var colourData = [];
colourData['BLACK'] = [0, 0, 0, 255];
colourData['GREY_DARKEST'] = [64, 64, 64, 255];
colourData['GREY_DARK'] = [96, 96, 96, 255];
colourData['GREY_MEDIUM'] = [128, 128, 128, 255];
colourData['GREY_LIGHT'] = [160, 160, 160, 255];
colourData['GREEN_DARK'] = [32, 144, 32, 255];
colourData['GREEN'] = [16, 192, 16, 255];
colourData['BLUE_DARK'] = [0, 0, 224, 255];
colourData['BLUE'] = [64, 128, 224, 255];
colourData['RED_DARK'] = [128, 32, 16, 255];
colourData['BROWN'] = [160, 64, 32, 255];
colourData['PINK'] = [224, 144, 96, 255];
colourData['RED'] = [208, 0, 0, 255];
colourData['YELLOW'] = [224, 192, 0, 255];
colourData['WHITE'] = [224, 224, 224, 255];
colourData['TRANSPARENT'] = [0, 0, 0, 0];

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
    COLOUR_SWITCH_BROWN = 5,
    COLOUR_SWITCH_BLACK = 6;

var COLOUR_GEM_SERPENT = 0,
    COLOUR_GEM_CHAOS = 1,
    COLOUR_GEM_DRAGON = 2,
    COLOUR_GEM_MOON = 3,
    COLOUR_GEM_GREY = 4,
    COLOUR_GEM_BLUEISH = 5,
    COLOUR_GEM_BROWN = 6,
    COLOUR_GEM_TAN = 7;

var CLASS_SERPENT = 0,
    CLASS_CHAOS = 1,
    CLASS_DRAG = 2,
    CLASS_MOON = 3,
    CLASS_ANCIENT = 4;

var COLOUR_FLOOR_SWITCH = 0,
    COLOUR_FLOOR_FIRE = 1,
    COLOUR_FLOOR_FIRE_DIM = 2;

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

var paletteData = [];
paletteData['PLAYER'] = [];
paletteData['PLAYER'][0] = [colourData['WHITE'], colourData['BLUE'], colourData['BLUE_DARK']];
paletteData['PLAYER'][1] = [colourData['WHITE'], colourData['RED'], colourData['RED_DARK']];

paletteData['CLASS'] = new Array();
paletteData['CLASS'][CLASS_SERPENT] = colourData['GREEN'],
paletteData['CLASS'][CLASS_CHAOS] = colourData['YELLOW'],
paletteData['CLASS'][CLASS_DRAG] = colourData['RED'],
paletteData['CLASS'][CLASS_MOON] = colourData['BLUE'],
paletteData['CLASS'][CLASS_ANCIENT] = colourData['PINK'];

paletteData['SERPENT'] = new Array(colourData['GREY_LIGHT'], colourData['WHITE'], colourData['GREEN'], colourData['GREEN_DARK'], colourData['GREEN'], colourData['WHITE']),
paletteData['MOON'] = new Array(colourData['GREY_LIGHT'], colourData['WHITE'], colourData['BLUE'], colourData['BLUE_DARK'], colourData['BLUE'], colourData['WHITE']),
paletteData['DRAGON'] = new Array(colourData['GREY_LIGHT'], colourData['YELLOW'], colourData['PINK'], colourData['RED'], colourData['RED'], colourData['WHITE']),
paletteData['CHAOS'] = new Array(colourData['GREY_LIGHT'], colourData['WHITE'], colourData['YELLOW'], colourData['PINK'], colourData['YELLOW'], colourData['WHITE']),
paletteData['DEAD'] = new Array(colourData['BLACK'], colourData['GREY_MEDIUM'], colourData['GREY_DARK'], colourData['GREY_DARKEST']),
paletteData['SELECTED'] = new Array(colourData['BLACK'], colourData['WHITE'], colourData['GREY_LIGHT'], colourData['GREY_MEDIUM']),
paletteData['SERPENT_ARROW'] = new Array(colourData['YELLOW'], colourData['GREEN'], colourData['GREEN_DARK'], colourData['GREY_DARK'], colourData['YELLOW'], colourData['GREEN']),
paletteData['MOON_ARROW'] = new Array(colourData['WHITE'], colourData['WHITE'], colourData['BLUE'], colourData['BLUE_DARK'], colourData['BLACK'], colourData['BLUE_DARK']),
paletteData['DRAGON_ARROW'] = new Array(colourData['WHITE'], colourData['YELLOW'], colourData['PINK'], colourData['RED']),
paletteData['CHAOS_ARROW'] = new Array(colourData['WHITE'], colourData['WHITE'], colourData['YELLOW'], colourData['PINK'], colourData['PINK'], colourData['YELLOW']),
paletteData['BRONZE_ARROW'] = new Array(colourData['PINK'], colourData['BROWN'], colourData['BROWN'], colourData['RED_DARK']),
paletteData['GREEN_ARROW'] = new Array(colourData['GREEN'], colourData['GREEN_DARK'], colourData['GREY_DARK'], colourData['GREY_DARKEST']),
paletteData['GOLD_ARROW'] = new Array(colourData['WHITE'], colourData['YELLOW'], colourData['PINK'], colourData['BROWN'], colourData['BROWN'], colourData['YELLOW']),
paletteData['SERPENT_BIG'] = new Array(colourData['GREEN_DARK'], colourData['GREEN'], colourData['YELLOW'], colourData['GREY_DARK'], colourData['GREEN'], colourData['WHITE']),
paletteData['MOON_BIG'] = new Array(colourData['BLUE_DARK'], colourData['BLUE'], colourData['GREEN'], colourData['GREY_DARK'], colourData['BLUE'], colourData['WHITE']),
paletteData['DRAGON_BIG'] = new Array(colourData['RED'], colourData['PINK'], colourData['YELLOW'], colourData['RED_DARK'], colourData['RED'], colourData['WHITE']),
paletteData['CHAOS_BIG'] = new Array(colourData['PINK'], colourData['YELLOW'], colourData['WHITE'], colourData['BROWN'], colourData['YELLOW'], colourData['WHITE']),
paletteData['DISRUPT_BIG'] = new Array(colourData['BLACK'], colourData['BLACK'], colourData['BLACK'], colourData['BLACK'], colourData['YELLOW'], colourData['BLACK']),
paletteData['BLAZE_BIG'] = new Array(colourData['YELLOW'], colourData['PINK'], colourData['RED'], colourData['RED_DARK'], colourData['RED'], colourData['WHITE']),
paletteData['PIT_FLASH'] = new Array(null, null, null, null, colourData['GREY_MEDIUM'], null),
paletteData['TELEPORT_FLASH'] = new Array(null, null, null, null, colourData['WHITE'], colourData['BLACK']),
paletteData['DEFAULT_MON'] = [colourData['BLACK'], colourData['GREY_LIGHT'], colourData['BLUE'], colourData['RED']],
paletteData['DEFAULT_SHIELD'] = new Array([255, 0, 255, 255], colourData['RED'], colourData['GREY_LIGHT'], colourData['BLUE']),
paletteData['DEFAULT_ITEM'] = new Array(colourData['GREEN'], colourData['RED'], colourData['GREY_LIGHT'], colourData['BLUE']),
paletteData['DEFAULT_ITEM_DUN'] = new Array(colourData['RED'], colourData['BLUE'], colourData['GREY_LIGHT'], colourData['BLACK']);

paletteData["switch"] = new Array();
paletteData["switch"]["default"] = [colourData['RED'], colourData['BLUE'], colourData['GREY_LIGHT'], null];
paletteData["switch"]["default-off"] = [colourData['GREY_LIGHT'], colourData['RED'], null, colourData['BLUE']];
paletteData["switch"]["colours"] = new Array();
paletteData["switch"]["colours"][COLOUR_SWITCH_SERPENT] = [colourData['GREEN'], colourData['GREEN_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["switch"]["colours"][COLOUR_SWITCH_CHAOS] = [colourData['YELLOW'], colourData['PINK'], colourData['WHITE'], colourData['BLACK']];
paletteData["switch"]["colours"][COLOUR_SWITCH_DRAGON] = [colourData['RED'], colourData['RED_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["switch"]["colours"][COLOUR_SWITCH_MOON] = [colourData['BLUE'], colourData['BLUE_DARK'], colourData['YELLOW'], colourData['BLACK']];
paletteData["switch"]["colours"][COLOUR_SWITCH_GREY] = [colourData['GREY_MEDIUM'], colourData['GREY_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["switch"]["colours"][COLOUR_SWITCH_BROWN] = [colourData['BROWN'], colourData['RED_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["switch"]["colours"][COLOUR_SWITCH_BLACK] = [colourData['BLACK'], colourData['BLACK'], colourData['BLACK'], colourData['BLACK']];
paletteData["gem"] = new Array();
paletteData["gem"]["default"] = [colourData['RED'], colourData['BLUE'], null, null];
paletteData["gem"]["default-off"] = [null, colourData['BLUE'], null, colourData['RED']];
paletteData["gem"]["colours"] = new Array();
paletteData["gem"]["colours"][COLOUR_GEM_SERPENT] = [colourData['GREEN'], colourData['GREEN_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["gem"]["colours"][COLOUR_GEM_CHAOS] = [colourData['YELLOW'], colourData['PINK'], colourData['WHITE'], colourData['BLACK']];
paletteData["gem"]["colours"][COLOUR_GEM_DRAGON] = [colourData['RED'], colourData['RED_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["gem"]["colours"][COLOUR_GEM_MOON] = [colourData['BLUE'], colourData['BLUE_DARK'], colourData['YELLOW'], colourData['BLACK']];
paletteData["gem"]["colours"][COLOUR_GEM_GREY] = [colourData['GREY_MEDIUM'], colourData['GREY_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["gem"]["colours"][COLOUR_GEM_BLUEISH] = [colourData['GREEN'], colourData['BLUE'], colourData['WHITE'], colourData['BLACK']];
paletteData["gem"]["colours"][COLOUR_GEM_BROWN] = [colourData['BROWN'], colourData['RED_DARK'], colourData['WHITE'], colourData['BLACK']];
paletteData["gem"]["colours"][COLOUR_GEM_TAN] = [colourData['PINK'], colourData['BROWN'], colourData['WHITE'], colourData['BLACK']];
paletteData["deco"] = new Array();
paletteData["deco"]["default"] = [colourData['RED'], colourData['BLUE'], colourData['GREY_LIGHT']];
paletteData["deco"]["colours"] = new Array();
paletteData["deco"]["colours"][COLOUR_DECO_BRONZE] = [colourData['PINK'], colourData['BROWN'], colourData['RED_DARK']];
paletteData["deco"]["colours"][COLOUR_DECO_SERPENT] = [colourData['YELLOW'], colourData['GREEN'], colourData['GREEN_DARK']];
paletteData["deco"]["colours"][COLOUR_DECO_DRAGON] = [colourData['PINK'], colourData['RED'], colourData['RED_DARK']];
paletteData["deco"]["colours"][COLOUR_DECO_MOON] = [colourData['GREY_LIGHT'], colourData['BLUE'], colourData['BLUE_DARK']];
paletteData["deco"]["colours"][COLOUR_DECO_CHAOS] = [colourData['WHITE'], colourData['YELLOW'], colourData['PINK']];
paletteData["deco"]["colours"][COLOUR_DECO_IRON] = [colourData['GREY_LIGHT'], colourData['GREY_MEDIUM'], colourData['GREY_DARK']];
paletteData["deco"]["colours"][COLOUR_DECO_BROWN] = [colourData['YELLOW'], colourData['PINK'], colourData['BROWN']];
paletteData["deco"]["colours"][COLOUR_DECO_TAN] = [colourData['YELLOW'], colourData['PINK'], colourData['RED_DARK']];
paletteData["door"] = new Array();
paletteData["door"]["default"] = colourData['BLUE'];
paletteData["door"]["colours"] = new Array();
paletteData["door"]["colours"][COLOUR_DOOR_NORMAL] = colourData['GREY_DARKEST'];
paletteData["door"]["colours"][COLOUR_DOOR_BRONZE] = colourData['RED_DARK'];
paletteData["door"]["colours"][COLOUR_DOOR_IRON] = colourData['GREY_LIGHT'];
paletteData["door"]["colours"][COLOUR_DOOR_SERPENT] = colourData['GREEN'];
paletteData["door"]["colours"][COLOUR_DOOR_CHAOS] = colourData['YELLOW'];
paletteData["door"]["colours"][COLOUR_DOOR_DRAGON] = colourData['RED'];
paletteData["door"]["colours"][COLOUR_DOOR_MOON] = colourData['BLUE'];
paletteData["door"]["colours"][COLOUR_DOOR_CHROMATIC] = colourData['WHITE'];
paletteData["door"]["colours"][COLOUR_DOOR_VOID] = colourData['BLACK'];
paletteData["floor"] = new Array();
paletteData["floor"]["default"] = [colourData['RED'], colourData['BLUE'], colourData['GREY_LIGHT'], colourData['BLACK']];
paletteData["floor"]["colours"] = new Array();
paletteData["floor"]["colours"][COLOUR_FLOOR_SWITCH] = [colourData['GREEN_DARK'], colourData['GREEN'], colourData['GREY_LIGHT'], colourData['GREY_DARKEST']];
paletteData["floor"]["colours"][COLOUR_FLOOR_FIRE] = [colourData['RED'], colourData['YELLOW'], colourData['PINK'], colourData['RED_DARK']];
paletteData["floor"]["colours"][COLOUR_FLOOR_FIRE_DIM] = [colourData['BROWN'], colourData['YELLOW'], colourData['PINK'], colourData['RED_DARK']];

var OBJECT_NONE = 0,
    OBJECT_PATH = 1,
    OBJECT_PIT = 2,
    OBJECT_CHARACTER = 3,
    OBJECT_PROJECTILE = 4,
    OBJECT_MISC = 5,
    OBJECT_WOOD = 6,
    OBJECT_WALL = 7,
    OBJECT_WOOD_DOOR = 8,
    OBJECT_SHELF = 9,
    OBJECT_SCROLL = 10,
    OBJECT_SWITCH = 11,
    OBJECT_GEM = 12,
    OBJECT_STAIRS = 13,
    OBJECT_DOOR = 14,
    OBJECT_DOOR_OPEN = 15,
    OBJECT_WOOD_DOOR_OPEN = 16;

//Towers
var TOWER_NAME = [];

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
background[0] = {x:0, y:0, w:128, h:76, sx:0, sy:0};
background[1] = {x:128, y:0, w:128, h:76, sx:0, sy:0};

//Touch Screen Stuff
var canvas_x;
var canvas_y;

//CHAMPIONS
var CHAMPION_MAX = 16;

var CHAMPION_ID = [
    'CHA_BLODWYN',
    'CHA_MURLOCK',
    'CHA_ELEANOR',
    'CHA_ROSANNE',
    'CHA_ASTROTH',
    'CHA_ZOTHEN',
    'CHA_BALDRICK',
    'CHA_ELFRIC',
    'CHA_SIR_EDWARD',
    'CHA_MEGRIM',
    'CHA_SETHRA',
    'CHA_MR_FLAY',
    'CHA_ULRICH',
    'CHA_ZASTAPH',
    'CHA_HENGIST',
    'CHA_THAI_CHANG']

var PROFESSION_MAX = 4,
    PROFESSION_WARRIOR = 0,
    PROFESSION_WIZARD = 1,
    PROFESSION_ADVENTURER = 2,
    PROFESSION_CUTPURSE = 3;

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
    CHA_GENDER_FEMALE = 1,
    CHA_GENDER_BLODWYN = 2;

var CHA_GESTURE_NONE = 0,
    CHA_GESTURE_ATTACKING = 1,
    CHA_GESTURE_SPELLCASTING = 2,
    CHA_GESTURE_GREETING = 3;

var MON_TYPE_NORMAL = 0,
    MON_TYPE_CASTER = 1,
    MON_TYPE_DRONE = 2,
    MON_TYPE_DRONE_CASTER = 3,
    MON_TYPE_LAUNCHER = 4,
    MON_TYPE_DROPPER = 8;

var MON_FORM_VENDOR_1 = 21,
    MON_FORM_VENDOR_2 = 22,
    MON_FORM_ZENDIK = 64,
    MON_FORM_ILLUSION = 100,
    MON_FORM_SUMMON = 101,
    MON_FORM_BEHOLDER = 102,
    MON_FORM_ENTITY = 103,
    MON_FORM_CRAB = 104,
    MON_FORM_DRAGON = 105,
    MON_FORM_DRAGON_SMALL = 106,
    MON_FORM_BEHEMOTH = 107;

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

var monsterTeamIdMax = 0;
//var monsterAttackSequence = 0;
window.monster = new Array();
var monsterRef = new Array();
var armourRef = new Array();

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
    SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER = 34, //(SPECIAL CASE) **
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
    SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT = 60, // (X/Y) **
    SWITCH_FLOOR_TELEPORT_MONSTER = 62

var switchName = ["SWITCH_FLOOR_NONE",
    "SWITCH_FLOOR_SPIN_180",
    "SWITCH_FLOOR_SPIN_RANDOM",
    "SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR",
    "SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL",
    "SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL",
    "SWITCH_FLOOR_WOOD_DOOR_CLOSER_1",
    "SWITCH_FLOOR_WOOD_DOOR_CLOSER_2",
    "SWITCH_FLOOR_TRADER_DOOR",
    "SWITCH_FLOOR_TOWER_ENTRANCE_SIDE_PAD",
    "SWITCH_FLOOR_TOWER_ENTRANCE",
    "SWITCH_FLOOR_REMOVE",
    "SWITCH_FLOOR_CLOSE_VOID_LOCK_DOOR",
    "SWITCH_FLOOR_TOGGLE_PILLAR",
    "SWITCH_FLOOR_CREATE_SPINNER",
    "SWITCH_FLOOR_OPEN_CREATE_WALL_WITH_SWITCHES",
    "SWITCH_FLOOR_CREATE_PAD",
    "SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER",
    "SWITCH_FLOOR_CREATE_PILLAR",
    "SWITCH_FLOOR_KEEP_ENTRANCE_SIDEPAD",
    "SWITCH_FLOOR_KEEP_ENTRANCE_CENTRAL_PAD",
    "SWITCH_FLOOR_FLASH_TELEPORT",
    "SWITCH_FLOOR_ROTATE_STONE_WALL",
    "SWITCH_FLOOR_TOGGLE_WALL",
    "SWITCH_FLOOR_SPINNER",
    "SWITCH_FLOOR_CLICK_TELEPORT",
    "SWITCH_FLOOR_TOGGLE_GREEN_PAD",
    "SWITCH_FLOOR_ROTATE_WOOD_WALL_COUNTER_CLOCKWISE",
    "SWITCH_FLOOR_TOGGLE_HOLE",
    "SWITCH_FLOOR_GAME_COMPLETION_PAD",
    "SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT",
    "SWITCH_FLOOR_TELEPORT_MONSTER"];

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
    UI_CENTER_PANEL_VIEWPORT = 8,
    UI_CENTER_PANEL_GAMESTATE_MENU = 9,
    UI_CENTER_PANEL_GAMESTATE_SAVE = 10,
    UI_CENTER_PANEL_GAMESTATE_LOAD = 11,
    UI_CENTER_PANEL_ENDGAME = 12;


var UI_CHARACTER_SELECT_SCROLL = 0,
    UI_CHARACTER_SELECT_POCKET = 1,
    UI_CHARACTER_SELECT_SPELLBOOK = 2,
    UI_CHARACTER_SELECT_START_GAME = 3;

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
    UI_CLICK_COMMUNICATION_AREA_FORTH_ROW = 88,
    UI_CLICK_CHAMPION_SELECT_1_PLAYER_ACTION = 89,
    UI_CLICK_CHAMPION_SELECT_1_START = 90,
    UI_CLICK_START_RESUME_GAME = 91;

var UI_REDRAW_ALL = 0,
    UI_REDRAW_LEFT = 1,
    UI_REDRAW_RIGHT = 2,
    UI_REDRAW_STATS = 3,
    UI_REDRAW_POCKETS = 4,
    UI_REDRAW_SPELLBOOK = 5,
    UI_REDRAW_COMMAND = 6,
    UI_REDRAW_TEXTBAR = 7,
    UI_REDRAW_ACTIVESPELL = 8;

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
    KEY_Y = 89,
    KEY_H = 72,
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
    KEY_PLUS = 187,
    KEY_ESC = 27;

//messages
var TEXT_PLAYER = "PLAYER",
    TEXT_PLURAL = "S",
    TEXT_READY_QUEST = "THOU ART ;NOW READY;TO BEGIN ;THY QUEST",
    TEXT_DOOR_LOCKED = "THE DOOR IS LOCKED",
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
    TEXT_CASTS_SPELL = "CASTS SPELL",
    TEXT_SHOOTS = "SHOOTS",
    TEXT_MISSES = "MISSES",
    TEXT_DEFENDS = "DEFENDS",
    TEXT_THOU = "THOU",
    TEXT_ART_DEAD = "ART DEAD",
    TEXT_GAINED_LEVEL = " GAINED A LEVEL",
    TEXT_THOU_ART = "THOU ART",
    TEXT_ASLEEP = "ASLEEP",
    TEXT_PAUPER = "I FIND THEE A PAUPER",
    TEXT_ALL_I_HAVE = "THOU HAST ALL I GIVE, ",
    TEXT_SELECT_SPELL = "SELECT THY NEW SPELL, ",
    TEXT_MAY_BUY_SPELL = " MAY BUY A SPELL-PICK A CLASS",
    TEXT_SPELL_FAILED = "SPELL FAILED",
    TEXT_SPELL_FIZZLES = "SPELL FIZZLES",
    TEXT_COST_TOO_HIGH = "COST TOO HIGH",
    TEXT_SELECT_CHAMPION = "PLEASE SELECT YOUR CHAMPION  ....",
    TEXT_CHAMPION_NAME = ["BLODWYN", "MURLOCK", "ELEANOR", "ROSANNE", "ASTROTH", "ZOTHEN", "BALDRICK", "ELFRIC", "SIR EDWARD", "MEGRIM", "SETHRA", "MR. FLAY", "ULRICH", "ZASTAPH", "HENGIST", "THAI CHANG"],
    TEXT_CHAMPION_LASTNAME = ["STONEMAIDEN", "DARKENHEART", "OF AVALON", "SWIFTHAND", "SLAEMWORT", "RUNECASTER", "THE DUNG", "FALAENDOR", "LION", "OF MOONWYCH", "BHOAGHAIL", "SEPULCRAST", "STERNAXE", "MANTRIC", "MELDANASH", "OF YINN"],
    TEXT_TRADE = ["WARRIOR", "WIZARD", "ADVENTURER", "CUTPURSE"],
    TEXT_GAME_LOADED = "GAME LOADED",
    TEXT_GAME_SAVED = "GAME SAVED",
    TEXT_INVENTORY = "INVENTORY",
    TEXT_WAITS = " WAITS",
    TEXT_REJOINS_THE_PARTY = " REJOINS THE PARTY",
    TEXT_CONGRATS = "CONGRATULATIONS!",
    TEXT_ACCURSED_BLOODWYCH = "ACCURSED BLOODWYCH! WE SHALL MEET AGAIN";

//communication
var COMMUNICATION_PAGE_MAIN = 0,
    COMMUNICATION_PAGE_COMMUNICATE_0 = 1,
    COMMUNICATION_PAGE_COMMUNICATE_1 = 2,
    COMMUNICATION_PAGE_IDENTIFY = 3,
    COMMUNICATION_PAGE_INQUIRY = 4,
    COMMUNICATION_PAGE_TRADING = 5,
    COMMUNICATION_PAGE_SMALLTALK = 6,
    COMMUNICATION_PAGE_NAMES = 7;

var COMMUNICATION_RECRUIT = 0,
    COMMUNICATION_IDENTIFY = 1,
    COMMUNICATION_INQUIRY = 2,
    COMMUNICATION_WHEREABOUTS = 3,
    COMMUNICATION_TRADING = 0,
    COMMUNICATION_SMALLTALK = 1,
    COMMUNICATION_YES = 2,
    COMMUNICATION_NO = 3,
    COMMUNICATION_BRIBE = 4,
    COMMUNICATION_THREAT = 5,
    COMMUNICATION_WHO_GOES = 0,
    COMMUNICATION_THY_TRADE = 1,
    COMMUNICATION_NAME_SELF = 2,
    COMMUNICATION_REVEAL_SELF = 3,
    COMMUNICATION_FOLK_LORE = 0,
    COMMUNICATION_MAGIC_ITEMS = 1,
    COMMUNICATION_OBJECTS = 2,
    COMMUNICATION_PERSONS = 3,
    COMMUNICATION_OFFER = 0,
    COMMUNICATION_PURCHASE = 1,
    COMMUNICATION_EXCHANGE = 2,
    COMMUNICATION_SELL = 3,
    COMMUNICATION_PRAISE = 0,
    COMMUNICATION_CURSE = 1,
    COMMUNICATION_BOAST = 2,
    COMMUNICATION_RETORT = 3,
    COMMUNICATION_COMMUNICATE = 0,
    COMMUNICATION_COMMEND = 1,
    COMMUNICATION_VIEW = 2,
    COMMUNICATION_WAIT = 3,
    COMMUNICATION_CORRECT = 4,
    COMMUNICATION_DISMISS = 5,
    COMMUNICATION_CALL = 6;

TEXT_COMMUNICATION = [
    ["WHOM DOST THOU WISH TO COMMEND", COMMUNICATION_PAGE_MAIN, COMMUNICATION_COMMEND],
    ["WHOM DOST THOU WISH TO VIEW", COMMUNICATION_PAGE_MAIN, COMMUNICATION_VIEW],
    ["WHOM DOST THOU WISH TO WAIT", COMMUNICATION_PAGE_MAIN, COMMUNICATION_WAIT],
    ["WHOM DOST THOU WISH TO CORRECT", COMMUNICATION_PAGE_MAIN, COMMUNICATION_CORRECT],
    ["WHOM DOST THOU WISH TO DISMISS", COMMUNICATION_PAGE_MAIN, COMMUNICATION_DISMISS],
    ["THOU DOST CALL OUT", COMMUNICATION_PAGE_MAIN, COMMUNICATION_CALL],

    ["THERE IS NOBODY THERE"],
    ["GREETINGS", null, null, 0, 1, 1, 3],
    ["WHY DOST BURDEN ME WITH THY COMPANY?"],
    ["WHO ART THOU?"],
    ["WHAT BE THY BUSINESS?"],

    ["COME JOIN MY MERRY BAND", COMMUNICATION_PAGE_COMMUNICATE_0, COMMUNICATION_RECRUIT, 0, 1, 1, 5],
    ["I THINK NOT MY FRIEND"],
    ["I DON'T KEEP COMPANY WITH MAGGOTS"],
    ["KEEP TALKING AND WE'LL SEE"],
    ["YES"],
    ["THY PARTY IS FULL"],

    ["WHO ART THOU?", COMMUNICATION_PAGE_IDENTIFY, COMMUNICATION_WHO_GOES, 0, 1, 1, 4],
    ["MY NAME IS ", COMMUNICATION_PAGE_IDENTIFY, COMMUNICATION_NAME_SELF, 0, 1, 0, 4, 'name'],
    ["I AM THY WORST NIGHTMARE"],
    ["MY NAME IS NOT IMPORTANT"],
    ["I AM ZENDIK THE MASTER OF CREATION"],

    ["NO", COMMUNICATION_PAGE_COMMUNICATE_1, COMMUNICATION_NO, 0, 1, 1, 1],
    ["INDEED NOT"],

    ["YES", COMMUNICATION_PAGE_COMMUNICATE_1, COMMUNICATION_YES, 0, 1, 4, 4],

    ["WHAT BE THY BUSINESS?", COMMUNICATION_PAGE_IDENTIFY, COMMUNICATION_THY_TRADE, 0, 1, 1, 2],
    ["NONE OF THY BUSINESS I'M SURE"],
    ["I AM A NOBLE ", COMMUNICATION_PAGE_IDENTIFY, COMMUNICATION_REVEAL_SELF, 0, 1, 0, 5, 'prof'],
    ["THAT'S VERY POSSIBLE", COMMUNICATION_PAGE_SMALLTALK, COMMUNICATION_RETORT, 0, 4, 0, 4],
    ["I CANNOT BUT AGREE"],
    ["THAT SEEMS VERY LIKELY"],
    ["I'M NOT ABOUT TO ARGUE WITH THEE"],

    ["WHERE IS THIS OF WHICH THOU HAST SPOKEN?", COMMUNICATION_PAGE_COMMUNICATE_0, COMMUNICATION_WHEREABOUTS, 0, 1, 1, 1],
    ["LOOK TO THE TOWERS MY FRIEND"],

    ["HAST HEARD OF ANY POWERFUL BEINGS?", COMMUNICATION_PAGE_INQUIRY, COMMUNICATION_PERSONS, 0, 1, 1, 1],
    ["NEWS IS SCARCE IN THESE PARTS"],

    ["KNOWEST THOU OF ANY WEAPONS OF NOTE?", COMMUNICATION_PAGE_INQUIRY, COMMUNICATION_OBJECTS, 0, 1, 1, 1],
    ["WHO CAN SAY WHAT IS OF NOTE?"],

    ["KNOWEST THOU OF ANY ENCHANTED ITEMS?", COMMUNICATION_PAGE_INQUIRY, COMMUNICATION_MAGIC_ITEMS, 0, 1, 1, 1],
    ["I HEAR CRYSTALS ARE WORTH SEEKING"],

    ["HAST THOU HEARD ANY LEGENDS?", COMMUNICATION_PAGE_INQUIRY, COMMUNICATION_FOLK_LORE, 0, 1, 1, 1],
    ["I HEAR ZENDIK IS NOT WHOLLY A WORM"],

    [
        [
            ["STEP ASIDE ", "DEPART ", "GO AWAY ", "BEGONE "],
            ["", "OR FIGHT ", "OR BE SORRY ", "OR SUFFER ", "OR DIE "],
            ["THOU BUMBLEFOOT", "THOU OAF", "THOU CLOD", "THOU TOAD", "THOU MAGGOT", "THOU SLUG", "THOU ZOMBIE", "THOU COWARD", "NOBLE ONE"]
        ], COMMUNICATION_PAGE_COMMUNICATE_1, COMMUNICATION_THREAT, 0, 1, 0, 1
    ],

    [
        [
            ["THOU "],
            ["FIGHTS ", "TALKS ", "SOUNDS ", "BEHAVES ", "LOOKS ", "APPEARS ", "SEEMS ", "ART "],
            ["LIKE ", ""],
            ["A STRONG ", "A BRAVE ", "A POWERFUL ", "A NOBLE ", "A WISE ", "A FINE ", "A SPLENDID ", "AN AWESOME ", ""],
            ["WARRIOR", "SAGE", "HERO", "LEADER", "MASTER", "FRIEND", "SCHOLAR", "EXPERT"]
        ], COMMUNICATION_PAGE_SMALLTALK, COMMUNICATION_PRAISE, 0, 2, 0, 2
    ],
    [
        [
            ["THOU "],
            ["FIGHTS ", "TALKS ", "SOUNDS ", "BEHAVES ", "LOOKS ", "APPEARS ", "SEEMS ", "ART "],
            ["STRANGELY ", "MIGHTILY ", "HUGELY ", "INCREDIBLY ", "ESPECIALLY ", "IMMENSELY ", "ODDLY ", ""],
            ["STRONG", "BRAVE", "POWERFUL", "NOBLE", "WISE", "FINE", "SPLENDID", "AWESOME"]
        ]
    ],

    ["WILT THOU ACCEPT SOME SMALL TOKEN?", COMMUNICATION_PAGE_COMMUNICATE_1, COMMUNICATION_BRIBE, 0, 1, 1, 4],
    ["WOULDST THOU RIP ME OFF"],
    ["METHINKS THOU ART TOO GREEDY"],
    ["I NEVER TRUST THE UNNATURAL"],
    ["MAKE ME THY OFFER"],

    ["*** OFFER FOR ", COMMUNICATION_PAGE_TRADING, COMMUNICATION_OFFER, 0, 1, 1, 4, 'item'], //TEST THIS ONE!!
    ["THY COINAGE IS WORTHLESS TO ME"],
    ["I DO NOT TRADE IN TRINKETS"],
    ["I NEED NOT THY TRASH"],
    ["I TRUST THIS PLEASES THEE"],

    ["*** PURCHASE", COMMUNICATION_PAGE_TRADING, COMMUNICATION_PURCHASE, 0, 1, 1, 4], //TEST THIS ONE!!
    ["THY COINAGE IS WORTHLESS TO ME"],
    ["I DO NOT TRADE IN TRINKETS"],
    ["I NEED NOT THY TRASH"],
    ["I TRUST THIS PLEASES THEE"],

    ["*** EXCHANGE", COMMUNICATION_PAGE_TRADING, COMMUNICATION_EXCHANGE, 0, 1, 1, 4], //TEST THIS ONE!!
    ["THY COINAGE IS WORTHLESS TO ME"],
    ["I DO NOT TRADE IN TRINKETS"],
    ["I NEED NOT THY TRASH"],
    ["I TRUST THIS PLEASES THEE"],

    ["*** SELL", COMMUNICATION_PAGE_TRADING, COMMUNICATION_SELL, 0, 1, 1, 4, 'item'], //TEST THIS ONE!!
    ["THY COINAGE IS WORTHLESS TO ME"],
    ["I DO NOT TRADE IN TRINKETS"],
    ["I NEED NOT THY TRASH"],
    ["I TRUST THIS PLEASES THEE"],

    //Uncategorized
    ["MAYBE TRUE BUT THOU SHOULD BE SO LUCKY"],
    ["I AM THY WORST NIGHTMARE"],
    ["PICK ON SOMEONE THY OWN SIZE THOU SLUG"],
    ["GIVE ME A BREAK"]
],

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
    "WYCHWIND",

    "PROTECT",
    "PHASE",
    "ENHANCE",
    "INFERNO",
    "NULLIFY",
    "SPRAY",
    "VORTEX",
    "RESTORE"
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
    "IDFI",

    "WISH",
    "BONE",
    "RULE",
    "THEW",
    "ORLD",
    "ANDT",
    "HATS",
    "TRUE"
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
    "JUST BLOW THEM AWAY",

    //Extended Level SPELLS
    "A GUARANTEED ALL-IN-ONE INSURANCE",
    "TELEPORT YOUR WAY INTO TROUBLE",
    "THE INSTANT SUPER-HERO",
    "A BALL OF FRIENDLY FIERY FUN",
    "DISPELL AT A DISTANCE",
    "UNLEASH THE FULL FURY OF CHAOS",
    "A MAELSTROM OF TOTAL DISASTER",
    "A SECOND CHANCE FOR THE WEALTHY"
];
var scrollData = null;

var TEXT_COMMUNICATION_COMMANDS = [
    [{
        text: "COMMUNICATE",
        row: 0,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_COMMUNICATE_0
    }, {
        text: "COMMEND",
        row: 1,
        width: 59,
        left: true,
        to: COMMUNICATION_PAGE_NAMES
    }, {
        text: "VIEW",
        row: 1,
        width: 33,
        left: false,
        to: COMMUNICATION_PAGE_NAMES
    }, {
        text: "WAIT",
        row: 2,
        width: 35,
        left: true,
        to: COMMUNICATION_PAGE_NAMES
    }, {
        text: "CORRECT",
        row: 2,
        width: 57,
        left: false,
        to: COMMUNICATION_PAGE_NAMES,
        back: null
    }, {
        text: "DISMISS",
        row: 3,
        width: 59,
        left: true,
        to: COMMUNICATION_PAGE_NAMES
    }, {
        text: "CALL",
        row: 3,
        width: 33,
        left: false,
        to: COMMUNICATION_PAGE_NAMES
    }],
    [{
        text: "RECRUIT",
        row: 0,
        width: 93,
        left: true,
        to: null
    }, {
        text: "IDENTIFY",
        row: 1,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_IDENTIFY
    }, {
        text: "INQUIRY",
        row: 2,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_INQUIRY
    }, {
        text: "WHEREABOUTS",
        row: 3,
        width: 93,
        left: true,
        to: null
    }],
    [{
        text: "TRADING",
        row: 0,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_TRADING
    }, {
        text: "SMALLTALK",
        row: 1,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_SMALLTALK
    }, {
        text: "YES",
        row: 2,
        width: 43,
        left: true,
        to: null
    }, {
        text: "NO",
        row: 2,
        width: 49,
        left: false,
        to: null
    }, {
        text: "BRIBE",
        row: 3,
        width: 43,
        left: true,
        to: null
    }, {
        text: "THREAT",
        row: 3,
        width: 49,
        left: false,
        to: null
    }],
    [{
        text: "WHO GOES?",
        row: 0,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_COMMUNICATE_0
    }, {
        text: "THY TRADE?",
        row: 1,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_COMMUNICATE_0
    }, {
        text: "NAME SELF",
        row: 2,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_COMMUNICATE_0
    }, {
        text: "REVEAL SELF",
        row: 3,
        width: 93,
        left: true,
        to: COMMUNICATION_PAGE_COMMUNICATE_0
    }],
    [{
        text: "FOLK LORE",
        row: 0,
        width: 93,
        left: true,
        to: null
    }, {
        text: "MAGIC ITEMS",
        row: 1,
        width: 93,
        left: true,
        to: null
    }, {
        text: "OBJECTS",
        row: 2,
        width: 93,
        left: true,
        to: null
    }, {
        text: "PERSONS",
        row: 3,
        width: 93,
        left: true,
        to: null
    }],
    [{
        text: "OFFER",
        row: 0,
        width: 93,
        left: true,
        to: null
    }, {
        text: "PURCHASE",
        row: 1,
        width: 93,
        left: true,
        to: null
    }, {
        text: "EXCHANGE",
        row: 2,
        width: 93,
        left: true,
        to: null
    }, {
        text: "SELL",
        row: 3,
        width: 93,
        left: true,
        to: null
    }],
    [{
        text: "PRAISE",
        row: 0,
        width: 93,
        left: true,
        to: null
    }, {
        text: "CURSE",
        row: 1,
        width: 93,
        left: true,
        to: null
    }, {
        text: "BOAST",
        row: 2,
        width: 93,
        left: true,
        to: null
    }, {
        text: "RETORT",
        row: 3,
        width: 93,
        left: true,
        to: null
    }],
    [{
        text: "",
        row: 0,
        width: 93,
        left: true,
        to: null
    }, {
        text: "",
        row: 1,
        width: 93,
        left: true,
        to: null
    }, {
        text: "",
        row: 2,
        width: 93,
        left: true,
        to: null
    }, {
        text: "",
        row: 3,
        width: 93,
        left: true,
        to: null
    }]
];


var UI_GFX_ID = ['UI_GFX_POCKET_EMPTY',
    'UI_GFX_POCKET_COIN',
    'UI_GFX_POCKET_COMMON_KEY',
    'UI_GFX_POCKET_ARROW',
    'UI_GFX_POCKET_ELF_ARROW',
    'UI_GFX_POCKET_GEM_GREY',
    'UI_GFX_POCKET_GEM_SERPENT',
    'UI_GFX_POCKET_GEM_CHAOS',
    'UI_GFX_POCKET_GEM_DRAGON',
    'UI_GFX_POCKET_GEM_MOON',
    'UI_GFX_POCKET_RING',
    'UI_GFX_POCKET_POTION',
    'UI_GFX_POCKET_KEY',
    'UI_GFX_POCKET_STAFF',
    'UI_GFX_POCKET_WAND',
    'UI_GFX_POCKET_SHIELD_1',
    'UI_GFX_POCKET_SHIELD_2',
    'UI_GFX_POCKET_SHIELD_3',
    'UI_GFX_POCKET_SHIELD_4',
    'UI_GFX_POCKET_SHIELD_5',
    'UI_GFX_POCKET_SHIELD_6',
    'UI_GFX_POCKET_SHIELD_7',
    'UI_GFX_POCKET_AMOUR_LEATHER',
    'UI_GFX_POCKET_AMOUR_CHAIN',
    'UI_GFX_POCKET_AMOUR_PLATE',
    'UI_GFX_POCKET_PERMIT',
    'UI_GFX_POCKET_HAND_LEFT_AMOUR',
    'UI_GFX_POCKET_HAND_RIGHT_AMOUR',
    'UI_GFX_POCKET_DAGGER',
    'UI_GFX_POCKET_RING_SHINNY',
    'UI_GFX_POCKET_SHORT_SWORD',
    'UI_GFX_POCKET_GEM_GREENISH',
    'UI_GFX_POCKET_GEM_BROWN',
    'UI_GFX_POCKET_GEM_TAN',
    'UI_GFX_POCKET_SWORD_1',
    'UI_GFX_POCKET_SWORD_2',
    'UI_GFX_POCKET_SWORD_3',
    'UI_GFX_POCKET_SWORD_4',
    'UI_GFX_POCKET_SWORD_5',
    'UI_GFX_POCKET_AXE_1',
    'UI_GFX_POCKET_AXE_2',
    'UI_GFX_POCKET_AXE_3',
    'UI_GFX_POCKET_AXE_4',
    'UI_GFX_POCKET_BOW',
    'UI_GFX_POCKET_CROSS_BOW',
    'UI_GFX_POCKET_APPLE_1',
    'UI_GFX_POCKET_APPLE_2',
    'UI_GFX_POCKET_APPLE_3',
    'UI_GFX_POCKET_BISCUIT_1',
    'UI_GFX_POCKET_BISCUIT_2',
    'UI_GFX_POCKET_BISCUIT_3',
    'UI_GFX_POCKET_CHICKEN_1',
    'UI_GFX_POCKET_CHICKEN_2',
    'UI_GFX_POCKET_CHICKEN_3',
    'UI_GFX_POCKET_NEGG',
    'UI_GFX_POCKET_WATER_1',
    'UI_GFX_POCKET_WATER_2',
    'UI_GFX_POCKET_WATER_3',
    'UI_GFX_POCKET_BONES',
    'UI_GFX_DUMMY',
    'UI_GFX_ICON_SPELL_ARMOUR',
    'UI_GFX_ICON_SPELL_DEFLECT',
    'UI_GFX_ICON_SPELL_WARPOWER',
    'UI_GFX_ICON_SPELL_VANISH',
    'UI_GFX_ICON_SPELL_COMPASS_NORTH',
    'UI_GFX_ICON_SPELL_COMPASS_EAST',
    'UI_GFX_ICON_SPELL_COMPASS_SOUTH',
    'UI_GFX_ICON_SPELL_COMPASS_WEST',
    'UI_GFX_ICON_SPELL_LEVITATE',
    'UI_GFX_ICON_SPELL_ANTIMAGE',
    'UI_GFX_ICON_SPELL_TRUEVIEW',
    'UI_GFX_ICON_SPELL_7',
    'UI_GFX_POCKET_GLOVE',
    'UI_GFX_POCKET_BLANK',
    'UI_GFX_POCKET_SLECTION',
    'UI_GFX_POCKET_0',
    'UI_GFX_POCKET_1',
    'UI_GFX_POCKET_2',
    'UI_GFX_POCKET_3',
    'UI_GFX_ICON_SPELL_0',
    'UI_GFX_ICON_SPELL_1',
    'UI_GFX_ICON_SPELL_2',
    'UI_GFX_ICON_SPELL_3',
    'UI_GFX_ICON_SPELL_4',
    'UI_GFX_ICON_SPELL_BOOK_DRAGON_LEFT',
    'UI_GFX_ICON_SPELL_BOOK_LEFT',
    'UI_GFX_ICON_SPELL_BOOK_RIGHT',
    'UI_GFX_ICON_SPELL_BOOK_DRAGON_RIGHT',
    'UI_GFX_POCKET_EMPTY_LEFT_HAND',
    'UI_GFX_POCKET_EMPTY_RIGHT_HAND',
    'UI_GFX_POCKET_EMPTY_ARMOUR',
    'UI_GFX_POCKET_EMPTY_LARGE_SHIELD',
    'UI_GFX_POCKET_EMPTY_SMALL_SHIELD',
    'UI_GFX_ICON_PAUSE',
    'UI_GFX_ICON_SAVE',
    'UI_GFX_ICON_SLEEP',
    'UI_GFX_ICON_BOOKOFSKULLS',
    'UI_GFX_ICON_UNKNOWN',
    'UI_GFX_ICON_POCKETS',
    'UI_GFX_ICON_OPENDOOR',
    'UI_GFX_ICON_BACK',
    'UI_GFX_ICON_SCROLL_UP',
    'UI_GFX_ICON_SCROLL_DOWN',
    'UI_GFX_ICON_SPELL_8',
    'UI_GFX_ICON_SPELL_9',
    'UI_GFX_ICON_SPELL_10',
    'UI_GFX_ICON_SPELL_11',
    'UI_GFX_ICON_SPELL_12',
    'UI_GFX_ICON_SPELL_13',
    'UI_GFX_ICON_SPELL_14',
    'UI_GFX_ICON_SPELL_15',
    'UI_GFX_ICON_SPELL_16',
    'UI_GFX_ICON_SELECTED',
    'UI_GFX_SPELLBOOK_0',
    'UI_GFX_SPELLBOOK_1',
    'UI_GFX_SPELLBOOK_2',
    'UI_GFX_SPELLBOOK_3',
    'UI_GFX_SPELLBOOK_4',
    'UI_GFX_SHIELD',
    'UI_GFX_ICON_SPELLBOOK',
    'UI_GFX_ICON_SCROLL',
    'UI_GFX_ICON_ATTACK',
    'UI_GFX_CHAIN_VERT',
    'UI_GFX_STATSBOX',
    'UI_GFX_ICON_ARROWS_RED',
    'UI_GFX_ICON_ARROWS_BLUE',
    'UI_GFX_SHIELD_FILLED',
    'UI_GFX_CHAIN_LONG',
    'UI_GFX_CHARACTER_BOX',
    'UI_GFX_POCKETBOX',
    'UI_GFX_NAME_BLUE',
    'UI_GFX_NAME_RED',
    'UI_GFX_SHIELD_RED',
    'UI_GFX_SHIELD_BLUE',
    'UI_GFX_PORTRAITS',
    'UI_GFX_GRAY_BAR',
    'UI_GFX_SHIELD_CHARACTERS',
    'UI_GFX_SHIELD_TYPES',
    'UI_GFX_SHIELD_BOTTOM',
    'UI_GFX_SHIELD_TOP',
    'UI_GFX_SCRIPT',
    'UI_GFX_FAIRIES',
    'UI_GFX_FOOD_POINTER',
    'UI_GFX_MOVEMENT_0',
    'UI_GFX_MOVEMENT_1',
    'UI_GFX_MOVEMENT_2',
    'UI_GFX_MOVEMENT_3',
    'UI_GFX_MOVEMENT_4',
    'UI_GFX_MOVEMENT_5',
    'UI_GFX_CHARACTER_NAME_BLUE',
    'UI_GFX_CHARACTER_NAME_RED',
    'UI_GFX_CHARACTER_BOXES',
    'UI_GFX_CHARACTER_SCROLL',
    'UI_GFX_SCROLL_WAVE',
    //DATA DISK ITEMS
    'UI_GFX_ICON_SPELL_5',
    'UI_GFX_POCKET_RUNE_SHIELD',
    'UI_GFX_POCKET_WAR_SHIELD',
    'UI_GFX_POCKET_DEMON_SCALE',
    'UI_GFX_POCKET_BATTLE_SOUL',
    'UI_GFX_POCKET_CHROMATIC_PLATE',
    'UI_GFX_POCKET_ADAMANT_SWORD',
    'UI_GFX_POCKET_FLESHBANE',
    'UI_GFX_POCKET_DEMON_BLADE',
    'UI_GFX_POCKET_RUNE_SWORD',
    'UI_GFX_POCKET_SOUL_SUCKER',
    'UI_GFX_POCKET_ADAMANT_AXE',
    'UI_GFX_POCKET_BATTLE_AXE',
    'UI_GFX_POCKET_OGRES_AXE',
    'UI_GFX_POCKET_DEATHBRINGER',
    'UI_GFX_POCKET_DRAGON_AXE',
    'UI_GFX_POCKET_GREY_AXE',
    'UI_GFX_ICON_SPELL_PROTECT',
    'UI_GFX_ICON_SPELL_ENHANCE'
]

//Dungeon Items
var DUNGEON_GFX_ID = [
    'ITEM_POTION',
    'ITEM_RIP',
    'ITEM_SMALL_SHIELD',
    'ITEM_KEY',
    'ITEM_COIN',
    'ITEM_AMOUR',
    'ITEM_APPLE',
    'ITEM_BISCUIT',
    'ITEM_CHICKEN',
    'ITEM_SWORD',
    'ITEM_AXE',
    'ITEM_BOW',
    'ITEM_CROSS_BOW',
    'ITEM_ARROW',
    'ITEM_STAFF',
    'ITEM_DAGGER',
    'ITEM_LARGE_SHIELD',
    'ITEM_DRINK',
    'ITEM_RING',
    'ITEM_GEM',
    'ITEM_GLOVE',
    'ITEM_PERMIT',
    'ITEM_BOOK_OF_SKULLS',
    'ITEM_BONE',
    'ITEM_WAND',
    'ITEM_NEGG',
    'ITEM_APPLE_HALF',
    'PROJECTILE_BIG',
    'PROJECTILE_EXPLODE',
    'PROJECTILE_ARROW',
    'NONE',
    'PROJECTILE_SPHERE'
]

//items
var itemJson = [];
var item = new Array();
var itemGfxD = [];

var POCKET_MAX = 13,
    POCKET_LEFT_HAND = 0,
    POCKET_RIGHT_HAND = 1,
    POCKET_ARMOUR = 2,
    POCKET_SHIELD = 3,
    POCKET_SLOT_0 = 4,
    POCKET_SLOT_1 = 5,
    POCKET_SLOT_2 = 6,
    POCKET_SLOT_3 = 7,
    POCKET_SLOT_4 = 8,
    POCKET_SLOT_5 = 9,
    POCKET_SLOT_6 = 10,
    POCKET_SLOT_7 = 11,
    POCKET_GLOVES = 12,
    POCKET_HIDDEN = 13; //hidden stash (for RIP, food, keys, arrows or coinage)

var DOOR_COMMON = 0,
    DOOR_BRONZE = 1,
    DOOR_IRON = 2,
    DOOR_SERPENT = 3,
    DOOR_CHAOS = 4,
    DOOR_DRAGON = 5,
    DOOR_MOON = 6,
    DOOR_CHROMATIC = 7;

var itemDropsJson = [];
/*var MON_ITEM_DROPS = new Array();
MON_ITEM_DROPS[0] = ['ITEM_COINAGE', 'ITEM_COMMON_KEYS', 'ITEM_ARROWS', 'ITEM_APPLE_1', 'ITEM_APPLE_2', 'ITEM_APPLE', 'ITEM_BISCUIT_1', 'ITEM_BISCUIT_2', 'ITEM_BISCUIT', 'ITEM_MEAD_1', 'ITEM_MEAD_2', 'ITEM_MEAD', 'ITEM_WATER_1', 'ITEM_WATER_2', 'ITEM_WATER', 'ITEM_CHICKEN_1', 'ITEM_CHICKEN_2', 'ITEM_CHICKEN'];
MON_ITEM_DROPS[1] = ['ITEM_COINAGE', 'ITEM_COMMON_KEYS', 'ITEM_ARROWS', 'ITEM_ELF_ARROWS', 'ITEM_APPLE', 'ITEM_BISCUIT', 'ITEM_MEAD', 'ITEM_WATER', 'ITEM_CHICKEN', 'ITEM_NEGG_GREEN'];
MON_ITEM_DROPS[2] = ['ITEM_COINAGE', 'ITEM_COMMON_KEYS', 'ITEM_ARROWS', 'ITEM_ELF_ARROWS', 'ITEM_APPLE', 'ITEM_BISCUIT', 'ITEM_MEAD', 'ITEM_WATER', 'ITEM_CHICKEN', 'ITEM_NEGG_GREEN', 'ITEM_NEGG_BLUE'];
MON_ITEM_DROPS[3] = ['ITEM_COINAGE', 'ITEM_COMMON_KEYS', 'ITEM_ARROWS', 'ITEM_ELF_ARROWS', 'ITEM_NEGG_GREEN', 'ITEM_NEGG_BLUE', 'ITEM_NEGG_RED'];
MON_ITEM_DROPS[4] = ['ITEM_ACE_OF_SWORDS'];
MON_ITEM_DROPS[5] = ['ITEM_CHROMATIC_KEY'];*/

//spells
var spell = new Array();
var dungeonSpellTimer = 0;
var dungeonSpellList = new Array();
//var activeSpellTimer = 0;
var SPELL_LEVEL_MAX = 8,
    SPELL_COLOUR_MAX = 5,
    SPELL_PAGE_MAX = 5;

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
    SPELL_WYCHWIND = 31,

    //Ancient spells
    SPELL_PROTECT = 32,
    SPELL_PHASE = 33,
    SPELL_ENHANCE = 34,
    SPELL_INFERNO = 35,
    SPELL_NULLIFY = 36,
    SPELL_SPRAY = 37,
    SPELL_VORTEX = 38,
    SPELL_RESTORE = 39;

//Exceptional spells
SPELL_BLAZE_BALL = 40;

//projectiles
var projectile = new Array();
/*var DUNGEON_PROJECTILE_BIG = 27,
    DUNGEON_PROJECTILE_EXPLODE = 28,
    DUNGEON_PROJECTILE_ARROW = 29,
    DUNGEON_NONE = 30,
    DUNGEON_PROJECTILE_SPHERE = 31;*/

var championSelect = [{
    champID: -1,
    chosen: false,
    mode: UI_CHARACTER_SELECT_SCROLL
}, {
    champID: -1,
    chosen: false,
    mode: UI_CHARACTER_SELECT_SCROLL
}];

//armour palettes
//var paletteData['DEFAULT_MON'] = [colourData['BLACK'], colourData['GREY_LIGHT'], colourData['BLUE'], colourData['RED']],
var	CLASS_ARMOUR = [
    [colourData['GREEN_DARK'], colourData['GREEN'], null, colourData['GREEN']],
    [colourData['PINK'], colourData['YELLOW'], null, colourData['YELLOW']],
    [colourData['RED_DARK'], colourData['RED'], colourData['RED'], colourData['RED']],
    [colourData['BLUE_DARK'], colourData['BLUE'], null, colourData['BLUE']]
];

var CHA_ARMOUR = [
    //Leather
    [
        //Male
        [
            //Legs
            [colourData['RED_DARK'], colourData['BROWN'], colourData['PINK'], colourData['PINK']],
            //Torso
            [colourData['RED_DARK'], colourData['BROWN'], colourData['PINK'], null],
            //Arms
            [null, colourData['RED_DARK'], colourData['BROWN'], colourData['PINK']],
            //Minis
            [null, colourData['RED_DARK'], colourData['BROWN'], colourData['RED_DARK']]
        ],
        //Female
        [
            [null, null, null, null],
            [colourData['RED_DARK'], colourData['BROWN'], colourData['PINK'], null],
            [null, null, null, null],
            [colourData['RED_DARK'], colourData['RED_DARK'], null, colourData['BROWN']]
        ],
        //Blodwyn
        [
            [colourData['PINK'], colourData['BROWN'], colourData['RED_DARK'], colourData['PINK']],
            [colourData['PINK'], colourData['BROWN'], colourData['RED_DARK'], colourData['PINK']],
            [null, colourData['RED_DARK'], colourData['BROWN'], colourData['PINK']],
            [null, colourData['BROWN'], colourData['RED_DARK'], colourData['RED_DARK']]
        ]
    ],

    //Chain Mail
    [
        [
            [null, colourData['GREY_LIGHT'], colourData['GREY_DARK'], null],
            [null, colourData['GREY_LIGHT'], colourData['GREY_DARK'], null],
            [null, colourData['GREY_DARK'], colourData['GREY_LIGHT'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['GREY_LIGHT'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['GREY_LIGHT'], null, null],
            [colourData['GREY_DARK'], colourData['GREY_LIGHT'], colourData['WHITE'], null],
            [null, null, null, null],
            [null, colourData['GREY_LIGHT'], null, colourData['WHITE']]
        ],
        [
            [colourData['WHITE'], colourData['GREY_LIGHT'], colourData['GREY_DARK'], colourData['WHITE']],
            [colourData['WHITE'], colourData['GREY_LIGHT'], colourData['GREY_DARK'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['GREY_LIGHT'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['GREY_LIGHT'], colourData['GREY_LIGHT']]
        ]
    ],

    //Plate Mail
    [
        [
            [null, colourData['GREY_LIGHT'], colourData['GREY_LIGHT'], null],
            [null, colourData['GREY_LIGHT'], colourData['GREY_LIGHT'], null],
            [null, colourData['GREY_MEDIUM'], colourData['GREY_LIGHT'], colourData['WHITE']],
            [null, colourData['GREY_MEDIUM'], colourData['GREY_LIGHT'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['GREY_LIGHT'], null, colourData['RED']],
            [colourData['GREY_MEDIUM'], colourData['GREY_LIGHT'], colourData['WHITE'], null],
            [null, colourData['GREY_MEDIUM'], colourData['GREY_MEDIUM'], colourData['GREY_LIGHT']],
            [null, colourData['GREY_LIGHT'], null, null]
        ],
        [
            [colourData['WHITE'], colourData['GREY_LIGHT'], colourData['GREY_MEDIUM'], colourData['WHITE']],
            [colourData['WHITE'], colourData['GREY_LIGHT'], colourData['GREY_MEDIUM'], colourData['WHITE']],
            [null, colourData['GREY_MEDIUM'], colourData['GREY_LIGHT'], colourData['WHITE']],
            [null, colourData['GREY_MEDIUM'], colourData['GREY_LIGHT'], colourData['GREY_LIGHT']]
        ]
    ],

    //Mithril Chain
    [
        [
            [null, colourData['BLUE'], colourData['GREY_DARK'], null],
            [null, colourData['BLUE'], colourData['GREY_DARK'], null],
            [null, colourData['BLUE_DARK'], colourData['BLUE'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['BLUE'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['BLUE'], null, null],
            [colourData['BLUE_DARK'], colourData['BLUE'], colourData['WHITE'], null],
            [null, null, null, null],
            [null, colourData['BLUE'], null, colourData['WHITE']]
        ],
        [
            [colourData['WHITE'], colourData['BLUE'], colourData['GREY_DARK'], colourData['WHITE']],
            [colourData['WHITE'], colourData['BLUE'], colourData['GREY_DARK'], colourData['BLUE_DARK']],
            [null, colourData['GREY_DARK'], colourData['BLUE'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['BLUE'], colourData['GREY_LIGHT']]
        ]
    ],

    //Mithril Plate
    [
        [
            [null, colourData['BLUE'], colourData['BLUE'], null],
            [null, colourData['BLUE'], colourData['BLUE'], null],
            [null, colourData['BLUE'], colourData['BLUE'], colourData['WHITE']],
            [null, colourData['BLUE_DARK'], colourData['BLUE'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['BLUE'], null, colourData['RED']],
            [colourData['BLUE_DARK'], colourData['BLUE'], colourData['WHITE'], null],
            [null, colourData['BLUE_DARK'], colourData['BLUE_DARK'], colourData['BLUE']],
            [null, colourData['BLUE'], null, null]
        ],
        [
            [colourData['WHITE'], colourData['BLUE'], colourData['BLUE_DARK'], colourData['WHITE']],
            [colourData['WHITE'], colourData['BLUE'], colourData['BLUE_DARK'], colourData['BLUE_DARK']],
            [null, colourData['BLUE_DARK'], colourData['BLUE'], colourData['WHITE']],
            [null, colourData['BLUE_DARK'], colourData['BLUE'], colourData['GREY_LIGHT']]
        ]
    ],

    //Adamant Chain
    [
        [
            [null, colourData['GREEN'], colourData['GREY_DARK'], null],
            [null, colourData['GREEN'], colourData['GREY_DARK'], null],
            [null, colourData['GREEN_DARK'], colourData['GREEN'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['GREEN'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['GREEN'], null, null],
            [colourData['GREEN_DARK'], colourData['GREEN'], colourData['WHITE'], null],
            [null, null, null, null],
            [null, colourData['GREEN'], null, colourData['WHITE']]
        ],
        [
            [colourData['WHITE'], colourData['GREEN'], colourData['GREY_DARK'], colourData['WHITE']],
            [colourData['WHITE'], colourData['GREEN'], colourData['GREY_DARK'], colourData['GREEN_DARK']],
            [null, colourData['GREY_DARK'], colourData['GREEN'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['GREEN'], colourData['GREY_LIGHT']]
        ]
    ],

    //Adamant Plate
    [
        [
            [null, colourData['GREEN'], colourData['GREEN'], null],
            [null, colourData['GREEN'], colourData['GREEN'], null],
            [null, colourData['GREEN'], colourData['GREEN'], colourData['WHITE']],
            [null, colourData['GREEN_DARK'], colourData['GREEN'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['GREEN'], null, colourData['RED']],
            [colourData['GREEN_DARK'], colourData['GREEN'], colourData['WHITE'], null],
            [null, colourData['GREEN_DARK'], colourData['GREEN_DARK'], colourData['GREEN']],
            [null, colourData['GREEN'], null, null]
        ],
        [
            [colourData['WHITE'], colourData['GREEN'], colourData['GREEN_DARK'], colourData['WHITE']],
            [colourData['WHITE'], colourData['GREEN'], colourData['GREEN_DARK'], colourData['GREEN_DARK']],
            [null, colourData['GREEN_DARK'], colourData['GREEN'], colourData['WHITE']],
            [null, colourData['GREEN_DARK'], colourData['GREEN'], colourData['GREY_LIGHT']]
        ]
    ],

    //Crystal Chain
    [
        [
            [null, colourData['PINK'], colourData['GREY_DARK'], null],
            [null, colourData['PINK'], colourData['GREY_DARK'], null],
            [null, colourData['BROWN'], colourData['PINK'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['PINK'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['PINK'], null, null],
            [colourData['BROWN'], colourData['PINK'], colourData['WHITE'], null],
            [null, null, null, null],
            [null, colourData['PINK'], null, colourData['WHITE']]
        ],
        [
            [colourData['WHITE'], colourData['PINK'], colourData['GREY_DARK'], colourData['WHITE']],
            [colourData['WHITE'], colourData['PINK'], colourData['GREY_DARK'], colourData['BROWN']],
            [null, colourData['GREY_DARK'], colourData['PINK'], colourData['WHITE']],
            [null, colourData['GREY_DARK'], colourData['PINK'], colourData['GREY_LIGHT']]
        ]
    ],

    //Crystal Plate
    [
        [
            [null, colourData['PINK'], colourData['PINK'], null],
            [null, colourData['PINK'], colourData['PINK'], null],
            [null, colourData['PINK'], colourData['PINK'], colourData['WHITE']],
            [null, colourData['BROWN'], colourData['PINK'], colourData['GREY_LIGHT']]
        ],
        [
            [null, colourData['PINK'], null, colourData['RED']],
            [colourData['BROWN'], colourData['PINK'], colourData['WHITE'], null],
            [null, colourData['BROWN'], colourData['BROWN'], colourData['PINK']],
            [null, colourData['PINK'], null, null]
        ],
        [
            [colourData['WHITE'], colourData['PINK'], colourData['BROWN'], colourData['WHITE']],
            [colourData['WHITE'], colourData['PINK'], colourData['BROWN'], colourData['BROWN']],
            [null, colourData['BROWN'], colourData['PINK'], colourData['WHITE']],
            [null, colourData['BROWN'], colourData['PINK'], colourData['GREY_LIGHT']]
        ]
    ]
];
