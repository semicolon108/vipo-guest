import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  // fetch userData
  const isTask = ref(false)

  const taskModal = (task:any) =>{
    isTask.value = task
  }
  return {
    isTask,
    taskModal
  }
})
