<template>
  <div class="nav-bar">
    <div class="search-container">
      <el-autocomplete
        size="medium"
        popper-class="search-autocomplete"
        v-model="searchModel"
        :fetch-suggestions="fetchSuggestions"
        placeholder="查询菜单"
        @select="handleSelect"

      >
        <i class="el-icon-search el-input__icon" slot="suffix"/>
        <template slot-scope="{ item }">
          <div class="name">{{ item.meta.title }}</div>
          <!-- <span class="addr">{{ item.address }}</span> -->
        </template>
      </el-autocomplete>
    </div>
    <div class="recent-visit-container">
      <span class="recent-visit-title">最近访问:</span>
      <ul class="recent-visit-list">
        <li v-for="rv in recentVisitList" :key="rv.name" @click="handleSelect(rv)">{{ rv.meta.title }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';

@Component({
  name: 'Navbar'
})
export default class extends Vue {

  searchModel = ''

  get flatMenuList() {
    return AppModule.flatMenuList;
  }

  get recentVisitList() {
    return AppModule.recentVisitList;
  }

  fetchSuggestions(qString: string, cb: Function) {
    const resArr = (qString && qString.trim()) ? this.flatMenuList.filter(it => it.meta?.title.includes(qString)) : this.flatMenuList;
    // console.log(resArr, 'resArr')
    cb(resArr);
  }

  handleSelect(item: any) {
    console.log(item);
    const { name } = this.$route;
    if (item.name === name) return;
    this.$router.push({ name: item.name });
  }

}
</script>
<style lang="scss">
@import '@/assets/styles/variables.scss';
.nav-bar {
  flex: 1;
  display: flex;
  align-items: center;
  .search-container {
    padding-left: 12px;
  }

  .recent-visit-container {
    display: flex;
    font-size: 14px;
    height: 16px;
    line-height: 16px;

    .recent-visit-title {
      font-weight: bold;
      text-indent: 1em;
      margin-right: 16px;
    }

    .recent-visit-list {
      display: flex;
      >li {
        margin-right: 12px;
        cursor: pointer;
        &:hover {
          color: $menuHoverText;
        }
      }
    }
  }
}

.el-autocomplete-suggestion__wrap {
  .el-autocomplete-suggestion__list {
    padding-bottom: 10px;
  }
}

</style>