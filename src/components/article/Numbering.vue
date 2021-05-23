<template>
  <div class="numbering">
    <ul>
      <SubNumbering
              v-for="numbering in list"
              :key="numbering.id"
              v-bind:numbering="numbering"
      />
    </ul>
  </div>
</template>

<script>
import SubNumbering from '@/components/article/SubNumbering'

export default {
  name: 'Numbering',
  components: { SubNumbering },
  props: ['numberings'],
  computed: {
    list: function () {
      return this.getNumberings()
    }
  },
  methods: {
    getLast (array) {
      if (array[array.length - 1].sublist.length !== 0) {
        return this.getLast(array[array.length - 1].sublist)
      }

      return array[array.length - 1]
    },
    getPrevious (array) {
      if (array[array.length - 1].sublist.length !== 0) {
        return this.getPrevious(array[array.length - 1].sublist)
      }

      return array
    },
    getWithRequiredLevel (array, requiredLevel) {
      if (array[array.length - 1].level !== requiredLevel) {
        return this.getWithRequiredLevel(array[array.length - 1].sublist, requiredLevel)
      }

      return array
    },
    copyToNewObject (copiedObject) {
      const newObject = {}
      newObject.id = copiedObject.id
      newObject.level = copiedObject.level
      newObject.text = copiedObject.text
      newObject.isDecimal = copiedObject.isDecimal
      newObject.sublist = []

      return newObject
    },
    getNumberings () {
      const resultArray = []
      for (let i = 0; i < this.numberings.length; i++) {
        if (this.numberings[i].level === 0) {
          resultArray.push(this.copyToNewObject(this.numberings[i]))

          continue
        }

        const lastElement = this.getLast(resultArray)
        if (this.numberings[i].level > lastElement.level) {
          lastElement.sublist.push(this.copyToNewObject(this.numberings[i]))

          continue
        }

        if (this.numberings[i].level === lastElement.level) {
          this.getPrevious(resultArray).push(this.copyToNewObject(this.numberings[i]))

          continue
        }

        if (this.numberings[i].level < lastElement.level) {
          this.getWithRequiredLevel(resultArray, this.numberings[i].level).push(this.copyToNewObject(this.numberings[i]))
        }
      }

      return resultArray
    }
  }
}
</script>

<style scoped>
.numbering {
  border: 1px solid orangered;
  padding: 5px;
  margin: 5px 0;
}
</style>
