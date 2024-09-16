const queryType = document.getElementById('queryType');
const answerType = document.getElementById('answerType');
const swapButton = document.getElementById('swapButton');
const queryInput = document.getElementById('queryInput');
const answerInput = document.getElementById('answerInput');
const errorMessage = document.getElementById('errorMessage');
const copyButton = document.getElementById('copyButton');
const copyMessage = document.getElementById('copyMessage');

queryType.innerText = 'Octal';
answerType.innerText = 'Text';

function isValidOctal(input) {
    return /^[0-7\s]+$/.test(input);
}

swapButton.addEventListener('click', () => {
    const temp = queryType.innerText;
    queryType.innerText = answerType.innerText;
    answerType.innerText = temp;
    answerInput.value = '';
    queryInput.value = '';
    errorMessage.innerText = '';
})


queryInput.addEventListener('input', () => {
    errorMessage.innerText = '';
    if (queryType.innerText === 'Octal' && queryInput.value.length > 0) {
        const octal = queryInput.value;
        if (!isValidOctal(octal)) {
            errorMessage.innerText = 'Invalid Octal';
            answerInput.value = '';
            return;
        }
        const text = octalToText(octal);
        answerInput.value = text;
    } else if (queryType.innerText === 'Text') {
        const text = queryInput.value;
        const octal = textToOctal(text);
        answerInput.value = octal;
    } else {
        answerInput.value = '';
        errorMessage.innerText = '';
    }
})


function textToOctal(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(8)).join(' ');
}

function octalToText(octal) {
    return octal.split(' ').map(octal => String.fromCharCode(parseInt(octal, 8))).join('');
}

function autoResize() {
    answerInput.style.height = '10dvh';
    answerInput.style.height = answerInput.scrollHeight + 'px';
    queryInput.style.height = '10dvh';
    queryInput.style.height = queryInput.scrollHeight + 'px';
}

queryInput.addEventListener('input', autoResize);

copyButton.addEventListener('click', () => {
    if (answerInput.value.length === 0) {
        return;
    }
    copyMessage.classList.add('visible');
    answerInput.select();
    answerInput.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(answerInput.value)
        .then(() => {
            copyMessage.innerText = 'Copied!';
            setTimeout(() => {
                copyMessage.classList.remove('visible');
            }, 3000);
        })
        .catch(err => {
            copyMessage.innerText = 'Failed to copy!';
            copyMessage.style.color = 'red';
            copyMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';

            setTimeout(() => {
                copyMessage.classList.remove('visible');
            }, 3000);
            console.error('Failed to copy text: ', err);
        });
});