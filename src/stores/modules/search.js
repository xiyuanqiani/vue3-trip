import { defineStore } from "pinia";
import {getSearchTop} from '@/service'

const useSearch = defineStore('search',{
    state:()=>({
        topInfos:[]
    }),
    actions:{
        async searchTop(){
            let result = await getSearchTop()
            this.topInfos = result.data.data.allConditions
        }
    }
})

export default useSearch