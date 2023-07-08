window.addEventListener('DOMContentLoaded', () => {

    const modalSend = document.querySelector('.form');
    const modalClose = document.querySelector('.form_block-close');
    const inputName = document.querySelector('.form_name_input');
    const inputTel = document.querySelector('.form_phone_input');
    const formBtn = document.querySelector('.form_send-btn');
    const formSend = document.querySelector('.form_send');
    const formDone = document.querySelector('.form_done');

// --- User data validation ---

    let nameStatus = false;
    let phoneStatus = false;

    inputName.addEventListener('input', () => {
        if (!inputName.value.match(/^[A-Za-z]+$/g)) {
            inputName.style.boxShadow = '0 0 5px red, 0 0 5px red';
            nameStatus = false;
        } else {
            nameStatus = true;
            inputName.style.boxShadow = 'none';
        } 
    });

    inputTel.addEventListener('input', () => {
        if (!inputTel.value.match(/^\d{10}$/g)) {
            inputTel.style.boxShadow = '0 0 5px red, 0 0 5px red';
            phoneStatus = false;
        } else {
            phoneStatus = true;
            inputTel.style.boxShadow = 'none';
        } 
    });

// --- Send user data to API ---

    const requerstURL = 'http://localhost:3000/user/postdata';

    function sendData() {

        const userName = document.getElementsByTagName("input")[0].value;
        const userTel = document.getElementsByTagName("input")[1].value;

        const userData = {
            name: userName,
            tel: userTel
        };

        if (nameStatus === false && phoneStatus === true) {
            inputName.style.boxShadow = '0 0 5px red, 0 0 5px red';
        } else if (nameStatus === true && phoneStatus === false) {
            inputTel.style.boxShadow = '0 0 5px red, 0 0 5px red';
        } else if (nameStatus === true && phoneStatus === true) {
            postData(requerstURL, userData)
            .then(data => {
                formSend.style.display = 'none';
                formDone.style.display = 'flex';
                console.log(userData);                  // console.log
                console.log(data);                      // console.log
            }).catch((err) => {
                console.log('Error:', err)
            });
        } else {
            console.log('send error: invalid data');
        }
    }

    async function postData (url, data)  {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        return await res;
    };

// --- Send data buttons ---

    formBtn.addEventListener('click', () => {
        sendData();
    });

    document.addEventListener('keyup', event => {
        if (event.code === 'Enter') {
            sendData();
        }
    });

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
