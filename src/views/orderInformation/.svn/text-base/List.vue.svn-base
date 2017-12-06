<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">订单列表 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form :inline="true">
    <el-form-item label="所属园所" class="blist">
      <el-input v-model="vague"  placeholder="可输入关键字筛选"></el-input>
    </el-form-item>
    <el-form-item label="订单状态">
      <el-select v-model="orderState" clearable placeholder="请选择">
    <el-option
      v-for="item in orderStates"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item>
    <span class="demonstration">时间</span>
    <el-date-picker
      :editable="false"
      v-model="timeSlot"
      type="daterange"
      align="right"
      placeholder="选择日期范围"
      :picker-options="pickerorderIds"
      @change="getTimeSlot">
    </el-date-picker>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info" class="el-icon-search" @click="sel"> 查询</el-button>
      <el-button type="danger" class="el-icon-delete"> 删除</el-button>
    </span>
  </el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
      <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="dgvData"
      border
      style="width: 100%"
      :default-sort = "{prop: 'array'}"
      @selection-change="handleSelectionChange">
      <el-table-column
         type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="schoolName"
        label="所属园校">
      </el-table-column>
      <el-table-column
        prop="comboName"
        label="套餐名称">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="memberName"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="state"
        label="订单状态">
         <template scope="scope">
          <span v-if="scope.row.state=== 0" style="color: red">未支付</span>
          <span v-else-if="scope.row.state=== 1" style="color: green">已支付</span>
          <span v-else-if="scope.row.state=== 2" style="color: red">退款中</span>
          <span v-else-if="scope.row.state=== 3" style="color: red">已退款</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="discountAmount"
        label="优惠金额">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="应付金额">
      </el-table-column>
      <el-table-column
        prop="payAmount"
        label="实付金额">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="paymentType"
        label="支付方式"
        :formatter="formatPayType">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="deleteFlag"
        label="删除标记">
        <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0">正常</span>
          <span v-else style="color: red">删除</span>
      </template>
      </el-table-column>
    <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template scope="scope">
            <el-button
              @click.native.prevent="edit(scope.row.id)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
      </el-table-column>
      
    </el-table>
  </el-col>
  <el-col>
    <div class="block" style="float: right;margin-right: 10px;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-col>
  </el-row>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        dgvData: [], // dgv公告数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        loading: false, // 加载中
        orderIds: '', // 订单di集合
        vague: '',
        orderStates: [{
          value: '0',
          label: '未支付'
        }, {
          value: '1',
          label: '已支付'
        }, {
          value: '2',
          label: '退款中'
        }, {
          value: '3',
          label: '已退款'
        }],
        pickerorderIds: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        timeSlot: '', // 时间段
        orderState: '', // 订单状态
        starteTime: '', // 开始时间
        endTime: '' // 结束时间
      }
    },
    methods: {
         // 异步加载班级信息
      async getdgvData () {
        this.loading = true
        let params = {
          startPage: this.page,
          pageSize: this.size,
          endTime: this.endTime,
          starteTime: this.starteTime,
          orderState: this.orderState,
          vague: this.vague
        }
        let data = await http.post('/order/findOrderInfo', params)
        if (data.data.success) {
          this.dgvData = data.data.obj.list
          this.total = data.data.obj.total
        } else {
          this.message(data.data.msg)
          this.dgvData = []
          this.total = 0
        }
        this.loading = false
      },
      // 查询按钮点击事件
      sel () {
        this.getdgvData()
      },
      // 选中改变
      handleSelectionChange (val) {
        var strIds = []
        this.orderIds = ''
        val.forEach(row => {
          strIds.push(row.id)
        })
        if (strIds.length > 0) {
          this.orderIds = strIds.join(',')
        }
      },
      // 删除班级
      async del () {
        let params = {
          orderIds: this.orderIds
        }
        let data = await http.post('/Inform/delClassById.do', params)
        if (data.data.success) {
          this.successResult()
        } else {
          this.message(data.data.msg)
        }
        this.getdgvData()
        this.orderIds = ''
      },
      // 每页大小改变
      handleSizeChange (val) {
        this.size = val
        this.getdgvData()
      },
      // 当前页码改变
      handleCurrentChange (val) {
        this.page = val
        this.getdgvData()
      },
      // 获取时间
      getTimeSlot (val) {
        var timeDuan = []
        timeDuan = val.split(' - ')
        if (timeDuan.length === 2) {
          this.endTime = timeDuan[1]
          this.starteTime = timeDuan[0]
        } else {
          this.endTime = ''
          this.starteTime = ''
        }
      },
      // 格式支付方式
      formatPayType (row, column, cellValue) {
        if (row[column.property] === 0) {
          cellValue = '微信支付'
        }
        return cellValue
      },
      // 自定义消息
      message (msg) {
        this.$message(msg)
      },
      // 成功消息
      successResult () {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      },
      // 失败消息
      failResult () {
        this.$message({
          message: '操作失败',
          type: 'warning'
        })
      }
    },
      // 初始化方法
    mounted () {
      this.getdgvData()
    }
  }

</script>

<style>
  .border{
    border: 1px solid #eef6f6;
    border-radius: 5px;
    margin-top: 15px;
    padding: 15px 20px;
  }
  .blist{
    margin:0;
  }
</style>
