<template>
  <div>
    <el-button @click="test">测试按钮</el-button>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {

    };
  },

  components: {},

  computed: {},



  methods: {
    test () {
      console.log(this.$request);

    }
  },


}

</script>
<style lang='' scoped>
</style>