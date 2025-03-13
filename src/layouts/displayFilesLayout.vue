<template>
  <q-layout v-if="file_store.pin_files.length > 0" class="flex column full-width text-center"
    style="min-height: 0;">
    <h4 class="q-ma-md">Archivos anclados</h4>
    <section class="full-width flex row wrap items-start q-px-md">
    <CardFile v-for="objt in file_store.pin_files" v-bind:key="objt.id" v-bind:show="false" :show_pin="false" v-bind:objt="objt"></CardFile>
    </section >
  </q-layout>
  <q-layout class="flex column full-width text-center"
    style="min-height: 0;">
    <h4 class="q-ma-md">Archivos</h4>
    <section class="full-width flex row wrap items-start q-px-md">
    <CardFile v-for="objt in file_store.files" v-bind:key="objt.id" v-bind:objt="objt" :show_pin="true"></CardFile>
    </section >
  </q-layout>
</template>

<style scoped lang="scss">
@media (max-width: 600px) {
  .q-layout {
    justify-content: center;
  }
}
</style>
<script setup>
defineOptions({
  name: 'displayFilesLayout'
})

import { onMounted, ref } from 'vue'

import { getFiles } from 'src/services/filesServices.js'

import { useFileStore } from 'src/stores/filesStore.js'

import CardFile from 'components/CardFile.vue'

const file_store = useFileStore()

onMounted(async () => {
  try {
    const response = await getFiles()
    const { data } = await response.json()
    file_store.setValue(data)
  } catch (error) {
    console.log(error)
  }
})

</script>
