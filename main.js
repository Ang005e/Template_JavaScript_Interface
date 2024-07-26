let allText = [];
let btnConfirm = document.querySelector('#btn-confirm');
let btnMain = document.querySelector('#btn-main');
let btnClearAll = document.querySelector('#btn-clear-all');
let bigDiv = document.querySelector('.big-div');

document.addEventListener('DOMContentLoaded', function(event) {
    repop();
})
btnConfirm.addEventListener('click', () => {
    let text = proccessText(document.querySelector('#txt-input').value)
    createOutputElem(text);
    bigDiv.innerText = text
})
btnMain.addEventListener('click', () => {
    let text = proccessText(document.querySelector('#txt-input').value)
    bigDiv.innerText = text
})
btnClearAll.addEventListener('click', () => {
    localStorage.clear();
    document.querySelectorAll('.output').forEach((elem) => {
        elem.remove()
    })
    bigDiv.innerText = ''
})


function createOutputElem(text) {

    let child = document.createElement('p');
    let elem= document.createElement('div');

    setOutputElem(document.querySelector('#container'), elem);

    elem.appendChild(child);
    child.innerText = text;
    allText.length === 0 ? allText[0] = text : allText.push(text);

    localStorage.setItem('outputs', allText.join('|'));
}

function setOutputElem(container, elem) {
    let elems = document.querySelectorAll('.output');
    container.appendChild(elem)
    elem.setAttribute('id', `output${elems.length}`)
    elem.setAttribute('class', 'output');
    return elem;
}

function repop() {
    let text = localStorage.getItem('outputs');
    let last;
    if (text === null) {return}
    text.split('|').forEach((txt) => {
        createOutputElem(txt);
        last  = txt !== '' ? txt : last;
    })
    bigDiv.innerText = last
}

function proccessText(text) {

    console.log('Original Text: ' + text);
    
    // Do something...
    result = text + 'fancy';
    // ...less lazy than this

    console.log('Post Processing:' + result);
    return result;
}
