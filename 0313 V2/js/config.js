/**
 * 项目配置中心
 * 所有可修改的文案、颜色、参数都在这里
 */

const CONFIG = {
  // 用户信息
  userName: 'David',
  
  // 第1步 - 广告弹窗
  step1: {
    title: '你的口令藏着春天的诗哦',
    buttonText: '来试试',
    overlayOpacity: 0.7,  // 70%透明度
    popupAnimation: 'scaleIn'  // 弹窗动画类型
  },
  
  // 第2步 - 互动入口页
  step2: {
    mainTitle: '啡快写首春天的诗',
    greeting: 'Hey David',
    content: `春天来的时候
有<strong class="highlight-number">50</strong>条口令与你相遇

想不想试试
把那些美好的、温暖的片段
重新织成春天的诗行`,
    buttonText: '开始AI创作',
    note: '*AI在您过去一年获得啡快口令中，随机选取5个进行组合'
  },
  
  // 第3步 - 诗句生成页
  step3: {
    mainTitle: '啡快写首春天的诗',  // 与step2保持一致
    signature: '——David的啡快口令',
    rewriteButton: '重写一首',
    posterButton: '生成海报',
    note: '*AI在您过去一年获得啡快口令中，随机选取5个进行组合',
    // 打字机动画配置
    typing: {
      charSpeed: 100,      // 每字出现间隔（毫秒）
      lineInterval: 1000,  // 行间间隔（毫秒）
      cursorBlink: true    // 是否显示光标闪烁
    }
  },
  
  // 第4步 - 海报分享页
  step4: {
    title: '啡快写首春天的诗',
    guideText: '还记得你收获的口令吗？\n一起来试试，啡快下单，口令成诗',
    shareButton: '分享',
    saveButton: '保存图片',
    replayButton: '再玩一次',
    // 海报弹窗配置
    poster: {
      width: '85%',        // 弹窗宽度
      height: '75%',       // 弹窗高度
      borderRadius: '16px', // 圆角
      background: 'bg-v1.png' // 海报背景图
    },
    // 分享选项
    shareOptions: ['微信好友', '朋友圈', '小红书', '微博']
  },
  
  // 颜色配置 - 星巴克品牌色系
  colors: {
    primary: '#00704A',           // 星巴克绿
    primaryDark: '#006241',       // 深绿（hover）
    textDark: '#1A1A1A',          // 深色文字
    textLight: '#FFFFFF',         // 浅色文字
    textMuted: 'rgba(255,255,255,0.7)', // 次要文字
    overlay: 'rgba(0,0,0,0.7)',   // 遮罩层
    posterOverlay: 'rgba(0,0,0,0.85)', // 海报页背景
    border: 'rgba(255,255,255,0.3)' // 边框色
  },
  
  // 字体配置
  fonts: {
    primary: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
    title: '"Noto Serif SC", serif'  // 标题可使用衬线字体
  },
  
  // 动画配置
  animation: {
    pageTransition: 300,     // 页面切换（毫秒）
    buttonHover: 200,        // 按钮hover（毫秒）
    popupShow: 300,          // 弹窗显示（毫秒）
    posterShow: 400          // 海报弹窗显示（毫秒）
  },
  
  // 布局配置
  layout: {
    maxWidth: '414px',       // 最大宽度（iPhone 6/7/8）
    padding: '24px',         // 页面边距
    titlePosition: {         // 主标题固定位置
      top: '15%'
    }
  },
  
  // 口令库 - 50条口令
  poemCodes: [
    '今日锦鲤', '好运连连', '天选之子', '乌云退散', '烦恼退散',
    '好运超级加倍', '美好都奔你而来', '爱笑运气会好', '渐入佳境', '人间值得',
    '保持热爱', '奔赴山海', '世界是你的', '去经历去收获', '我的快乐回来啦',
    '突然开心', '可爱到模糊', '平凡人的小梦想', '是金子总会发光', '保持好奇鸭',
    '这杯很春天', '春意走近心田', '偷得浮生半日闲', '开启美好一天', '日富一日',
    '好心情请查收', '宜收集快乐', '慢一点会更快', '得偿所愿', '享受此刻',
    '这么优秀', '魅力四射', '能力不嫌多', '全能小天才', '万物可爱',
    '要常见面', '有钱有闲', '不赶路感受路', '嘴角上扬', '锦鲤本鲤',
    '芝麻开门', '一杯敬自己', '风起时自有答案', '忙里偷闲', '轻舞飞扬',
    '鸟语蝉鸣', '路上都是风景', '旅途甜甜', '都挺好', '文艺青年'
  ]
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
