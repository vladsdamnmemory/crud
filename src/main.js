import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import './assets/styles/main.scss'
import store from './store'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons'

import lilac from "lilac"

Vue.use({
    install: Vue => {
        Vue.prototype.$lilac = lilac;
    }
});


library.add(faSignInAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        console.log(this.$lilac) // this should work
    }
}).$mount('#app')
