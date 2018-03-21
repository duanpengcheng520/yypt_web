const commonFn = {
  j2s(obj) {
    return JSON.stringify(obj)
  },
  s2j(obj) {
    return JSON.parse(obj)
  },
  shallowRefresh(name) {
    router.replace({ path: '/refresh', query: { name: name }})
  },
  closeGlobalLoading() {
    setTimeout(() => {
      store.dispatch('showLoading', false)
    }, 0)
  },
  openGlobalLoading() {
    setTimeout(() => {
      store.dispatch('showLoading', true)
    }, 0)
  },
  cloneJson(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  toastMsg(type, msg) {
    switch (type) {
      case 'normal':
        bus.$message(msg)
        break
      case 'success':
        bus.$message({
          message: msg,
          type: 'success'
        })
        break
      case 'warning':
        bus.$message({
          message: msg,
          type: 'warning'
        })
        break
      case 'error':
        bus.$message.error(msg)
        break
    }
  },
  clearVuex(cate) {
    store.dispatch(cate, [])
  },
  getHasRule(val) {
    const moduleRule = 'admin'
    let userInfo = Lockr.get('userInfo')
    if (userInfo.id == 1) {
      return true
    } else {
      let authList = moduleRule + Lockr.get('authList')
      return _.includes(authList, val)
    }
  },
  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
      if (j === 'pay_at') {
        return this.formatTime(v[j])
      } else if (j === 'created_at') {
        return this.formatTime(v[j])
      } else if (j === 'status') {
        let string = ''
        switch (v[j]) {
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
      } else {
        return v[j]
      }
    }))
  },
  formatTime(value, formatString) {
    let rData = ''
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    if (value) {
      rData = moment(value).format(formatString)
    }
    return rData
  },
  printer(id) {
    var printBox = document.getElementById(id)
    var newBox = printBox.innerHTML
    var oldBox = document.body.innerHTML
    document.body.innerHTML = newBox
    window.print()
    window.location.reload()
    document.body.innerHTML = oldBox
    return
  }
}

export default commonFn
