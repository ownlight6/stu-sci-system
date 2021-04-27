import request from "../untils/request"

//辅导员添加论文成果属性
export function addPaper(data) {
    return request({
        url: "counselor/addPaper",
        method: "post",
        data
    })
}

//辅导员添加竞赛成果属性
export function addCompetition(data) {
    return request({
        url: "counselor/addCompetition",
        method: "post",
        data
    })
}

//辅导员审核论文
export function checkPaper(data) {
    return request({
        url: "counselor/checkPaper",
        method: "post",
        data
    })
}

//辅导员审核竞赛
export function checkCompetition(data) {
    return request({
        url: "counselor/checkCompetition",
        method: "post",
        data
    })
}

//辅导员统计成果排名
export function sortStudent() {
    return request({
        url: "counselor/sortStudent",
        method: "get"
    })
}

//辅导员获取学生列表
export function studentList() {
    return request({
        url: "counselor/studentList",
        method: "get"
    })
}