
const writtenWords = [
    [] // holds the first word to be written
];

class KeyboardService {

    constructor(document) {
        this.document = document;
        this.acceptedKeyCodes = [
            221, // å
            222, // ä
            192, // ö
        ];
    }

    whenCharChanged(fn) {
        this.document.addEventListener('keydown', (key) => {
            const keyCode = key.keyCode;
            if ((keyCode >= 65 && keyCode <= 90) || this.acceptedKeyCodes.includes(key.keyCode)) {
                fn(key.key.toUpperCase());
            }
        })
    }

    whenEnterWasPressed(fn) {
        this.document.addEventListener('keydown', (key) => {
            if (key.key === 'Enter') {
                fn(true);
            }
        });
    }
}

// Letters for sound loading
const getSwedishLetters = () => {
    const firstKeyCode = 65;
    const lastKeyCode = 90;
    const letters = Array.from(new Array((lastKeyCode - firstKeyCode) + 1), (val, index) => String.fromCharCode(index + firstKeyCode));
    letters.push('au');
    letters.push('ae');
    letters.push('ou');
    return letters.map(letter => letter.toUpperCase());
};

const letterToFileChar = (letter) => {
    switch (letter) {
        case 'Å':
            return 'AU';
        case 'Ä':
            return 'AE';
        case 'Ö':
            return 'OU';
        default:
            return letter;
    }
};

const loadSounds = () => {
    const dir = '/sfx/swe';
    const letters = getSwedishLetters();
    const sounds = [];
    letters.forEach(letter =>
        sounds[letter] = new Audio(`${dir}/${letter}_swe.wav`));
    console.log('sounds loaded');
    return sounds;
};

const renderLetter = (document, letter) => {
    const newLetterNode = document.createElement('div');
    newLetterNode.id = "letter";
    newLetterNode.appendChild(document.createTextNode(letter.toUpperCase()));
    const letterNode = document.getElementById('letter');
    const parent = letterNode.parentNode;
    parent.replaceChild(newLetterNode, letterNode);
};

const renderWords = (document, words) => {
    const newNode = document.createElement('div');
    newNode.id = "words";
    newNode.classList = ['center'];
    const nodes = words.map((word) => {
        const node = document.createElement('div');
        node.appendChild(
          document.createTextNode(
            word.map(c => c.toUpperCase()).join(''))
        );
        return node;
    });

    const wordNode = document.getElementById('words');
    while(wordNode.firstChild) {
        wordNode.removeChild(wordNode.firstChild);
    }

    nodes.forEach((node) => {
        wordNode.appendChild(node);
    });
};

const renderWord = (document, letter) => {
    const word = writtenWords[writtenWords.length - 1];
    word.push(letter);
    const newLetterNode = document.createElement('span');
    newLetterNode.id = "letter";
    newLetterNode.appendChild(
        document.createTextNode(
            word.map(c => c.toUpperCase()).join('')));

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

    const keyboardService = new KeyboardService(document);
    keyboardService.whenCharChanged((char) => {
        renderWord(document, char);
        playSound(sounds, char);
    });

    keyboardService.whenEnterWasPressed(() => {
        renderWords(document, writtenWords);
        if(writtenWords.length > 5) {
            writtenWords.shift();
        }
        writtenWords.push([]);
        renderWord(document, '');
    });
}

main(document);
