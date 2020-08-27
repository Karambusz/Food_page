// Forms
import {closeModal, openModal} from './modal.js';
import {postData} from '../services/services.js';

function forms(formSelector, modalTimerId) {


    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро с вами свяжемся',
        failure: 'Что-то пошло не так... '
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');


        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    const forms = document.querySelectorAll(formSelector);




    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php', true);

            //request.setRequestHeader('Content-type', 'multipart/form-data'); 1) using XMLHttpRequest  //when we use form-data, setRequestHeader - isn't required
            //  request.setRequestHeader('Content-type', 'application/json'); 2) using XMLHttpRequest (JSON)

            const formData = new FormData(form); // creating form

            // 1
            // const object = {};
            // formData.forEach( (value, key) => {
            //     object[key] = value;
            // });

            // 2
            const json = JSON.stringify(Object.fromEntries(formData.entries())); //formData.entries() - to array of arrays, Object.fromEntries - to object

            //request.send(formData);
            //request.send(json);

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    forms.forEach(item => {
        bindPostData(item);
    });

}

export default forms;