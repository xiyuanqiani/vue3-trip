import hyReqeust from '../request/index' 

export function getSearchTop(){
    return hyReqeust.get({
        url:'/search/top'
    })
}