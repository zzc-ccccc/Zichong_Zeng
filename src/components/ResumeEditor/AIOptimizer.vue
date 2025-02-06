<template>
  <div class="ai-optimizer">
    <div class="optimize-controls">
      <select v-model="selectedSection" class="section-select">
        <option value="all">全部内容</option>
        <option value="experiences">工作经历</option>
        <option value="educations">教育背景</option>
        <option value="skills">技能评价</option>
      </select>
      
      <textarea
        v-model="userPrompt"
        placeholder="输入优化要求（例如：更专业的表达、量化工作成果）"
        class="prompt-input"
        rows="2"
      ></textarea>
      
      <button 
        @click="handleOptimize"
        :disabled="isOptimizing"
        class="optimize-btn"
      >
        {{ isOptimizing ? '优化中...' : '✨ AI 智能优化' }}
      </button>
    </div>

    <div v-if="optimizeResult" class="result-preview">
      <h4>优化建议：</h4>
      <div class="preview-content">{{ optimizeResult }}</div>
      <div class="preview-actions">
        <button @click="applyOptimization" class="apply-btn">应用修改</button>
        <button @click="optimizeResult = null" class="cancel-btn">取消</button>
      </div>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../../stores/resume'
import { useDeepseek } from '../../composables/useDeepseekApi'

const store = useResumeStore()
const { optimizeResume } = useDeepseek()

const selectedSection = ref('all')
const userPrompt = ref('')
const isOptimizing = ref(false)
const optimizeResult = ref(null)
const errorMessage = ref(null)

const getContentToOptimize = () => {
  switch(selectedSection.value) {
    case 'experiences':
      return store.state.experiences
    case 'educations':
      return store.state.educations
    case 'skills':
      return store.state.skills
    default:
      return store.state
  }
}

const handleOptimize = async () => {
  try {
    isOptimizing.value = true
    errorMessage.value = null
    
    const content = JSON.stringify(getContentToOptimize())
    const fullPrompt = `${userPrompt.value}\n原始内容：${content}`
    
    optimizeResult.value = await optimizeResume(fullPrompt)
  } catch (error) {
    errorMessage.value = '优化失败，请检查网络或稍后重试'
  } finally {
    isOptimizing.value = false
  }
}

const applyOptimization = () => {
  try {
    const parsedResult = JSON.parse(optimizeResult.value)
    if (selectedSection.value === 'all') {
      store.state = parsedResult
    } else {
      store.state[selectedSection.value] = parsedResult
    }
    optimizeResult.value = null
  } catch (error) {
    errorMessage.value = '应用优化结果失败，请检查格式'
  }
}
</script>

<style scoped>
.ai-optimizer {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f5f7fa;
  border-radius: 8px;
}

.optimize-controls {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 2fr auto;
}

.section-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.prompt-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.optimize-btn {
  background: #646cff;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.optimize-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.result-preview {
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 6px;
}

.preview-content {
  white-space: pre-wrap;
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.preview-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.apply-btn {
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
}

.cancel-btn {
  background: #ff4444;
  color: white;
  padding: 0.5rem 1rem;
}

.error-message {
  color: #ff4444;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #ffecec;
  border-radius: 4px;
}
</style>
