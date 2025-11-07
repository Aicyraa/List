import Task from "./task.js";
import { setID as id, removeValue as remove, renderTask as render } from "./taskHelpers.js";
import modal, {
   openModal as open,
   closeModal as close,
   setError as err,
} from "./modals.js";

// Modal
modal.addBtn.addEventListener("click", open(modal.addModal, modal.overlay));
modal.closeBtn.addEventListener("click", close(modal.addModal, modal.overlay));
modal.errBtn.addEventListener("click", close(modal.errModal));
render()

// Add Task
modal.saveBtn.addEventListener("click", (e) => {
   let container = document.querySelector(".todo__container");
   let task = document.getElementById("add__task");
   let deadline = document.getElementById("add__task__due");
   let cls = close(modal.addModal, modal.overlay);

   if (!task.value.trim() || !deadline.value.trim()) {
      return err("Invalid Input!");
   }

   let [due, ] = deadline.value.split("T")

   let storage = JSON.parse(localStorage.getItem("storage")) || [];
   storage.push(new Task(id(), task.value, due));
   localStorage.setItem("storage", JSON.stringify(storage));

   remove(task, deadline);
   container.innerHTML = ''
   render()
   cls();
});
