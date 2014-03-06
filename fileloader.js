$(document).ready(function() {
 GetDataView("maps/MOD0.MAP",mapdate);
});

 function GetDataView(file_name, callback){

        var xmlhttp = new XMLHttpRequest();

        //var data_view = [];

        xmlhttp.onreadystatechange= function(){
            if (xmlhttp.readyState===200 ||xmlhttp.readyState===4 || xmlhttp.readyState==="complete"){

              //data_view = new DataView(this.response);   //DataView is not defined here
              callback(this.response);

             }
        };

        xmlhttp.open("GET", file_name,true);
        xmlhttp.responseType = "arraybuffer";
        xmlhttp.send();
    }

function handleFileSelect(evt) {
    
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = mapdate;
    }
    
function mapdate(evt) {
        
        //Function to read the orginal Bloodwych PC map data and put it into an array of
        //hex codes so we can convert back to objects ingame.
        
        var uInt8Array = new Uint8Array(evt);

        //The first part of the map files contains to the data about how many levels are stored
        //in the tower file and the Width,Height,OffsetX,OffsetY so the levels can line up correctly
        //for falling though pits or walking down stairs.
        
        for (x = 0; x < 8; x++) {
            var Level = new Map(uInt8Array[x+8], uInt8Array[x], uInt8Array[x + 32], uInt8Array[x + 40]);
            tw.Levels.push(Level);
        }

        var x = 56;
        //var xx = 0;

        for (var i = 0; i < tw.Levels.length; i++) {
            t1 = tw.Levels[i].Width;
            t2 = tw.Levels[i].Height;
            var mdata = [];

            for (myY = 0; myY < t1; myY++) {
                var r = [];
                for (myX = 0; myX < t2; myX++) {
                    r.push(decimalToHex(uInt8Array[x]) + decimalToHex(uInt8Array[x + 1]));
                    x = x + 2;
                }mdata.push(r);}
            tw.Levels[i].Map = mdata;
        }
        
        clearCanvas();
        configCanvas()
        
        myDIx(ctx, img, background[b], p1, scale);
        p1.pView(tw.Levels[p1.level].Map);
        drawPlayersView(p1);
        
        myDIx(ctx, img, background[b], p2, scale);
        p2.pView(tw.Levels[p2.level].Map);
        drawPlayersView(p2);
        ctx.fillText("Current Map: " +Maps[CurrentMap],10,270);
    
    
    }
    


function decimalToHex(d) {
    var hex = Number(d).toString(16);
    hex = "".substr(0, 2 - hex.length) + hex;
    hex = hex.toUpperCase();
    if (hex.length === 1) {
        hex = "0" + hex;
    }
    return hex;
}

function StringBuilder() {
    var strings = [];

    this.append = function(string)
    {
        string = verify(string);
        if (string.length > 0)
            strings[strings.length] = string;
    };

    this.appendLine = function(string)
    {
        string = verify(string);
        if (this.isEmpty())
        {
            if (string.length > 0)
                strings[strings.length] = string;
            else
                return;
        }
        else
            strings[strings.length] = string.length > 0 ? "\r\n" + string : "\r\n";
    };

    this.clear = function() {
        strings = [];
    };

    this.isEmpty = function() {
        return strings.length === 0;
    };

    this.toString = function() {
        return strings.join("");
    };

    var verify = function(string)
    {
        if (!defined(string))
            return "";
        if (getType(string) !== getType(new String()))
            return String(string);
        return string;
    };

    var defined = function(el)
    {
        // Changed per Ryan O'Hara's comment:
        return el !== null && typeof (el) !== "undefined";
    };

    var getType = function(instance)
    {
        if (!defined(instance.constructor))
            throw Error("Unexpected object type");
        var type = String(instance.constructor).match(/function\s+(\w+)/);

        return defined(type) ? type[1] : "undefined";
    };
}
;