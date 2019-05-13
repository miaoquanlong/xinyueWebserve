<template>
  <div class="">
    <div slot="top" class="logo-con">
      <!-- <span>
        <img :src="logo">
      </span> -->
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :show-timeout="200" :default-active="$route.path" mode="vertical" background-color="#ffffff" text-color="#4c4c4c" active-text-color="#1379b1">
            <sidebar-item  />
            <!-- v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path" -->
        </el-menu>
    </el-scrollbar>
  </div>
</template>


<script>
// import { mapGetters } from 'vuex'
import SidebarItem from './siderbarItem'
// import logo from '@/assets/images/logo-w.png'
export default {
  data () {
    return {
    //   logo: logo
    }
  },
  components: { SidebarItem },
  computed: {
    // ...mapGetters([
    //   'permission_routers',
    //   'sidebar'
    // ]),
    // isCollapse () {
    //   return !this.sidebar.opened
    // }
  },
  created() {
    this.permission_routers = this.$router.options.routes
  },
}
</script>
<style>
.scrollbar-wrapper .is-active {
  background: #ecf8ff !important;
}
.is-vertical {
  display: none !important;
}
.logo-con {
  /* height: 350px; */
  /* padding: 5px; */
  /* margin-bottom: 20px; */
  /* background: #1379b1; */
  /* border-radius: 10px 0 0 0; */
  /* border-bottom: solid 1px #e6e6e6; */
  /* z-index: 99; */
  /* position: fixed; */
  /* width: 100% */
  /* top: 8px; */
  /* left: 8px; */
  /* img {
    height: 44px;
    width: auto;
    display: block;
    margin: 0 auto;
  } */
}
.hideSidebar .logo-con {
  width: 36px;
  img {
    height: 25px;
    width: auto;
    display: block;
    margin: 0 auto;
  }
}
</style>