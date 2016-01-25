function updateCanvas(img){

    if (typeof debugWindow !== "undefined" && debugWindow !== null) {
        var c=document.getElementById('mapCanvas');
        c.width = img.width;
        c.height = img.height;
        var ctx=c.getContext("2d");
        ctx.drawImage(img,0,0);
    }

}
