  <template>
	<el-row>
	  
	  <!--baby基础数据-->
  <el-col :span="24">
<el-form ref="form" :model="form" v-loading="loading1"
      element-loading-text="拼命加载中" label-width="140px" style="max-width: 480px; margin-top: 20px;">
      <!--action="uploadUrl + 'baby/uploadLogo'"-->
      <!--action="http://localhost:8080/yunxun_cms_web/baby/uploadLogo"-->
 <el-form-item label="头像">
    <el-upload
    name="babyImg"
    class="avatar-uploader"
     :action="uploadUrl + 'baby/uploadLogo'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </el-form-item>
	  
	  
  <el-form-item label="姓名">
    <el-input type="text" v-model="babyName" placeholder="请输入姓名"></el-input>
  </el-form-item>   
  <el-form-item label="家长预留号码">
    <el-input type="text" v-model="mobile" placeholder="请输入姓名"></el-input>
  </el-form-item>  
  <el-form-item label="考勤编号">
    <div class="block">
</div>
  <span class="wrapper">
    <el-input type="text" v-model="checkWorkAttendanceCars[0]" :disabled="kahaobianji[0]" placeholder="请输入考勤编号" ></el-input> 
    <el-input type="text" v-model="checkWorkAttendanceCars[1]" :disabled="kahaobianji[1]" placeholder="请输入考勤编号"></el-input>
    <el-input type="text" v-model="checkWorkAttendanceCars[2]" :disabled="kahaobianji[2]" placeholder="请输入考勤编号"></el-input>
    <el-input type="text" v-model="checkWorkAttendanceCars[3]" :disabled="kahaobianji[3]" placeholder="请输入考勤编号"></el-input>
    <el-input type="text" v-model="checkWorkAttendanceCars[4]" :disabled="kahaobianji[4]" placeholder="请输入考勤编号"></el-input>
  </span>
  <!-- -->
  <div style="position: relative ;top: -180px;left: 345px;height: 30px;">
    <div>
      <el-button type="warning" :plain="true" @click="tingYong(carID[0])" :disabled="tingyong[0]" style="height: 30px;line-height: 8px;" >停用</el-button>
      <el-button type="danger" :plain="true" @click="shanchukahao(carID[0])" :disabled="shanchu[0]" style="height: 30px;line-height: 8px;" >删除</el-button>
    </div>
     <div>
         <el-button type="warning" :plain="true" @click="tingYong(carID[1])" :disabled="tingyong[1]" style="height: 30px;line-height: 8px;" >停用</el-button>
         <el-button type="danger":plain="true" @click="shanchukahao(carID[1])" :disabled="shanchu[1]" style="height: 30px;line-height: 8px;" >删除</el-button>
     </div>
     <div>
       <el-button type="warning" :plain="true" @click="tingYong(carID[2])"  :disabled="tingyong[2]" style="height: 30px;line-height: 8px;" >停用</el-button>
       <el-button type="danger" :plain="true" @click="shanchukahao(carID[2])" :disabled="shanchu[2]" style="height: 30px;line-height: 8px;" >删除</el-button>
     </div>
      <div>
       <el-button type="warning" :plain="true" @click="tingYong(carID[3])" :disabled="tingyong[3]" style="height: 30px;line-height: 8px;" >停用</el-button>
       <el-button type="danger" :plain="true" @click="shanchukahao(carID[3])" :disabled="shanchu[3]" style="height: 30px;line-height: 8px;" >删除</el-button>
     </div>
      <div>
       <el-button type="warning"  :plain="true" @click="tingYong(carID[4])"  :disabled="tingyong[4]" style="height: 30px;line-height: 8px;" >停用</el-button>
       <el-button type="danger" :plain="true" @click="shanchukahao(carID[4])" :disabled="shanchu[4]" style="height: 30px;line-height: 8px;" >删除</el-button>
     </div>
  </div>
<!--   <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <el-button type="info">信息按钮</el-button> -->
  </el-form-item>
  <el-form-item label="性别">
  <template>
   <el-radio class="radio" v-model="radio" label="0">男</el-radio>
   <el-radio class="radio" v-model="radio" label="1">女</el-radio>
  </template>
  </el-form-item>
  
  
   <!--<el-form-item label="出生时间" >
    <el-col :span="11" style="width: 100%;">
      <el-date-picker type="date" placeholder="选择日期" @change="amSignTime" v-model="birthday" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>-->
  
    <template>
    <el-form-item label="出生时间">
    <el-date-picker 
      @change="amSignTime" style="width: 100%;"
      v-model="birthday"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>
      </el-form-item>
  </template>
  
  <el-form-item label="入学时间" >
    <el-col :span="11" style="width: 100%;">
      <el-date-picker type="date" placeholder="选择日期" @change="changeEntranceTime" v-model="entranceTime" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
<el-form-item label="所属院所">
     <el-select v-model="shoolvalue" placeholder="请选择院所">
        <el-option v-for="shool in shoollist" 
          @change=""
          :key="shool.id"
          :label="shool.name"
          :value="shool.id">
          {{shool.name}}
        </el-option>
      </el-select>
</el-form-item>
 </el-form>
  <el-button type="info" style="float: right;" @click="Lookbinding" class="el-icon-search">查看绑定码</el-button>
  </el-col>
   <!--baby基础数据-->
   
     <el-col :span="24" style="text-align: center;margin-top: 10px;">
     <el-button :plain="true" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
     <el-button v-show="chongzhi"  @click="resetForm('ruleForm2')">重置</el-button>
      <el-button v-show="quxiao" @click="quxiaoForm('ruleForm2')">取消</el-button>
     </el-col>
     
  <!--添加家长弹出框-->
   <el-dialog title="添加家长" :visible.sync="dialogFormVisible" :before-close="handleClose" >
      <el-form ref="form" :model="form" label-width="120px" style="width: 500px;margin-top: 20px;">
  <!--action="uploadUrl + 'baby/uploadLogo'"-->
      <!--action="http://localhost:8080/yunxun_cms_web/baby/uploadLogo"-->
 <el-form-item label="家长头像">
    <el-upload
    name="parentImg"
    class="avatar-uploader"
  action="uploadUrl + 'baby/uploadLogo'"
    :show-file-list="false"
    :on-success="handleAvatarSuccessP"
    :before-upload="beforeAvatarUploadP">
  <img v-if="temp.imageUrl" :src="temp.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input type="text" v-model="temp.phone_num" v-on:blur="changeCount" placeholder="请输入"></el-input>
  </el-form-item>
    <el-form-item label="姓名">
    <el-input type="text" v-model="temp.name" :disabled="temp.disabled" placeholder="请输入"></el-input>
  </el-form-item>
    <el-input type="text" v-model="temp.fphone" v-show="isShow" placeholder="请输入"></el-input>
  <el-form-item label="与我关系">
     <el-select v-model="temp.relationship"  placeholder="请选择类型">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
<el-form-item>
    <el-button type="primary" :plain="true" @click="parentSubmit('ruleForm2')">提交</el-button>
    <el-button @click="clean('ruleForm2')">重置</el-button>
</el-form-item>


</el-form>
    </el-dialog>
  <!--添加家长弹出框-->
  
  <!--家长table-->
  <el-col :span="24" style="border:1px solid #18C79C;">
  	
  <el-card class="box-card parent-tabs">
  <div slot="header" class="clearfix">
    <span>家长信息</span>
    <el-button style="float: right;" @click.native="openparenedit"  type="primary">添加家长成员</el-button>
  </div>
  
  	<el-table
	    :data="tableData"
	    stripe
	    style="width: 100%"
	    >
	    <el-table-column
       	 type="selection"
	      width="55">
	    </el-table-column>
	    
	     <!--<el-table-column
        prop="parentID"
        label="parentID"
        sortable
        width="180">
      </el-table-column>-->
	    
	    <el-table-column
	      prop="head_portrait "
	      label="头像"
	      sortable
	      >
		     <template scope="scope">
          <img :src="imgService + scope.row.head_portrait" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
	    </el-table-column>
	    
	    <el-table-column
	      prop="name"
	      label="姓名"
	      sortable
	      >
	    </el-table-column>
	    <el-table-column
	      prop="relationship"
	      label="与学员关系"
	      sortable
	      :formatter="formrelationship">
	    </el-table-column>
	    <el-table-column
	      prop="phone_num"
	      label="手机号"
	      sortable
	      >
	    </el-table-column>
	    <el-table-column
        prop="deleteFlag"
        label="状态"
        sortable
        :formatter="formatstate">
      </el-table-column>
	    <el-table-column
		      label="操作"
		      >
		      <template scope="scope">
		      	<el-button
		      	  :plain="true"
		          @click.native.prevent="editoppen(scope.row)"
		        type="button"
		          size="small">
		          编辑
		        </el-button>
		        <el-button
		          :plain="true"
		          @click.native.prevent="delparent(scope.row.parentID,scope.row.phone_num)"
		          type="button"
		          size="small">
		         删除
		        </el-button>
		         <el-button
              :plain="true"
              @click.native.prevent="oppenCom(scope.row.parentID)"
            type="danger"
              size="small">
             开通套餐
            </el-button>
		      </template>
		  </el-table-column>
	  </el-table>
</el-card>
  </el-col>
  <!--家长table-->
  
  <!--添加接送人弹出框-->
  <el-dialog title="添加家长" :visible.sync="dialogFormVisibleP" :before-close="handleClosesug" >
    <el-form ref="form" :model="form" label-width="120px" style="width: 500px;margin-top: 20px;">
    <!--action="http://localhost:8080/yunxun_cms_web/baby/uploadLogo"-->
    <!--action="uploadUrl + 'baby/uploadLogo'"-->
 <el-form-item label="banner图">
    <el-upload
    name="SurrogateImg"
    class="avatar-uploader"
    action="uploadUrl + 'baby/uploadLogo'"
    :show-file-list="false"
    :on-success="handleAvatarSuccessS"
    :before-upload="beforeAvatarUploadS">
  <img v-if="sug.imageUrl" :src="sug.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </el-form-item>
  
    <el-form-item label="姓名">
    <el-input type="text" v-model="sug.name" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input type="text" v-model="sug.phone" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input type="text" v-model="sug.telphone" placeholder="请输入"></el-input>
  </el-form-item>
    <el-form-item label="身份证号">
    <el-input type="text" v-model="sug.idcard" placeholder="请输入"></el-input>
  </el-form-item>
   <el-form-item label="家庭地址">
     <el-input type="textarea" v-model="sug.address" placeholder="请输入"></el-input>
  </el-form-item>
   <el-form-item label="与我关系">
     <el-select v-model="sug.relationship"  placeholder="请选择类型">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
  
  
<el-form-item>
    <el-button type="primary" :plain="true" @click="addsurrogate('ruleForm2')">提交</el-button>
    <el-button @click="clearnSurrog('ruleForm2')">重置</el-button>
</el-form-item>


</el-form>
   </el-dialog>
   <!--添加接送人弹出框-->
 
  <!--接送人信息table-->
  <el-col :span="24" style="border:1px solid #18C79C;margin-top: 10px;">
  <el-card class="box-card parent-tabs">
  <div slot="header" class="clearfix">
    <span >接送人信息</span>
    <el-button @click.native="opensurrogateedit"  style="float: right;" type="primary">添加</el-button>
  </div>
  
  	<el-table
	    :data="tableData2"
	    stripe
	    style="width: 100%">
	    <el-table-column
       	 type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="headurl "
	      label="头像"
	      sortable
	      width="120">
		   <template scope="scope">
          <img :src="imgService + scope.row.headurl" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
	    </el-table-column>
	    
	     <!--<el-table-column
        prop="id"
        label="id"
        sortable
        width="100">
      </el-table-column>-->
	    <el-table-column
	      prop="name"
	      label="姓名"
	      sortable
	     >
	    </el-table-column>
	    <el-table-column
	      prop="telphone"
	      label="联系电话"
	      sortable
	    >
	    </el-table-column>
	    <el-table-column
	      prop="phone"
	      label="手机号码"
	      sortable
	     >
	    </el-table-column>
	    <el-table-column
	      prop="idcard"
	      label="身份证"
	      sortable
	      >
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="家庭地址"
	      sortable
	      >
	    </el-table-column>
	    <el-table-column
	      prop="deleteFlag"
	      label="状态"
	      sortable
	       :formatter="formatstate">
	    </el-table-column>
	    <el-table-column
		      label="操作"
		      >
		      <template scope="scope">
		      	<el-button
		          @click.native.prevent="editsurrogate(scope.row)"
		         type="button"
		          size="small">
		          编辑
		        </el-button>
		        <el-button
		          :plain="true"
		          @click.native.prevent="delSurrogate(scope.row.id,scope.row.phone)"
		          type="button"
		          size="small">
		         删除
		        </el-button>
		      </template>
		  </el-table-column>
	  </el-table>
  </el-card>
</el-col>
    <!--接送人信息table-->
    
    <!--套餐弹框-->
   <el-dialog title="套餐选择" :visible.sync="dialogFormVisibleCom" :before-close="handleClose" >
      <el-table
        v-loading="loading2"
        element-loading-text="拼命加载中"
        :data="tableDataCom"
        border
        style="width: 100%"
        :default-sort = "{prop: 'array'}"
        @selection-change="handleSelectionChange"
        >
        <el-table-column
           type="selection"
          width="55">
        </el-table-column>
        <!--<el-table-column
          prop="id"
          label="id"
          sortable
          width="180">
        </el-table-column>-->
        <el-table-column
          prop="name"
          label="套餐名称"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="套餐价格/元"
          sortable
         >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="whenLong"
          label="时长/天"
          sortable
         >
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="createMam"
          label="创建人"
          sortable
         >
        </el-table-column>
        <el-table-column
          prop="deleteFlag"
          label="状态"
          sortable
          :formatter="formatstate1">
        </el-table-column>
      <el-table-column
            fixed="right"
            label="操作"
            width="130">
            <template scope="scope">
              <el-button
                @click.native="kaitongCom(scope.row)"
                type="text"
                size="small">
                开通
              </el-button>
            </template>
        </el-table-column>
        
      </el-table>
      
   </el-dialog>
  <!--套餐弹框-->
  
  <!--确认开通套餐弹框-->
  <el-dialog title="开通套餐" :visible.sync="dialogFormVisibleDanKuang">
  <el-form :model="com">
    <el-form-item label="套餐名称" >
      <el-input v-model="com.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="应付金额/元" >
      <el-input v-model="com.totalAmount" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="优惠金额/元" >
      <el-input v-model="com.discountAmount" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="实付金额/元" >
      <el-input v-model="com.payAmount" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleDanKuang = false" >取 消</el-button>
    <el-button type="primary" @click="querenCom" >确 定</el-button>
  </div>
</el-dialog>
 <!--确认开通套餐弹框-->
   
</el-row>
</template>

<script>
import editor from '../../components/editor/editor'
import http from '../../utils/http'
export default {
  components: {
    'editor': editor
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        dialogImageUrl: '',
        dialogVisible: false,
        num1: 0,
        editorContent: '',
        imageUrl: ''
      },
      tableData: [],
      parentDate: [],
      formInline: {
        class: ''
      },
      classlist: [],
      classvalue: '',
      classs: '',
      radio: '',
      birthday: '',
      entranceTime: '',
      babyName: '',
      shoollist: [],
      shoolvalue: '',
      checkWorkAttendanceCars: [],
      amCheckInDeadline: '', // 时间
      eruxueshijian: '', // 入学时间
      carID: [],
      cars: '',
      mobile: '',
      bindingCode: '',
      dialogFormVisible: false,
      dialogFormVisibleP: false,
      dialogFormVisibleCom: false,
      dialogFormVisibleDanKuang: false,
      kahaobianji: [],
      tingyong: [],
      shanchu: [],
      options: [{
        value: '0',
        label: '爸爸'
      }, {
        value: '1',
        label: '妈妈'
      }, {
        value: '2',
        label: '爷爷'
      }, {
        value: '3',
        label: '奶奶'
      }, {
        value: '4',
        label: '外公'
      }, {
        value: '5',
        label: '外婆'
      }, {
        value: '6',
        label: '邻居'
      }, {
        value: '7',
        label: '哥哥'
      }, {
        value: '8',
        label: '姐姐'
      }, {
        value: '9',
        label: '叔叔'
      }, {
        value: '10',
        label: '婶婶'
      }, {
        value: '11',
        label: '保姆'
      }],
      relationship: '',
      temp: {
        imageUrl: '',
        phonef: '',
        phone_num: '',
        fphone: '',
        relationship: '',
        disabled: '',
        baseMemberID: '',
        parentid: ''
      },
      sug: {
        name: '',
        headurl: '',
        phone: '',
        telphone: '',
        idcard: '',
        address: '',
        relationship: '',
        imageUrl: '',
        surrogateid: ''
      },
      truefalseP: false,
      truefalseS: false,
      loading1: '',
      tableDataCom: [],
      com: {
        name: '',
        payAmount: '',
        totalAmount: '',
        discountAmount: '',
        memberId: '',
        whenLong: ''
      },
      quxiao: false,
      chongzhi: true,
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
// 查看绑定码
    Lookbinding () {
      this.$message({
        message: this.bindingCode,
        type: 'warning'
      })
    },
// 打开套餐
    async oppenCom (parentID) {
      this.memberId = parentID
      if (this.$router.currentRoute.query.id === 1) {
        this.$message({
          message: '请先新增学生和家长',
          type: 'warning'
        })
      }
      this.loading2 = true
      this.dialogFormVisibleCom = true
      let BaseCombo = {
        name: '',
        startPage: 1,
        pageSise: 5
      }
      let data = await http.post('/baseData/findBaseCombopage', BaseCombo)
      this.tableDataCom = data.data.obj.baseCombolist
      this.loading2 = false
    },
// 确认开通套餐弹框
    async kaitongCom (row) {
      let MemOrder = {
        comboId: row.id,
        memberId: this.memberId
      }
      let result = await http.post('/order/findMemOrderBymenIDANDComID', MemOrder)
      if (result.data.obj) {
        this.$message({
          message: '你已开通',
          type: 'warning'
        })
      } else {
        this.dialogFormVisibleDanKuang = true
        this.com.name = row.name
        this.com.payAmount = (row.price * row.discount) / 10
        this.com.totalAmount = row.price
        this.com.discountAmount = this.com.totalAmount - this.com.payAmount
        this.com.comboId = row.id
        this.com.whenLong = row.whenLong
      }
    },
// 提交套餐订单
    async querenCom () {
      let MemOrder = {
        totalAmount: this.com.totalAmount,
        discountAmount: this.com.discountAmount,
        payAmount: this.com.payAmount,
        comboId: this.com.comboId,
        memberId: this.memberId,
        babyId: this.$router.currentRoute.query.id,
        whenLong: this.com.whenLong
      }
      let result = await http.post('/order/addMemOrder', MemOrder)
      this.$message({
        message: result.data.obj,
        type: 'success'
      })
      this.dialogFormVisibleDanKuang = false
    },
// 第一个图片的 孩子的
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
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
    // 第二个图片的家长的
    handleAvatarSuccessP (res, file) {
      this.temp.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.temp.imageUrl)
    },
    beforeAvatarUploadP (file) {
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
    // 第三个图片的接送人的
    handleAvatarSuccessS (res, file) {
      this.sug.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.sug.imageUrl)
    },
    beforeAvatarUploadS (file) {
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

// 添加家长
    openparenedit () {
      let id = this.$router.currentRoute.query.id
      if (id !== '1') {
        this.truefalseP = false
        this.dialogFormVisible = true
      } else {
        this.$message({
          message: '请先新增学生',
          type: 'warning'
        })
      }
    },
// 添加家长绑定数据
    async parentSubmit () {
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.temp.phone_num))) {
        this.$message({
          message: '请填写正确的手机号码',
          type: 'error'
        })
        this.temp.phone_num = ''
        return false
      }
      if (this.temp.imageUrl.length < 1 || this.temp.relationship.length < 1 || this.temp.name.length < 1) {
        this.$message({
          message: '请填完整',
          type: 'error'
        })
      } else {
        let BaseMember = {
          name: this.temp.name,
          phoneNum: this.temp.phone_num,
          relationship: this.temp.relationship,
          babyid: this.$router.currentRoute.query.id,
          fphone: this.temp.fphone,
          parentid: this.temp.parentid,
          imageUrl: this.temp.imageUrl,
          disabled: this.temp.disabled,
          baseMemberID: this.temp.baseMemberID
        }
        if (this.truefalseP) { // 这个是修改
          let result = await http.post('/baby/editParentInfonation', BaseMember)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
        } else {
          let result = await http.post('/baby/addParentbaby', BaseMember)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
          this.dialogFormVisible = false
          this.clean()
        }
        this.clean()
        this.parentData()
        this.dialogFormVisible = false
      }
    },
// 添加家长的按钮关闭
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.clean()
        })
        .catch(_ => {})
    },
    // 家长内容重置
    clean () {
      this.temp.name = ''
      this.temp.phone_num = ''
      this.temp.relationship = ''
//    this.$router.currentRoute.query.parentid = ''
      this.temp.imageUrl = ''
      this.temp.disabled = ''
      this.temp.baseMemberID = ''
    },
    // 判断家长是否存在 焦点转移
    async changeCount () {
      this.temp.name = ''
      this.temp.disabled = false
      let r = {
        phone: this.temp.phone_num
      }
      let result = await http.post('/baby/findBsememberByPhone', r)
      this.temp.name = result.data.obj[0].name
      this.temp.baseMemberID = result.data.obj[0].id
      this.temp.imageUrl = this.imgService + result.data.obj[0].headPortrait
      if (this.temp.name.length > 1) {
        this.temp.disabled = true
      }
    },
// 打开添加联系人窗口
    opensurrogateedit () {
      let id = this.$router.currentRoute.query.id // 宝贝ID
      if (id !== '1') {
        this.truefalseS = false
        this.dialogFormVisibleP = true
      } else {
        this.$message({
          message: '请先新增学生',
          type: 'warning'
        })
      }
    },
// 确定添加<联系人>
    async addsurrogate () {
//    if (!/^([0-9]{17}[0-9X]{1})|([0-9]{15})$/.test(this.sug.idcard)) {
//      this.$message({
//        message: '身份证验证不正确',
//        type: 'error'
//      })
//      this.temp.phone_num = ''
//      return false
//    }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.sug.phone)) {
        this.$message({
          message: '手机号验证不正确',
          type: 'error'
        })
        this.sug.phone = ''
        return false
      }
      if (this.sug.imageUrl.length < 1 || this.sug.name.length < 1 || this.sug.phone.length < 1 || this.sug.telphone.length < 1 || this.sug.idcard.length < 1 || this.sug.relationship.length < 1) {
        this.$message({
          message: '填完整数据',
          type: 'warning'
        })
      } else {
        let BaseSurrogate = {
          name: this.sug.name,
          phone: this.sug.phone,
          headurl: this.sug.headurl,
          telphone: this.sug.telphone,
          idcard: this.sug.idcard,
          address: this.sug.address,
          relationship: this.sug.relationship,
          imageUrl: this.sug.imageUrl,
          id: this.sug.surrogateid,
          babyid: this.$router.currentRoute.query.id // babyID
        }
        if (this.truefalseS) { // 确定是修改
          let result = await http.post('/baby/editBaseSurrogate', BaseSurrogate)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
        } else {
          let result = await http.post('/baby/addSurrogate', BaseSurrogate)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
        }
        this.clearnSurrog()
        this.parentData()
        this.dialogFormVisibleP = false
      }
    },
// 清除联系人弹框内容
    clearnSurrog () {
      this.sug.imageUrl = ''
      this.sug.name = ''
      this.sug.headurl = ''
      this.sug.phone = ''
      this.sug.telphone = ''
      this.sug.idcard = ''
      this.sug.address = ''
      this.sug.relationship = ''
    },
// 关闭联系人弹框
    handleClosesug (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.clearnSurrog()
        })
        .catch(_ => {})
    },
    amSignTime (val) {
      this.amCheckInDeadline = val // 时间
    },
    changeEntranceTime (val) {
      this.eruxueshijian = val // 时间
    },
    formatstate: function (row, column) {
      if (row.deleteFlag === false) {
        return '未删除'
      } else {
        return '已删除'
      }
    },
    formatstate1: function (row, column) {
      if (row.deleteFlag === 0) {
        return '未删除'
      } else {
        return '已删除'
      }
    },
// 与我关系
    formrelationship: function (row, column) {
      if (row.relationship === 0) {
        return '爸爸'
      } if (row.relationship === 1) {
        return '妈妈'
      } if (row.relationship === 2) {
        return '爷爷'
      } if (row.relationship === 3) {
        return '奶奶'
      } if (row.relationship === 4) {
        return '外公'
      } if (row.relationship === 5) {
        return '外婆'
      } if (row.relationship === 6) {
        return '邻居'
      } if (row.relationship === 7) {
        return '哥哥'
      } if (row.relationship === 8) {
        return '姐姐'
      } if (row.relationship === 9) {
        return '叔叔'
      } if (row.relationship === 10) {
        return '婶婶'
      } if (row.relationship === 11) {
        return '保姆'
      }
    },
// 停用卡号
    async tingYong (val) {
      let MemBabyCards = {
        id: val
      }
      let result = await http.post('/baby/editBabyCardsService', MemBabyCards)
      this.$message({
        message: result.data.obj,
        type: 'success'
      })
      this.geteditData()
    },
// 删除卡号
    async shanchukahao (val) {
      let MemBabyCards = {
        id: val
      }
      let result = await http.post('/baby/delBabyCardsService', MemBabyCards)
      this.$message({
        message: result.data.obj,
        type: 'success'
      })
      this.geteditData()
    },
// 编辑家长
    editoppen (row) {
      this.dialogFormVisible = true
      this.temp.name = row.name
      this.temp.relationship = row.relationship + ''
      this.temp.phone_num = row.phone_num
      this.temp.fphone = row.phone_num
      this.temp.imageUrl = this.imgService + row.head_portrait
      this.temp.parentid = row.parentID
      this.truefalseP = true
    },
// 编辑联系让人
    editsurrogate (row) {
      this.dialogFormVisibleP = true
      this.sug.name = row.name
      this.sug.phone = row.phone
      this.sug.telphone = row.telphone
      this.sug.idcard = row.idcard
      this.sug.address = row.address
      this.sug.relationship = row.relationship
      this.sug.headurl = this.imgService + row.headurl
      this.sug.imageUrl = this.imgService + row.headurl
      this.sug.surrogateid = row.id
      this.truefalseS = true
    },
// 删除家长
    async delparent (parentID, phonenum) {
      let r = {
        parentid: parentID,
        fphone: phonenum
      }
      let result = await http.post('/baby/delParentConnection', r)
      this.$message({
        message: result.data.obj,
        type: 'success'
      })
      this.parentData()
    },
// 删除联系人
    async delSurrogate (id) {
      let r = {
        parentid: id
      }
      let result = await http.post('/baby/delBaseSurrogate', r)
      this.$message({
        message: result.data.obj,
        type: 'success'
      })
      this.parentData()
    },
// 加载基础数据
    async getData () {
      let data0 = await http.post('/school/getCboSchool')
      this.shoollist = data0.data.obj
    },
// 初始化绑定数据
    async geteditData () {
      let r = {
        babyid: this.$router.currentRoute.query.id
      }
      let data2 = await http.post('/baby/findOneBaby', r)
      this.babyName = data2.data.obj.baseBaby.name
      this.radio = data2.data.obj.baseBaby.sex + ''
//    this.classvalue = data2.data.obj.baseBaby.classId + ''
      this.birthday = data2.data.obj.baseBaby.birthday
      this.mobile = data2.data.obj.baseBaby.mobile
      this.entranceTime = data2.data.obj.baseBaby.entranceTime
      this.shoolvalue = data2.data.obj.baseBaby.schoolId
      this.bindingCode = data2.data.obj.baseBaby.bindingCode
      this.imageUrl = this.imgService + data2.data.obj.baseBaby.headPortrait
      for (var i = 0; i < data2.data.obj.memBabyCards.length; i++) { // 这里不影响性能最大数为5
        this.carID[i] = data2.data.obj.memBabyCards[i].id // 卡号id
        this.checkWorkAttendanceCars[i] = data2.data.obj.memBabyCards[i].cardNum // 卡号
        this.kahaobianji[i] = true
        if (data2.data.obj.memBabyCards[i].blockupFlag === 1) {
          this.tingyong[i] = true
        } else {
          this.tingyong[i] = false
        }
        if (data2.data.obj.memBabyCards[i].deleteFlag === 1) {
          this.shanchu[i] = true
        } else {
          this.shanchu[i] = false
        }
      }
    },
// 新增 和修改Baby
    async submitForm () {
//    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)) {
//      this.$message({
//        message: '手机号验证不正确',
//        type: 'error'
//      })
//      this.temp.phone_num = ''
//      return false
//    }
//    this.loading1 = true
//    this.cars = this.checkWorkAttendanceCars.join(',') // 这是把字符串数组转化为字符串
//    if (this.cars !== null && this.babyName.length > 0 && this.radio.length > 0 && this.amCheckInDeadline.length > 0 && this.eruxueshijian.length > 0 && this.shoolvalue.length > 0 && this.$router.currentRoute.query.id.length > 0 && this.mobile.length > 0) {
      this.cars = this.checkWorkAttendanceCars.join(',') // 这是把字符串数组转化为字符串
      let BaseBaby = {
        name: this.babyName,
        cars: this.cars,
        sex: this.radio,
        shengri: this.birthday = this.amCheckInDeadline,
        ruxueshijian: this.entranceTime = this.eruxueshijian,
        schoolId: this.shoolvalue,
        babyid: this.$router.currentRoute.query.id,
        imageUrl: this.imageUrl,
        mobile: this.mobile
      }
      if (this.$router.currentRoute.query.id !== '1') {
        let result = await http.post('/baby/editBaby', BaseBaby)
        this.$message({
          message: result.data.obj,
          type: 'warning'
        })
        this.loading1 = false
      } else {
        let result = await http.post('/baby/addBaseBaby', BaseBaby)
        this.$message({
          message: result.data.obj,
          type: 'warning'
        })
        this.loading1 = false
        this.resetForm()
      }
//    } else {
//      this.$message({
//        message: '请填完整数据',
//        type: 'warning'
//      })
//      this.loading1 = false
//    }
    },
// 重置
    resetForm () {
      this.checkWorkAttendanceCars = ''
      this.babyName = ''
      this.shoolvalue = ''
      this.radio = '0'
      this.entranceTime = ''
      this.birthday = ''
      this.imageUrl = ''
      this.mobile = ''
      this.checkWorkAttendanceCars = []
      this.kahaobianji = false
      this.tingyong = false
      this.shanchu = false
    },
// 取消
    quxiaoForm () {
      this.$router.push({ path: '/studentList' })
    },
    async parentData () {
      let r = {
        babyid: this.$router.currentRoute.query.id,
        parentid: '', // 根据孩子查询家长不需要 家长ID
        baseSurrogateid: '' // 根据孩子查询联系人不需要 联系人ID
      }
      let result = await http.post('/baby/findParentInfonation', r)
      this.tableData = result.data.obj.preantInfomationDTO
      this.tableData2 = result.data.obj.OneBabybaseSurrogateDTO
    }
  },
  mounted () {
    this.getData()
    if (this.$router.currentRoute.query.id !== '1') {
      this.geteditData()
      this.parentData()
      this.chongzhi = false // 重置
      this.quxiao = true // 取消
    }
  }
}
</script>

<style>
	.parent-tabs .el-card__body{
		padding: 0;
	}
</style>
