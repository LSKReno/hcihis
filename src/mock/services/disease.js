import Mock from 'mockjs2'
import {
    builder,
    getBody
} from "../util";

const diseases = () => {
    return builder({
        "diseases": [
            {
                "memonicCode": "GDXHL",
                "diseaseName": "古典型霍乱",
                "ICDCode": "A00.051"
            },
            {
                "memonicCode": "ZXDXHL",
                "diseaseName": "中型[典型]霍乱",
                "ICDCode": "A00.052"
            },
            {
                "memonicCode": "ZXBFXHGXHL",
                "diseaseName": "重型[暴发型或干性]霍乱",
                "ICDCode": "A00.053"
            },
            {
                "memonicCode": "QXFDXHL",
                "diseaseName": "轻型[非典型]霍乱",
                "ICDCode": "A00.151"
            },
            {
                "memonicCode": "AETHL",
                "diseaseName": "埃尔托霍乱",
                "ICDCode": "A00.152"
            },
            {
                "memonicCode": "AETXCY",
                "diseaseName": "埃尔托小肠炎",
                "ICDCode": "A00.153"
            },
            {
                "memonicCode": "HL",
                "diseaseName": "霍乱 NOS",
                "ICDCode": "A00.901"
            },
            {
                "memonicCode": "SH",
                "diseaseName": "伤寒",
                "ICDCode": "A01.001"
            },
            {
                "memonicCode": "SHGJXBXZ",
                "diseaseName": "伤寒杆菌性败血症",
                "ICDCode": "A01.002"
            },
            {
                "memonicCode": "SHXNMY",
                "diseaseName": "伤寒性脑膜炎",
                "ICDCode": "A01.003+"
            },
            {
                "memonicCode": "SHFY",
                "diseaseName": "伤寒肺炎",
                "ICDCode": "A01.051+"
            },
            {
                "memonicCode": "SHFMY",
                "diseaseName": "伤寒腹膜炎",
                "ICDCode": "A01.052"
            },
            {
                "memonicCode": "ABTSBSH",
                "diseaseName": "埃贝特Eberth`s氏病(伤寒)",
                "ICDCode": "A01.053"
            },
            {
                "memonicCode": "CCXXSH",
                "diseaseName": "肠出血性伤寒",
                "ICDCode": "A01.054"
            },
            {
                "memonicCode": "SHXCCK",
                "diseaseName": "伤寒性肠穿孔",
                "ICDCode": "A01.055"
            },
            {
                "memonicCode": "CSH",
                "diseaseName": "肠伤寒",
                "ICDCode": "A01.056"
            },
            {
                "memonicCode": "SHYXCY",
                "diseaseName": "伤寒样小肠炎",
                "ICDCode": "A01.057"
            },
            {
                "memonicCode": "JXFSH",
                "diseaseName": "甲型副伤寒",
                "ICDCode": "A01.101"
            },
            {
                "memonicCode": "YXFSH",
                "diseaseName": "乙型副伤寒",
                "ICDCode": "A01.201"
            },
            {
                "memonicCode": "BXFSH",
                "diseaseName": "丙型副伤寒",
                "ICDCode": "A01.301"
            },
            {
                "memonicCode": "FSH",
                "diseaseName": "副伤寒",
                "ICDCode": "A01.401"
            },
            {
                "memonicCode": "QSMSJCY",
                "diseaseName": "Ｂ群沙门氏菌肠炎",
                "ICDCode": "A02.001"
            },
            {
                "memonicCode": "QSMSJCY",
                "diseaseName": "Ｃ群沙门氏菌肠炎",
                "ICDCode": "A02.002"
            },
            {
                "memonicCode": "AGLSMSJCY",
                "diseaseName": "阿哥拉沙门氏菌肠炎",
                "ICDCode": "A02.003"
            },
            {
                "memonicCode": "SMSJXCY",
                "diseaseName": "沙门氏菌性肠炎",
                "ICDCode": "A02.004"
            },
            {
                "memonicCode": "SMSJLDXQXCY",
                "diseaseName": "沙门氏菌伦敦血清型肠炎",
                "ICDCode": "A02.005"
            },
            {
                "memonicCode": "SMSJWCY",
                "diseaseName": "沙门氏菌胃肠炎",
                "ICDCode": "A02.006"
            },
            {
                "memonicCode": "SSHSMSJXCY",
                "diseaseName": "鼠伤寒沙门氏菌性肠炎",
                "ICDCode": "A02.007"
            },
            {
                "memonicCode": "YESMSJCY",
                "diseaseName": "婴儿沙门氏菌肠炎",
                "ICDCode": "A02.008"
            },
            {
                "memonicCode": "SMSJCDGR",
                "diseaseName": "沙门氏菌肠道感染",
                "ICDCode": "A02.051"
            },
            {
                "memonicCode": "SMSJYLSNXCY",
                "diseaseName": "沙门氏菌(亚利桑那)小肠炎",
                "ICDCode": "A02.052"
            },
            {
                "memonicCode": "SMSJBXZ",
                "diseaseName": "沙门氏菌败血症",
                "ICDCode": "A02.101"
            },
            {
                "memonicCode": "SMSJSSHBYBXZ",
                "diseaseName": "沙门氏菌鼠伤寒伴有败血症",
                "ICDCode": "A02.102"
            },
            {
                "memonicCode": "SMSJXFY",
                "diseaseName": "沙门氏菌性肺炎",
                "ICDCode": "A02.201+"
            },
            {
                "memonicCode": "SMSJXGJY",
                "diseaseName": "沙门氏菌性关节炎",
                "ICDCode": "A02.202+"
            },
            {
                "memonicCode": "SMSJXNMY",
                "diseaseName": "沙门氏菌性脑膜炎",
                "ICDCode": "A02.203+"
            },
            {
                "memonicCode": "SMSJXGSY",
                "diseaseName": "沙门氏菌性骨髓炎",
                "ICDCode": "A02.251+"
            },
            {
                "memonicCode": "SMSJXSXGJZB",
                "diseaseName": "沙门氏菌性肾小管-间质病",
                "ICDCode": "A02.252+"
            },
            {
                "memonicCode": "QTTZDSMSJGR",
                "diseaseName": "其他特指的沙门氏菌感染",
                "ICDCode": "A02.851"
            },
            {
                "memonicCode": "SMSJGR",
                "diseaseName": "沙门氏菌感染 NOS",
                "ICDCode": "A02.901"
            },
            {
                "memonicCode": "SSHSMSJGR",
                "diseaseName": "鼠伤寒沙门氏菌感染",
                "ICDCode": "A02.902"
            },
            {
                "memonicCode": "SMSJSSWZD",
                "diseaseName": "沙门氏菌属食物中毒",
                "ICDCode": "A02.903"
            },
            {
                "memonicCode": "SMSZHJLJ",
                "diseaseName": "什密氏志贺菌痢疾",
                "ICDCode": "A03.001"
            },
            {
                "memonicCode": "ZHKLZLJYQZHJB",
                "diseaseName": "志贺-克鲁泽痢疾[A亚群志贺菌病]",
                "ICDCode": "A03.051"
            },
            {
                "memonicCode": "SMCSDCLJ",
                "diseaseName": "施米茨(－施蒂策)痢疾",
                "ICDCode": "A03.052"
            },
            {
                "memonicCode": "FSZHJLJ",
                "diseaseName": "弗氏志贺菌痢疾",
                "ICDCode": "A03.101"
            },
            {
                "memonicCode": "XSLSXJXLJ",
                "diseaseName": "希斯－罗素细菌性痢疾",
                "ICDCode": "A03.151"
            },
            {
                "memonicCode": "BSZHJLJ",
                "diseaseName": "鲍氏志贺菌痢疾",
                "ICDCode": "A03.201"
            },
            {
                "memonicCode": "BYDXJXLJ",
                "diseaseName": "波伊德细菌性痢疾",
                "ICDCode": "A03.251"
            },
            {
                "memonicCode": "SNSZHJLJ",
                "diseaseName": "宋内氏志贺菌痢疾",
                "ICDCode": "A03.301"
            },
            {
                "memonicCode": "BDXZHJLJ",
                "diseaseName": "不定型志贺菌痢疾",
                "ICDCode": "A03.801"
            },
            {
                "memonicCode": "JLHHGR",
                "diseaseName": "菌痢混合感染",
                "ICDCode": "A03.802"
            },
            {
                "memonicCode": "QTZHJLJ",
                "diseaseName": "其他志贺菌痢疾",
                "ICDCode": "A03.851"
            },
            {
                "memonicCode": "XJXLJ",
                "diseaseName": "细菌性痢疾 NOS",
                "ICDCode": "A03.901"
            },
            {
                "memonicCode": "MXXJXLJJXFZ",
                "diseaseName": "慢性细菌性痢疾急性发作",
                "ICDCode": "A03.902"
            },
            {
                "memonicCode": "MXQYXXJXLJ",
                "diseaseName": "慢性迁延型细菌性痢疾",
                "ICDCode": "A03.903"
            },
            {
                "memonicCode": "MXYFXJL",
                "diseaseName": "慢性隐伏型菌痢",
                "ICDCode": "A03.904"
            }
        ]
    }, '', 200, '')
}

Mock.mock(/\/disease/, 'get', diseases)
