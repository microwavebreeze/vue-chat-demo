<template>
  <div class="chat-window">
    <div
      class="chat-header"
      @click="toggleMinimize"
    >
      <span class="chat-title">{{ chat.name }}</span>
      <div class="chat-actions">
        <button
          class="close-btn"
          @click.stop="chatStore.closeChat(chat.id)"
        >
          ✕
        </button>
      </div>
    </div>

    <template v-if="!chat.isMinimized">
      <div
        ref="messageContainer"
        class="chat-body chat-scrollbar"
      >
        <div
          v-for="msg in chat.messages"
          :key="msg.id"
          class="message"
          :class="msg.sender === 'me' ? 'sent' : 'received'"
        >
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-input-area">
        <input
          v-model="newMessage"
          type="text"
          class="chat-input"
          placeholder="Type a message..."
          @keyup.enter="handleSend"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
  import { ref, nextTick, watch } from 'vue'
  import { useChatStore } from '@/stores/chatStore'

  const props = defineProps({ chat: Object })
  const chatStore = useChatStore()
  const newMessage = ref('')
  const messageContainer = ref(null)

  const toggleMinimize = () => {
    chatStore.toggleMinimize(props.chat.id)
  }

  const handleSend = () => {
    if (!newMessage.value.trim()) return
    chatStore.sendMessage(props.chat.id, newMessage.value)
    newMessage.value = ''
  }

  watch(
    () => props.chat.messages,
    async () => {
      await nextTick()
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
      }
    },
    { deep: true },
  )
</script>

<style scoped>
  .chat-window {
    position: absolute;
    bottom: 64px; /* height of dock + spacing */
    right: 0;
    width: 360px;
    height: 420px; /* FIXED HEIGHT */
    max-height: calc(100vh - 96px);
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    padding: 12px 16px;
    background: #3b82f6;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .chat-title {
    font-weight: bold;
    font-size: 16px;
  }
  .close-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
  }

  .chat-body {
    flex: 1;
    min-height: 0;
    padding: 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f3f4f6;
  }

  .message {
    padding: 10px 14px;
    border-radius: 16px;
    max-width: 80%;
    line-height: 1.5;
  }

  .sent {
    background: #3b82f6;
    color: white;
    align-self: flex-end;
  }

  .received {
    background: #e5e7eb;
    color: #111;
    align-self: flex-start;
  }

  .chat-input-area {
    flex-shrink: 0;
    padding: 12px;
    border-top: 1px solid #ddd;
    background: #fff;
  }

  .chat-input {
    width: 100%;
    padding: 8px 12px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
  }
</style>
