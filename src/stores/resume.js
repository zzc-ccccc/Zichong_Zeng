import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useResumeStore = defineStore('resume', () => {
  const state = ref(JSON.parse(localStorage.getItem('resume')) || {
    profile: null,
    experiences: [],
    educations: [],
    skills: []
  })

  // 自动保存到 localStorage
  watch(state, (val) => {
    localStorage.setItem('resume', JSON.stringify(val))
  }, { deep: true })

  const addExperience = (exp) => {
    state.value.experiences.push(exp)
  }

  return {
    state,
    addExperience,
    experiences: computed(() => state.value.experiences)
  }
})
