import hyRequset from '../request/index'

// 收藏列表
export function getFavorList(){
    return hyRequset.get({
        url:'/favor/list'
    })
}


// 浏览历史
export function getHistory(){
    return hyRequset.get({
        url:'/favor/history'
    })
}