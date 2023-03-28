const openModal = document.getElementById('openRegister');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeRegister');

const showRegisterModal = () => {
    modal.classList.toggle('is-active');
}

openModal.addEventListener('click', showRegisterModal)
closeModal.addEventListener('click', showRegisterModal)