import Task from "./task.class.js";
import { setID as id, clearInputs as clear, renderTask as render, processDate, editData} from "./task.helpers.js";
import modalManager, {
   openModal as open,
   closeModal as close,
   setError as err,
} from "./modal.manager.js";

// Modal
modalManager.addModalOpenBtn.addEventListener("click", open(modalManager.addModal, modalManager.overlay__screen));
modalManager.addModalBtnClose.addEventListener("click", close(modalManager.addModal, modalManager.overlay__screen))
modalManager.editModalCloseBtn.addEventListener("click", close(modalManager.editModal, modalManager.overlay__screen));
modalManager.errBtn.addEventListener("click", close(modalManager.errModal));
render()

// Add Task
modalManager.saveBtn.addEventListener("click", (e) => {
   let container = document.querySelector(".main__todo__container");
   let task = document.getElementById("add__modal__task");
   let deadline = document.getElementById("add__modal__task__due");

   if (!task.value.trim() || !deadline.value.trim()) {
      return err("Invalid Input!");
   }

   let [date, time] = processDate(deadline)

   let storage = JSON.parse(localStorage.getItem("storage")) || [];
   storage.push(new Task(id(), task.value, date));
   localStorage.setItem("storage", JSON.stringify(storage));

   container.innerHTML = ''
   render()
   clear(task, deadline);
   close(modalManager.addModal, modalManager.overlay__screen)();
   
});

modalManager.editModalSavebtn.addEventListener("click", () => {
   let editingId, parent, currentTask, currentDate;
   editingId = modalManager.editModal.dataset.task
   parent = document.querySelector(`.todo__${editingId}`)
   currentTask = parent.querySelector("#todo__task").textContent
   currentDate = parent.querySelector("#todo__date").textContent

   let [newTask, newDate] = [
      modalManager.editModal.querySelector("textarea"),
      modalManager.editModal.querySelector("input"),
   ]

   let [date] = processDate(newDate)

   editData(parent, newTask.value || currentTask, date || currentDate)
   clear(newTask, newDate)
   close(modalManager.editModal, modalManager.overlay__screen)()
})
