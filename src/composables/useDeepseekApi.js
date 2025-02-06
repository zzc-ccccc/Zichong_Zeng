import axios from 'axios'

export const useDeepseek = () => {
  const optimizeResume = async (content) => {
    try {
      const { data } = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: "deepseek-chat",
          messages: [{
            role: "user",
            content: `请优化以下简历内容，保持原有格式但提升专业性：\n${JSON.stringify(content)}`
          }]
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return data.choices[0].message.content
    } catch (error) {
      console.error('优化失败:', error.response?.data || error.message)
      throw error
    }
  }

  return { optimizeResume }
}
