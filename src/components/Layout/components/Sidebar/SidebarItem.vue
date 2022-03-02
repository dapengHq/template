<template>
  <div>
    <template v-if="!hasChildren">
      <el-menu-item :index="resolvePath(item.path)">
        <router-link :to="resolvePath(item.path)">
          <Item v-if="meta" :icon="meta.icon" :title="meta.title" />
        </router-link>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template v-slot:title>
        <Item v-if="meta" :icon="meta.icon" :title="meta.title" />
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(item.path)"
      />
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { resolve } from 'path';
import { Vue, Component, Prop } from 'vue-property-decorator';
import Item from './Item.vue';
@Component({
  name: 'SidebarItem',
  components: {
    Item
  }
})
export default class extends Vue {

  @Prop({
    required: true,
    type: Object
  })
  item: any

  @Prop({
    required: true,
    type: String
  })
  basePath!: string

  get meta() {
    return this.item.meta || { icon: '', title: '' };
  }

  get hasChildren() {
    return this.item.children && this.item.children.length;
  }

  resolvePath(rPath: string) {
    return resolve(this.basePath, rPath);
  }

  isElIcon() {
    return this.item.icon.includes('el-icon');
  }




}
</script>