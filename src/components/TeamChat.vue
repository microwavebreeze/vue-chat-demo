<template>
  <div id="team-chat-wrapper" class="chat-navbar-container">
    <div class="chat-bubbles-stack">
      <TransitionGroup name="chat-slide">
        <ChatBubble
          v-for="chat in chatStore.activeChats"
          :key="chat.id"
          :chat="chat"
        />
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
