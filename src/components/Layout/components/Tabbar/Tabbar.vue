<template>
  <section class="tab-bar-container">
    <span class="toggle-side-bar-btn">
      <el-tooltip content="折叠或展开侧边栏">
        <el-button type="text" :icon="toggleSidebarIcon" @click="toggleSidebar()" />
      </el-tooltip>
    </span>
    <span class="tab-left" @click="tabDirectBtn(false)"> <i class="el-icon-d-arrow-left" /> </span>
    <div id="tab-list-wrap" class="tab-list-wrap">
      <ul ref="tabListContainer" class="tab-list-container">
        <li
          v-for="(tab, index) in tabNavList" :key="tab.name"
          :class="{ 'tab-list-item': true, 'active': tab.name === curRoute.name }"
          @click="toggleTab(tab)"
        >
          <span class="tab-list-item-title">{{ tab.meta.title }}</span>
          <i class="el-icon-close" @click.stop="closeTab(index, tab)" />
        </li>
      </ul>
    </div>
    <span class="tab-right" @click="tabDirectBtn(true)"><i class="el-icon-d-arrow-right" /></span>
    <div class="tab-close">
      <el-dropdown @command="batchCloseTabCommand">
        <span class="el-dropdown-link"><i class="el-icon-close"/></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import BScroll from 'better-scroll';
import MouseWheel from '@better-scroll/mouse-wheel';
BScroll.use(MouseWheel);

@Component({
  name: 'Tabbar'
})
export default class extends Vue {

  bsTabNav!: BScroll

  get toggleSidebarIcon() {
    // el-icon-s-unfold

    return AppModule.sidebar.opened ? 'el-icon-s-unfold' : 'el-icon-s-fold';
  }

  get tabNavList() {
    return AppModule.tabNavList || [];
  }

  get curRoute() {
    return this.$route;
  }

  get curTabIndex() {
    return this.tabNavList.findIndex(it => it.name === this.curRoute.name);
  }

  toggleTab(tab: any) {
    this.$router.push(tab.path);
  }

  tabDirectBtn(r: boolean) {
    const nextRoute = r ? this.tabNavList[this.curTabIndex + 1] : this.tabNavList[this.curTabIndex - 1];
    nextRoute && this.toggleTab(nextRoute);
  }

  closeTab(index: number, tab: any) {
    const nextRoute = this.tabNavList[index + 1] || this.tabNavList[index - 1];

    this.toggleTab(nextRoute);
    AppModule.deleteTabNavItemByIndex(index);
  }

  batchCloseTabCommand(type: string) {
    const stayTabName = type === 'other' ? ['Home', this.curRoute.name] : ['Home'];
    const stayTabs: Array<any> = this.tabNavList.filter(it => stayTabName.includes(it.name));
    
    AppModule.updateTabNavList(stayTabs);
    type !== 'other' && this.curRoute.name !== 'Home' && this.toggleTab(stayTabs[stayTabs.length - 1]);
  }

  routeMapNav(index = 0) {
    this.$nextTick(() => {
      const tabListContainer: any = this.$refs.tabListContainer;
      const { children = [] }: any = tabListContainer;

      this.bsTabNav.scrollToElement(children[index], 300, 0, true);
    });
  }

  mathBsWidth() {
    this.$nextTick(() => {
      const tabListContainer: any = this.$refs.tabListContainer;
      const { children = [] }: any = tabListContainer;

      if (!children.length) return;

      const width = Array.from(children).reduce((allWdith, child: any) => allWdith + child.clientWidth, 0);

      tabListContainer.style.width = width + 'px';

      this.bsTabNav.refresh();
    });
  }

  toggleSidebar() {
    console.log(AppModule.sidebar.opened);
    AppModule.toggleSidebar(!AppModule.sidebar.opened);
  }

  mounted() {
    this.bsTabNav = new BScroll('#tab-list-wrap', {
      scrollX: true,  // 横向可滑动，默认为false
      scrollY: false,  // 纵向可滑动，默认为true
      click: true,  // 元素可触发点击事件
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 600,
        dampingFactor: 0.1
      }
    });

    this.mathBsWidth();
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>