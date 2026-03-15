/**
 * 海报生成器
 * 使用html2canvas生成分享海报
 */

const PosterGenerator = {
  /**
   * 生成海报
   * @param {Array} poem - 诗句数组
   * @returns {Promise<string>} - 海报的base64图片数据
   */
  async generate(poem) {
    // 创建海报容器
    const posterEl = this.createPosterElement(poem);
    document.body.appendChild(posterEl);
    
    try {
      // 使用html2canvas生成图片
      const canvas = await html2canvas(posterEl, {
        scale: 2, // 高清输出
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });
      
      // 转换为base64
      const dataUrl = canvas.toDataURL('image/png');
      
      return dataUrl;
    } finally {
      // 清理临时元素
      document.body.removeChild(posterEl);
    }
  },
  
  /**
   * 创建海报DOM元素
   * @param {Array} poem - 诗句数组
   * @returns {HTMLElement}
   */
  createPosterElement(poem) {
    const container = document.createElement('div');
    container.className = 'poster-canvas';
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      width: 375px;
      height: 667px;
      background: url(../assets/images/bg-v1.png) center/cover no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 30px;
      font-family: 'Noto Sans SC', sans-serif;
    `;
    
    // 标题 - 深墨绿色，加粗
    const title = document.createElement('div');
    title.textContent = CONFIG.step4.title;
    title.style.cssText = `
      font-family: 'Noto Sans SC', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: #1A3A2F;
      margin-bottom: 40px;
      letter-spacing: 2px;
    `;
    container.appendChild(title);
    
    // 诗句
    const poemContainer = document.createElement('div');
    poemContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 30px;
    `;
    
    poem.forEach(line => {
      const lineEl = document.createElement('div');
      lineEl.textContent = line;
      lineEl.style.cssText = `
        font-family: 'Noto Sans SC', sans-serif;
        font-size: 20px;
        font-weight: 400;
        color: #1A3A2F;
        line-height: 1.6;
      `;
      poemContainer.appendChild(lineEl);
    });
    container.appendChild(poemContainer);
    
    // 落款 - 深墨绿色
    const signature = document.createElement('div');
    signature.textContent = CONFIG.step3.signature;
    signature.style.cssText = `
      font-size: 14px;
      color: rgba(26, 58, 47, 0.8);
      margin-bottom: 50px;
    `;
    container.appendChild(signature);
    
    // 引导词 - 深墨绿色，支持换行
    const guide = document.createElement('div');
    guide.textContent = CONFIG.step4.guideText;
    guide.style.cssText = `
      font-size: 12px;
      color: rgba(26, 58, 47, 0.7);
      text-align: center;
      line-height: 1.8;
      max-width: 280px;
      white-space: pre-line;
    `;
    container.appendChild(guide);
    
    return container;
  },
  
  /**
   * 下载海报
   * @param {string} dataUrl - 海报base64数据
   */
  download(dataUrl) {
    const timestamp = new Date().getTime();
    Utils.downloadImage(dataUrl, `啡快春天的诗_${timestamp}.png`);
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PosterGenerator;
}
