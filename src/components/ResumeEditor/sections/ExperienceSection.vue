<template>
  <div class="experience-section">
    <h3 class="section-title">📌 工作经历</h3>
    
    <div v-for="(exp, index) in localExperiences" :key="index" class="experience-item">
      <div class="item-header">
        <h4>经历 {{ index + 1 }}</h4>
        <button @click="removeExperience(index)" class="delete-btn" v-if="localExperiences.length > 1">
          🗑️ 删除
        </button>
      </div>
      
      <div class="input-group">
        <input 
          v-model="exp.company"
          @input="handleChange"
          placeholder="公司名称"
          class="input-field"
        >
        <input
          v-model="exp.position"
          @input="handleChange"
          placeholder="职位名称"
          class="input-field"
        >
      </div>
      
      <div class="input-group">
        <input
          v-model="exp.duration"
          @input="handleChange"
          placeholder="工作时间（例：2020.03-2022.05）"
          class="input-field duration-input"
        >
      </div>
      
      <textarea
        v-model="exp.description"
        @input="handleChange"
        placeholder="主要工作内容（建议分点描述）"
        class="description-textarea"
        rows="3"
      ></textarea>
    </div>

    <button @click="addExperience" class="add-btn">
      ➕ 添加工作经历
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

// 本地数据副本
const localExperiences = ref(JSON.parse(JSON.stringify(props.modelValue)))

// 同步父组件数据变化
watch(() => props.modelValue, (newVal) => {
  localExperiences.value = JSON.parse(JSON.stringify(newVal))
})

// 添加新经历
const addExperience = () => {
  localExperiences.value.push({
    company: '',
    position: '',
    duration: '',
    description: ''
  })
  handleChange()
}

// 删除经历
const removeExperience = (index) => {
  localExperiences.value.splice(index, 1)
  handleChange()
}

// 数据变化处理
const handleChange = () => {
  emit('update:modelValue', JSON.parse(JSON.stringify(localExperiences.value)))
}
</script>

<style scoped>
.experience-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.section-title {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.experience-item {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.input-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.duration-input {
  max-width: 300px;
}

.description-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
}

.add-btn {
  background: #4CAF50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #45a049;
}

.delete-btn {
  background: #ff4444;
  color: white;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
