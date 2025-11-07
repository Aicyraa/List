export default class Task{
   constructor(id, task, deadline) {
      this.id = id
      this.task = task
      this.deadline = deadline
      this.isComplete = false
   }
}
