const modal = document.getElementsByClassName("modal-background");
const openModal = (id) => document.getElementById(id).style.display = 'flex';
const closeModal = (id) => document.getElementById(id).style.display = 'none';
const deleteAnswers = () => localStorage.removeItem('enadeTest')

const now = new Date();
const enadeTest = {
    "startAt": String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0'),
    "test": {
        "alternatives": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        "result": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        "answers": [
            "D","E","D","E","C","A","B","D","E","A","B","C","D","E","A","B","A","D","B","A","E","C","A","E","D","C","C","B","C","D","E","E","A","B","D"
        ]
    }
};

const startTest = () => {
    window.localStorage.setItem('enadeTest', JSON.stringify(enadeTest))
}
