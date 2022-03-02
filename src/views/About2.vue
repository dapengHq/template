<template>
  <div class="about">
    <h1>This is an about page2</h1>
    <router-link to="/about2/about21">About21</router-link>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'About2',
})
export default class About extends Vue {
};
</script>
