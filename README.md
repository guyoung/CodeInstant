CodeInstant
===================================

CodeInstant是一款快速搭建前端代码静态展示网站工具， CodeInstant提供一套静态网站框架和站点导航自动生成脚本，帮助前端开发人员在GitHub pages等平台快速搭建代码展示网站。

CodeInstant支持在线编辑HTML、CSS、JavaScript代码并可实时预览效果，支持代码高亮显示，支持Markdown文件转HTML在线浏览。

![CodeInstant](https://github.com/guyoung/CodeInstant/raw/master/doc/images/code_instant_01.png)

## 使用

 * git clone https://github.com/guyoung/CaptfEncoder.git
 * cd CaptfEncoder
 * npm install 
 * npm start   // 运行 
 * npm run build   //或者编译运行

## 文件结构

    |- build                    脚本
    |--- build.js               站点导航自动生成脚本          
    |- data                     用户文件
    |--- codes                  代码
    |----- codes_3
    |------- index.html
    |----- vue
    |------- vue_quick_strat    
    |--------- index.html
    |--------- main.js
    |--------- style.css
    |------- vue_route
    |--------- index.html
    |------ sitemap.json        站点导航文件，脚本自动生成
    |--- home                   首页
    |----- index.md
    |--- pages                  文档                 
    |----- page_1
    |------- index.md
    |----- page_2
    |------- index.md
    |----- page_3
    |------- index.md
    |------ page.sitemap.json   站点导航文件，脚本自动生成
    |--- app.config.json        网站配置文件
    |- framwrok                 框架
    |--- js
    |------ app.js
    |------ app.route.js
    |------ code.component.js
    |------ home.component.js
    |------ page.component.js
    |--- style
    |------ main.css
    |-index.html                网站首页


## 使用Github pages搭建网站

 * Fork 
 * 修改仓库名称
 * 为仓库开启 github page 选项，Source 改为 master branch
 * 代码 clone 到本地
 * 本地项目初始化并运行
 * 添加修改文件
 * 将代码更新到 github 仓库


## 项目网站

 * <https://github.com/guyoung/CodeInstant>





------------------------------------------------

**关注微信公众号，获取软件最新消息**

![微信公众号](https://mmbiz.qlogo.cn/mmbiz_jpg/5IMiaY073fa7zxH6f5q5EticlwZPsYQtUnpYHspNiczmNyjtCXnR7LAmvpstK4EycfzIQkciboLh1qtWRcCibEPuDhA/0?wx_fmt=jpeg)
