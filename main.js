let allText = [];
let btnConfirm = document.querySelector('#btn-confirm');
let btnMain = document.querySelector('#btn-main');
let btnClearAll = document.querySelector('#btn-clear-all');
let mainDisplay = document.querySelector('.main-display-div > p');

document.addEventListener('DOMContentLoaded', function() {
    restoreSave();
})

document.addEventListener('keypress', function(event) {

    if (event.key !== 'Enter') {return}
    event.preventDefault();
    enterText();
})

btnConfirm.addEventListener('click', () => {
    let text = processText(document.querySelector('#txt-input').value)
    mainDisplayText(text);
    enterText(text);
})

btnMain.addEventListener('click', () => {
    let text = processText(document.querySelector('#txt-input').value)
    mainDisplayText(text);
})

btnClearAll.addEventListener('click', () => {
    localStorage.setItem('outputs', '');
    document.querySelectorAll('.output').forEach((elem) => {
        elem.remove();
    })
    mainDisplay.innerText = '';
})

function enterText(text) {
    if (text === undefined) {
        return;
    }
    createOutputElem(text);
    storeValue(text);
}

function mainDisplayText(text) {
    if (text === undefined) {return}
    mainDisplay.innerText = text;
    mainDisplay.parentElement.style.backgroundColor = 'rgba(0, 100, 0, 0.85)';
    setTimeout(function () {mainDisplay.parentElement.style.backgroundColor = 'rgba(242, 48, 5, 0.70)';}, 400)

}

function createOutputElem(text) {

    let child = document.createElement('p');
    let elem= document.createElement('div');

    setOutputElem(document.querySelector('#container'), elem);

    elem.appendChild(child);
    child.innerText = text;
}
function setOutputElem(container, elem) {
    let elems = document.querySelectorAll('.output');
    container.appendChild(elem);
    elem.setAttribute('id', `output${elems.length}`);
    elem.setAttribute('class', 'output');
    return elem;
}
function storeValue(text) {
    allText.length === 0 ? allText[0] = text : allText.push(text);
    localStorage.setItem('outputs', allText.join('|'));
}

function restoreSave() {
    let text = localStorage.getItem('outputs');
    if (text === null || text === '') {return}
    text.split('|').forEach((txt) => {
        createOutputElem(txt);
    })
}

function processText(text) {

    console.log('Original Text: ' + text);

    // Do something...

    let result = 'fancy ' + text;

    // ...less lazy than this

    console.log('Post Processing:' + result);
    return result;
}

