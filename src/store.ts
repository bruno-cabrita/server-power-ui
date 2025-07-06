import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Alert } from './types.ts'

export const useLayoutStore = defineStore('layout', () => {

  const alert = reactive<Alert>({
    isVisible: false,
    type: 'success',
    message: '',
  })

  function setAlert(payload: Omit<Alert, 'isVisible'>) {
    alert.message = payload.message
    alert.type = payload.type
    alert.isVisible = true
  }

  function showSuccessAlert(message: string) {
    setAlert({type: 'success', message})
  }

  function showDangerAlert(message: string) {
    setAlert({type: 'danger', message})
  }

  return {
    alert,
    setAlert,
    showSuccessAlert,
    showDangerAlert,
  }
})
