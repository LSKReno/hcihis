import Mock from 'mockjs2'
import {
    builder,
    getBody
} from "../util";

const patientsByDoctor = () => {
    return builder({
        "patientList": [
            {
                'patientID': 1,
                'patientName': '张三',
                'patientAge': 20,
                'patientSex': '男',
                'patientAddress': '沈阳',
                'patientStatus': '已诊',
                'patientStartTime': '8:30',
                'patientEndTime': '9:00',
                'patientMedRecord': [],
                'currentRecord': {
                    'selfDescription': 'aaa',
                    'currentMedicalHistory': 'bbb',
                    'currentTreatmentSituation': 'ccc',
                    'pastMedicalHistory': 'ddd',
                    'allergyHistory': 'eee',
                    'status': '已提交'
                },
                'currentDisease': {
                    'diagnoseType': '',
                    'diseaseList': [],
                    'diagnoseDescription': ''
                }
            },
            {
                'patientID': 2,
                'patientName': '李四',
                'patientAge': 35,
                'patientSex': '男',
                'patientAddress': '大连',
                'patientStatus': '未诊',
                'patientStartTime': '',
                'patientEndTime': '',
                'patientMedRecord': [],
                'currentRecord': {
                    'selfDescription': '',
                    'currentMedicalHistory': '',
                    'currentTreatmentSituation': '',
                    'pastMedicalHistory': '',
                    'allergyHistory': '',
                    'status': '未保存'
                },
                'currentDisease': {
                    'diagnoseStatus': '未保存',
                    'diagnoseType': '',
                    'diseaseList': [],
                    'diagnoseDescription': ''
                }
            },
            {
                'patientID': 3,
                'patientName': '王五',
                'patientAge': 50,
                'patientSex': '女',
                'patientAddress': '沈阳',
                'patientStatus': '未诊',
                'patientStartTime': '',
                'patientEndTime': '',
                'patientMedRecord': [],
                'currentRecord': {
                    'selfDescription': '',
                    'currentMedicalHistory': '',
                    'currentTreatmentSituation': '',
                    'pastMedicalHistory': '',
                    'allergyHistory': '',
                    'status': '未保存'
                },
                'currentDisease': {
                    'diagnoseType': '',
                    'diseaseList': [],
                    'diagnoseDescription': ''
                }
            },
            {
                'patientID': 4,
                'patientName': '赵六',
                'patientAge': 19,
                'patientSex': '女',
                'patientAddress': '沈阳',
                'patientStatus': '未诊',
                'patientMedRecord': [],
                'currentRecord': {
                    'submitTime': '',
                    'selfDescription': '',
                    'currentMedicalHistory': '',
                    'currentTreatmentSituation': '',
                    'pastMedicalHistory': '',
                    'allergyHistory': '',
                    'status': '未保存'
                },
                'currentDisease': {
                    'diagnoseType': '',
                    'diseaseList': [],
                    'diagnoseDescription': ''
                }
            }
        ]
    }, '', 200, '')
}

const patientsByDepartment = (options) => {
    const body = getBody(options)
    console.log('mock: body', body)
    return builder({
        "patientList": [
            {
                'patientID': 1,
                'patientName': '甲',
                'patientAge': 20,
                'patientSex': '男',
                'patientAddress': '沈阳',
                'patientStartTime': '',
                'patientEndTime': ''
            },
            {
                'patientID': 2,
                'patientName': '乙',
                'patientAge': 35,
                'patientSex': '男',
                'patientAddress': '大连',
                'patientStartTime': '',
                'patientEndTime': ''
            },
            {
                'patientID': 3,
                'patientName': '丙',
                'patientAge': 50,
                'patientSex': '女',
                'patientAddress': '沈阳',
                'patientStartTime': '',
                'patientEndTime': ''
            },
            {
                'patientID': 4,
                'patientName': '丁',
                'patientAge': 19,
                'patientSex': '女',
                'patientAddress': '沈阳',
                'patientStartTime': '',
                'patientEndTime': ''
            }
        ]
    }, '', 200, '')
}

Mock.mock(/\/doctor\/patients/, 'get', patientsByDoctor)
Mock.mock(/\/department\/patients/, 'get', patientsByDepartment)






















