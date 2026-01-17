<template>
  <div class="chat-dock">
    <div class="chat-tabs">
      <div
        v-for="chat in chatStore.activeChats"
        :key="chat.id"
        class="chat-tab-wrapper"
      >
        <ChatBubble
          :chat="chat"
          @close="closeChat(chat.id)"
        />
      </div>
    </div>

    <div class="chat-launcher-area">
      <ChatList />
    </div>
  </div>
</template>

<script setup>
  import { useChatStore } from '@/stores/chatStore'
  import ChatBubble from './ChatBubble.vue'
  import ChatList from './ChatList.vue'

  const chatStore = useChatStore()
</script>

<style scoped>
  .chat-dock {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
  }

  .chat-tabs {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 12px;
    padding: 8px 16px;
    pointer-events: auto;
  }

  .chat-tab-wrapper {
    position: relative;
  }
</style>
