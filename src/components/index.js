/*
 * Vue全局组件
 * @Author: anker.wang
 * @Date: 2018-01-08 11:25:09
 * @Last Modified by: anker.wang
 * @Last Modified time: 2018-07-20 13:49:54
 */
import Vue from 'vue'
import SjPanel from '@core/components/SjPanel'
import SjExportXlsxBox from '@core/components/SjExportXlsxBox'
import SjImageUpload from '@core/components/SjImageUpload'
import RemoteSelect from '@core/components/RemoteSelect'
import ButtonGutter from '@core/components/ButtonGutter'
import SjGutter from '@core/components/SjGutter'

Vue.component(SjPanel.name, SjPanel)
Vue.component(SjExportXlsxBox.name, SjExportXlsxBox)
Vue.component(SjImageUpload.name, SjImageUpload)
Vue.component(RemoteSelect.name, RemoteSelect)
Vue.component(ButtonGutter.name, ButtonGutter)
Vue.component(SjGutter.name, SjGutter)

Vue.prototype.$export = {
  xlsx: SjExportXlsxBox.open,
}
