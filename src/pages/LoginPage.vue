<template>
  <q-layout class="fit text-center flex column no-wrap flex-center">
    <h2 class="q-ma-sm">Login</h2>
    <q-form v-if="!next_step" @submit="onSubmit" class="q-ma-md window-width" style="max-width: 400px;">
      <q-input filled v-model="email" label="Email" name="email" type="email" hint="Email para ingresar" lazy-rules
        :rules="[val => val && val.length > 0 || 'Es obligatorio el email']" />
      <div>
        <q-btn label="Ingresar" type="submit" color="primary" />
      </div>
    </q-form>
    <q-form v-if="next_step" @submit="validateCode" class="q-ma-md window-width" style="max-width: 400px;">
      <q-input filled v-model="code" label="Codigo de validacion" name="codigo" type="text" hint="Codigo para ingresar" lazy-rules
        :rules="[val => val && val.length > 0 || 'Es obligatorio el codigo']" />
      <div class="flex flex-center">
        <q-btn label="Ingresar" type="submit" color="primary" class="q-ma-sm" />
        <q-btn label="Regresar" @click.prevent @click="next_step = !next_step" color="green" class="q-ma-sm" />
      </div>
    </q-form>
  </q-layout>
</template>
<script setup>

import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

import { logginUser, validateUser } from 'src/services/userServices.js'

import { useUserStore } from 'stores/userStore.js'

const email = ref()
const code = ref()

const q = useQuasar()

const router = useRouter()

const userStore = useUserStore()

const next_step = ref(false)

const onSubmit = async (event) => {
  const data = { correo: email.value }
  try {
    const result = await logginUser(data)
    if (!result.ok) {
      // create error object and reject if not a 2xx response code
      const err = new Error('HTTP status code: ' + result.status)
      err.response = result
      err.status = result.status
      throw err
    } else {
      next_step.value = true
    }
  } catch (error) {
    q.notify({
      type: 'warning',
      message: 'Problemas en el servidor intente nuevamente'
    })
  }
}

const validateCode = async (event) => {
  const data = { code: code.value, correo: email.value }
  try {
    const result = await validateUser(data)
    const response = await result.json()
    if (!result.ok) {
      // create error object and reject if not a 2xx response code
      const err = new Error('HTTP status code: ' + result.status)
      err.response = result
      err.status = result.status
      throw err
    } else {
      userStore.setValue(response.token)
      router.push({ path: '/files' })
    }
  } catch (error) {
    console.log(error)
    q.notify({
      type: 'warning',
      message: 'Problemas en el servidor intente nuevamente'
    })
  }
}

</script>
