import modalManager, {
   openModal as open,
   closeModal as close,
} from "./modal.manager.js";

export function setID() {
   let current_id = JSON.parse(localStorage.getItem("id")) || 1;
   let [old_value, new_value] = [current_id, ++current_id];
   localStorage.setItem("id", JSON.stringify(new_value));
   return old_value;
}

export function clearInputs(...inputs) {
   for (let input of inputs) {
      input.value = "";
   }
}

export function processDate(date) {
   return date.value.split("T");
}

export function editData(...newValue) {
   let [parent, newTask, newDate] = newValue;
   const data = parent.querySelector(".todo__info");
   const dataId = data.dataset.id;

   let storage = JSON.parse(localStorage.getItem("storage")).map(
      (currentTask) => {
         if (currentTask.id == dataId) {
            return {
               id: currentTask.id,
               task: newTask,
               deadline: newDate,
               isComplete: currentTask.isComplete,
            };
         }
         return currentTask
      }
   );

   document.querySelector(".main__todo__container").innerHTML = "";
   localStorage.setItem("storage", JSON.stringify(storage))
   renderTask();
}

export function renderTask() {
   let storage = JSON.parse(localStorage.getItem("storage"));
   if (!storage || storage == "") return;

   storage.forEach((task) => {
      let el = document.createElement("div");
      el.setAttribute("class", `todo todo__${task.id}`);
      el.innerHTML = `
         <div class="todo__info" data-id=${task.id}>
            <div class="todo__info__left">
               <input type="radio" id="todo__radio__${task.id}" value="${task.id}" />
               <span id="todo__task"> ${task.task} </span>
            </div>
            <div class="todo__info__right">
               <div class="todo__info__btns">
                  <img src="img/edit_calendar_17dp_434343_FILL0_wght400_GRAD0_opsz20.svg" dataset-id="${task.id}" class="edit__btn"/>
                  <img src="img/delete_17dp_434343_FILL0_wght400_GRAD0_opsz20.svg" dataset-id="${task.id}" class="dlt__btn" />
               </div>
               <span id="todo__date"> ${task.deadline} </span>
            </div>
         </div> 
         `;

      document.querySelector(".main__todo__container").append(el);
      attachListeners(task);
   });
}

// modularize

function attachListeners(task) {
   let parent = document.querySelector(`.todo__${task.id}`);
   parent.querySelector("input").addEventListener("click", (e) => {
      parent.querySelector("span").classList.toggle("done");
   });

   let btns = parent.querySelector(".todo__info__btns");
   for (let btn of btns.children) {
      if (btn.classList.contains("edit__btn")) {
         btn.addEventListener("click", (e) => {
            open(modalManager.editModal, modalManager.overlay__screen)();
            modalManager.editModal.dataset.task = task.id;
         });
         continue;
      }

      btn.addEventListener("click", (e) => {
         let storage = JSON.parse(localStorage.getItem("storage"));
         const index = storage.findIndex(
            (currentTask) => currentTask.id === task.id
         );

         if (index != -1) {
            storage.splice(index, 1);
         }

         localStorage.setItem("storage", JSON.stringify(storage));
         parent.remove();
      });
   }
}
