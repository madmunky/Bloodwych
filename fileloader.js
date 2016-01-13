function getFileData(file_name, callback, t, type, length) {
	console.log("Reading file" + file_name + " Callback: " + callback);
	dataLoaded.count++;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 200 || xmlhttp.readyState === 4 || xmlhttp.readyState === "complete") {
			switch (type) {
				case "monsterPalette":
					monsterPaletteData = callback(this.response, length);
					break;
				case "monsterPaletteMeta":
					monsterPaletteMetaData = callback(this.response, length);
					break;
				case "monsterHeads":
					monsterHeadsData = callback(this.response, length);
					break;
				case "monsterBodies":
					monsterBodiesData = callback(this.response, length);
					break;
				case "floor":
					t.floor = callback(this.response, length);
					break;
				case "switches":
					t.switches = callback(this.response, length);
					break;
				case "triggers":
					t.triggers = callback(this.response, length);
					break;
				case "monsterData":
					t.monsterData = callback(this.response, length);
					break;
				case "championData":
					championData = callback(this.response, length);
					break;
				case "championPocketData":
					championPocketData = callback(this.response, length);
					break;
				case "towerSwitchesData":
					towerSwitchesData = callback(this.response, length);
					break;
				case "itemData":
					t.itemData = callback(this.response, length);
					break;
				case "scrollData":
					scrollData = callback(this.response);
					break;
				case "gemSwitchesData":
					gemSwitchesData = callback(this.response, length);
					break;
				case "crystalSwitchesData":
					crystalSwitchesData = callback(this.response, length);
					break;
				case "armourData":
					armourData = callback(this.response, length);
				default:
					break;
			}
			checkAllDataLoaded();
		}
	};
	xmlhttp.open("GET", file_name, true);
	xmlhttp.responseType = "arraybuffer";
	xmlhttp.send();
}

function checkAllDataLoaded() {
	dataLoaded.max++;
	if (dataLoaded.count === dataLoaded.max) {
		dataLoaded.done++;
		loadGfxUIData();
	}
}

function readMapData(evt) {

	//Function to read the orginal Bloodwych PC map data and put it into an array of
	//hex codes so we can convert back to objects ingame.

	var uInt8Array = new Uint8Array(evt);

	//The first part of the map files contains to the data about how many floors are stored
	//in the tower file and the Width,Height,OffsetX,OffsetY so the floors can line up correctly
	//for falling though pits or walking down stairs.
	var floors = [];

	for (x = 0; x < 8; x++) {
		myFloor = new Map(uInt8Array[x + 8], uInt8Array[x], uInt8Array[x + 32], uInt8Array[x + 40]);
		if(myFloor.Width === 0 || myFloor.Height === 0) break;
		floors.push(myFloor);
	}

	var x = 56;

	for (var i = 0; i < floors.length; i++) {
		t1 = floors[i].Width;
		t2 = floors[i].Height;
		var mdata = [];

		for (myY = 0; myY < t1; myY++) {
			var r = [];
			for (myX = 0; myX < t2; myX++) {
				r.push(decimalToHex(uInt8Array[x]) + decimalToHex(uInt8Array[x + 1]));
				x = x + 2;
			}
			mdata.push(r);
		}
		floors[i].Map = mdata;
	}

	return floors;

}

function readSimpleData(evt, length) {
	var uInt8Array = new Uint8Array(evt);
	var Data = [];

	if (length === 0) {
		return uInt8Array;
	} else {
		for (x = 0; x < uInt8Array.length / length; x++) {
			//Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
			var tmp = [];
			for (y = 0; y < length; y++) {
				tmp.push(uInt8Array[x * length + y]);
			}
			Data.push(tmp);
			//x = x + length - 1;
		}
	}
	return Data;
}

function readSimpleDataHex(evt, length) {
	var uInt8Array = new Uint8Array(evt);
	var Data = [];

	for (x = 0; x < uInt8Array.length / length; x++) {
		//Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
		var tmp = '';
		for (y = 0; y < length; y++) {
			tmp = tmp + decimalToHex(uInt8Array[x * length + y]);
		}
		Data.push(tmp);
	}
	return Data;
}

function readScrollData(evt) {
	var uInt8Array = new Uint8Array(evt);
	var Data = [];
	var Scroll = [];
	var Line = [];

	for (x = 0; x < uInt8Array.length; x++) {

		if (uInt8Array[x] === 255) {
			Scroll.push(Line.join(""));
			Data.push(Scroll);
			Scroll = [];
			Line = [];
			x++;
		}
		if (uInt8Array[x] === 252) {
			if (Line.length > 0) {
				Scroll.push(Line.join(""));
			}
			Line = [];
			x = x + 3;
		}

		Line.push(String.fromCharCode(uInt8Array[x]));
	}
	return Data;
}
