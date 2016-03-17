/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initSounds(soundJson, path){

    path = path.substring(0, path.indexOf('json')) + "sounds/"

    for (var s in soundJson){
        audioFiles[soundJson[s].id] = new Audio(path+soundJson[s].filename);
    }

}


function playSound(soundName){
    if(soundEnabled) {
        if(soundName !== 'SOUND_NONE') {
            audioFiles[soundName].src = audioFiles[soundName].src;
            audioFiles[soundName].play();
        }
    }
}

function playSoundLoop(soundName){
    if(soundEnabled) {
        if(soundName !== 'SOUND_NONE') {
            audioFiles[soundName].src = audioFiles[soundName].src;
            audioFiles[soundName].loop = true;
            audioFiles[soundName].volume = 0.3
            audioFiles[soundName].play();
        }
    }
}

function pauseSound(soundName){
    if(soundEnabled) {
        audioFiles[soundName].pause();
    }
}

function resumeSound(soundName){
    if(soundEnabled) {
        audioFiles[soundName].play();
    }
}
