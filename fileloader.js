function getFileData(file_name, callback, t, type, length) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 200 || xmlhttp.readyState === 4 || xmlhttp.readyState === "complete") {
			switch (type) {
				case "monsterPalette":
					monsterPaletteData = callback(this.response, length);
					monsterDataLoaded.monsterPalette = true;
					break;
				case "monsterHeads":
					monsterHeadsData = callback(this.response, length);
					monsterDataLoaded.monsterHeads = true;
					break;
				case "monsterBodies":
					monsterBodiesData = callback(this.response, length);
					monsterDataLoaded.monsterBodies = true;
					break;
				case "floor":
					t.floor = callback(this.response, length);
					towerDataLoaded[t.id].floor = true;
					break;
				case "switches":
					t.switches = callback(this.response, length);
					towerDataLoaded[t.id].switches = true;
					break;
				case "triggers":
					t.triggers = callback(this.response, length);
					towerDataLoaded[t.id].triggers = true;
					break;
				case "monsterData":
					t.monsterData = callback(this.response, length);
					towerDataLoaded[t.id].monsters = true;
					break;
				case "championData":
					championData = callback(this.response, length);
					towerDataLoaded[t.id].champions = true;
					break;
				case "towerSwitchesData":
					towerSwitchesData = callback(this.response, length);
					gameDataLoaded.towerSwitches = true;
					break;
				default:
					break;
			}
		}
	};
	xmlhttp.open("GET", file_name, true);
	xmlhttp.responseType = "arraybuffer";
	xmlhttp.send();
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

	for (x = 0; x < uInt8Array.length / length; x++) {
		//Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
		var tmp = [];
		for (y = 0; y < length; y++) {
			tmp.push(uInt8Array[x * length + y]);
		}
		Data.push(tmp);
		//x = x + length - 1;
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
