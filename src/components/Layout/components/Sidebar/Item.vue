<template>
  <div>
    <i v-if="isElIcon" :class="iconClass" />
    <svg-icon v-else :icon-class="iconClass" />
    <span slot="title" class="sub-el-title">{{title}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'MenuItem'
})
export default class extends Vue {

  @Prop({
    type: String
  })
  icon?: string

  @Prop({
    required: true,
    type: String
  })
  title!: string

  get isElIcon() {
    return this.icon?.includes('el-icon');
  }

  get iconClass() {
    return this.isElIcon ? [this.icon, 'sub-el-icon'] : this.icon;
  }

}
</script>
<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
}
</style>