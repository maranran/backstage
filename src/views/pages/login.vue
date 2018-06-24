<template>
    <div class="container login">
        <el-form  :model="filter" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="filter.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="输入密码">
                <el-input v-model="filter.password" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchUser()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { login } from 'src/api/index';
  import { Cookie } from 'src/utils/index';
  export default {
    name: "login",
    data() {
      return  {
        filter: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      searchUser() {
        login(this.filter).then(({ data }) => {
          if (data.results.length) {
            Cookie.set('hasLogin', true);
            this.$router.push('/list');
          } else {
            this.$message({
              message: '登录失败，请重试',
              type: 'warning'
            });
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: '登录失败，请重试',
            type: 'warning'
          });
        })
      }
    }
  }
</script>

<style scoped>
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
    }
</style>