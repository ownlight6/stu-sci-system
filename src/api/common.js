import request from "../untils/request"

//查看论文属性
export function paperName() {
    return request({
        url: "common/paperName",
        method: "get"
    })
}

//查看竞赛属性
export function competitionName() {
    return request({
        url: "common/competitionName",
        method: "get"
    })
}

//获取论文列表
export function paperList(data) {
    return request({
        url: "common/paperList",
        method: "get",
        params: data
    })
}

//获取竞赛列表
export function competitionList(data) {
    return request({
        url: "common/competitionList",
        method: "get",
        params: data
    })
}