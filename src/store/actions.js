// import { SAVE_USER_ID } from './mutation-types.js'
import { SAVE_USERINFO, SAVE_USERRESOUCE } from './mutations-types'
import { setStore } from '../utils/utils'

export default {
  setUserINFO ({commit}, userInfo) {
    setStore('userInfo', userInfo)
    commit(SAVE_USERINFO, userInfo)
  },
  setUserResouce ({commit}, userResouce) {
    setStore('userResouce', userResouce)
    commit(SAVE_USERRESOUCE, userResouce)
  }
}
