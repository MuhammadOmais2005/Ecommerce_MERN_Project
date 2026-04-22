import React from 'react'
import dayjs from "dayjs"

const dateDifference = (startDate) => {

    let endDate = Date.now()
    let start = dayjs(startDate)
    let end = dayjs(endDate)

    let years = end.diff(start, "year")
    start = start.add(years, "year")

    let months = end.diff(start, "month")
    start = start.add(months, "month")

    let days = end.diff(start, "day")
    start = start.add(days, "day")

    let hours = end.diff(start, "hour")
    start = start.add(hours, "hour")

    let minutes = end.diff(start, "minute")
    start = start.add(minutes, "minute")

    let seconds = end.diff(start, "second")


    return `${years>0 ? years + "years": ""} ${months>0 ? months + "m": ""
    } ${days>0 ? days + "d": ""} ${hours>0 ? hours + "h": ""} ${minutes>0 ? minutes + "m": ""} ${seconds>0 ? seconds + "s": ""} `

    // return (
    //     years,
    //     months,
    //     days,
    //     hours,
    //     minutes,
    //     seconds
    // )

    
}

export default dateDifference
