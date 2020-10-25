import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks'
import messages from "@/store/messages";
import log from "@/store/log";
import modal from "@/store/modal";
import breadcrumbs from "@/store/breadcrumbs";

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        tasks, messages, log, modal, breadcrumbs
    }
})
