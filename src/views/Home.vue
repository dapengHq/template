<template>
  <div class="dasboard">
    <Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
import Layout from '@/components/Layout/index.vue';
@Component({
  name: 'Home',
  components: {
    Layout
  },
})
export default class extends Vue {

  get username() {
    return UserModule.userInfor.username;
  }

  created() {
    // UserModule.getUserInfor();
  }
};
</script>
<style>
.dasboard {
  width: 100%;
  height: 100%;
}
</style>
