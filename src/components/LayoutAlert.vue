<script setup lang="ts">
import { useLayoutStore } from '../store.ts'
import Alert from '../components/Alert.vue'

const layout = useLayoutStore()

function closeHandler() {
  layout.alert.isVisible = false
}

</script>

<template>
  <Transition>
    <div v-if="layout.alert.isVisible" class="fixed z-50 bottom-0 left-0 right-0 px-4 pb-2">
      <Alert
        :type="layout.alert.type"
        @close="closeHandler"
      >
        {{ layout.alert.message }}
      </Alert>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  translate: 0 2rem;
}
</style>