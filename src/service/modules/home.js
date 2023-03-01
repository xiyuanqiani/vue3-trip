import hyRequset from '../request/index'

export function getSuggestCities(){
    return hyRequset.get({
        url:'/home/hotSuggests'
    })
}