import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import './assets/styles/main.scss';


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
