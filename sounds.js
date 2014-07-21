/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function loadSounds(){
    
    var s = [];
    var location = "data/sounds/";
    s.push(new Audio(location+"door.wav"));
    s.push(new Audio(location+"attack.wav"));
    s.push(new Audio(location+"flash.wav"));
    s.push(new Audio(location+"death.wav"));
    s.push(new Audio(location+"spell.wav"));
    s.push(new Audio(location+"switch.wav"));
    
    return s;
    
}

function playSound(soundName){
    
    audioFiles[soundName].src = audioFiles[soundName].src;
    audioFiles[soundName].play();
    
}