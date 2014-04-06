function getFileData(file_name, callback, t, type, length) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState===200 ||xmlhttp.readyState===4 || xmlhttp.readyState==="complete"){
			switch (type) {
<<<<<<< HEAD
				case "Levels": t.Levels = callback(this.response, length);t.Levels.onload=Run();;break;
=======
				case "Levels": t.Levels = callback(this.response, length);break;
>>>>>>> 75e638b80f65809a0e62723fe7ccaa5a544298f5
				case "Switches": t.Switches = callback(this.response, length);break;
				case "Triggers": t.Triggers = callback(this.response, length);break;
				case "MonsterData": t.MonsterData = callback(this.response, length);break;
				case "CharacterData": t.CharacterData = callback(this.response, length);break;
				default: break;
			}
			if(typeof length === 'number') { //use length
				obj = callback(this.response, length);
			} else { //use extra function
				obj = callback(this.response);
			}
			//return obj;
		}
	}
	xmlhttp.open("GET", file_name, true);
	xmlhttp.responseType = "arraybuffer";
	xmlhttp.send();
}

function readMapData(evt) {
		
	//Function to read the orginal Bloodwych PC map data and put it into an array of
	//hex codes so we can convert back to objects ingame.
	
	var uInt8Array = new Uint8Array(evt);

	//The first part of the map files contains to the data about how many levels are stored
	//in the tower file and the Width,Height,OffsetX,OffsetY so the levels can line up correctly
	//for falling though pits or walking down stairs.
        var Levels = [];
		   
	for (x = 0; x < 8; x++) {
		myLevel = new Map(uInt8Array[x+8], uInt8Array[x], uInt8Array[x + 32], uInt8Array[x + 40]);
		Levels.push(myLevel);
	}

	var x = 56;
	//var xx = 0;

	for (var i = 0; i < Levels.length; i++) {
		t1 = Levels[i].Width;
		t2 = Levels[i].Height;
		var mdata = [];

		for (myY = 0; myY < t1; myY++) {
			var r = [];
			for (myX = 0; myX < t2; myX++) {
				r.push(decimalToHex(uInt8Array[x]) + decimalToHex(uInt8Array[x + 1]));
				x = x + 2;
			}mdata.push(r);}
		Levels[i].Map = mdata;
	}
        
        return Levels;
        
}
	
function readSimpleData(evt,length) {
		
	var uInt8Array = new Uint8Array(evt);
	var Data = [];   
	
	for (x = 0; x < uInt8Array.length; x++) {
		
		//Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
                var tmp = [];
                for (i = x; i < x+length; i++) {tmp.push(uInt8Array[i]);}                        
                Data.push(tmp);                
		x=x+length-1;
	}
	return Data;
}
	
