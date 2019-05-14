<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <template v-for="(item,index) in router">
        <el-menu-item :index="item.name+index" v-if="!item.children" @click="$router.push(item.path)">{{item.name}}</el-menu-item>
        <el-submenu :index=" item.name" v-else>
          <template slot="title">{{item.name}}</template>
          <template v-for="(itemC,indexC) in item.children">
            <el-menu-item :index="itemC.name" @click="$router.push(itemC.path)">{{itemC.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import path from 'path'
// import { validateURL } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  //   props: {
  //     item: {
  //       type: Object,
  //       required: true
  //     },
  //     isNest: {
  //       type: Boolean,
  //       default: false
  //     },
  //     basePath: {
  //       type: String,
  //       default: ''
  //     }
  //   },
  data () {
    return {
      onlyOneChild: null,
      activeIndex: '1',
      router: []
    }
  },
  created () {
    this.router = this.$router.options.routes
    console.log(
      this.$router
    )
  },
  methods: {
    // hasOneShowingChild (children) {
    //   const showingChildren = children.filter(item => {
    //     if (item.hidden) {
    //       return false
    //     } else {
    //       this.onlyOneChild = item
    //       return true
    //     }
    //   })
    //   if (showingChildren.length === 1) {
    //     return true
    //   }
    //   return false
    // },
    // resolvePath (routePath) {
    //   return path.resolve(this.basePath, routePath)
    // },
    // isExternalLink (routePath) {
    //   return validateURL(routePath)
    // },
    // clickLink (routePath, e) {
    //   if (!this.isExternalLink(routePath.path)) {
    //     e.preventDefault()
    //     let _that = this
    //     const path = this.resolvePath(routePath.path)
    //     this.$router.push(path, function () {
    //       if (routePath.meta.syncRouteName) {
    //         setTimeout(() => { _that.$router.push({ name: routePath.meta.syncRouteName }) }, 500)
    //       }
    //     })

    //   }
    // },
    handleSelect (key, keyPath) {

    }
  }
}
</script>
