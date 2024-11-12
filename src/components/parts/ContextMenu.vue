<template>
    <div
      v-if="isMenuVisible"
      :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }"
      class="context-menu"
    >
      <ul>
        <slot></slot>
      </ul>
    </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    isMenuVisible: {
        type: Boolean,
        default: false,
    },
    menuPosition: {
        type: Object,
        default: { x: 0, y: 0 },
    }
})
</script>

<style scoped>
.context-area {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.context-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f0f0f0;
}
</style>