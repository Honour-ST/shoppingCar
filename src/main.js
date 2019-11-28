import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 从vant组件库导入Button组件
import { Button, NavBar, Icon, SubmitBar, Checkbox, CheckboxGroup, Stepper } from "vant"

Vue.use(Button).use(NavBar).use(Icon).use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(Stepper)

// 根据屏幕适配rem
import "lib-flexible/flexible"

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')