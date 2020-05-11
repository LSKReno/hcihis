import Mock from 'mockjs2'
import {
    builder,
    getBody
} from "../util";

const medicalItems = () => {
    return builder({
        "medicalItems": [{
            "itemID": "1",
            "itemCode": "120200001",
            "itemName": "大抢救",
            "format": "日",
            "price": "200",
            "expClassID": "16",
            "deptID": "133",
            "memonicCode": "DQJ"
        },
            {
                "itemID": "2",
                "itemCode": "120200002",
                "itemName": "中抢救",
                "format": "日",
                "price": "150",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "ZQJ"
            },
            {
                "itemID": "3",
                "itemCode": "120200003",
                "itemName": "小抢救",
                "format": "日",
                "price": "80",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "XQJ"
            },
            {
                "itemID": "4",
                "itemCode": "120300001",
                "itemName": "中心吸氧",
                "format": "小时",
                "price": "2.5",
                "expClassID": "16",
                "deptID": "122",
                "memonicCode": "ZXXY"
            },
            {
                "itemID": "5",
                "itemCode": "120300002",
                "itemName": "低流量吸氧",
                "format": "小时",
                "price": "2",
                "expClassID": "16",
                "deptID": "122",
                "memonicCode": "DLLXY"
            },
            {
                "itemID": "6",
                "itemCode": "120300003",
                "itemName": "高频吸氧",
                "format": "小时",
                "price": "4",
                "expClassID": "16",
                "deptID": "122",
                "memonicCode": "GPXY"
            },
            {
                "itemID": "7",
                "itemCode": "120500001",
                "itemName": "大清创缝合",
                "format": "次",
                "price": "120",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "DQCFH"
            },
            {
                "itemID": "8",
                "itemCode": "120500002",
                "itemName": "中清创缝合",
                "format": "次",
                "price": "80",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "ZQCFH"
            },
            {
                "itemID": "9",
                "itemCode": "120500003",
                "itemName": "小清创缝合",
                "format": "次",
                "price": "40",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "XQCFH"
            },
            {
                "itemID": "10",
                "itemCode": "121000001",
                "itemName": "洗胃",
                "format": "次",
                "price": "40",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "XW"
            },
            {
                "itemID": "11",
                "itemCode": "120800002",
                "itemName": "肠内高营养治疗",
                "format": "日",
                "price": "5",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "CNGYYZL"
            },
            {
                "itemID": "12",
                "itemCode": "121500001",
                "itemName": "灌肠",
                "format": "次",
                "price": "10",
                "expClassID": "16",
                "deptID": "133",
                "memonicCode": "GC"
            },
            {
                "itemID": "13",
                "itemCode": "240100003",
                "itemName": "计算机治疗计划系统(TPS)",
                "format": "疗程",
                "price": "180",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "JSJZLJHXT"
            },
            {
                "itemID": "14",
                "itemCode": "240100004",
                "itemName": "特定计算机治疗计划系统",
                "format": "疗程",
                "price": "500",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "TDJSJZLJHXT"
            },
            {
                "itemID": "15",
                "itemCode": "240100004b",
                "itemName": "加速器适型治疗计划系统",
                "format": "疗程",
                "price": "500",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "JSQSXZLJHXT"
            },
            {
                "itemID": "16",
                "itemCode": "240100004c",
                "itemName": "伽玛刀治疗计划系统",
                "format": "疗程",
                "price": "500",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "GMDZLJHXT"
            },
            {
                "itemID": "17",
                "itemCode": "240100004d",
                "itemName": "X刀之TPS治疗计划系统",
                "format": "疗程",
                "price": "500",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "XDZTPSZLJHXT"
            },
            {
                "itemID": "18",
                "itemCode": "240100004e",
                "itemName": "逆向调强TPS及优化治疗计划系统",
                "format": "疗程",
                "price": "500",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "NXTQTPSJYHZLJHXT"
            },
            {
                "itemID": "19",
                "itemCode": "240100005",
                "itemName": "放射治疗的适时监控",
                "format": "次",
                "price": "50",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "FSZLDSSJK"
            },
            {
                "itemID": "20",
                "itemCode": "210101001",
                "itemName": "普通透视",
                "format": "每个部位",
                "price": "5",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "PTTS"
            },
            {
                "itemID": "25",
                "itemCode": "210101002",
                "itemName": "食管钡餐透视",
                "format": "次",
                "price": "15",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "SGBCTS"
            },
            {
                "itemID": "26",
                "itemCode": "210101003",
                "itemName": "床旁透视与术中透视",
                "format": "半小时",
                "price": "40",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "CPTSYSZTS"
            },
            {
                "itemID": "27",
                "itemCode": "210101004",
                "itemName": "C型臂术中透视",
                "format": "半小时",
                "price": "150",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "CXBSZTS"
            },
            {
                "itemID": "28",
                "itemCode": "210103001",
                "itemName": "气脑造影",
                "format": "次",
                "price": "80",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "QNZY"
            },
            {
                "itemID": "29",
                "itemCode": "210103003",
                "itemName": "脑室碘水造影",
                "format": "次",
                "price": "60",
                "expClassID": "7",
                "deptID": "128",
                "memonicCode": "NSDSZY"
            },
            {
                "itemID": "30",
                "itemCode": "210103004",
                "itemName": "X清肌酸激酶－MB同工酶活性测定（干化X法）",
                "format": "次",
                "price": "60",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XQJSJM－MBTGMHXCD（GHXF）"
            },
            {
                "itemID": "31",
                "itemCode": "210103005",
                "itemName": "X清肌酸激酶－MB同工酶活性测定（金标法）",
                "format": "次",
                "price": "60",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XQJSJM－MBTGMHXCD（JBF）"
            },
            {
                "itemID": "32",
                "itemCode": "210103006",
                "itemName": "尿α1微量球蛋白测定（化X发光法）",
                "format": "单侧",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "Nα1WLQDBCD（HXFGF）"
            },
            {
                "itemID": "33",
                "itemCode": "210103007",
                "itemName": "β2微球蛋白测定（各种免疫X方法）",
                "format": "单侧",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "β2WQDBCD（GZMYXFF）"
            },
            {
                "itemID": "34",
                "itemCode": "210103008",
                "itemName": "X清β2微球蛋白测定（化X发光法）",
                "format": "单侧",
                "price": "40",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XQβ2WQDBCD（HXFGF）"
            },
            {
                "itemID": "35",
                "itemCode": "210103009",
                "itemName": "尿β2微球蛋白测定（化X发光法）",
                "format": "单侧",
                "price": "80",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "Nβ2WQDBCD（HXFGF）"
            },
            {
                "itemID": "36",
                "itemCode": "210103010",
                "itemName": "尿蛋白电泳分析（凝胶法）",
                "format": "单侧",
                "price": "70",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "NDBDYFX（NJF）"
            },
            {
                "itemID": "37",
                "itemCode": "210103011",
                "itemName": "X清抗谷氨酸脱J酶抗体测定（各种免疫X方法）",
                "format": "单侧",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XQKGASTJMKTCD（GZMYXFF）"
            },
            {
                "itemID": "38",
                "itemCode": "210103012",
                "itemName": "胃泌素测定（各种免疫X方法）",
                "format": "次",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "WMSCD（GZMYXFF）"
            },
            {
                "itemID": "39",
                "itemCode": "210103013",
                "itemName": "X浆凝X酶原时间测定(PT)(仪器法)",
                "format": "次",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XJNXMYSJCD(PT)(YQF)"
            },
            {
                "itemID": "40",
                "itemCode": "210103014",
                "itemName": "X清肌酸激酶－MB同工酶活性测定（速率法）",
                "format": "次",
                "price": "60",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XQJSJM－MBTGMHXCD（SLF）"
            },
            {
                "itemID": "41",
                "itemCode": "210103015",
                "itemName": "醛固酮测定（化X发光法、荧光免疫法）",
                "format": "次",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "QGTCD（HXFGF、YGMYF）"
            },
            {
                "itemID": "42",
                "itemCode": "210103016",
                "itemName": "尿儿茶酚胺测定（色谱法）",
                "format": "次",
                "price": "80",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "NECFACD（SPF）"
            },
            {
                "itemID": "43",
                "itemCode": "210103017",
                "itemName": "尿香草苦杏仁酸(VMA)测定（色谱法）",
                "format": "次",
                "price": "60",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "NXCKXRS(VMA)CD（SPF）"
            },
            {
                "itemID": "44",
                "itemCode": "210103018",
                "itemName": "X浆肾素活性测定",
                "format": "次",
                "price": "80",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XJSSHXCD"
            },
            {
                "itemID": "45",
                "itemCode": "210103019",
                "itemName": "X管紧张素Ⅱ测定",
                "format": "次",
                "price": "100",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XGJZSⅡCD"
            },
            {
                "itemID": "46",
                "itemCode": "210103020",
                "itemName": "促红细胞生成素测定",
                "format": "次",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "CHXBSCSCD"
            },
            {
                "itemID": "47",
                "itemCode": "210103021",
                "itemName": "睾酮测定（化X发光法、荧光免疫法）",
                "format": "次",
                "price": "80",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "ZTCD（HXFGF、YGMYF）"
            },
            {
                "itemID": "48",
                "itemCode": "210103022",
                "itemName": "葡萄糖测定（干化X法）(X清)",
                "format": "次",
                "price": "300",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "PTTCD（GHXF）(XQ)"
            },
            {
                "itemID": "49",
                "itemCode": "210103023",
                "itemName": "糖化X红蛋白测定（色谱法）",
                "format": "次",
                "price": "80",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "THXHDBCD（SPF）"
            },
            {
                "itemID": "50",
                "itemCode": "210103024",
                "itemName": "X浆乳酸测定",
                "format": "次",
                "price": "80",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XJRSCD"
            },
            {
                "itemID": "51",
                "itemCode": "210103025",
                "itemName": "尿N-X-β-D-氨基葡萄糖苷酶测定",
                "format": "次",
                "price": "70",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "NN-X-β-D-AJPTTZMCD"
            },
            {
                "itemID": "52",
                "itemCode": "210103026",
                "itemName": "尿β-D-半乳糖苷酶测定",
                "format": "次",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "Nβ-D-BRTZMCD"
            },
            {
                "itemID": "53",
                "itemCode": "210103027",
                "itemName": "唐氏综合症筛查",
                "format": "单侧",
                "price": "70",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "TSZHZSC"
            },
            {
                "itemID": "54",
                "itemCode": "210103028",
                "itemName": "雌三醇测定（化X发光法、荧光免疫法）",
                "format": "次",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "CSCCD（HXFGF、YGMYF）"
            },
            {
                "itemID": "55",
                "itemCode": "210103029",
                "itemName": "雌二醇测定（化X发光法、荧光免疫法）",
                "format": "次",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "CECCD（HXFGF、YGMYF）"
            },
            {
                "itemID": "56",
                "itemCode": "210103030",
                "itemName": "孕酮测定（化X发光法、荧光免疫法）",
                "format": "单侧",
                "price": "50",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "YTCD（HXFGF、YGMYF）"
            }]
    }, '', 200, '')
}

const medicalItemModel = () => {
    return builder({
        'medicalItemModel': [
        {
            'modelName' : '尿检综合',
            'modelDescription': '适用于青年患者',
            'itemList': [{
                "itemID": "50",
                "itemCode": "210103024",
                "itemName": "X浆乳酸测定",
                "format": "次",
                "price": "80",
                "expClassID": "3",
                "deptID": "125",
                "memonicCode": "XJRSCD"
            },
                {
                    "itemID": "51",
                    "itemCode": "210103025",
                    "itemName": "尿N-X-β-D-氨基葡萄糖苷酶测定",
                    "format": "次",
                    "price": "70",
                    "expClassID": "3",
                    "deptID": "125",
                    "memonicCode": "NN-X-β-D-AJPTTZMCD"
                },
                {
                    "itemID": "52",
                    "itemCode": "210103026",
                    "itemName": "尿β-D-半乳糖苷酶测定",
                    "format": "次",
                    "price": "50",
                    "expClassID": "3",
                    "deptID": "125",
                    "memonicCode": "Nβ-D-BRTZMCD"
                }],
        },
        {
            'modelName': '吸氧',
            'modelDescription': '适用于肺部损伤患者',
            'itemList': [{
                "itemID": "4",
                "itemCode": "120300001",
                "itemName": "中心吸氧",
                "format": "小时",
                "price": "2.5",
                "expClassID": "16",
                "deptID": "122",
                "memonicCode": "ZXXY"
            },
                {
                    "itemID": "5",
                    "itemCode": "120300002",
                    "itemName": "低流量吸氧",
                    "format": "小时",
                    "price": "2",
                    "expClassID": "16",
                    "deptID": "122",
                    "memonicCode": "DLLXY"
                },
                {
                    "itemID": "6",
                    "itemCode": "120300003",
                    "itemName": "高频吸氧",
                    "format": "小时",
                    "price": "4",
                    "expClassID": "16",
                    "deptID": "122",
                    "memonicCode": "GPXY"
                }]

        },
        {
            'modelName': '唐氏综合征',
            'modelDescription': '适用于女性患者',
            'itemList': [
                {
                    "itemID": "53",
                    "itemCode": "210103027",
                    "itemName": "唐氏综合症筛查",
                    "format": "单侧",
                    "price": "70",
                    "expClassID": "3",
                    "deptID": "125",
                    "memonicCode": "TSZHZSC"
                },
                {
                    "itemID": "56",
                    "itemCode": "210103030",
                    "itemName": "孕酮测定（化X发光法、荧光免疫法）",
                    "format": "单侧",
                    "price": "50",
                    "expClassID": "3",
                    "deptID": "125",
                    "memonicCode": "YTCD（HXFGF、YGMYF）"
                }

            ]
        }]
    }, '', 200, '')
}

Mock.mock(/\/meidcalItems/,'get',medicalItems)
Mock.mock(/\/medicalItemModel/,'get',medicalItemModel)

