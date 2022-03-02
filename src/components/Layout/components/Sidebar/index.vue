<template>
  <div :class="{'sidebar-container': true, 'not-fold-width': !isCollapse}">
    <el-scrollbar>
      <el-menu
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse="isCollapse"
        mode="vertical"
        class="nav-sidebar"
      >
        <SidebarItem
          v-for="route in menuList"
          :key="route.name"
          :item="route"
          :base-path="rootPath"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import variables from '@/assets/styles/variables.scss';
import { AppModule } from '@/store/modules/app';
import SidebarItem from './SidebarItem.vue';
@Component({
  name: 'SideBar',
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  
  get defaultActive() {
    const { meta, path } = this.$route;
    return path;
  }

  get variables() {
    return variables;
  }

  get isCollapse() {
    return AppModule.sidebar.opened;
  }

  get rootPath() {
    const { matched } = this.$route;
    return matched && matched[0].path ? `${matched[0].path}/` : '/';
  }

  get menuList() {
    return AppModule.menuList;
  }

  get defaultOpeneds() {
    const { matched = [] } = this.$route;
    return matched.map(({ path }) => path).filter(Boolean);
  }

}
</script>

<style lang="scss">
.sidebar-container {
  .el-scrollbar {
    height: 100%;
  }
}
</style>