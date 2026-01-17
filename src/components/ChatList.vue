<template>
  <div class="contact-list-container">
    <button
      type="button"
      class="contact-list-trigger"
      @click="isOpen = !isOpen"
    >
      Contacts ({{ chatStore.contacts.length }})
    </button>

    <div
      v-if="isOpen"
      class="contact-menu"
    >
      <div class="contact-menu-header">CONTACTS</div>

      <div
        v-for="user in chatStore.contacts"
        :key="user.id"
        class="contact-item"
        @click="handleUserSelect(user)"
      >
        <div
          class="status-dot"
          :class="user.online ? 'online' : 'offline'"
        ></div>
        <span class="contact-name">{{ user.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useChatStore } from '@/stores/chatStore'

  const chatStore = useChatStore()
  const isOpen = ref(false)

  const handleUserSelect = (user) => {
    chatStore.openChat(user.id) // allow offline users too
    isOpen.value = false
  }
</script>

<style scoped>
  .contact-list-container {
    position: relative;
  }

  .contact-list-trigger {
    background: #fff;
    border: 1px solid #ccc;
    padding: 14px 22px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }

  .contact-list-trigger:hover {
    background: #f0f0f0;
  }

  .contact-menu {
    position: absolute;
    bottom: 100%;
    right: 0;
    width: 260px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    /* border-top: solid 3px black; */
  }

  .contact-menu-header {
    padding: 10px 12px;
    background: #f3f4f6;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    font-weight: bold;
    color: #555;
    text-transform: uppercase;
  }

  .contact-item {
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background 0.2s;
  }

  .contact-item:last-child {
    border-bottom: none;
  }

  .contact-item:hover {
    background: #f9fafb;
  }

  .contact-name {
    font-size: 15px;
    color: #111;
  }

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .online {
    background: #22c55e;
  }

  .offline {
    background: #9ca3af;
  }
</style>
