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
    s.push(new Audio(location+"explode.wav"));
    s.push(new Audio(location+"switch.wav"));
    s.push(new Audio(location+"pc_music.mp3"));

    return s;

}

function playSound(soundName){

    audioFiles[soundName].src = audioFiles[soundName].src;
    audioFiles[soundName].play();

}

function playSoundLoop(soundName){

    audioFiles[soundName].src = audioFiles[soundName].src;
    audioFiles[soundName].loop = true;
    audioFiles[soundName].volume = 0.3
    audioFiles[soundName].play();

}

function pauseSound(soundName){

    audioFiles[soundName].pause();

}

function resumeSound(soundName){

    audioFiles[soundName].play();

}
