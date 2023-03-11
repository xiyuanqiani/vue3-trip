import hyRequest from '../request/index'

export function getOrder(types){
    return hyRequest.get({
        url:'/order/list',
        params:{
            type:types
        }
    })
}