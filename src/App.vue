<template>
  <div id="app">
    <div v-if="dontLeak">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dontLeak: false
    }
  }
}
</script>
