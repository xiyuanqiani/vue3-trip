import {defineStore} from 'pinia'
import {getOrder} from '@/service'

const useOrder = defineStore('order',{
    state:()=>({
        allOrder:[],
        recentOrder:[],
        pendOrder:[],
        // 参数类别
        orderList:['all','recent','pend']
    }),
    actions:{
        async getAllOrder(){
            let result = await getOrder(this.orderList[0])
            this.allOrder = result.data.data.orders
        },
        async getRecentOrder(){
            let result = await getOrder(this.orderList[1])
            this.recentOrder = result.data.data.orders
        },
        async getPendOrder(){
            let result = await getOrder(this.orderList[2])
            this.pendOrder = result.data.data.orders
        }
    }
})

export default useOrder