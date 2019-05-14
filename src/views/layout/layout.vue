<template>
  <div>
    <!-- <el-container>
      <el-header>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#4c4c4c" active-text-color="#1379b1">

          <el-submenu v-for="(item,index) in route" :key="index" :index="item.name" @click="$router.push(item.path)">
          </el-submenu>

          <el-menu-item v-for="(item,index) in route" :key="index" :index="item.name" @click="$router.push(item.path)">
            <el-submenu v-if="item.component&&item.component.children&&item.component.children.length > 0" v-for="(itemC,indexC) in item.component.children " :index="itemC+indexC">
              <el-menu-item :key="indexC">{{itemC.name}}</el-menu-item>
            </el-submenu>
            <el-submenu v-else> {{item.name}}</el-submenu>
          </el-menu-item>
        </el-menu>
      </el-header>
     
    </el-container> -->
    <div @click="handleClickOutside"></div>
    <sidebar class="sidebar-container" />
    <!-- <div class="main-container" style="padding:8px;">
      <navbar />
      <tags-view />
      <app-main />
    </div> -->
  </div>
</template>

<script>
import { sidebar } from './components'

export default {
  name: '',
  data () {
    return {
      isCollapse: false,
      route: [],
      activeIndex: "1"
    };
  },

  components: { sidebar },

  computed: {},

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClickOutside () {
    }
  },
  created () {
  }


}

</script>
<style lang='' scoped>
</style>