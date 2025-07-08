<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { IconReload } from '@tabler/icons-vue'
import type { ServerList } from '../types.ts'
import {
  useLayoutStore,
  useServersStore,
} from '../store.ts'
import MainLayout from '../layouts/MainLayout.vue'
import Button from '../components/Button.vue'
import ServerCard from '../components/ServerCard.vue'

const layout = useLayoutStore()
const servers = useServersStore()
const isLoading = ref(true)

async function refreshHandler() {
  isLoading.value = true

  await servers.fetch()
    .catch((err) => {
      console.error(err)
      layout.showDangerAlert(err.message)
    })

  isLoading.value = false

}

onBeforeMount(refreshHandler)
</script>
<template>
  <MainLayout>
    <template #header-nav>
      <Button @click="refreshHandler">
        <IconReload :size="20" v-if="isLoading" class="animate-spin"/>
        <span v-else>Refresh</span>
      </Button>
    </template>
    <main class="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <template v-for="server in servers.servers" :key="`server-${server.id}`">
        <ServerCard :server="server" />
      </template>
      <RouterLink
        :to="{ name: 'create-server'}"
        class="min-h-36 border-2 border-dashed border-gray-900 rounded-xl p-4 flex flex-col justify-center items-center gap-2 cursor-pointer overflow-hidden hover:border-gray-700 text-gray-800 hover:text-gray-600"
      >
        <h3 class="text-lg font-bold uppercase">Add Server</h3>
      </RouterLink>
    </main>
  </MainLayout>
</template>