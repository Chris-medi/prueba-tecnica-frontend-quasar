<template>
  <div class="q-pa-md fit flex items-center column no-wrap">
    <h3>Actualiza tu archivo</h3>
    <q-form @submit="onSubmit" enctype='multipart/form-data' class="col-sm-6 fit" style="max-width: 600px;">
      <q-input filled type="number" v-model="cc" name="documento" label="numero de documento identificacion" lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'por favor escriba numero de documento identificacion',
          val => val > 1000000 || 'por favor escriba numero de documento identificacion'
        ]" />

      <q-input filled v-model="name" label="Tu nombre" lazy-rules name="name"
        :rules="[val => val && val.length > 0 || 'por favor escriba tu nombre']" />

      <q-input filled v-model="last_name" label="Tu apellido" lazy-rules name="last_name"
        :rules="[val => val && val.length > 0 || 'por favor escriba tu apellido ']" />

      <q-file bottom-slots v-model="file" name="file" label="Archivo" counter max-files="1">
        <q-tooltip>
          Puedes cargar un nuevo archivo para actualizarlo o puedes dejarlo en blanco y el archivo sera el mismo
        </q-tooltip>

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
      </div>
    </q-form>

  </div>
</template>

<script setup>

defineOptions({
  name: 'createLayout'
})
// - Número de documento de identificación
// -Nombre
// -Apellido
// - Cantidad de páginas read only
// - Número generado automáticamente del elemento, tamaño: 10, no editable
// - Entrada de archivos
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useFileStore } from 'src/stores/filesStore.js'

import { updateFile } from 'src/services/filesServices.js'

const q = useQuasar()

const router = useRouter()
const route = useRoute()
// Now you can access params like:

const cc = ref(null)
const name = ref(null)
const file = ref(null)
const last_name = ref(null)

const file_store = useFileStore()

onMounted(() => {
  const file = file_store.files.find((elm) => elm.id === route.params.id)
  cc.value = file.documento
  name.value = file.name
  last_name.value = file.last_name
})

const onSubmit = async (event) => {
  const form_data = new FormData(event.target)
  form_data.append('id', route.params.id)
  if (!file.value) {
    form_data.delete('file')
  }
  try {
    const result = await updateFile(form_data)
    if (!result.ok) {
      // create error object and reject if not a 2xx response code
      const err = new Error('HTTP status code: ' + result.status)
      err.response = result
      err.status = result.status
      throw err
    } else {
      q.notify({
        type: 'positive',
        message: 'Error en el servidor'
      })
      router.push({ path: '/files' })
    }
  } catch (error) {
    console.log(error)
    q.notify({
      type: 'warning',
      message: 'Error en el servidor'
    })
  }
}

</script>
