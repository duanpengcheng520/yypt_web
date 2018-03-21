import Vue from 'vue'
export default (function () {
  Vue.filter('status', function (value) {
    if (value == 1) {
      return '启用'
    } else if (value == 0) {
      return '禁用'
    } else {
      return '未知状态'
    }
  })
  Vue.filter('pay_status', function (value) {
    if (value == 1) {
      return '已付款'
    } else if (value == 0) {
      return '未付款'
    } else if (value == 2) {
      return '已退款'
    } else {
      return '未知状态'
    }
  })
  Vue.filter('wc_status', function (value) {
    if (value == 1) {
      return '正常'
    } else if (value == 0) {
      return '禁用'
    } else if (value == 2) {
      return '审核中'
    } else {
      return '未知状态'
    }
  })
  Vue.filter('weChat_type', function (value) {
    let string = ''
    switch (value) {
      case 1:
        string = '普通订阅号'
        break
      case 2:
        string = '认证订阅号'
        break
      case 3:
        string = '普通服务号'
        break
      case 4:
        string = '认证服务号(媒体、政府)'
        break
    }
    return string
  })
  Vue.filter('sex', function (value) {
    let string = ''
    switch (value) {
      case 1:
        string = '男'
        break
      case 2:
        string = '女'
        break
    }
    return string
  })
  Vue.filter('keys_type', function (value) {
    let string = ''
    switch (value) {
      case 'text':
        string = '文本'
        break
      case 'news':
        string = '图文'
        break
      case 'image':
        string = '图片'
        break
      case 'music':
        string = '音乐'
        break
      case 'video':
        string = '视频'
        break
    }
    return string
  })
  Vue.filter('order_status', function (value) {
    let string = ''
    switch (value) {
      case 'submitted':
        string = '已提交待支付'
        break
      case 'paid':
        string = '已支付'
        break
      case 'refunding':
        string = '退款中'
        break
      case 'shippend':
        string = '已发货待签收'
        break
      case 'delivered':
        string = '已签收'
        break
      case 'canceled':
        string = '已取消'
        break
    }
    return string
  })
  Vue.filter('order_status_options', function (value) {
   // let option=''
   // if(value=='order_status_options'){
   //    option=[{
   //        value: 'submitted',
   //        label: '已提交待支付'
   //      }, {
   //        value: 'paid',
   //        label: '已支付'
   //      }, {
   //        value: 'refunding',
   //        label: '退款中'
   //      }, {
   //        value: 'shippend',
   //        label: '已发货待签收'
   //      }, {
   //        value: 'delivered',
   //        label: '已签收'
   //      }, {
   //        value: 'canceled',
   //        label: '已取消'
   //    }]
   // }
   
   //   return option
    
      // return {
      //   options: [{
      //     value: '选项1',
      //     label: '黄金糕'
      //   }, {
      //     value: '选项2',
      //     label: '双皮奶'
      //   }, {
      //     value: '选项3',
      //     label: '蚵仔煎'
      //   }, {
      //     value: '选项4',
      //     label: '龙须面'
      //   }, {
      //     value: '选项5',
      //     label: '北京烤鸭'
      //   }],
      //   value: ''
      // }
    
    
  })
  Vue.filter('rules', function (value) {
    return value
  })
  Vue.filter('fileLink', function (value) {
    const link = window.imgUrl + value
    return link
  })
  Vue.filter('toolType', function (value) {
    let type = ''
    if (value == 1) {
      type = '系统工具'
    } else if (value == 2) {
      type = '说明知道'
    }
    return type
  })
  Vue.filter('numToString', function (value) {
    const string = value.toString()
    return string
  })
  Vue.filter('projectState', function (value) {
    let string = ''
    switch (value) {
      case '1':
        string = '售前项目'
        break
      case '2':
        string = '服务中项目'
        break
      case '3':
        string = '已结束项目'
        break
    }
    return string
  })
  Vue.filter('time', function (value) {
    let day = moment.unix(value)
    let date = moment(day).format('YYYY/MM/DD H:mm')
    return date
  })
  Vue.filter('date', function (value) {
    let day = moment.unix(value)
    let date = moment(day).format('YYYY/MM/DD')
    return date
  })
  Vue.filter('abstract', function (value) {
    let abstract = ''
    if (value.length > 70) {
      abstract = value.substr(0, 70) + '...'
    } else {
      abstract = value
    }
    return abstract
  })
  Vue.filter('posStatus', function (value) {
    let status = ''
    switch (value) {
      case 1:
        status = '在职'
        break
      case 2:
        status = '待入职'
        break
      case 3:
        status = '离职'
        break
    }
    return status
  })
  Vue.filter('template', function (value) {
    let template = ''
    if (value == '') {
      template = '上传'
    } else {
      template = '上传更新'
    }
    return template
  })
  /* 地区数据过滤器 */
  // Vue.filter('myAddressCity', function (value, CityInfo) {
  //   for (y in CityInfo) {
  //     if (CityInfo[y].value == value) {
  //       value = CityInfo[y].label
  //       return value
  //     }
  //   }
  // })
  // Vue.filter('myAddressErae', function (value, CityInfo) {
  //   for (y in CityInfo) {
  //     for (z in this.CityInfo[y].children) {
  //       if (CityInfo[y].children[z].value == value && value != undefined) {
  //         value = CityInfo[y].children[z].label
  //         return value
  //       }
  //     }
  //   }
  // })
  // Vue.filter('myAddressMinerae', function (value, CityInfo) {
  //   for (y in CityInfo) {
  //     for (z in CityInfo[y].children) {
  //       for (i in CityInfo[y].children[z].children) {
  //         if (CityInfo[y].children[z].children[i].value == value && value != undefined) {
  //           value = CityInfo[y].children[z].children[i].label
  //           return value
  //         }
  //       }
  //     }
  //   }
  // })
  Vue.filter('formatTime', function (value, formatString) {
    let rData=''
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    if(value){
      rData=moment(value).format(formatString)
    }
    return rData
  })

  Vue.filter('date', function(time) {
          let oldDate = new Date(time)
          let newDate = new Date()
          var dayNum = ""
          var getTime = (newDate.getTime() - oldDate.getTime())/1000

          if(getTime < 60*5){
              dayNum = "刚刚"
          }else if(getTime >= 60*5 && getTime < 60*60){
              dayNum = parseInt(getTime / 60) + "分钟前"
          }else if(getTime >= 3600 && getTime < 3600*24){
              dayNum = parseInt(getTime / 3600) + "小时前"
          }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
              dayNum = parseInt(getTime / 3600 / 24 ) + "天前"
          }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前" 
          }else if(time >= 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前"
          }

          let year   = oldDate.getFullYear()
          let month  = oldDate.getMonth()+1
          let day    = oldDate.getDate()
          let hour   = oldDate.getHours()
          let minute = oldDate.getMinutes()
          let second = oldDate.getSeconds()
          return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second
 })

      
})()
