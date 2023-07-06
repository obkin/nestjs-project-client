window.addEventListener('DOMContentLoaded', () => {

    const modalSend = document.querySelector('.form');
    const modalClose = document.querySelector('.form_block-close');
    const inputName = document.querySelector('.form_name_input');
    const inputTel = document.querySelector('.form_phone_input');
    const formBtn = document.querySelector('.form_send-btn');
    const formSend = document.querySelector('.form_send');
    const formDone = document.querySelector('.form_done');

// --- User data validation ---

    let dataStatus = false;

    inputName.addEventListener('input', () => {
        if (!inputName.value.match(/^[A-Za-z]+$/g)) {
            inputName.style.boxShadow = '0 0 5px red, 0 0 5px red';
            dataStatus = false;
        } else {
            dataStatus = true;
            inputName.style.boxShadow = 'none';
        } 
    });

    inputTel.addEventListener('input', () => {
        if (!inputTel.value.match(/^\d{10}$/g)) {
            inputTel.style.boxShadow = '0 0 5px red, 0 0 5px red';
            dataStatus = false;
        } else {
            dataStatus = true;
            inputTel.style.boxShadow = 'none';
        } 
    });

// --- Send user data to API ---

    const requerstURL = 'http://localhost:3000';

    formBtn.addEventListener('click', () => {
        const userName = document.getElementsByTagName("input")[0].value;
        const userTel = document.getElementsByTagName("input")[1].value;
        if (dataStatus === true) {
            postData(userName, userTel);
                formSend.style.display = 'none';
                formDone.style.display = 'block';
                setTimeout(() => {
                    hideModal();
                }, 5000);
        } else {
            console.log('send error: invalid data');
        }
    });

    function postData(name, tel) {
        console.log(name, tel)
    }

// --- Hide modal / show modal---

    modalClose.addEventListener('click', () => {
        hideModal();
        setTimeout(() => {
            showModal();
        }, 5000);
    });

    function hideModal() {
        modalSend.style.display = 'none';
    }

    function showModal() {
        modalSend.style.display = 'flex';
    }

});