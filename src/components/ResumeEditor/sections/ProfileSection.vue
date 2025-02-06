<template>
  <div class="profile-section">
    <div class="profile-header">
      <!-- <img src="@/assets/avatar-placeholder.png" class="avatar" alt="个人头像"> -->
      <div class="basic-info">
        <h1>{{ profile.name }}</h1>
        <p class="position">{{ profile.position }}</p>
        <div class="contact-info">
          <span>📧 {{ profile.email }}</span>
          <span>📱 {{ profile.phone }}</span>
        </div>
      </div>
    </div>

    <div class="about-me">
      <h3>关于我</h3>
      <p>{{ profile.summary }}</p>
    </div>

    <div class="skills">
      <h3>技术栈</h3>
      <div class="skill-tags">
        <span v-for="(skill, index) in profile.skills" :key="index" class="skill-tag">
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true
  }
})
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
</style> 