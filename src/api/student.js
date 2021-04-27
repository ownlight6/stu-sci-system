import request from "../untils/request"

//学生登录
export function login(data) {
    return request({
        url: "student/login",
        method: "post",
        data
    })
}

//学生添加论文成果
export function addPaper(data) {
    return request({
        url: "student/addPaper",
        method: "post",
        data
    })
}

//学生添加竞赛成果
export function addCompetition(data) {
    return request({
        url: "student/addCompetition",
        method: "post",
        data
    })
}