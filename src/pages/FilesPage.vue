<template>
  <q-layout class="fit">
    <q-header elevated style="position: relative;">
      <q-toolbar class="flex q-pa-ms justify-between">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <div @click="closeSession()" class="cursor-pointer">Cerrar session</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="q-pt-md">
      <q-list>
        <q-item clickable>
          <q-item-section>
            <RouterLink class="q-px-md text-h4" to="/files">ver archivos</RouterLink>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <RouterLink class="q-px-md text-h4" to="/create">create archivo</RouterLink>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <router-view name="files" />
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'FilesPage'
})
import { useUserStore } from 'stores/userStore.js'

import { ref } from 'vue'

// import { NavBar } from 'src/components/NavBar.vue'
const userStore = useUserStore()
const leftDrawerOpen = ref(false)

const closeSession = () => {
  userStore.setValue('')
  window.location.reload()
}

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

<style scoped>
a {
  text-decoration: none;
  color: #121212;
}
</style>
