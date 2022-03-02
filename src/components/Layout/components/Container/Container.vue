<template>
  <div class="app-main">
    <Tabbar />
    <el-scrollbar>
      <transition mode="out-in" name="slide-fade">
        <keep-alive :include="keepAliveNames">
          <router-view />
        </keep-alive>
      </transition>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import Tabbar from '../Tabbar/Tabbar.vue';
@Component({
  name: 'Container',
  components: {
    Tabbar
  }
})
export default class extends Vue {
  
  get keepAliveNames() {
    console.log(AppModule.keepAliveNames, 'keepAliveNames');
    return AppModule.keepAliveNames;
  }
}
</script>
<style lang="scss">
.app-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    flex: 1;
    overflow-y: auto;
    background-color: #f2f2f2;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leava-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave {
    transform: translateX(10px);
    opacity: 0;
  }
}

</style>