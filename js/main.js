/**
 * @param {HTMLElement} parent - Родительский элемент, в который добавляется созданный элемент.
 * @param {string} type - Тип создаваемого элемента (например, 'div', 'span' и т.д.).
 * @param {string[]} classes - Массив классов для добавления к созданному элементу.
 * @param {string} innerHTML - Текстовое содержимое созданного элемента или null.
 * @param {string} id - Массив для добавления нескольких id к созданному элементу.
 * @returns {HTMLElement} - Созданный элемент.
 */
function CreateElement(parent, type, classes = [], innerHTML = null, id = '') {
    const element = document.createElement(type);
    element.classList.add(...classes);
    element.innerHTML = innerHTML;
    element.id = id;
    parent.appendChild(element);
    return element;
}
function CreateNote(desc, date, time, lnthSymbol, localId) {
    const mainNote = CreateElement(mainNotes, 'div', ['main__note']);
    mainNote.setAttribute('localId', localId);
    const noteDescWrap = CreateElement(mainNote, 'div', ['note__desc--wrap']);
    const noteDesc = CreateElement(noteDescWrap, 'span', ['note__desc'], desc);
    const noteSection = CreateElement(mainNote, 'div', ['note__section']);
    const noteDateWrap = CreateElement(noteSection, 'div', [
        'note__date--wrap',
    ]);
    const noteDate = CreateElement(noteDateWrap, 'span', ['note__date'], date);
    const noteTimeWrap = CreateElement(noteSection, 'div', [
        'note__time--wrap',
    ]);
    const noteTime = CreateElement(noteTimeWrap, 'span', ['note__time'], time);
    const notelnthSymbolWrap = CreateElement(noteSection, 'div', [
        'note__lnthSymbol--wrap',
    ]);
    const noteLnthSymbol = CreateElement(
        notelnthSymbolWrap,
        'span',
        ['note__lnthSymbol'],
        lnthSymbol
    );
    const noteBtnsWrap = CreateElement(noteSection, 'div', [
        'note__btns--wrap',
    ]);
    const noteDelWrap = CreateElement(noteBtnsWrap, 'div', ['note__del--wrap']);
    const noteDel = CreateElement(
        noteDelWrap,
        'button',
        ['note__del'],
        `<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" id="Layer_1" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
    <g>
        <g>
            <path fill="#394240" d="M12,60c0,2.211,1.789,4,4,4h32c2.211,0,4-1.789,4-4V16H12V60z M20,24h24v32H20V24z"/>
            <path fill="#394240" d="M56,4H40c0-2.211-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4H8C5.789,4,4,5.789,4,8s1.789,4,4,4h48    c2.211,0,4-1.789,4-4S58.211,4,56,4z"/>
        </g>
        <rect x="20" y="24" fill="#B4CCB9" width="24" height="32"/>
    </g>
    </svg>`
    );
    const noteChngWrap = CreateElement(noteBtnsWrap, 'div', [
        'note__chng--wrap',
    ]);
    const noteChng = CreateElement(
        noteChngWrap,
        'button',
        ['note__chng'],
        `<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" id="Layer_1" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
    <g>
        <path fill="#394240" d="M62.828,16.484L47.512,1.172c-1.562-1.562-4.094-1.562-5.656,0L0,43.031V64h20.973l41.855-41.855   C64.391,20.578,64.391,18.051,62.828,16.484z M18,56H8V46l0.172-0.172l10,10L18,56z M23.828,50.172l-10-10L44,10l10,10   L23.828,50.172z"/>
        <polygon fill="#F9EBB2" points="18,56 8,56 8,46 8.172,45.828 18.172,55.828  "/>
        
            <rect x="26.843" y="8.751" transform="matrix(0.7071 0.7071 -0.7071 0.7071 31.2072 -15.1689)" fill="#45AAB8" width="14.142" height="42.669"/>
    </g>
    </svg>`
    );
    noteDel.setAttribute('localId', localId);
    noteDel.addEventListener('click', function () {
        noteDel.parentElement.parentElement.parentElement.parentElement.remove();
        localStorage.removeItem(noteDel.getAttribute('localId'));
    });
    noteChng.addEventListener('click', function () {
        const descWrap =
            this.parentElement.parentElement.parentElement.parentElement.querySelector(
                '.note__desc--wrap'
            );
        const desc = descWrap.querySelector('.note__desc');
        const descText = desc.textContent;
        desc.remove();
        const textarea = CreateElement(descWrap, 'textarea', []);
        textarea.setAttribute('rows', '6');
        textarea.setAttribute('autofocus', '');
        textarea.value = descText;
        const clue = CreateElement(
            noteBtnsWrap,
            'span',
            ['clue-note__chng'],
            'Редактировать →'
        );
        noteChng.addEventListener('click', function (e) {
            clue.remove();
            const textareaValue = textarea.value;
            const thisNoteDesc = CreateElement(
                noteDescWrap,
                'span',
                ['note__desc'],
                textareaValue
            );
            textarea.remove();
            const jsonObj = localStorage.getItem(
                descWrap.parentElement.getAttribute('localId')
            );
            const origObj = JSON.parse(jsonObj);
            origObj.desc = textareaValue;
            localStorage.setItem(
                descWrap.parentElement.getAttribute('localId'),
                JSON.stringify(origObj)
            );
        });
    });
}
const textarea = document.querySelector('textarea');
const mainNotes = document.querySelector('.main__notes');
const monthNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
];
document.querySelector('.btn').addEventListener('click', function () {
    const noteObj = {
        desc: textarea.value,
        date: `${new Date().getDate()} ${
            monthNames[new Date().getMonth()]
        } ${new Date().getFullYear()}`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        lnthSymbol: textarea.value.length,
        localId: `${localStorage.length + 1}`,
    };
    let counter = `${localStorage.length + 1}`;
    localStorage.setItem(counter, JSON.stringify(noteObj));
    console.log(localStorage);
    CreateNote(
        noteObj.desc,
        noteObj.date,
        noteObj.time,
        noteObj.lnthSymbol,
        noteObj.localId
    );
    textarea.value = '';
});
for (const key in localStorage) {
    if (Object.hasOwnProperty.call(localStorage, key)) {
        const localObj = localStorage[key];
        const noteObj = JSON.parse(localObj);
        console.log(noteObj);
        CreateNote(
            noteObj.desc,
            noteObj.date,
            noteObj.time,
            noteObj.lnthSymbol,
            noteObj.localId
        );
    }
}
