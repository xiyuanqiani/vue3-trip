import {defineStore} from 'pinia'
import {getCityAll} from '@/service'

const useCity = defineStore('city',{
    state:()=>({
        allCities:{},
        currentCity:{
            cityName:"重庆",
            cityId:22
        }
    }),
    actions:{
        async fetchCities(){
            const result = await getCityAll()
            this.allCities = result.data
        }
    }
})

export default useCity