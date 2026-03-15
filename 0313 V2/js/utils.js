/**
 * 工具函数
 */

const Utils = {
  /**
   * 从数组中随机选取n个不重复的元素
   * @param {Array} arr - 源数组
   * @param {number} n - 选取数量
   * @returns {Array} - 选取的元素数组
   */
  randomPick(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  },

  /**
   * 打乱数组顺序
   * @param {Array} arr - 源数组
   * @returns {Array} - 打乱后的新数组
   */
  shuffle(arr) {
    return [...arr].sort(() => 0.5 - Math.random());
  },

  /**
   * 延迟执行
   * @param {number} ms - 毫秒
   * @returns {Promise}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * 切换页面显示
   * @param {string} fromPage - 当前页面ID
   * @param {string} toPage - 目标页面ID
   */
  switchPage(fromPage, toPage) {
    const fromEl = document.getElementById(fromPage);
    const toEl = document.getElementById(toPage);
    
    if (fromEl) {
      fromEl.classList.remove('active');
    }
    
    if (toEl) {
      setTimeout(() => {
        toEl.classList.add('active');
      }, 50);
    }
  },

  /**
   * 预加载图片
   * @param {string} src - 图片地址
   * @returns {Promise}
   */
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  },

  /**
   * 下载图片
   * @param {string} dataUrl - base64图片数据
   * @param {string} filename - 文件名
   */
  downloadImage(dataUrl, filename = 'poster.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  },

  /**
   * 检测是否为移动设备
   * @returns {boolean}
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * 防抖函数
   * @param {Function} fn - 原函数
   * @param {number} delay - 延迟时间
   * @returns {Function}
   */
  debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  },

  /**
   * 节流函数
   * @param {Function} fn - 原函数
   * @param {number} limit - 限制时间
   * @returns {Function}
   */
  throttle(fn, limit = 300) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
