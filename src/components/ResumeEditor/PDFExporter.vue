<template>
  <button class="export-btn" @click="exportToPDF">
    {{ loading ? '生成中...' : '导出PDF' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const loading = ref(false)

const exportToPDF = async () => {
  loading.value = true
  try {
    const element = document.getElementById('resume-container')
    const canvas = await html2canvas(element, { 
      scale: 2,
      useCORS: true
    })
    
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = (canvas.height * pageWidth) / canvas.width
    
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pageWidth, pageHeight)
    pdf.save('my-resume.pdf')
  } finally {
    loading.value = false
  }
}
</script>
