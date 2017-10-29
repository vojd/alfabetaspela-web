

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
                fn(key.key);
            }
        });
    };
    return callback;
};

const renderLetter = (document, letter) => {
    const newLetterNode = document.createElement('span');
    newLetterNode.id = "letter";
    newLetterNode.appendChild(document.createTextNode(letter.toUpperCase()));
    const letterNode = document.getElementById('letter');
    const parent = letterNode.parentNode;
    parent.replaceChild(newLetterNode, letterNode);
};

function main(document) {

    const whenLetterChanged = keyboardService(document);
    whenLetterChanged((letter) => {
        renderLetter(document, letter);
    });
    console.log('running');
}

main(document);
