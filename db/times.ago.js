
// // import TimeAgo from 'javascript-time-ago'
// const TimeAgo=require('javascript-time-ago')
// // English.
// // import en from 'javascript-time-ago/locale/en'
// // const en=require('javascript-time-ago/')
// const en=require('javascript-time-ago/locale/en')
// TimeAgo.addDefaultLocale(en)

// // Create formatter (English).
// // const timeAgo = new TimeAgo('en-US')  india
// const timeAgo = new TimeAgo('en-IST')  

// timeAgo.format(new Date())
// // "just now"

// timeAgo.format(Date.now() - 60 * 1000)
// // "1 minute ago"

// timeAgo.format(Date.now() - 2 * 60 * 60 * 1000)
// // "2 hours ago"

// timeAgo.format(Date.now() - 24 * 60 * 60 * 1000)
// // "1 day ago"

// const formatTime=(time)=>{
//     return timeAgo.format(Date.now()-(time.getTime()/1000))
// }

const moment=require('moment')
const formatTime=(time)=>{
    return moment(time).fromNow()
}

module.exports={ formatTime }