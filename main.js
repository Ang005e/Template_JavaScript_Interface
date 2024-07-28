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
    //ToDo:
    // match similar words
    // match similar letter patterns
    // i.e.:
    // letters next to each other
    // words that are mostly matching but with a misplaced letter

    // 12-06-2024
    // 2024-12-06
    // 06-2024-12

    // Accepted formats:
    // dd-mm-yyyy OR dd-mm OR d-m
    // dd/mm/yyyy OR dd/mm OR d/m

    console.log('Original Text: ' + text);
    let result;
    // validation tests:
    text = text.replaceAll(/(\/|\s)/g, '-') // Convert whitespaces or slashes to dashes
    text = text.replaceAll(/(\b|'-')(\d)(\b|'-')/g, '0$2') // Add zeros to single digits

    // (dates should be valid, within range, and seperated by '-' up to this point)
    // format correction:
    try {

        let year = text.match(/-\d{4}\b/g)[0] // year is in the expected position & format
        text = manipulateDate(text) // convert the date to ISO format
    }
    catch {
        text = manipulateDate(text, false, new Date().getFullYear()) // the year is null/doesn't exist
        text = valiDateYear(text) // hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha im going insane
    }

    //ToDo ensure the date is valid (days/months are within correct range)

    result = text
    console.log('Post Processing:' + result);
    return result;

    function valiDateYear(date) { // checks that the year is in the future, and returns a valid future date if mm/dd is entered without a year.

        let month = new Date().getMonth()+1
        let day = new Date().getDate()

        let futureDate = manipulateDate(date, false, new Date().getFullYear() + 1); // one year in the future

        let arguedDay = parseInt(manipulateDate(date, true)[2])
        let arguedMonth = parseInt(manipulateDate(date, true)[1])

        // make sure dates are only passed through this when entered (without a year),
        // as otherwise off ingredients will magically become fresh again...

        if (arguedMonth > month) { // the argued month is in the future
            return manipulateDate(date);
        }else if ((arguedMonth === month) && (arguedDay >= day)) { // the argued month is current, and the day is either current or in the future
            return manipulateDate(date);
        }else if (arguedMonth < month) { // the argued month is in the past
            return futureDate
        }else if ((arguedMonth === month) && (arguedDay < day)) { // the argued month is current, but the day is in the past
            return futureDate
        }
    }
    function manipulateDate(date, split = false, arguedYear = null) { // returns formatted OR split date.
        // Is passed full (dd-mm-yyyy) or partial (dd-mm) date. If partial date is passed, year must be passed too.
        let year = arguedYear !== null;
        let ISOFormat = /^\d{4}/.test(date);
        (!year) && (arguedYear = date.match(/\d{4}/)[0]) // set year as the year found by the search pattern

        if (/*!year && */ISOFormat) {
            return sendDate([arguedYear, date.match(/(\d\d)-(\d\d$)/)], split)
        }else /*if (!year)*/ {
            return sendDate([arguedYear, date.match(/(^\d\d)-(\d\d)/)], split)
        }
/*        if (ISOFormat) {
            date = [arguedYear, date.match(/(\d\d)-(\d\d)$/)] //date.match(/(\d{4})(\d\d)-(\d\d)$/)
            return sendDate([date])
        } else {

        }*/

        function sendDate([val1, val2], split/*, full=false*/) {
/*            if (full) {
                if (split) return [date[0], date[1], date[2]];
                return `${date[0]}-${date[1]}-${date[2]}`
            } else {*/
            if (split) return [val1, val2[1], val2[2]];
            return `${val1}-${val2[0]}`
        }
    }
}



