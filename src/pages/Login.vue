
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo"></div>
      <el-form
        class="login-form"
        :model='param'
        :rules="rules"
        ref='login'
        label-width="0px"
      >
        <el-form-item prop='username'>
          <el-input
            v-model="param.username"
            placeholder="username"
          >
            <el-button
              slot="prepend"
              icon="el-icon-user"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
          >
            <el-button
              slot="prepend"
              icon="el-icon-lock"
            ></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";
import { setToken, getToken } from "@/utils/auth";
export default {
  name: "login",
  data() {
    return {
      param: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      login(this.param)
        .then((res) => {
          const { userInfo, verifySuccess } = res;
          if (verifySuccess) {
            this.$message.success("登录成功");
            setToken("Token", userInfo.token);
            this.$store.commit("setToken");
            this.$router.push({ path: "/" });
          } else {
            this.$message.error("登录失败");
          }
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
  },
};
</script>
<style lang='less' scoped>
.login-container {
  height: 100%;
  background: #fff url("../assets/imgs/backgroud.png") 50% 50% no-repeat;
  background-size: cover;
  position: relative;
  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 430px;
    height: 550px;
    margin: -300px 0 0 -215px;
    border: 1px solid #fff;
    border-radius: 20px;
    overflow: hidden;
    .logo {
      width: 104px;
      height: 104px;
      margin: 50px auto 80px;
      background: url("../assets/imgs/login.png") 0 0 no-repeat;
    }
    .login-form {
      padding: 0 20px;
      .login-btn {
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>