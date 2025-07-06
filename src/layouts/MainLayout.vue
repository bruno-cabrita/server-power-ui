<script setup lang="ts">
import Header from '../components/Header.vue'
import LayoutAlert from '../components/LayoutAlert.vue'
</script>
<template>
  <div class="grow flex flex-col">
    <Header>
      <slot name="header-nav"/>
    </Header>
    <main class="grow flex flex-col">
      <slot/>
    </main>
    <LayoutAlert />
  </div>
</template>