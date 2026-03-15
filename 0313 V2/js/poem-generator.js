/**
 * 诗句生成器
 * 从口令库中随机选择并优化组合
 */

const PoemGenerator = {
  // 当前生成的诗句
  currentPoem: [],
  
  /**
   * 生成诗句
   * @returns {Array} - 5行诗句数组
   */
  generate() {
    const codes = CONFIG.poemCodes;
    
    // 随机选择5个不重复的口令
    let selected = Utils.randomPick(codes, 5);
    
    // 优化：尽量让字数不相等，避免看起来太整齐
    selected = this.optimizeSelection(selected);
    
    // 打乱顺序
    selected = Utils.shuffle(selected);
    
    // 保存当前诗句
    this.currentPoem = selected;
    
    return selected;
  },
  
  /**
   * 优化选择：避免5行都是相同字数
   * @param {Array} selected - 已选口令
   * @returns {Array} - 优化后的口令
   */
  optimizeSelection(selected) {
    const codes = CONFIG.poemCodes;
    
    // 计算每行的字数
    const lengths = selected.map(code => code.length);
    
    // 如果所有字数都相同，替换其中一行
    if (new Set(lengths).size === 1) {
      // 找到不同字数的口令
      const currentLength = lengths[0];
      const alternatives = codes.filter(code => 
        code.length !== currentLength && !selected.includes(code)
      );
      
      if (alternatives.length > 0) {
        // 随机替换一行
        const replaceIndex = Math.floor(Math.random() * 5);
        const newCode = alternatives[Math.floor(Math.random() * alternatives.length)];
        selected[replaceIndex] = newCode;
      }
    }
    
    return selected;
  },
  
  /**
   * 重新生成诗句
   * @returns {Array} - 新的5行诗句
   */
  regenerate() {
    return this.generate();
  },
  
  /**
   * 获取当前诗句
   * @returns {Array}
   */
  getCurrentPoem() {
    return this.currentPoem;
  },
  
  /**
   * 检查诗句是否有重复
   * @param {Array} poem - 诗句数组
   * @returns {boolean}
   */
  hasDuplicates(poem) {
    return new Set(poem).size !== poem.length;
  },
  
  /**
   * 获取诗句的字数分布
   * @param {Array} poem - 诗句数组
   * @returns {Array}
   */
  getLengthDistribution(poem) {
    return poem.map(line => line.length);
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PoemGenerator;
}
