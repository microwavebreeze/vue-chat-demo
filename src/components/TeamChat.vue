<template>
  <div class="chat-dock">
    <div class="chat-tabs">
      <TransitionGroup name="chat-slide">
        <div
          v-for="chat in chatStore.activeChats"
          :key="chat.id"
          class="chat-tab-wrapper"
        >
          <ChatBubble :chat="chat" />
        </div>
      </TransitionGroup>
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
    left: 0;
    height: 56px;
    background: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 16px;
    gap: 12px;
    z-index: 9999;
  }

  .chat-tabs {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    margin-right: 12px;
  }

  .chat-tab-wrapper {
    position: relative;
  }
</style>
