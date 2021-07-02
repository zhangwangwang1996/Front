import store from '@store'
import LoginBox from '@views/login/components/LoginBox'
import { onloginExpired } from '@utils/auth'

// 登录有效期已满
onloginExpired(LoginBox)

// 监听浏览器大小的改变
window.onresize = _.throttle(() => {
  // 可见区域高度
  store.commit('SET_CLIENT_HEIGHT', document.body.clientHeight)
  // 可见区域高度
  store.commit('SET_CLIENT_WIDTH', document.body.clientWidth)
}, 500)

