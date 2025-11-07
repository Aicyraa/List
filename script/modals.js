let add_modal = {
   overlay: document.querySelector(".overlay"),
   addModal: document.querySelector(".header__add"),
   errModal: document.querySelector(".error__modal"),
   editModal: document.querySelector(".todo__edit"),
   errBtn: document.getElementById("error__close"),
   closeBtn: document.getElementById("header__close__btn"),
   addBtn: document.getElementById("header__add__btn"),
   saveBtn: document.querySelector("#header__add__submit"),
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
   add_modal.errModal.querySelector('h3').textContent = err
   let open = openModal(add_modal.errModal);
   open()
}

export default add_modal;
