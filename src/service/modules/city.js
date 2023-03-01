import hyRequset from '../request/index'

export function getCityAll(){
    return hyRequset.get({
        url:'/city/all'
    })
}