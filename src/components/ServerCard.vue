<script setup lang="ts">
import { ref } from 'vue'
import { IconReload } from '@tabler/icons-vue'
import { useLayoutStore } from '../store.ts'
import type { ServerList } from '../types.ts'
import Button from '../components/Button.vue'

const props = defineProps<{
  server: ServerList[number],
}>()

const layout = useLayoutStore()
const isLoading = ref(false)

async function powerOnHandler() {
  isLoading.value = true
  fetch(`/api/server/${props.server.id}/poweron`)
    .then((res) => res.json())
    .then(({ success }) => {
      if(success)
        layout.showSuccessAlert(`${props.server.name} was powered on. Wait a few minutes before refresh the page to confirm.`)
    })
    .catch((err) => {
      console.error(err)
      layout.showDangerAlert(err.message)
    })
    .finally(() => {
      isLoading.value = false
    })
}

async function powerOffHandler() {
  isLoading.value = true
  fetch(`/api/server/${props.server.id}/poweroff`)
    .then((res) => res.json())
    .then(({ success }) => {
      if(success)
        layout.showSuccessAlert(`${props.server.name} was powered off. Wait a few minutes before refresh the page to confirm.`)
    })
    .catch((err) => {
      console.error(err)
      layout.showDangerAlert(err.message)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>
<template>
  <div class="border-2 border-gray-800 rounded-xl p-4 flex flex-col gap-2 overflow-hidden">
    <div class="flex flex-row justify-between items-center">
      <RouterLink
        :to="{ name: 'update-server', params: { id: props.server.id }}"
        class="-my-1 font-bold text-lg text-gray-400 hover:text-fuchsia-400 hover:underline"
      >
        {{ props.server.name }}
      </RouterLink>
      <div class="text-small text-gray-700">
        <div v-if="props.server.online" class="h-4 rounded-full aspect-square bg-green-600"></div>
        <div v-else class="h-4 rounded-full aspect-square bg-gray-700"></div>
      </div>
    </div>
    <div class="flex flex-col text-sm">
      <p><strong>IP:</strong> {{ props.server.ip }}</p>
      <p><strong>MAC:</strong> {{ props.server.mac }}</p>
    </div>
    <div class="flex flex-row gap-2">
      <Button v-if="isLoading"><IconReload :size="20" v-if="isLoading" class="animate-spin"/></Button>
      <Button v-else-if="!props.server.online" @click="powerOnHandler">Power On</Button>
      <Button v-else @click="powerOffHandler">Power Off</Button>
    </div>
  </div>
</template>

