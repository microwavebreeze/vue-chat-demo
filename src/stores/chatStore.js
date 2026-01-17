import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const contacts = reactive([
    { id: 1, name: 'Alice', online: true },
    { id: 2, name: 'Bob', online: false },
  ])

  const activeChats = reactive([])

  const openChat = (userId) => {
    if (!activeChats.find((c) => c.id === userId)) {
      const user = contacts.find((c) => c.id === userId)
      activeChats.push({
        id: user.id,
        name: user.name,
        messages: [],
        isMinimized: false,
      })
    }
  }

  const closeChat = (chatId) => {
    const idx = activeChats.findIndex((c) => c.id === chatId)
    if (idx !== -1) activeChats.splice(idx, 1)
  }

  const toggleMinimize = (chatId) => {
    const chat = activeChats.find((c) => c.id === chatId)
    if (chat) chat.isMinimized = !chat.isMinimized
  }

  const sendMessage = (chatId, text) => {
    const chat = activeChats.find((c) => c.id === chatId)
    if (!chat) return
    chat.messages.push({ id: Date.now(), text, sender: 'me' })

    // simulate reply
    setTimeout(() => {
      chat.messages.push({ id: Date.now() + 1, text: 'ok', sender: 'them' })
    }, 500)
  }

  return {
    contacts,
    activeChats,
    openChat,
    closeChat,
    toggleMinimize,
    sendMessage,
  }
})
