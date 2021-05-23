<template>
  <div class="images">
    <img v-for="imageUrl in imageUrls" :key="imageUrl" v-bind:src="imageUrl">
  </div>
</template>

<script>
export default {
  name: 'Images',
  props: ['images'],
  computed: {
    imageUrls: function () {
      return this.setPath()
    }
  },
  methods: {
    setPath () {
      const images = []
      const path = 'http://localhost:8080/images/'

      for (let i = 0; i < this.images.length; i++) {
        images.push(path + this.images[i])
      }

      return images
    }
  }
}
</script>

<style scoped>

</style>
