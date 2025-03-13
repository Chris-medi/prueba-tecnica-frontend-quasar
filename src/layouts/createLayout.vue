<template>
  <div class="q-pa-md fit flex items-center column no-wrap">
    <h3>Create tu archivo</h3>
    <q-form @submit="onSubmit" enctype='multipart/form-data' @reset="onReset" class="col-sm-6 fit"
      style="max-width: 600px;">
      <q-input filled type="number" v-model="document" name="documento" label="numero de documento identificacion"
        lazy-rules :rules="[
          val => val !== null && val !== '' || 'por favor escriba numero de documento identificacion',
          val => val > 1000000 || 'por favor escriba numero de documento identificacion'
        ]" />

      <q-input filled label="Tu nombre" v-model="name" lazy-rules name="name"
        :rules="[val => val && val.length > 0 || 'por favor escriba tu nombre']" />

      <q-input filled label="Tu apellido" lazy-rules name="last_name" v-model="last_name"
        :rules="[val => val && val.length > 0 || 'por favor escriba tu apellido ']" />

      <q-input class="q-pb-sm" filled label="Cantidad de paginas del archivo" v-model="page_file" lazy-rules
        name="page_num" readonly />
      <q-input class="q-pb-sm" filled label="Nombre del archivo" v-model="name_file" lazy-rules name="file_name" />

      <q-file bottom-slots v-model="getName" required name="file" label="Archivo" counter max-files="1">
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop.prevent="file = null" class="cursor-pointer" />
        </template>
        <template v-slot:hint>
          tamaño del archivo
        </template>
      </q-file>

      <div class="q-py-lg">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script setup>
defineOptions({
  name: 'createLayout'
})

import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { createFile } from 'src/services/filesServices.js'

const q = useQuasar()

const router = useRouter()

const file = ref(null)
const page_file = ref(0)
const name_file = ref()
const document = ref()
const name = ref()
const last_name = ref()

const getName = ref()

const onSubmit = async (event) => {
  const form_data = new FormData(event.target)
  try {
    const result = await createFile(form_data)
    if (!result.ok) {
      const err = new Error('HTTP status code: ' + result.status)
      err.response = result
      err.status = result.status
      throw err
    }
    q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Archivo subido con exito'
    })
    router.push({ name: '/files' })
  } catch (error) {
    q.notify({
      type: 'warning',
      message: 'Error en el servidor'
    })
  }
}

watch(getName, async (nuevo) => {
  file.value = nuevo
  name_file.value = nuevo.name
  const reader = new FileReader()
  reader.readAsBinaryString(file.value)
  reader.onload = (e) => {
    try {
      page_file.value = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length
    } catch (TypeError) {
      page_file.value = 0
    }
  }
})

const onReset = () => {
  name.value = null
}
</script>
