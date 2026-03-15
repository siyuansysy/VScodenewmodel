/**
 * 主逻辑文件
 * 页面路由、事件绑定、流程控制
 */

// 当前状态
const AppState = {
  currentStep: 1,
  currentPoem: [],
  posterDataUrl: null
};

// DOM元素缓存
const DOM = {};

/**
 * 初始化应用
 */
function init() {
  cacheDOM();
  bindEvents();
  
  // 预加载图片
  Promise.all([
    Utils.preloadImage('assets/images/screenshot.jpg'),
    Utils.preloadImage('assets/images/bg-v1.png')
  ]).catch(err => console.log('图片预加载失败:', err));
}

/**
 * 缓存DOM元素
 */
function cacheDOM() {
  // 页面
  DOM.step1 = document.getElementById('step1');
  DOM.step2 = document.getElementById('step2');
  DOM.step3 = document.getElementById('step3');
  DOM.step4 = document.getElementById('step4');
  
  // 第1步
  DOM.adModal = document.getElementById('adModal');
  DOM.closeAdBtn = document.getElementById('closeAdBtn');
  DOM.tryBtn = document.getElementById('tryBtn');
  
  // 第2步
  DOM.backToStep1 = document.getElementById('backToStep1');
  DOM.startBtn = document.getElementById('startBtn');
  
  // 第3步
  DOM.backToStep2 = document.getElementById('backToStep2');
  DOM.poemContainer = document.getElementById('poemContainer');
  DOM.rewriteBtn = document.getElementById('rewriteBtn');
  DOM.createPosterBtn = document.getElementById('createPosterBtn');
  
  // 第4步
  DOM.posterModal = document.getElementById('posterModal');
  DOM.posterPoem = document.getElementById('posterPoem');
  DOM.shareBtn = document.getElementById('shareBtn');
  DOM.saveBtn = document.getElementById('saveBtn');
  DOM.replayBtn = document.getElementById('replayBtn');
  DOM.shareOverlay = document.getElementById('shareOverlay');
  DOM.shareSheet = document.getElementById('shareSheet');
  DOM.cancelShare = document.getElementById('cancelShare');
}

/**
 * 绑定事件
 */
function bindEvents() {
  // 第1步
  DOM.closeAdBtn.addEventListener('click', closeAdModal);
  DOM.tryBtn.addEventListener('click', goToStep2);
  
  // 第2步
  DOM.backToStep1.addEventListener('click', goBackToStep1);
  DOM.startBtn.addEventListener('click', goToStep3);
  
  // 第3步
  DOM.backToStep2.addEventListener('click', goBackToStep2);
  DOM.rewriteBtn.addEventListener('click', rewritePoem);
  DOM.createPosterBtn.addEventListener('click', goToStep4);
  
  // 第4步
  DOM.shareBtn.addEventListener('click', showShareSheet);
  DOM.saveBtn.addEventListener('click', savePoster);
  DOM.replayBtn.addEventListener('click', replay);
  DOM.shareOverlay.addEventListener('click', hideShareSheet);
  DOM.cancelShare.addEventListener('click', hideShareSheet);
  
  // 分享选项
  document.querySelectorAll('.share-option').forEach(option => {
    option.addEventListener('click', () => {
      const platform = option.dataset.platform;
      handleShare(platform);
    });
  });
}

// ========== 页面切换 ==========

function goToStep2() {
  AppState.currentStep = 2;
  switchPage('step1', 'step2');
}

function goBackToStep1() {
  AppState.currentStep = 1;
  switchPage('step2', 'step1');
  // 重新显示弹窗
  setTimeout(() => {
    DOM.adModal.classList.add('active');
  }, 300);
}

async function goToStep3() {
  AppState.currentStep = 3;
  switchPage('step2', 'step3');
  
  // 生成并显示诗句
  await generateAndShowPoem();
}

function goBackToStep2() {
  AppState.currentStep = 2;
  switchPage('step3', 'step2');
  // 清空诗句容器
  DOM.poemContainer.innerHTML = '';
}

async function goToStep4() {
  AppState.currentStep = 4;
  switchPage('step3', 'step4');
  
  // 显示海报弹窗
  setTimeout(() => {
    DOM.posterModal.classList.add('active');
  }, 100);
  
  // 更新海报内容
  updatePosterContent();
  
  // 生成海报图片
  try {
    AppState.posterDataUrl = await PosterGenerator.generate(AppState.currentPoem);
  } catch (err) {
    console.error('海报生成失败:', err);
  }
}

function switchPage(fromId, toId) {
  const fromPage = document.getElementById(fromId);
  const toPage = document.getElementById(toId);
  
  Animations.pageTransition(fromPage, toPage);
}

// ========== 第1步功能 ==========

function closeAdModal() {
  DOM.adModal.classList.remove('active');
}

// ========== 第3步功能 ==========

async function generateAndShowPoem() {
  // 生成诗句
  AppState.currentPoem = PoemGenerator.generate();
  
  // 清空容器
  DOM.poemContainer.innerHTML = '';
  
  // 逐行显示（打字机效果）
  const { charSpeed, lineInterval } = CONFIG.step3.typing;
  
  for (let i = 0; i < AppState.currentPoem.length; i++) {
    const lineEl = document.createElement('div');
    lineEl.className = 'poem-line';
    DOM.poemContainer.appendChild(lineEl);
    
    // 打字机效果
    await Animations.typewriter(lineEl, AppState.currentPoem[i], charSpeed);
    
    // 显示完成
    lineEl.classList.add('visible');
    
    // 行间间隔
    if (i < AppState.currentPoem.length - 1) {
      await Utils.sleep(lineInterval);
    }
  }
}

async function rewritePoem() {
  // 清空当前诗句
  DOM.poemContainer.innerHTML = '';
  
  // 重新生成
  await generateAndShowPoem();
}

// ========== 第4步功能 ==========

function updatePosterContent() {
  DOM.posterPoem.innerHTML = '';
  AppState.currentPoem.forEach(line => {
    const lineEl = document.createElement('div');
    lineEl.className = 'poster-line';
    lineEl.textContent = line;
    DOM.posterPoem.appendChild(lineEl);
  });
}

function showShareSheet() {
  DOM.shareOverlay.classList.add('active');
  DOM.shareSheet.classList.add('active');
}

function hideShareSheet() {
  DOM.shareOverlay.classList.remove('active');
  DOM.shareSheet.classList.remove('active');
}

function handleShare(platform) {
  console.log('分享到:', platform);
  // Demo效果，仅显示提示
  alert(`已选择分享到: ${getPlatformName(platform)}`);
  hideShareSheet();
}

function getPlatformName(platform) {
  const names = {
    wechat: '微信好友',
    moments: '朋友圈',
    xiaohongshu: '小红书',
    weibo: '微博'
  };
  return names[platform] || platform;
}

function savePoster() {
  if (AppState.posterDataUrl) {
    PosterGenerator.download(AppState.posterDataUrl);
  } else {
    alert('海报生成中，请稍后再试');
  }
}

async function replay() {
  // 隐藏海报弹窗
  DOM.posterModal.classList.remove('active');
  await Utils.sleep(400);
  
  // 返回第2步
  AppState.currentStep = 2;
  switchPage('step4', 'step2');
  
  // 清空诗句
  DOM.poemContainer.innerHTML = '';
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);
