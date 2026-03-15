/**
 * 动画控制
 * 所有动画效果集中管理
 */

const Animations = {
  /**
   * 打字机效果
   * @param {HTMLElement} element - 目标元素
   * @param {string} text - 要显示的文本
   * @param {number} speed - 打字速度（毫秒/字）
   * @returns {Promise}
   */
  async typewriter(element, text, speed = 100) {
    element.classList.add('typing');
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await Utils.sleep(speed);
    }
    
    element.classList.remove('typing');
  },

  /**
   * 逐行显示诗句 - 从左到右打字机效果
   * @param {Array} lines - 诗句数组
   * @param {number} charSpeed - 每字速度
   * @param {number} lineInterval - 行间间隔
   * @returns {Promise} - 所有诗句显示完成后resolve
   */
  async showPoemLines(lines, charSpeed = 100, lineInterval = 1000) {
    const container = document.querySelector('.poem-container');
    const signature = document.querySelector('.signature');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 先隐藏落款
    if (signature) {
      signature.classList.remove('visible');
    }
    
    for (let i = 0; i < lines.length; i++) {
      const lineEl = document.createElement('div');
      lineEl.className = 'poem-line';
      container.appendChild(lineEl);
      
      // 打字机效果显示当前行
      await this.typewriter(lineEl, lines[i], charSpeed);
      
      // 显示完成后的样式
      lineEl.classList.add('visible');
      
      // 行间间隔
      if (i < lines.length - 1) {
        await Utils.sleep(lineInterval);
      }
    }
    
    // 所有诗句显示完成后，显示落款
    await Utils.sleep(500);
    if (signature) {
      signature.classList.add('visible');
    }
  },

  /**
   * 淡入动画
   * @param {HTMLElement} element - 目标元素
   * @param {number} duration - 动画时长
   */
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  },

  /**
   * 淡出动画
   * @param {HTMLElement} element - 目标元素
   * @param {number} duration - 动画时长
   * @returns {Promise}
   */
  async fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    
    await Utils.sleep(duration);
  },

  /**
   * 缩放进入动画
   * @param {HTMLElement} element - 目标元素
   * @param {number} duration - 动画时长
   */
  scaleIn(element, duration = 300) {
    element.style.transform = 'scale(0.9)';
    element.style.opacity = '0';
    element.style.transition = `all ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
    });
  },

  /**
   * 按钮点击反馈
   * @param {HTMLElement} button - 按钮元素
   */
  buttonClick(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  },

  /**
   * 页面切换动画
   * @param {HTMLElement} fromPage - 当前页面
   * @param {HTMLElement} toPage - 目标页面
   */
  async pageTransition(fromPage, toPage) {
    if (fromPage) {
      fromPage.style.opacity = '0';
      await Utils.sleep(300);
      fromPage.classList.remove('active');
    }
    
    if (toPage) {
      toPage.classList.add('active');
      toPage.style.opacity = '0';
      await Utils.sleep(50);
      toPage.style.opacity = '1';
    }
  },

  /**
   * 弹窗显示动画
   * @param {HTMLElement} modal - 弹窗元素
   */
  showModal(modal) {
    modal.classList.add('active');
    this.scaleIn(modal, 300);
  },

  /**
   * 弹窗隐藏动画
   * @param {HTMLElement} modal - 弹窗元素
   */
  async hideModal(modal) {
    modal.style.transform = 'scale(0.9)';
    modal.style.opacity = '0';
    await Utils.sleep(300);
    modal.classList.remove('active');
    modal.style.transform = '';
    modal.style.opacity = '';
  },

  /**
   * 分享面板滑入
   * @param {HTMLElement} sheet - 分享面板
   */
  slideUp(sheet) {
    sheet.classList.add('active');
  },

  /**
   * 分享面板滑出
   * @param {HTMLElement} sheet - 分享面板
   */
  async slideDown(sheet) {
    sheet.classList.remove('active');
    await Utils.sleep(300);
  },

  /**
   * 海报弹窗显示
   * @param {HTMLElement} poster - 海报弹窗
   */
  showPoster(poster) {
    poster.classList.add('active');
    poster.style.transform = 'translate(-50%, -50%) scale(0.9)';
    poster.style.opacity = '0';
    
    requestAnimationFrame(() => {
      poster.style.transform = 'translate(-50%, -50%) scale(1)';
      poster.style.opacity = '1';
    });
  },

  /**
   * 海报弹窗隐藏
   * @param {HTMLElement} poster - 海报弹窗
   */
  async hidePoster(poster) {
    poster.style.transform = 'translate(-50%, -50%) scale(0.9)';
    poster.style.opacity = '0';
    await Utils.sleep(400);
    poster.classList.remove('active');
    poster.style.transform = '';
    poster.style.opacity = '';
  },

  /**
   * 内容切换动画（主标题保持，内容切换）
   * @param {HTMLElement} content - 内容区域
   */
  async contentSwitch(content) {
    // 淡出旧内容
    content.style.opacity = '0';
    content.style.transform = 'translateY(10px)';
    await Utils.sleep(200);
    
    // 淡入新内容
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    await Utils.sleep(200);
  },

  /**
   * 脉冲动画（用于提示）
   * @param {HTMLElement} element - 目标元素
   */
  pulse(element) {
    element.style.animation = 'pulse 1.5s ease-in-out infinite';
    
    setTimeout(() => {
      element.style.animation = '';
    }, 3000);
  }
};

// 添加脉冲动画关键帧
const pulseKeyframes = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
`;

// 将关键帧添加到文档
const style = document.createElement('style');
style.textContent = pulseKeyframes;
document.head.appendChild(style);

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
}
