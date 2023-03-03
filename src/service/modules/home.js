import hyRequset from '../request/index'

export function getHomeSuggestCities(){
    return hyRequset.get({
        url:'/home/hotSuggests'
    })
}

export function getHomeCategories(){
    return hyRequset.get({
        url:'/home/categories'
    })
}

export function getHomeHouse(currentPage){
    return hyRequset.get({
        url:'/home/houselist',
        params:{
            page:currentPage
        }
    })
}