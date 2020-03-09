<template>
  <el-container>
  <el-header>
    <h1>员工信息</h1>
  </el-header>
  <el-container>
    <el-main>
    <el-row>
      <el-button style="float:right" type="primary" @click="search()">查询</el-button>
    </el-row>
    <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      label="工号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.employeId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180"
      >
      <template slot-scope="scope">
      <span style="margin-left: 10px">{{ scope.row.employeName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleShow(scope.$index, scope.row)">查看文件夹</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-main>
    
<el-dialog title="文件夹列表" :visible.sync="dialogTableVisible">
  <el-row>
      <el-button style="float:right" type="primary" @click="dialogFormVisible = true;form.packageName = ''">添加目录</el-button>
  </el-row>
  <el-table stripe height="250" :data="packsData" style="width: 100%; margin: 10px auto;">
    <el-table-column property="imgPackage" label="目录名称"></el-table-column>
  </el-table>
</el-dialog>
<el-dialog title="添加目录" :visible.sync="dialogFormVisible">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
    <el-form-item label="目录名称" :label-width="formLabelWidth"  prop="packageName">
      <el-input v-model="ruleForm.packageName" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addPakage('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
  </el-container>
</el-container>
</template>
<script>
import axios from 'axios'
export default {
    data() {
      var checkPackageName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('目录名不能为空'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],
        packsData: [],
      loading: true,
      dialogTableVisible: false,
      curSelectEmployIndex: -1,
        dialogFormVisible: false,
        ruleForm: {
          packageName: ''
        },
        formLabelWidth: '120px',
        rules: {
          packageName: [
            { validator: checkPackageName, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      var that = this;
      axios.post('/emp/get', {
            "page":1, 
            "size":20
        })
        .then(function (oResult) {
            if (oResult.data.code == 200) {
              that.tableData = oResult.data.data;
            } else {
              that.tableData = [];
              that.$message.error('查询失败！');
            }
            that.loading = false;
        })
        .catch(function (error) {
            that.tableData = [];
            console.log(error,1);
            that.$message.error('查询失败！');
            that.loading = false;
            
        });
    },
    methods: {
      async handleShow(index, row) {
        console.log(index, row);
        let that = this;
        that.curSelectEmployIndex = index;
        let iEmpId = that.tableData[index].employeId;
        that.packsData = await getImgPacks(iEmpId, that);
        that.dialogTableVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      search() {
        var that = this;
        axios.post('/emp/get', {
            "page":1, 
            "size":20
        })
        .then(function (oResult) {
            if (oResult.data.code == 200) {
              that.tableData = oResult.data.data;
            } else {
               that.tableData.length = 0;
               that.$message.error('查询失败！');
            }
            that.loading = false;
        })
        .catch(function (error) {
            that.tableData.length = 0;
            console.log(error,1);
            that.$message.error('查询失败！');
            that.loading = false; 
        });
      },
      addPakage(formName) {
        let that = this;
        let iEmpId = that.tableData[that.curSelectEmployIndex].employeId;
        let szPackageName = that.ruleForm.packageName;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           doAddPackage(szPackageName, iEmpId, that).then(function () {
             //更新下目录
             getImgPacks(iEmpId, that).then(function (oData) {
               that.packsData = oData;
             });
             that.dialogFormVisible = false;
           }, function () {
             that.dialogFormVisible = false;
           });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
  let getImgPacks = (iEmpId, that) => {
    return new Promise(function (resolve, reject) {
      axios.post('/img/getImgPacks?empid=' + iEmpId, {})
        .then(function (oResult) {
            if (oResult.data.code == 200) {
              resolve(oResult.data.data);
            } else {
              that.$message.error('获取失败！');
              reject([]);
            }
        })
        .catch(function (error) {
          that.$message.error('获取失败！');
          reject([]);
        });
    });
  };

  let doAddPackage = (szPackage, iEmpId, that) =>  {
    return new Promise(function (resolve, reject) {
      axios.post('/img/addImgPacks', {
        empid: iEmpId,
        img_package: szPackage
      })
        .then(function (oResult) {
            if (oResult.data.code == 200) {
              that.$message({
                message: '目录添加成功。',
                type: 'success'
              });
              resolve();
            } else {
              that.$message.error('目录添加失败！');
              reject();
            }
        })
        .catch(function (error) {
          that.$message.error('目录添加失败！');
          reject();
        });
    });
  }
</script>