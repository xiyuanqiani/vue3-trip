import dayjs from 'dayjs'

export function formatMonthDay(date,format="MM月DD日"){
    return dayjs(date).format(format)
}

export function diffDays(startDate,endDate){
    return dayjs(endDate).diff(startDate,"day")
}

export function formatDay(data){
    const week = ['日', '一', '二', '三', '四', '五', '六']
    return '周' + week[dayjs(data).day()]
}