<template>
  <div class="Index">
    <IndexPage login="false"/>
  </div>
</template>

<script>

import IndexPage from '@/components/Landing.vue'
export default {
  name: 'Home',
  components: {
    IndexPage
  }
}
</script>
