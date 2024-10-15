<template>
    <q-layout class="lHh Lpr lFf fit flex column window-height">
    <router-view />
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'App'
})

import { useFileStore } from 'stores/filesStore.js'
import { useUserStore } from 'stores/userStore.js'

const fileStore = useFileStore()
const useStore = useUserStore()

</script>
