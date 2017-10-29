

const keyboardService = (document) => {

    const acceptedKeyCodes = [
        221, // å 
        222, // ä
        192, // ö
    ];
    const callback = (fn) => {
        document.addEventListener('keydown', (key) => {
            const keyCode = key.keyCode;
            if((keyCode >= 65 && keyCode <= 90) || acceptedKeyCodes.includes(key.keyCode)) {
                fn(key.key.toUpperCase());
            }
        });
    };
    return callback;
};

// Letters for sound loading
const getSwedishLetters = () => {
    const firstKeyCode = 65;
    const lastKeyCode = 90;
    const letters = Array.from(new Array((lastKeyCode - firstKeyCode) + 1),(val,index)=>String.fromCharCode(index + firstKeyCode));
    letters.push('au');
    letters.push('ae');
    letters.push('ou');    
    return letters.map(letter => letter.toUpperCase());
}

const letterToFileChar = (letter) => {
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

const loadSounds = () => {
    const dir = './sfx/swe';
    const letters = getSwedishLetters();
    const sounds = [];
    letters.forEach(letter =>
        sounds[letter] = new Audio(`${dir}/${letter}_swe.wav`));
    console.log('sounds loaded');
    return sounds;
};

const renderLetter = (document, letter) => {
    const newLetterNode = document.createElement('span');
    newLetterNode.id = "letter";
    newLetterNode.appendChild(document.createTextNode(letter.toUpperCase()));
    const letterNode = document.getElementById('letter');
    const parent = letterNode.parentNode;
    parent.replaceChild(newLetterNode, letterNode);
};

const playSound = (sounds, letter) => {
    console.log(sounds);
    const l = letterToFileChar(letter);
    console.log(l);
    sounds[letterToFileChar(letter)].play();
};

function main(document) {

    const sounds = loadSounds();
    const whenLetterChanged = keyboardService(document);
    whenLetterChanged((letter) => {
        renderLetter(document, letter);
        playSound(sounds, letter);
    });
    console.log('running');
}

main(document);
