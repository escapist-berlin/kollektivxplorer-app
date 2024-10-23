<template>
  <div>
    <h1>Welcome to KollektivXplorer</h1>
    <p>Explore releases</p>
    <!-- Add a list of releases here later -->
    <v-container>
      <v-text-field v-model="msg" />
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>