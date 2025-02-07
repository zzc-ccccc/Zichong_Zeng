/**
 * @component ProfileSection
 * @description 个人资料展示与编辑组件
 * 
 * 主要功能：
 * - 展示用户个人资料信息（姓名、职位、联系方式等）
 * - 提供编辑模式切换功能
 * - 管理技能标签的增删操作
 * - 与Pinia store进行数据同步
 * 
 * 包含部分：
 * 1. 头部信息展示区（包含头像占位）
 * 2. 关于我文本区域
 * 3. 技能标签管理系统
 * 4. 工作经历展示模块（从store获取数据）
 * 
 * 数据流：
 * - 通过props接收父组件传递的profile对象
 * - 使用localProfile进行本地数据管理
 * - 编辑完成后通过store同步数据
 * 
 * 编辑功能：
 * - 使用editMode状态控制编辑状态
 * - 支持文本字段的实时编辑
 * - 技能标签的交互式管理（添加/删除）
 * 
 * 样式说明：
 * - 使用响应式布局适配不同屏幕
 * - 包含编辑状态下的特殊样式处理
 * - 技能标签采用flex流式布局
 */



<template>
  <div class="profile-section">
    <div class="profile-header">
      <!-- <img src="@/assets/avatar-placeholder.png" class="avatar" alt="个人头像"> -->
      <div class="basic-info">

        <template v-if="!editMode">
          <h1>{{ localProfile.name }}</h1>
          <p class="position">{{ localProfile.position }}</p>
        </template>
        <template v-else>
          <input v-model="localProfile.name" class="edit-input name-input">
          <input v-model="localProfile.position" class="edit-input position-input">
        </template>

        <div class="contact-info">
          <template v-if="!editMode">
            <span>📧 {{ localProfile.email }}</span>
            <span>📱 {{ localProfile.phone }}</span>
          </template>
          <template v-else>
            <input v-model="localProfile.email" type="email" class="edit-input" placeholder="邮箱">
            <input v-model="localProfile.phone" class="edit-input" placeholder="电话">
          </template>
        </div>
      </div>
    </div>

    <div class="about-me">
      <h3>关于我</h3>
      <p v-if="!editMode">{{ localProfile.summary }}</p>
      <textarea v-else v-model="localProfile.summary" class="edit-textarea"></textarea>
    </div>

    <div class="skills">
      <h3>技术栈</h3>
      <div class="skill-tags">
        <template v-if="!editMode">
          <span v-for="(skill, index) in localProfile.skills" :key="index" class="skill-tag">
            {{ skill }}
          </span>
        </template>
        <template v-else>
          <div class="skill-editor">
            <span 
              v-for="(skill, index) in localProfile.skills" 
              :key="index" 
              class="skill-tag editable-tag"
            >
              {{ skill }}
              <button @click="removeSkill(index)" class="tag-remove">×</button>
            </span>
            <div class="new-skill">
              <input 
                v-model="newSkill" 
                @keyup.enter="addSkill"
                placeholder="输入新技能"
                class="skill-input"
              >
              <button @click="addSkill" class="add-skill-btn">+</button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 新增工作经历展示 -->
    <div class="work-experience" v-if="experiences.length > 0">
      <h3>工作经历</h3>
      <div v-for="(exp, index) in experiences" :key="index" class="experience-item">
        <div class="exp-header">
          <h4>{{ exp.position }}</h4>
          <span class="company">{{ exp.company }}</span>
          <span class="duration">{{ exp.duration }}</span>
        </div>
        <div class="exp-content" v-html="formatDescription(exp.description)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useResumeStore } from '../../../stores/resume'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const store = useResumeStore()
const experiences = computed(() => store.state.experiences)
const editMode = ref(false)
const localProfile = ref(JSON.parse(JSON.stringify(props.profile)))

const toggleEdit = () => {
  editMode.value = !editMode.value
  if (!editMode.value) {
    localProfile.value = JSON.parse(JSON.stringify(props.profile))
  }
}

const saveProfile = () => {
  store.state.profile = { ...localProfile.value }
  editMode.value = false
}

const newSkill = ref('')
const addSkill = () => {
  if (newSkill.value.trim() && !localProfile.value.skills.includes(newSkill.value.trim())) {
    localProfile.value.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

const removeSkill = (index) => {
  localProfile.value.skills.splice(index, 1)
}

const formatDescription = (text) => {
  return text.replace(/\n/g, '<br>').replace(/•/g, '• ')
}
</script>

<style scoped>
.profile-section {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.profile-header {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.basic-info h1 {
  margin: 0;
  color: #333;
}

.position {
  color: #666;
  margin: 0.5rem 0;
}

.contact-info {
  display: flex;
  gap: 1rem;
  color: #888;
}

.about-me {
  margin: 2rem 0;
}

.skills {
  margin-top: 2rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: #f0f2f5;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* 新增样式 */
.work-experience {
  margin-top: 2rem;
}

.experience-item {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.exp-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.exp-header h4 {
  margin: 0;
  color: #333;
}

.company {
  color: #666;
  justify-self: end;
}

.duration {
  grid-column: 1 / -1;
  color: #888;
  font-size: 0.9rem;
}

.exp-content {
  color: #444;
  line-height: 1.6;
}

.edit-controls {
  position: absolute;
  right: 2rem;
  top: 2rem;
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .save-btn, .cancel-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
}

.save-btn {
  background: #4CAF50;
  color: white;
}

.cancel-btn {
  background: #ff4444;
  color: white;
}

.edit-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0.3rem 0;
}

.name-input {
  font-size: 2em;
  font-weight: bold;
}

.position-input {
  font-size: 1.2em;
  color: #666;
}

.edit-textarea {
  width: 100%;
  height: 100px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.skill-editor {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.editable-tag {
  position: relative;
  padding-right: 25px;
}

.tag-remove {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0 5px;
}

.new-skill {
  display: flex;
  gap: 0.5rem;
}

.skill-input {
  width: 120px;
  padding: 0.3rem 0.5rem;
}

.add-skill-btn {
  padding: 0 0.5rem;
  background: #646cff;
  color: white;
  border-radius: 4px;
}
</style> 