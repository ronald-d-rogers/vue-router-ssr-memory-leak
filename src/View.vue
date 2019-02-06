<script>
export default {
  beforeRouteEnter(to, from, next) {
    // Poll happens only if you pass in a function to next(...)
    next(vm => {})
  }
}
</script>

<template>
  <div>Memory Leak</div>
</template>