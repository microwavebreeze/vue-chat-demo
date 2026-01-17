<template>
  <div id="team-chat-wrapper" class="chat-navbar-container">
    <div class="chat-bubbles-stack">
      <TransitionGroup name="chat-slide">
        <ChatBubble v-for="chat in chatStore.activeChats" :key="chat.id" :chat="chat" />
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
/* Note: .chat-navbar-container is already defined in your main.css
   with fixed positioning and pointer-events: none logic.
*/

.chat-bubbles-stack {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  /* Re-enable clicks for the actual bubbles */
  pointer-events: auto;
}

.chat-launcher-area {
  /* Re-enable clicks for the contact list */
  pointer-events: auto;
}

/* --- Facebook-style slide transitions --- */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Prevents "snapping" when a middle bubble is closed */
.chat-slide-move {
  transition: transform 0.3s ease;
}
</style>
