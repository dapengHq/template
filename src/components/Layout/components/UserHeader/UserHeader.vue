<template>
  <div class="user-header">
    <div class="user-avatar">
      <el-avatar :size="30" :src="userInfor.url" />
    </div>
    
    <el-dropdown @command="commandHandler">
      <span class="el-dropdown-link">
        <!-- <i class="el-icon-setting" /> -->
        <span class="user-name">{{ userInfor.username }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="modifyName">修改姓名</el-dropdown-item>
        <el-dropdown-item command="modifyPsw">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
@Component({
  name: 'UserHeader'
})
export default class extends Vue {

  get userInfor() {
    return UserModule.userInfor;
  }

  commandHandler(k: string) {
    console.log(k);
  }
}
</script>
<style lang="scss">
.user-header {
  margin: 0 10px;
  // width: 240px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .user-avatar {
    margin-right: 16px;
  }

  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>