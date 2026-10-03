/**
 * 全站内容配置 —— 网站所有文字都来自这个文件，更新只改这里
 *
 * 改个人信息：编辑 SITE 和 ABOUT
 * 新增项目：
 *   1. 把界面截图放进 images/ 目录
 *   2. 在 PROJECTS 数组追加一项，screenshots 里按顺序写 { src, caption }
 *   3. 首页会自动多出一张卡片，详情页地址是 project.html?id=项目id
 *
 * cover 是首页卡片的封面图，不填就自动用 screenshots 里的第一张。
 * 字段少填不会报错：没有 screenshots 就不显示截图区，没有 github 就不显示仓库链接。
 */
const SITE = {
  name: "刘卓轩",
  brand: "作品集",
  title: "刘卓轩 · 作品集",
  heroTitle: "你好，我是刘卓轩",
  tagline: "软件工程 · 后端开发",
  description: "软件工程专业 2026 应届毕业生，后端开发方向，主攻 Java / Spring Boot。",
  github: "https://github.com/lzx14460/my-portfolio",
  year: new Date().getFullYear(),
};

const PROJECTS = [
  {
    id: "campus-sports",
    featured: true,
    title: "智慧校园体育设施预约与健康管理平台",
    subtitle: "毕业设计 · Spring Boot + Vue.js + MySQL",
    period: "2025.09 — 2026.06",
    role: "毕业设计 · 独立完成",
    summary:
      "面向校园场景的体育场馆预约与健康管理平台，覆盖预约、健康记录、AI 报告和数据看板。",
    description:
      "这是我的本科毕业设计。平台服务在校师生：在线预约体育场馆、记录日常健康数据，并由系统生成健康报告，同时为管理侧提供数据看板。",
    highlights: ["场馆预约", "健康数据记录", "AI 健康报告", "数据看板"],
    stack: ["Spring Boot", "Vue.js", "MySQL"],
    github: "https://github.com/lzx14460/my-portfolio",
    cover: "images/体育设施界面.png",
    // 界面截图：按数组顺序排在详情页，两列网格
    screenshots: [
      { src: "images/登录界面.png", caption: "登录界面" },
      { src: "images/登录成功界面.png", caption: "登录成功后的首页" },
      { src: "images/个人中心界面.png", caption: "个人中心" },
      { src: "images/体育设施界面.png", caption: "体育设施列表" },
      { src: "images/预约界面.png", caption: "场馆预约" },
      { src: "images/预约对话界面.png", caption: "预约确认弹窗" },
      { src: "images/预约记录与健康数据页面.png", caption: "预约记录与健康数据" },
      { src: "images/体育设施使用情况界面.png", caption: "设施使用情况统计" },
      { src: "images/体育设施管理界面.png", caption: "后台 · 设施管理" },
      { src: "images/添加体育设施对话界面.png", caption: "后台 · 添加设施" },
      { src: "images/公告管理页面.png", caption: "后台 · 公告管理" },
      { src: "images/管理员审批界面.png", caption: "后台 · 预约审批" },
      { src: "images/用户管路界面.png", caption: "后台 · 用户管理" },
    ],
  },
];

const ABOUT = {
  intro: "我叫刘卓轩，软件工程专业 2026 应届毕业生。",
  job: "正在寻找后端开发岗位。",
  skills: ["Java", "Spring Boot", "MySQL", "Vue.js"],
};
