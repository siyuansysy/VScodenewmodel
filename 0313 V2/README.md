# 啡快写首春天的诗

## 项目概述

基于星巴克"啡快"订单完成场景的手机互动H5页面，引导用户使用历史口令生成春天主题诗句并分享。

## 项目结构

```
project/
├── index.html              # 主入口文件
├── css/
│   ├── base.css           # 基础样式（字体、变量）
│   ├── components.css     # 组件样式（按钮、弹窗）
│   └── pages/
│       ├── step1.css      # 第1步：广告弹窗页
│       ├── step2.css      # 第2步：互动入口页
│       ├── step3.css      # 第3步：诗句生成页
│       └── step4.css      # 第4步：海报分享页
├── js/
│   ├── config.js          # 配置中心（文案、颜色、参数）⭐
│   ├── utils.js           # 工具函数
│   ├── animations.js      # 动画控制 ⭐
│   ├── poem-generator.js  # 诗句生成逻辑
│   ├── poster-generator.js # 海报生成逻辑
│   └── main.js            # 主逻辑
└── assets/
    └── images/
        ├── screenshot.jpg  # 第1步背景
        └── bg-v1.png      # 第2、3步背景 + 海报背景
```

## 交互流程

1. **第1步：广告弹窗页**
   - 背景：订单完成页截图（screenshot.jpg）
   - 70%透明度遮罩
   - 居中弹窗："你的口令藏着春天的诗哦"
   - 按钮："来试试" + 关闭按钮(X)

2. **第2步：互动入口页**
   - 背景：bg-v1.png（铺满不拉伸）
   - 主标题："啡快写首春天的诗"
   - 正文：问候语 + 活动介绍
   - 按钮："开始AI创作"

3. **第3步：诗句生成页**
   - 同bg-v1.png背景
   - 主标题位置与第2步保持一致
   - 打字机效果逐行显示5句诗
   - 按钮："重写一首" + "生成海报"

4. **第4步：海报分享页**
   - 海报弹窗（85%宽×70%高，居中）
   - 弹窗外部纯黑背景
   - 按钮在海报外部：分享 + 保存图片 + 再玩一次

## 如何修改

### 修改文案

编辑 `js/config.js`：

```javascript
const CONFIG = {
  step1: {
    title: '你的口令藏着春天的诗哦',  // 弹窗标题
    buttonText: '来试试'               // 按钮文字
  },
  step2: {
    mainTitle: '啡快写首春天的诗',     // 主标题
    greeting: 'Hey David',             // 问候语
    content: '春天来的时候...',        // 正文
    buttonText: '开始AI创作'           // 按钮文字
  },
  // ... 其他步骤
};
```

### 修改颜色

编辑 `js/config.js` 中的 colors 部分：

```javascript
colors: {
  primary: '#00704A',      // 主色调（星巴克绿）
  textLight: '#FFFFFF',    // 浅色文字
  overlay: 'rgba(0,0,0,0.7)' // 遮罩层透明度
}
```

### 修改动画速度

编辑 `js/config.js`：

```javascript
animation: {
  typingSpeed: 100,    // 打字速度（毫秒/字）
  lineInterval: 1000,  // 行间间隔（毫秒）
  pageTransition: 300  // 页面切换（毫秒）
}
```

### 替换图片素材

**图片规范：**

| 文件名 | 用途 | 建议尺寸 | 格式 |
|--------|------|---------|------|
| `screenshot.jpg` | 第1步背景 | 1125×2436px | JPG/PNG |
| `bg-v1.png` | 第2、3步背景 + 海报背景 | 1125×2436px | PNG |

**替换方法：**
1. 准备新图片，保持相同文件名
2. 替换 `assets/images/` 目录下的文件
3. 刷新页面即可生效

### 修改口令库

编辑 `js/config.js` 中的 poemCodes 数组：

```javascript
poemCodes: [
  '今日锦鲤',
  '好运连连',
  // ... 添加或修改口令
]
```

## 技术说明

### 依赖库

- **html2canvas**: 用于生成海报图片
- **Google Fonts**: Noto Sans SC / Noto Serif SC

### 浏览器兼容性

- iOS Safari 12+
- Android Chrome 80+
- 微信内置浏览器

### 屏幕适配

- 设计基准：iPhone 6/7/8（414px宽度）
- 最大宽度限制：414px
- 仅支持竖屏

## 本地开发

1. 使用Live Server或其他本地服务器打开
2. 或直接打开 `index.html`（部分功能可能受限）

## 部署

推荐使用 Vercel 免费部署：

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

## 注意事项

1. 所有文案修改请在 `config.js` 中进行
2. 动画调整请在 `animations.js` 中进行
3. 样式调整请对应修改 `css/pages/` 下的文件
4. 图片替换请保持文件名一致
