<template>
  <div>
    新增用户
    <el-button @click="closepage">关闭</el-button>
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
    closepage () {
      this.$router.back()
    }
  },


}

</script>
<style lang='' scoped>
</style>