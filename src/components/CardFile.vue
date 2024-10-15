<template>
  <q-card class="my-card col-2 q-ma-sm" style="min-width: 210px;">
    <q-img :src="srcImagePreview(props.objt.file_path)" class="overflow-hidden" style="width: 200px; height: 200px;">
      <div class="text-subtitle2 absolute-top text-center">
        {{ props.objt.id }}
      </div>
      <q-dialog v-model="details">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Información</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <p>Id: {{ props.objt.id }}</p>
            <p>Documento: {{ props.objt.documento }}</p>
            <p>Mombre: {{ props.objt.name }}</p>
            <p>Apellido: {{ props.objt.last_name }}</p>
            <p>archivo: {{ props.objt.file_path }}</p>
            <q-btn color="primary" icon="shared" class="text-center" label="compartir" @click="sharedFile()">
              <q-tooltip class="bg-accent">Compartir archivo</q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-menu touch-position>
        <q-list>
          <q-item v-close-popup clickable v-if="show_pin">
            <q-item-section>
              <RouterLink style="text-decoration: none;" class="text-dark" :to="'/update/' + props.objt.id">Actualizar
              </RouterLink>
            </q-item-section>
          </q-item>
          <q-item v-close-popup clickable v-if="show_pin">
            <q-item-section @click="deteletFile(props.objt.id)">delete</q-item-section>
          </q-item>
          <q-item v-close-popup clickable v-if="show_pin">
            <q-item-section @click="pinFile(props.objt.id)">anclar</q-item-section>
          </q-item>
          <q-item v-close-popup clickable v-if="!show_pin">
            <q-item-section @click="unPinFile(props.objt.id)">desanclar</q-item-section>
          </q-item>
          <q-item v-close-popup clickable>
            <q-item-section @click="details = true">Informacion</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-img>
  </q-card>
</template>

<script setup>
defineOptions({
  name: 'CardFile'
})
import { ref } from 'vue'
import { useQuasar } from 'quasar'

import { useFileStore } from 'src/stores/filesStore.js'

import { deleteFile } from 'src/services/filesServices.js'

const fileStore = useFileStore()

const q = useQuasar()

const props = defineProps({
  objt: {
    type: Object,
    required: true
  },
  show: {
    default: true
  },
  show_pin: {
    default: false
  }
})

const details = ref(false)

const deteletFile = async (id) => {
  try {
    const result = await deleteFile(id)
    if (!result.ok) {
      const err = new Error('HTTP status code: ' + result.status)
      err.response = result
      err.status = result.status
      throw err
    } else {
      fileStore.delete(id)
      q.notify({
        type: 'positive',
        message: 'archivo borrado exitosamente'
      })
    }
  } catch (error) {
    q.notify({
      type: 'warning',
      message: 'Problemas con el servidor'
    })
  }
}

const srcImagePreview = (src) => {
  const extension = src.split('.').at(-1)
  const files_extension = ['pdf', 'txt', 'docx', 'word']
  const imgs_extension = ['png', 'jpg', 'svg', 'gif']
  if (imgs_extension.includes(extension)) {
    return src
  } else if (files_extension.includes(extension)) {
    return 'https://th.bing.com/th/id/OIP.EztG6SdfH0zk-n8Fhs97OwHaHa?w=210&h=210&c=7&r=0&o=5&pid=1.7'
  } else {
    return 'https://th.bing.com/th/id/OIP.xFKs9h_PyBMDjlLyXcId8wHaHa?w=191&h=191&c=7&r=0&o=5&pid=1.7'
  }
}

const sharedFile = async () => {
  try {
    await navigator.clipboard.writeText(props.objt.file_path)
    q.notify({
      type: 'positive',
      message: 'Copiado al portapapeles'
    })
  } catch (err) {
    q.notify({
      type: 'warning',
      message: 'No se pudo compartir'
    })
  }
}

const pinFile = (id) => {
  try {
    fileStore.pinFile(id)
    q.notify({
      type: 'positive',
      message: 'archivo pineado exitosamente'
    })
  } catch (error) {
    q.notify({
      type: 'warning',
      message: error
    })
  }
}

const unPinFile = (id) => {
  try {
    fileStore.unPinFile(id)
    q.notify({
      type: 'positive',
      message: 'archivo despineado exitosamente'
    })
  } catch (error) {
    q.notify({
      type: 'warning',
      message: error
    })
  }
}

</script>
