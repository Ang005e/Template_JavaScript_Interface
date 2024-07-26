let allText = [];

document.addEventListener('DOMContentLoaded', function(event) {
    repop();
})

let btnConfirm = document.querySelector('#btn-confirm');

btnConfirm.addEventListener('click', () => {
    let text = proccessText(document.querySelector('#txt-input').value)
    createOutputElem(text);
})

function createOutputElem(text) {

    let elems = document.querySelectorAll('.output');
    let elem = document.createElement('div');
    elem.setAttribute('id', `output${elems.length}`)
    elem.setAttribute('class', 'output');
    let child = document.createElement('p')
    document.querySelector('#container').appendChild(elem)
    elem.appendChild(child);
    child.innerText = text;
    allText.length === 0 ? allText[0] = text : allText.push(text);

    localStorage.setItem('outputs', allText.join(','));
}

function repop() {
    let text = localStorage.getItem('outputs');
    if (text === null) {return}
    text.split(',').forEach((txt) => {
        createOutputElem(txt);
    })
}

function proccessText(text) {
    // put the text processing function here
}
// template for interacting with user inputs and messing around with it using JS
/*
function getText() {
    let re = /^(?)$/;
}

 */

/*
document.querySelectorAll('.output *').forEach((elem) => {
    let i = 0;
})
 */