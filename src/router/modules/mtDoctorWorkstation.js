export default {
  check: {
    path: '/check',
    name: 'Check',
    meta: {
      title: '患者检查',
      keepAlive: true
    },
    component: resolve => require(['@/views/check/check.vue'], resolve)
  },
  checkout: {
    path: '/checkout',
    name: 'Checkout',
    meta: {
      title: '患者检验',
      keepAlive: true
    },
    component: resolve => require(['@/views/checkout/checkout.vue'], resolve)
  },
  disposition: {
    path: '/disposition',
    name: 'Disposition',
    meta: {
      title: '患者处置',
      keepAlive: true
    },
    component: resolve => require(['@/views/disposition/disposition.vue'], resolve)
  }
}
