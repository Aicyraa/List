let modalManager = {
   // re organized the codfe and their names
   overlay__screen: document.querySelector(".overlay__screen"),

   addModalOpenBtn: document.getElementById("main__header__button"),
   addModalBtnClose: document.getElementById("add__modal__button__close"),
   saveBtn: document.getElementById("add__modal__submit"),
   addModal: document.querySelector(".add__modal"),

   errBtn: document.getElementById("error__modal__btn__close"),
   errModal: document.querySelector(".error__modal"),

   editModalCloseBtn: document.getElementById("edit__modal__button__close"),
   editModal: document.querySelector(".edit__modal"),

};

export function openModal(...modals) {
   return function () {
      for (let modal of modals) {
         modal.classList.add("active");
      }
   };
}

export function closeModal(...modals) {
   return function () {
      for (let modal of modals) {
         modal.classList.remove("active");
      }
   };
}

export function setError(err) {
   modalManager.errModal.querySelector('h3').textContent = err
   openModal(modalManager.errModal)();
}

export default modalManager;
