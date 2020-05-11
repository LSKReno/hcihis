import Mock from 'mockjs2'
import {
    builder,
    getBody
} from '../util'

// eslint-disable-next-line no-unused-vars
var feeitemid = [1, 2, 3, 4]
// eslint-disable-next-line no-unused-vars
var list = ['医药费', '项目费', '挂号费', '诊疗费']

const getFee = (options) => {
    const body = getBody(options)
    console.log('mock: body', body)
    console.log(body.name)
    return builder({
        'id': '费用管理id'
    }, '', 200, {})
}

const addFee = (options) => {
    const body = getBody(options)
    list.push(body.feename)
    return builder({ list }, '', 200, {}
     )
}
Mock.mock(/\/fee\/drugfee/, 'post', getFee) // 这里添加api中url地址
Mock.mock(/\/fee\/addfee/, 'post', addFee)
