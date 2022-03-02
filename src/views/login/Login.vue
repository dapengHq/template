<template>
  <div class="login-page">
    <el-row type="flex" justify="center">
        <el-form class="el-col el-col-5" :model="loginModel" inline label-width="80px">
          <el-form-item class="el-col el-col-24" label="用户名" prop="username">
            <el-input v-model="loginModel.username"/>
          </el-form-item>
          <el-form-item class="el-col el-col-24" label="密码" prop="password">
            <el-input type="password"  v-model="loginModel.password" />
          </el-form-item>
          <el-form-item class="el-col el-col-24">
            <el-button type="primary" @click="loginSubmit">登录</el-button>
          </el-form-item>
        </el-form>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button type="text">忘记密码</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
interface LoginModel {
  username: string;
  password: string
}

@Component({
  name: 'Login',
})
export default class extends Vue {
  private loginModel: LoginModel = {
    username: '',
    password: ''
  }


  async loginSubmit() {
    const { status, message } = await UserModule.login(this.loginModel);
    
    if (status) {
      const { query: { redirectUrl } } = this.$route;
      const path = Array.isArray(redirectUrl)
        ? (redirectUrl[redirectUrl.length - 1] || '/')
        : (redirectUrl || '/');
      
      this.$showSuccess(message, {
        // catch: 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
        onClose: () => this.$router.replace({ path }).catch(e => e)
      });
    }
  }
}
</script>
<style lang="scss">
@import './style/index.scss';
</style>
<style>
@import './style/deepIndex.scss';
</style>