<template>
  <div class="app-wrapper">
    <header class="fix-header">
      <div class="logo-container">
        <!-- <img src="~@/assets/images/logo.png" alt=""> -->
        Logo
      </div>
      <Navbar />
      <UserHeader />
    </header>
    <section class="main-container">
      <Sidebar />
      <Container />
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Container, Sidebar, Navbar, UserHeader } from './components';
@Component({
  name: 'Layout',
  components: {
    UserHeader,
    Container,
    Sidebar,
    Navbar
  }
})
export default class extends Vue {
}
</script>
<style lang="scss" scoped>
@import './style/index.scss';
</style>