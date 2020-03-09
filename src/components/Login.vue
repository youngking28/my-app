<template>
  <el-container class="login">
    <el-main>
  
    <h1>登录管理平台</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model.number="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
</el-form>
    </el-main>
  </el-container>
</template>
<script>
import axios from 'axios'

  export default {
    name: "Login",
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            doLogin(that.ruleForm.username,that.ruleForm.pass, that);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
  //进行登录
  var doLogin = (szUserName, szPass, oParent)=>{
      axios.post('/login', {
            userAccount: szUserName,
            password: szPass
        })
        .then(function (response) {
            console.log(response, 2);
            oParent.$router.push('/manageIndex');
        })
        .catch(function (error) {
            console.log(error,1);
            oParent.$message.error('登录失败！');
        });
  };
</script>
<style scoped>
.login {
    width: 500px;
    margin: auto;
}
</style>