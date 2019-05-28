<template>
  <div>
    <tinder ref="tinder" :queue.sync="queue" @submit="submit">
      <template slot-scope="{data}">
        <div class="pic" :style="`background-image:url(https://picsum.photos/710/1152/?random=${data.key})`">
        </div>
      </template>
      <img class="like-pointer" slot="like" src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like-txt.png">
      <img class="nope-pointer" slot="nope" src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/nope-txt.png">
      <img class="super-pointer" slot="super" src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-txt.png">
    </tinder>
    <div class="btns">
      <img src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/nope.png" @click="decide('nope')">
      <img src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-like.png" @click="decide('super')">
      <img src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like.png" @click="decide('like')">
    </div>
  </div>
</template>

<script>
import LoginBg from '@/assets/images/bg.png'
import tinder from "vue-tinder"
export default {
  name: '',
  data () {
    return {
      queue: []
    };
  },

  components: { tinder },

  computed: {},



  methods: {
    getData () {
      const list = []
      for (let i = 0; i < 5; i++) {
        list.push({
          key: Math.random()
        })
      }
      this.queue = this.queue.concat(list)
    },
    /**
     * 点击按钮所绑定的方法，此方法为调用vue-tinder组件内方法的示例，仅供参考
     * @method submit
     * @param  {String} choice
     */
    decide (choice) {
      console.log(35555);

      this.$refs.tinder.decide(choice)
    },
    /**
     * 自定义事件submit绑定的方法，移除卡片的回调
     * @method submit
     * @param  {Object} choice {type,key}
     */
    submit (choice) {
      switch (choice) {
        case 'nope': // 左滑
          console.log(122);

          break;
        case 'like': // 右滑
          console.log(23232);

          break;
        case 'super': // 上滑
          console.log('sdfsdfsd');

          break;
      }
      if (this.queue.length < 2) {
        this.getData()
      }
    }
  },
  created () {
    this.getData()

  }


}

</script>
<style lang='scss' scoped>
html,
body {
  height: 100%;
}

body {
  background: #20262e;
  overflow: hidden;
}
#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 18%);
  min-width: 300px;
  max-width: 355px;
}

/* 卡片内的3种状态指示器位置，透明度会由组件自动调整 */
.nope-pointer {
  right: 10px;
}
.like-pointer {
  left: 10px;
}
.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 64px;
  height: 64px;
}
.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 112px;
  height: 78px;
}

/* slot内图片样式 */
.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
}

/* 按钮样式 */
.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}
.btns img {
  width: 80px;
}
</style>