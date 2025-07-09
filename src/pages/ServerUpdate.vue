<script setup lang="ts">
import { computed, reactive, ref, onBeforeMount } from 'vue'
import { IconReload } from '@tabler/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Button from '../components/Button.vue'
import { useLayoutStore } from '../store.ts'
import { ServerUpdateInputSchema } from '../schemas.ts'
import type { ServerUpdateInput } from '../types.ts'

const route = useRoute()
const router = useRouter()
const layout = useLayoutStore()
const isLoading = ref(false)

const id = route.params.id as string

const form = reactive<ServerUpdateInput>({
  name: '',
  mac: '',
  ip: '',
  user: '',
})

const isFormValid = computed(() => {
  const { success } = ServerUpdateInputSchema.safeParse({...form})
  return success
})

async function submitHandler() {
  isLoading.value = true

  const res = await fetch(`/api/server/${id}/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      layout.showDangerAlert(err.message)
    })
  
  isLoading.value = false
  if(res.success) {
    layout.showSuccessAlert(`Server ${form.name} was updated.`)
    router.push({ name: 'home' })
  } else {
    layout.showDangerAlert(`Error ocurred when creating server.`)
  }
}

async function fetchData() {
  isLoading.value = true

  const res = await fetch(`/api/server/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      layout.showDangerAlert(err.message)
    })
  
  isLoading.value = false

  Object.assign(form, res)
}

onBeforeMount(fetchData)
</script>
<template>
  <MainLayout>
    <template #header-nav>
      <RouterLink :to="{ name: 'home' }">
        <Button>Back</Button>
      </RouterLink>
    </template>
    <main class="px-4 py-6 flex flex-col mx-auto">
      <main class="border-2 border-gray-800 rounded-xl p-4 grid grid-cols-[110px_180px] gap-2 items-center overflow-hidden">
        <label for="name" class="justify-self-end font-bold text-sm uppercase tracking-tight">
          Name:
        </label>
        <input
          v-model="form.name"
          id="name"
          type="text"
          placeholder="Example Server"
          class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
        />
        <label for="mac" class="justify-self-end font-bold text-sm uppercase tracking-tight">
          Mac Address:
        </label>
        <input
          v-model="form.mac"
          id="mac"
          type="text"
          placeholder="00:00:00:00:00:00"
          class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
        />
        <label for="ip" class="justify-self-end font-bold text-sm uppercase tracking-tight">
          IP Address:
        </label>
        <input
          v-model="form.ip"
          id="ip"
          type="text"
          placeholder="10.0.0.100"
          :minlength="7"
          :maxlength="15"
          :size="15"
          class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
        />
        <label for="user" class="justify-self-end font-bold text-sm uppercase tracking-tight">
          User:
        </label>
        <input
          v-model="form.user"
          id="user"
          type="text"
          placeholder="root"
          class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
        />
        <label for="password" class="justify-self-end font-bold text-sm uppercase tracking-tight">
          Password:
        </label>
        <input
          v-model="form.password"
          id="password"
          type="password"
          placeholder="(optional)"
          class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
        />
        <div class="col-span-2 flex flex-row justify-center mt-4">
          <Button @click="submitHandler" :disabled="!isFormValid">
            <IconReload :size="20" v-if="isLoading" class="animate-spin"/>
            <span v-else>Update</span>
          </Button>
        </div>
      </main>
    </main>
  </MainLayout>
</template>