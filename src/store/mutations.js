import {
  SAVE_USERINFO,
  SAVE_USERRESOUCE
} from './mutations-types'

export default {
  [SAVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [SAVE_USERRESOUCE] (state, userResouce) {
    state.userResouce = userResouce
  }
}
