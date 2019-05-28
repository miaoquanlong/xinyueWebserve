import moment from "moment";
function pluralize (time, label) {
    if (time === 1) {
        return time + label;
    }
    return time + label + "s";
}

export function timeAgo (time) {
    const between = Date.now() / 1000 - Number(time);
    if (between < 3600) {
        return pluralize(~~(between / 60), " minute");
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), " hour");
    } else {
        return pluralize(~~(between / 86400), " day");
    }
}

export function momentTime (time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    if (moment(time).isBefore("2000-01-01")) {
        return null;
    }
    const formatter = cFormat || "YYYY-MM-DD HH:mm:ss";
    return moment(time).format(formatter);
}

export function parseTime (time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }

    if ((time + "").length === 10) {
        time = +time * 1000;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
        date = time;
    } else {
        date = new Date(parseInt(time));
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === "a")
            return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
        if (result.length > 0 && value < 10) {
            value = "0" + value;
        }
        return value || 0;
    });
    return time_str;
}

export function formatTime (time, option) {
    time = +time * 1000;
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return "刚刚";
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + "分钟前";
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "小时前";
    } else if (diff < 3600 * 24 * 2) {
        return "1天前";
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            "月" +
            d.getDate() +
            "日" +
            d.getHours() +
            "时" +
            d.getMinutes() +
            "分"
        );
    }
}

/* 数字 格式化*/
export function nFormatter (num, digits) {
    const si = [
        { value: 1e18, symbol: "E" },
        { value: 1e15, symbol: "P" },
        { value: 1e12, symbol: "T" },
        { value: 1e9, symbol: "G" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "k" }
    ];
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (
                (num / si[i].value + 0.1)
                    .toFixed(digits)
                    .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
            );
        }
    }
    return num.toString();
}

export function html2Text (val) {
    const div = document.createElement("div");
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

export function toThousandslsFilter (num) {
    return (+num || 0)
        .toString()
        .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

export function starFormatter (id) {
    if (!id) {
        return "";
    }
    const pStar = id.toString().substr(-6, 2);
    const cStar = id.toString().substr(-2, 2);
    return pStar.includes("01")
        ? "星" + Number(cStar)
        : pStar.includes("02")
            ? "月" + Number(cStar)
            : "";
}
// 判断返回值是否为空
// json：原数据，jsonkey：判断值，type：类型
export function GetJsonValue (json, jsonkey, type) {
    let arg = json;
    let a = jsonkey.split(".");
    for (let i = 0; i < a.length; i++) {
        arg = arg[a[i]];
        if (!arg) {
            break;
        }
    }
    if (arg != null) {
        if (type == "datetime") {
            if (typeof arg === "string") {
                return momentTime(arg, "YYYY-MM-DD");
            } else {
                return "";
            }
        }
        if (type == "datetime2") {
            if (typeof arg === "string") {
                return momentTime(arg, "YYYY-MM-DD HH:mm:ss");
            } else {
                return "";
            }
        }
        return arg;
    } else {
        if (type == "guid") {
            return "00000000-0000-0000-0000-000000000000";
        } else if (type == "bool") {
            return false;
        } else if (type == "datetime") {
            return "";
        }
        return "";
    }
}
export function hospitalType (status) {
    const statusMap = {
        1: "美容医院",
        2: "公立",
        3: "私立"
    };
    return statusMap[status];
}
export function hospitalTypeFilter (status) {
    const statusMap = {
        0: "医院",
        1: "经销商医院",
        2: "大客户医院"
    };
    return statusMap[status];
}
export function AgentTypeFilter (status) {
    const statusMap = {
        1: "经销商",
        2: "大客户"
    };
    return statusMap[status];
}
export function compactTypeFilter (status) {
    const typeMap = {
        1: "服务及加工合同编号:",
        2: "经销商协议编号:",
        3: "一事一议编号:"
    };
    return typeMap[status];
}
export function compactsTypeFilter (status) {
    const typeMap = {
        1: "服务及加工合同",
        2: "经销商协议",
        3: "一事一议"
    };
    return typeMap[status];
}

export function AuditStatusFilter2 (status) {
    const statusMap = {
        0: "待审核",
        1: "待审核",
        2: "审核不通过",
        3: "审核通过"
    };
    return statusMap[status];
}

export function AuditStatusFilter (status) {
    const statusMap = {
        1: "待审核",
        2: "审核不通过",
        3: "审核通过"
    };
    return statusMap[status];
}
export function InstructItemsFilter (arr) {
    let str = "";
    for (const value of arr) {
        str += " / " + InstructTypeFilter(value.InstructType);
    }
    str = str.substr(2);
    return str;
}
export function InstructItemsFilter2 (arr) {
    let str = "";
    for (const value of arr) {
        str += " / " + InstructTypeFilter(value.Type);
    }
    str = str.substr(2);
    return str;
}
export function ScheduleStatusFilter (status) {
    const statusMap = {
        0: "未开始",
        1: "处理中",
        2: "已完成"
    };
    return statusMap[status];
}
export function ScheduleDetailStatusFilter (status) {
    const statusMap = {
        0: "未开始",
        1: "处理中",
        2: "已完成"
    };
    return statusMap[status];
}
export function DataSourceFilter (status) {
    const statusMap = {
        0: "ERP",
        1: "在线提交",
        2: "手动创建"
    };
    return statusMap[status];
}
export function InstructTypeFilter (status) {
    const statusMap = {
        1: "方案",
        2: "新病例设计",
        3: "精调设计",
        4: "最终位设计",
        5: "体验保持器",
        6: "中期保持器",
        7: "后保持器",
        8: "外加工",
        9: "补发矫治器",
        10: "返工",
        11: "代工"
    };
    return statusMap[status];
}
export function sexFilter (status) {
    const statusMap = {
        1: "男",
        2: "女"
    };
    return statusMap[status];
}
export function modelFilter (status) {
    const statusMap = {
        1: "硅胶",
        2: "石膏"
    };
    return statusMap[status];
}
export function ReceiveTypeFilter (status) {
    const statusMap = {
        1: "模型组",
        2: "半口模型",
        3: "口扫数据",
        4: "矫治器"
    };
    return statusMap[status];
}
export function submitFilter (status) {
    const statusMap = {
        true: "已提交",
        false: "未提交"
    };
    return statusMap[status];
}
export function occlusionFilter (status) {
    const statusMap = {
        true: "有",
        false: "无"
    };
    return statusMap[status];
}
export function typeFilter (status) {
    const statusMap = {
        0: "info",
        1: "warning",
        2: "danger",
        3: "success"
    };
    return statusMap[status];
}
export function PhotoAttributeFilter (status) {
    const statusMap = {
        0: "未定义",
        1: "正面照",
        2: "正面微笑",
        3: "侧位像",
        4: "右侧位45度",
        5: "左侧位45度",
        6: "右侧咬合",
        7: "正位像",
        8: "左侧咬合",
        9: "上牙列",
        10: "下牙列",
        11: "前牙覆牙合覆盖",
        12: "曲面断层片",
        13: "头颅侧位片",
        14: "在线提交其他1",
        15: "在线提交其他2"
    };
    return statusMap[status];
}
export function uploadStatusFilter (status) {
    const statusMap = {
        1: "处理中",
        2: "失败",
        3: "成功"
    };
    return statusMap[status];
}
export function sourceFilter (status) {
    const statusMap = {
        1: "手工上传",
        2: "病例绑定",
        3: "在线提交"
    };
    return statusMap[status];
}
export function tagStatusFilter (status) {
    const statusMap = {
        0: "",
        1: "warning",
        2: "danger",
        3: "success"
    };
    return statusMap[status];
}
export function btnFilter (btnType) {
    const statusMap = {
        新增: "xinzeng1",
        修改: "edit",
        删除: "delete",
        下载: "xiazai2",
        审核: "supplierfeatures",
        查看服务订单: "002caozuo_yulan",
        病例绑定: "binding",
        在线提交: "success",
        明细查看: "yulan",
        病例暂停: "iconset0486",
        病例终止: "finish",
        客服回访: "huifang1",
        审核状态: "chakan1",
        发送邮件: "fasongyoujian",
        发送免责协议书: "assessedbadge",
        处理状态: "libra",
        编制状态: "xiugai2",
        预览: "yulan",
        上传附件: "shangchuan2",
        排序: "sort_icon",
        模型检查: "productfeatures",
        模型测量: "design-preparat",
        检验: "inspect",
        查看: "search",
        上机: "shiwumoxingshengchanzhizuo"
    };
    return "ml iconfont icon-" + statusMap[btnType];
}
export function DesignTypeFilter (type) {
    const statusMap = {
        1: "新病例设计",
        2: "精调设计",
        3: "最终位设计"
    };
    return statusMap[type];
}
export function CaseStatusFilter (type) {
    const statusMap = {
        0: "正常",
        1: "暂停",
        2: "结束",
        3: "终止"
    };
    return statusMap[type];
}
export function compactStatusFilter (type) {
    const statusMap = {
        true: "有效",
        false: "无效"
    };
    return statusMap[type];
}
export function preStatusFilter (type) {
    const statusMap = {
        0: "未审核",
        1: "部分审核",
        2: "已审核"
    };
    return statusMap[type];
}
export function preStatusFilter2 (type) {
    const statusMap = {
        false: "未审核",
        true: "已审核"
    };
    return statusMap[type];
}
export function IsSubmitFilter (type) {
    const statusMap = {
        true: "已提交",
        false: "未提交"
    };
    return statusMap[type];
}
export function IsContinueUseFilter (type) {
    const statusMap = {
        true: "是",
        false: "否"
    };
    return statusMap[type];
}
export function InvoiceTypeFilter (type) {
    const statusMap = {
        "": "",
        1: "增值税普通发票",
        2: "增值税专用发票"
    };
    return statusMap[type];
}
export function pathFilter (type, url) {
    const statusMap = {
        s: process.env.UPLOAD_URI + "S?appID=3&path=", // 缩略图
        b: process.env.UPLOAD_URI + "B?appID=3&path=", // 原图
        f: process.env.UPLOAD_URI + "F?appID=3&path=" // 下载
    };
    url = url || "";
    return statusMap[type] + url;
}
export function IsSubmitColorFilter (type) {
    const statusMap = {
        // true: 'color:#67c23a',
        true: "color:black",
        false: "color:black"
    };
    return statusMap[type];
}
// 病例绑定
export function WupinTypeFilter (status) {
    const statusMap = {
        1: "模型组",
        2: "上颌",
        3: "下颌",
        4: "咬合",
        5: "病例提交单",
        6: "产品(矫治器)",
        7: "全口曲段",
        8: "头颅侧位",
        9: "U盘",
        10: "光盘",
        11: "口内照片(N类)",
        12: "小牙片",
        13: "方案回执",
        14: "服务订单回执",
        15: "患者知情回执",
        16: "结束同意书回执"
    };
    return statusMap[status];
}
export function ShujuTypeFilter (status) {
    const statusMap = {
        1: "口扫数据",
        2: "石膏扫描数据",
        3: "设计数据",
        4: "CBCT",
        5: "未知扫描数据格式"
    };
    return statusMap[status];
}
export function WupinSubTypeFilter (status) {
    const statusMap = {
        1: "照片",
        2: "口内照",
        3: "X光片",
        4: "CBCT",
        5: "未知扫描数据格式",
        99: "其他"
    };
    return statusMap[status];
}
export function FormatMoney (s, prefix) {
    let S = Math.abs(s)

    if (s === null) return "";

    if (/[^0-9\.]/.test(S)) return "invalid value";
    S = String(S);
    prefix = prefix || "";
    S = S.replace(/^(\d*)$/, "$1.");
    S = (S + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    S = S.replace(".", ",");
    let re = /(\d)(\d{3},)/;
    while (re.test(S)) {
        S = S.replace(re, "$1,$2");
    }
    S = S.replace(/,(\d\d)$/, ".$1");
    return prefix + (s < 0 ? '-' : '') + S.replace(/^\./, "0.");
}

export function treeNameFilter (name, numLength) {
    let num = numLength || 2;
    if (!name) return "";
    let nameArr = name.split("-");
    if (nameArr.length > num) {
        nameArr.shift();
        nameArr.shift();
    }
    return nameArr.join("-");
}
