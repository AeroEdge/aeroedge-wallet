import auth from '@/vuex/auth'

export default {
  /**
   * strageへのデータ登録
   *  ログイン状態を保持していないなら、データはsessionへ登録する
   *  保持しているならLocalへ登録する
   */
  setStrage: (name, data) => {
    if (!auth.state.keepLoginFlag) {
      sessionStorage.setItem(name, JSON.stringify(data))
    } else {
      localStorage.setItem(name, JSON.stringify(data))
    }
  },
  /**
   * localへ直接登録する
   */
  setLocalStrage: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
  },
  /**
   * strageからのデータ取得
   * 存在していれば、データはsessionから取得する
   *  無ければLocalを確認する
   */
  getStrage: (name) => {
    if (sessionStorage.getItem(name)) {
      return sessionStorage.getItem(name)
    } else {
      return localStorage.getItem(name)
    }
  },
  /**
   * strageのデータ削除
   * 存在していれば、データはsessionから削除する
   *  無ければLocalを削除する
   */
  removeStrage: (name) => {
    if (sessionStorage.removeItem(name)) {
      sessionStorage.removeItem(name)
    } else {
      localStorage.removeItem(name)
    }
  },
  /**
   * ユニークキーの作成
   */
  getUniqueStr: (myStrong) => {
    var strong = 1000
    if (myStrong) strong = myStrong
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
  },
  /*
   * データ保存(download)する
   */
  fileDownload: (downLoadLink) => {
    if (window.navigator.msSaveBlob) {
      /*
       * IE専用処理
       */
      let xhr = new XMLHttpRequest()
      xhr.open('GET', downLoadLink.href)
      xhr.responseType = 'blob'

      xhr.send()
      xhr.onloadend = function () {
        if (xhr.status !== 200) return
        window.navigator.msSaveBlob(xhr.response, downLoadLink.download)
      }
    } else {
      /*
       * その他
       */
      let event = document.createEvent('MouseEvents')
      event.initEvent('click', false, true)
      downLoadLink.dispatchEvent(event)
    }
  },
  /**
   * UserAgentの取得
   */
  getUserAgent: (user) => {
    var userAgent = window.navigator.userAgent.toLowerCase()
    var appVer = window.navigator.appVersion

    var _IE = false
    var _Chrome = false
    var _Opera = false
    var _Safari = false
    var _Firefox = false
    var _WinPhone = false
    var _iphone = false
    var _ipod = false
    var _ipad = false
    var _Android = false
    var _blackberry = false
    var _FirefoxPhone = false

    var _AndroidVer
    var _IEver

    if (userAgent.indexOf('msie') !== -1) {
      _IE = true
      userAgent.match(/msie (\d+\.\d)/)
      _IEver = parseFloat(RegExp.$1)
    } else if (userAgent.indexOf('trident') !== -1) {
      _IE = true
      userAgent.match(/rv: (\d+\.\d)/)
      _IEver = parseFloat(RegExp.$1)
    }

    if (userAgent.indexOf('opera') !== -1) {
      _Opera = true
    } else if (userAgent.indexOf('msie') !== -1) {
      _IE = true
    } else if (userAgent.indexOf('chrome') !== -1) {
      _Chrome = true
    } else if (userAgent.indexOf('safari') !== -1) {
      _Safari = true
    } else if (userAgent.indexOf('firefox') !== -1) {
      _Firefox = true
    }

    if (userAgent.indexOf('firefox') !== -1 && userAgent.indexOf('mobile') !== -1) {
      _FirefoxPhone = true
    } else if (userAgent.indexOf('iphone') !== -1) {
      _iphone = true
    } else if (userAgent.indexOf('ipod') !== -1) {
      _ipod = true
    } else if (userAgent.indexOf('ipad') !== -1) {
      _ipad = true
    } else if (userAgent.indexOf('android') !== -1 && userAgent.indexOf('mobile') !== -1) {
      _Android = true
      appVer.match(/Android (\d+)?/)
      _AndroidVer = parseFloat(RegExp.$1)
    } else if (userAgent.indexOf('windows') !== -1 && userAgent.indexOf('mobile') !== -1) {
      _WinPhone = true
    } else if (userAgent.indexOf('blackberry') !== -1) {
      _blackberry = true
    }

    return {
      isIE: _IE,
      isIE9lt: (_IEver <= 9.0),
      isAndroid: _Android,
      isAndroid4gt: (_Android && _AndroidVer >= 4),
      isSmartphone: (_iphone || _ipod || _Android || _WinPhone || _blackberry),
      isChrome: _Chrome,
      etc: (_Chrome || _Opera || _Safari || _Firefox || _ipad || _FirefoxPhone)
    }
  }
}
