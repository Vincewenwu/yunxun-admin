<template>
<el-form v-loading="loading" element-loading-text="拼命加载中" ref="form" :model="form" label-width="120px" style="width: 500px;margin-top: 20px;">
  <el-form-item label="公告图片">
    <el-upload
    name="gongGaoImg"
    class="avatar-uploader"
    :action="uploadUrl + 'Inform/uploadImg.do'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  </el-form-item>
  <el-form-item label="标题">
    <el-input type="text" v-model="form.title" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="公告内容">
     <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>
   <el-form-item label="">
  <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>
 </el-form-item>
    <el-form-item label="推送到">
    <el-tree
      class="filter-tree"
      :data="groups"
      :props="defaultProps"
      show-checkbox
      accordion
      :default-expand-all = "true"
      node-key="id"
      :filter-node-method="filterNode"
      ref="tree">
    </el-tree>
  </el-form-item>
<el-form-item>
    <el-button type="primary" v-show="add" :loading="showAddLoading"  @click="addAnnouncement"> 确认发布</el-button>
    <el-button type="primary" v-show="update" :loading="showUpdateLoading"  @click="ediet"> 确定修改</el-button>
    <el-button> 返回</el-button>
</el-form-item>
</el-form>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        form: {
          groupIds: '', // 资讯组id集合 新增时用
          title: '', // 标题
          content: '', // 内容
          schoolInfoId: '' // 资讯id
        },
        add: true, // 新增
        update: false, // 修改
        loading: false,
        imageUrl: '', // 图片路径
        groups: [],
        filterText: '', // 模糊搜索
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        treeIds: [], // 树形节点id
        showAddLoading: false,
        showUpdateLoading: false
      }
    },
    // 树形模糊搜索
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      // 绑定分组下拉框
      async getCboGroupData () {
        let data = await http.post('/Inform/findGroup.do')
        if (data.data.obj.length > 0) {
          this.groups = data.data.obj
        } else {
          this.groups = []
        }
      },
      // 添加公告
      async addAnnouncement () {
        this.showAddLoading = true
        let BaseSchoolInfo = {
          title: this.form.title, // 标题
          content: this.form.content, // 内容
          groupIds: this.$refs.tree.getCheckedKeys().join(',') // 组id集合
        }
        let data = await http.post('/Inform/addAnnouncement.do', BaseSchoolInfo)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
          this.$router.push({ path: '/noticelist' })
        } else {
          this.failResult()
        }
        this.showAddLoading = false
      },
        // 修改公告
      async ediet () {
        this.showUpdateLoading = true
        let params = {
          title: this.form.title, // 标题
          content: this.form.content, // 内容
          groupIds: this.$refs.tree.getCheckedKeys().join(','), // 组id集合
          schoolInfoId: this.form.schoolInfoId
        }
        let data = await http.post('/Inform/editAnnouncement.do', params)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
          this.$router.push({ path: '/noticelist' })
        } else {
          this.message(data.data.msg)
        }
        this.showUpdateLoading = false
      },
      // 根据资讯id查询公告
      async getDataById () {
        let params = {
          schoolInfoId: this.form.schoolInfoId
        }
        let data = await http.post('/Inform/findAnnouncementById.do', params)
        if (data.data.success) {
          // 平台管理员
          if (data.data.obj.platform === 0) {
            if (data.data.obj.rangeType === 0) {
              // 全平台
              this.$refs.tree.setCheckedKeys([data.data.obj.platformId])
            } else {
              // 分园校推送
              this.$refs.tree.setCheckedKeys(data.data.obj.strIds)
            }
          } else {
            // 教师、园长 管理员
            if (data.data.obj.rangeType === 1) {
              // 全园推送
              this.$refs.tree.setCheckedKeys([data.data.obj.schoolInfoList[0].schoolId])
            } else {
              // 分组推送
              this.$refs.tree.setCheckedKeys(data.data.obj.strIds)
            }
          }
          this.imageUrl = this.imgService + data.data.obj.schoolInfoList[0].coverImages
          this.form.title = data.data.obj.schoolInfoList[0].title // 获取标题
          this.form.content = data.data.obj.schoolInfoList[0].content // 获取内容
        } else {
          this.message(data.data.msg)
        }
        this.loading = false
      },
      // 绑定学校下拉框
      async cboSchoolDate () {
        let data = await http.post('/school/findCboSchool.do')
        this.schools = data.data.obj
      },
      // 树形过滤
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          alert('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          alert('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      message (msg) {
        this.$message(msg)
      },
      failResult () {
        this.$message('操作失败')
      },
      successResult () {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }
    },
     // 初始化方法
    mounted () {
      this.getCboGroupData()
      this.cboSchoolDate()
      this.add = true
      if (undefined !== this.$route.query.id.trim() && this.$route.query.id.trim() !== '') {
        this.loading = true
        this.update = true
        this.add = false
        this.form.schoolInfoId = this.$route.query.id
        this.getDataById(this.form.schoolInfoId)
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 352px;
    height: 65px;
    line-height: 65px;
    text-align: center;
  }
  .avatar {
    width: 352px;
    height: 65px;
    display: block;
  }
</style>
