import Vue from 'vue'
import Router from 'vue-router'
import { getStore } from '../utils/utils'

const login = r => require.ensure([], () => r(require('@/views/index/Login')), 'login')
const home = r => require.ensure([], () => r(require('@/views/index/Home')), 'home')
const bannerList = r => require.ensure([], () => r(require('@/views/banner/List')), 'bannerList')
const bannerEdit = r => require.ensure([], () => r(require('@/views/banner/Edit')), 'bannerEdit')
// 校园资讯
const itList = r => require.ensure([], () => r(require('@/views/information/List')), 'itList')
const itEdit = r => require.ensure([], () => r(require('@/views/information/Edit')), 'itEdit')
// 教师管理
const teacherList = r => require.ensure([], () => r(require('@/views/teacher/List')), 'teacherList')
const teacherEdit = r => require.ensure([], () => r(require('@/views/teacher/Edit')), 'teacherEdit')
const dutiesList = r => require.ensure([], () => r(require('@/views/teacher/DutiesList')), 'dutiesList')
// 学员管理
const studentList = r => require.ensure([], () => r(require('@/views/student/List')), 'studentList')
const studentEdit = r => require.ensure([], () => r(require('@/views/student/Edit')), 'studentEdit')
const parentEdit = r => require.ensure([], () => r(require('@/views/student/ParentEdit')), 'parentEdit')
const surrogateEdit = r => require.ensure([], () => r(require('@/views/student/SurrogateEdit')), 'surrogateEdit')
// 公告管理
const noticeList = r => require.ensure([], () => r(require('@/views/notice/List')), 'noticeList')
const noticeEdit = r => require.ensure([], () => r(require('@/views/notice/Edit')), 'noticeEdit')
const push = r => require.ensure([], () => r(require('@/views/notice/Push')), 'push')
// 信箱列表
const mailboxList = r => require.ensure([], () => r(require('@/views/mailbox/List')), 'mailboxList')
const mailboxEdit = r => require.ensure([], () => r(require('@/views/mailbox/Edit')), 'mailboxEdit')
// 平台信息
const platformList = r => require.ensure([], () => r(require('@/views/mailbox/PlatformList')), 'platformList')
const platformEdit = r => require.ensure([], () => r(require('@/views/mailbox/PlatformEdit')), 'platformEdit')
// 家长报名
const parentSignList = r => require.ensure([], () => r(require('@/views/mailbox/ParentSignList')), 'parentSignList')
// 园所管理
const schoolList = r => require.ensure([], () => r(require('@/views/school/List')), 'schoolList')
// SchoolList
const schoolEdit = r => require.ensure([], () => r(require('@/views/school/Edit')), 'schoolEdit')
// 签到表
const signInRecordList = r => require.ensure([], () => r(require('@/views/signInRecord/List')), 'signInRecordList')
const signInRecordEdit = r => require.ensure([], () => r(require('@/views/signInRecord/Edit')), 'signInRecordEdit')
// 请假管理
const LeaveRecordList = r => require.ensure([], () => r(require('@/views/LeaveRecord/List')), 'LeaveRecordList')
const statisticsList = r => require.ensure([], () => r(require('@/views/LeaveRecord/statisticsList')), 'statisticsList')
// 营养餐普
const nutritionrecipesList = r => require.ensure([], () => r(require('@/views/nutritionrecipes/List')), 'nutritionrecipesList')
const nutritionrecipesEdit = r => require.ensure([], () => r(require('@/views/nutritionrecipes/Edit')), 'nutritionrecipesEdit')
// 每日食谱
const nutritionrecipeseveryDay = r => require.ensure([], () => r(require('@/views/nutritionrecipes/everyDay')), 'nutritionrecipeseveryDay')
const nutritionrecipesEveryDayEdit = r => require.ensure([], () => r(require('@/views/nutritionrecipes/EveryDayEdit')), 'nutritionrecipesEveryDayEdit')
const nutritionrecipesDetailed = r => require.ensure([], () => r(require('@/views/nutritionrecipes/Detailed')), 'nutritionrecipesDetailed')
// 活动管理列表
const thematicActivitiesList = r => require.ensure([], () => r(require('@/views/thematicActivities/List')), 'thematicActivitiesList')
const thematicActivitiesEdit = r => require.ensure([], () => r(require('@/views/thematicActivities/Edit')), 'thematicActivitiesEdit')
const thematicActivitiesEnroll = r => require.ensure([], () => r(require('@/views/thematicActivities/Enroll')), 'thematicActivitiesEnroll')
// 班级列表
const classList = r => require.ensure([], () => r(require('@/views/class/List')), 'classList')
const classEdit = r => require.ensure([], () => r(require('@/views/class/Edit')), 'classEdit')
// 排班管理
const babyClass = r => require.ensure([], () => r(require('@/views/class/babyClass')), 'babyClass')
const TeacherClass = r => require.ensure([], () => r(require('@/views/class/teacherClass')), 'TeacherClass')
// 动态列表
const campusInformationList = r => require.ensure([], () => r(require('@/views/campusInformation/List')), 'campusInformationList')
const campusInformationdetailed = r => require.ensure([], () => r(require('@/views/campusInformation/detailed')), 'campusInformationdetailed')
const campusInformationEdit = r => require.ensure([], () => r(require('@/views/campusInformation/Edit')), 'campusInformationEdit')
// 订单管理
const orderInformationList = r => require.ensure([], () => r(require('@/views/orderInformation/List')), 'orderInformationList')
// 家长评价
const parentEvlList = r => require.ensure([], () => r(require('@/views/evaluating/parent_evl_list')), 'parentEvlList')
// 教师评价
const teacherEvlList = r => require.ensure([], () => r(require('@/views/evaluating/teacher_evl_list')), 'teacherEvlList')
const teacherCritEdit = r => require.ensure([], () => r(require('@/views/evaluating/publish')), 'teacherCritEdit')
// 教师评价内容
const teacherEvalContentList = r => require.ensure([], () => r(require('@/views/baseEvaluating/teacher_eval_content_list')), 'teacherEvalContentList')
// 教师评价项目
const teacherEvalProjectList = r => require.ensure([], () => r(require('@/views/baseEvaluating/teacher_eval_project_list')), 'teacherEvalProjectList')
// 家长评价标准
const parentCriteList = r => require.ensure([], () => r(require('@/views/baseEvaluating/parent_crite_list')), 'parentCriteList')
const parentCriteEdit = r => require.ensure([], () => r(require('@/views/baseEvaluating/parent_crite_edit')), 'parentCriteEdit')
const teacherEvalContentEdit = r => require.ensure([], () => r(require('@/views/baseEvaluating/teacher_eval_content_edit')), 'teacherEvalContentEdit')
const teacherEvalProjectEdit = r => require.ensure([], () => r(require('@/views/baseEvaluating/teacher_eval_project_edit')), 'teacherEvalProjectEdit')
const moduleList = r => require.ensure([], () => r(require('@/views/role/ModuleList')), 'moduleList')
const moduleEdit = r => require.ensure([], () => r(require('@/views/role/ModuleEdit')), 'moduleEdit')
// 年级管理
const gradeList = r => require.ensure([], () => r(require('@/views/school/grade/List')), 'gradeList')
const gradeEdit = r => require.ensure([], () => r(require('@/views/school/grade/Edit')), 'gradeEdit')
// 菜单管理
const roleModuleList = r => require.ensure([], () => r(require('@/views/role/RoleModuleList')), 'roleModuleList')
const roleModuleEdit = r => require.ensure([], () => r(require('@/views/role/RoleModuleEdit')), 'roleModuleEdit')
const userList = r => require.ensure([], () => r(require('@/views/role/UserList')), 'userList')
const userEdit = r => require.ensure([], () => r(require('@/views/role/UserEdit')), 'userEdit')
const parentEvlDetail = r => require.ensure([], () => r(require('@/views/evaluating/parent_evl_detail')), 'parentEvlDetail')
// 套餐管理
const basecombo = r => require.ensure([], () => r(require('@/views/baseData/baseComboList')), 'basecombo')
const basecomboEdit = r => require.ensure([], () => r(require('@/views/baseData/baseComboEdit')), 'basecomboEdit')
const memmessage = r => require.ensure([], () => r(require('@/views/baseData/memMessageList')), 'memmessage')
const baseLable = r => require.ensure([], () => r(require('@/views/baseData/baseLable')), 'baseLable')
const baseLableEdit = r => require.ensure([], () => r(require('@/views/baseData/baseLableEdit')), 'baseLableEdit')
// 育儿知识
const baseparentingknowledgeEdit = r => require.ensure([], () => r(require('@/views/babyknowledge/Edit')), 'baseparentingknowledgeEdit')
const baseparentingknowledgelist = r => require.ensure([], () => r(require('@/views/babyknowledge/List')), 'baseparentingknowledgelist')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/index',
      component: home,
      children: [
        { path: '/bannerlist', component: bannerList },
        { path: '/banneredit', component: bannerEdit },
        { path: '/itlist', component: itList },
        { path: '/itedit', component: itEdit },
        { path: '/teacherlist', component: teacherList },
        { path: '/teacheredit', component: teacherEdit },
        { path: '/dutiesList', component: dutiesList },
        { path: '/studentlist', component: studentList },
        { path: '/studentEdit', component: studentEdit },
        { path: '/parentedit', component: parentEdit },
        { path: '/surrogateedit', component: surrogateEdit },
        { path: '/noticelist', component: noticeList },
        { path: '/noticeedit', component: noticeEdit },
        { path: '/push', component: push },
        { path: '/mailboxlist', component: mailboxList },
        { path: '/mailboxedit', component: mailboxEdit },
        { path: '/platformlist', component: platformList },
        { path: '/platformedit', component: platformEdit },
        { path: '/parentsignlist', component: parentSignList },
        { path: '/schoollist', component: schoolList },
        { path: '/schooledit', component: schoolEdit },
        { path: '/signInRecordList', component: signInRecordList },
        { path: '/signInRecordEdit', component: signInRecordEdit },
        { path: '/LeaveRecordList', component: LeaveRecordList },
        { path: '/statisticsList', component: statisticsList },
        { path: '/nutritionrecipesList', component: nutritionrecipesList },
        { path: '/nutritionrecipesEdit', component: nutritionrecipesEdit },
        { path: '/nutritionrecipesEveryDay', component: nutritionrecipeseveryDay },
        { path: '/nutritionrecipesEveryDayEdit', component: nutritionrecipesEveryDayEdit },
        { path: '/nutritionrecipesDetailed', component: nutritionrecipesDetailed },
        { path: '/thematicActivitiesList', component: thematicActivitiesList },
        { path: '/thematicActivitiesEdit', component: thematicActivitiesEdit },
        { path: '/thematicActivitiesEnroll', component: thematicActivitiesEnroll },
        { path: '/classList', component: classList },
        { path: '/classEdit', component: classEdit },
        { path: '/babyClass', component: babyClass },
        { path: '/TeacherClass', component: TeacherClass },
        { path: '/campusInformationList', component: campusInformationList },
        { path: '/campusInformationEdit/tiao', component: campusInformationEdit },
        { path: '/orderInformationList', component: orderInformationList },
        { path: '/campusInformationdetailed', component: campusInformationdetailed },
        { path: '/parentEvlList', component: parentEvlList },
        { path: '/teacherEvlList', component: teacherEvlList },
        { path: '/teacherCritEdit', component: teacherCritEdit },
        { name: 'teacherEvaluating', path: '/teacherCritEdit/:id, :babyTeamId', component: teacherCritEdit },
        { path: '/parentCriteList', component: parentCriteList },
        { name: 'parentEvalCheck', path: '/parentEvlDetail/:gradeId, :babyTeamId', component: parentEvlDetail },
        { path: '/teacherEvalContentList', component: teacherEvalContentList },
        { path: '/teacherEvalProjectList', component: teacherEvalProjectList },
        { path: '/parentCriteEdit', component: parentCriteEdit },
        { name: 'parentCrite', path: '/parentCriteEdit/:id', component: parentCriteEdit },
        { path: '/teacherEvalContentEdit', component: teacherEvalContentEdit },
        { name: 'teacherEvalContent', path: '/teacherEvalContentEdit/:id', component: teacherEvalContentEdit },
        { path: '/teacherEvalProjectEdit', component: teacherEvalProjectEdit },
        { name: 'teacherEvalPro', path: '/teacherEvalProjectEdit/:id', component: teacherEvalProjectEdit },
        { path: '/moduleList', component: moduleList },
        { name: 'module', path: '/moduleEdit', component: moduleEdit },
        { name: 'module', path: '/moduleEdit/:id', component: moduleEdit },
        { path: '/gradeList', component: gradeList },
        { path: '/gradeEdit', component: gradeEdit },
        { name: 'grade', path: '/gradeEdit/:id', component: gradeEdit },
        { path: '/roleModuleList', component: roleModuleList },
        { name: 'roleModule', path: '/roleModuleEdit', component: roleModuleEdit },
        { path: '/userList', component: userList },
        { name: 'user', path: '/userEdit', component: userEdit },
        { path: '/basecombo', component: basecombo },
        { path: '/basecomboEdit', component: basecomboEdit },
        { path: '/memmessage', component: memmessage },
        { path: '/baseLable', component: baseLable },
        { path: '/baseLableEdit', component: baseLableEdit },
        { path: '/baseparentingknowledgelist', component: baseparentingknowledgelist },
        { path: '/baseparentingknowledgeEdit', component: baseparentingknowledgeEdit }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(getStore('userInfo'))
  let resouces = JSON.parse(getStore('userResouce'))
  // 登录界面直接通过
  if (to.path === '/') {
    return next()
  }
  if (to.path === '/index' && userInfo !== null) {
    return next()
  }
  if (resouces !== null && resouces !== undefined) {
    // return next()
    for (var i = 0; i < resouces.length; i++) {
      for (var j = 0; j < resouces[i].roleModular.length; j++) {
        if (to.path === resouces[i].roleModular[j].url) {
          return next()
        }
        if (resouces[i].roleModular[j].pageButton !== undefined && resouces[i].roleModular[j].pageButton !== null) {
          for (var k = 0; k < resouces[i].roleModular[j].pageButton.length; k++) {
            if (to.path.indexOf(resouces[i].roleModular[j].pageButton[k].url)) {
              return next()
            }
          }
        }
      }
    }
  }
  next({
    path: '/',
    query: {redirect: to.path}
  })
})

export default router
