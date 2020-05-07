export default {
    drug: {
        path: '/drug_manage',
        name: 'DrugManage',
        meta: {
            title: '药品管理',
            keepAlive: false
        },
        component: resolve => require(['@/views/contentManage/Drug.vue'], resolve)
    }
}
