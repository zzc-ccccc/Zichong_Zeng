<template>
  <div class="experience-section">
    <div class="section-header">
      <h3 class="section-title">📌 工作经历</h3>
      <div class="section-controls">
        <button v-if="!editMode" @click="enterEditMode" class="edit-btn">✏️ 编辑</button>
        <template v-else>
          <button @click="saveChanges" class="save-btn">💾 保存</button>
          <button @click="cancelEdit" class="cancel-btn">❌ 取消</button>
        </template>
      </div>
    </div>
    
    <div v-for="(exp, index) in localExperiences" :key="index" class="experience-item">
      <div class="item-header">
        <h4>经历 {{ index + 1 }}</h4>
        <button 
          @click="removeExperience(index)" 
          class="delete-btn" 
          v-if="editMode && localExperiences.length > 1"
        >
          🗑️ 删除
        </button>
      </div>
      
      <template v-if="editMode">
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
      </template>
      <template v-else>
        <div class="experience-display">
          <p class="company">{{ exp.company }}</p>
          <p class="position">{{ exp.position }}</p>
          <p class="duration">{{ exp.duration }}</p>
          <div class="description" v-html="formatDescription(exp.description)"></div>
        </div>
      </template>
    </div>

    <button 
      @click="addExperience" 
      class="add-btn"
      v-if="editMode"
    >
      ➕ 添加工作经历
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useResumeStore } from '../../../stores/resume'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])
const store = useResumeStore()
const editMode = ref(false)
const localExperiences = ref(JSON.parse(JSON.stringify(props.modelValue)))
const originalExperiences = ref([])

// 进入编辑模式
const enterEditMode = () => {
  originalExperiences.value = JSON.parse(JSON.stringify(localExperiences.value))
  editMode.value = true
}

// 保存修改
const saveChanges = () => {
  editMode.value = false
  updateStore()
}

// 取消编辑
const cancelEdit = () => {
  localExperiences.value = JSON.parse(JSON.stringify(originalExperiences.value))
  editMode.value = false
  updateStore()
}

// 更新store数据
const updateStore = () => {
  emit('update:modelValue', JSON.parse(JSON.stringify(localExperiences.value)))
  store.state.experiences = JSON.parse(JSON.stringify(localExperiences.value))
}

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
  // 触发双向绑定更新
  emit('update:modelValue', JSON.parse(JSON.stringify(localExperiences.value)))
  
  // 新增：直接更新store
  const store = useResumeStore()
  store.state.experiences = JSON.parse(JSON.stringify(localExperiences.value))
}

// 新增描述格式化方法
const formatDescription = (text) => {
  return text.replace(/\n/g, '<br>').replace(/•/g, '• ')
}
</script>

<style scoped>
.experience-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-controls {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .save-btn, .cancel-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.edit-btn {
  background: #646cff;
  color: white;
}

.save-btn {
  background: #4CAF50;
  color: white;
}

.cancel-btn {
  background: #ff4444;
  color: white;
}

.experience-display {
  padding: 0.5rem;
}

.company {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.3rem;
}

.position {
  color: #666;
  margin-bottom: 0.3rem;
}

.duration {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.description {
  color: #444;
  line-height: 1.6;
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
