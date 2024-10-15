<template>
    <q-header elevated style="position: relative;">
      <q-toolbar>
        <q-toolbar-title>
          <RouterLink class="q-px-sm" to="/files">ver archivos</RouterLink>
          <RouterLink class="q-px-sm" to="/create">create archivo</RouterLink>
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
</template>

<script setup>
defineOptions({
  name: 'NavBar'
})
</script>
