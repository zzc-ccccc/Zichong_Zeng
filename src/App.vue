<template>
  <div class="resume-builder">
    <header class="header">
      <nav class="nav-links">
        <button @click="currentView = 'profile'">个人主页</button>
        <button @click="currentView = 'editor'">简历编辑</button>
      </nav>
    </header>

    <main class="main-content">
      <div v-if="currentView === 'profile'" class="profile-view">
        <ProfileSection :profile="profileData" />
      </div>

      <div v-else class="editor-container">
        <div id="resume-container" class="resume-preview">
          <ProfileSection :profile="store.state.profile" />
          <ExperienceSection v-model="store.state.experiences" />
        </div>
        
        <aside class="toolbar">
          <AIOptimizer @optimize="handleOptimize" />
          <PDFExporter @export="handleExport" />
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from './stores/resume'
import ProfileSection from './components/ResumeEditor/sections/ProfileSection.vue'
import ExperienceSection from './components/ResumeEditor/sections/ExperienceSection.vue'
import PDFExporter from './components/ResumeEditor/PDFExporter.vue'
import AIOptimizer from './components/ResumeEditor/AIOptimizer.vue'

const currentView = ref('profile')
const store = useResumeStore()

// 初始化个人资料数据
const profileData = ref({
  name: '曾紫翀',
  position: '全栈开发工程师',
  email: 'zhangsan@example.com',
  phone: '138-1234-5678',
  summary: '5年以上全栈开发经验，精通Vue生态和Node.js后端开发，具备大型项目架构经验',
  skills: ['Vue3', 'TypeScript', 'Node.js', 'Docker', 'AWS']
})

// 同步到 store
if (!store.state.profile) {
  store.state.profile = profileData.value
}

// 初始化示例数据
if (store.experiences.length === 0) {
  store.addExperience({
    company: '示例科技公司',
    position: '前端开发工程师',
    duration: '2022.01-至今',
    description: '负责Vue3项目开发与维护'
  })
}

const handleExport = async () => {
  store.autoSave()
}

const handleOptimize = (content) => {
  console.log('执行优化:', content)
}
</script>

<style>
/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.resume-builder {
  min-height: 100vh;
  background: #f0f2f5;
}

.header {
  background: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.resume-preview {
  background: white;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.toolbar {
  background: #fff;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
}

#resume-container {
  min-height: 1000px; /* 保证导出内容可见 */
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links button {
  padding: 0.5rem 1rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
}

.profile-view {
  max-width: 800px;
  margin: 2rem auto;
}

.action-buttons {
  margin-top: 2rem;
  text-align: center;
}

.edit-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: #4CAF50;
  color: white;
}
</style>
