'use strict';

class InputManager {
    constructor(document) {
        this.document = document;
        this.inputField = document.getElementById('text-input');
        this.inputField.addEventListener('blur', function() {
            this.inputField.focus();
        });

        this.document.addEventListener('touchstart', function() {
            this.inputField.focus();
        });
    }

    whenLetterChanged(callbackFn) {
        //this.inputField.focus();
        const acceptedKeyCodes = [
            221, // å 
            222, // ä
            192, // ö
        ];

        this.inputField.addEventListener('keyup', function(key) {
            const keyCode = key.keyCode;
            if((keyCode >= 65 && keyCode <= 90) || acceptedKeyCodes.includes(key.keyCode)) {
                callbackFn(key.key.toUpperCase());
            }
        });
    };
}

// Letters for sound loading
function getSwedishLetters() {
    const firstKeyCode = 65;
    const lastKeyCode = 90;
    const letters = Array
    .apply(null, 
        Array((lastKeyCode - firstKeyCode) + 1))
        .map(function (_, i) {
            return String.fromCharCode(i + firstKeyCode);
        });

        /*
    const letters = Array.from(
        new Array((lastKeyCode - firstKeyCode) + 1),function(val,index) {
            return String.fromCharCode(index + firstKeyCode)
        });
        */
    letters.push('au');
    letters.push('ae');
    letters.push('ou');    
    return letters.map(function(letter) {
        letter.toUpperCase();
    });
}

function letterToFileChar(letter) {
    switch(letter) {
        case 'Å':
            return 'AU';
        case 'Ä':
            return 'AE';
        case 'Ö':
            return 'OU';
        default:
            return letter;
    }

}

function loadSounds() {
    const dir = './sfx/swe';
    const letters = getSwedishLetters();
    const sounds = [];
    letters.forEach(function(letter) {
        return sounds[letter] = new Audio(`${dir}/${letter}_swe.wav`);
    });
    console.log('sounds loaded');
    return sounds;
};

function renderLetter(document, letter) {
    const newLetterNode = document.createElement('span');
    newLetterNode.id = "letter";
    newLetterNode.appendChild(document.createTextNode(letter.toUpperCase()));
    const letterNode = document.getElementById('letter');
    const parent = letterNode.parentNode;
    parent.replaceChild(newLetterNode, letterNode);
};

function playSound (sounds, letter) {
    console.log(sounds);
    const l = letterToFileChar(letter);
    console.log(l);
    sounds[letterToFileChar(letter)].play();
};

function main(document) {
    
    const sounds = loadSounds();
    const inputManager = new InputManager(document);
    inputManager.whenLetterChanged(function(letter) {
        renderLetter(document, letter);
        playSound(sounds, letter);
    });
    console.log('running');
}

main(document);
