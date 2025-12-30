# GitHub Pages 部署指南

## ✅ 已完成的配置

前端已经配置为支持 GitHub Pages 部署：

1. **API 配置** (`app/js/api-config.js`)
   - 自动检测 GitHub Pages 环境
   - 在 GitHub Pages 上使用 Render API URLs：
     - Backend API: `https://health-1-3gn7.onrender.com`
     - Hybrid API: `https://health-2-aw0s.onrender.com`

2. **路径处理** (`app/js/base-path.js`)
   - 自动处理 GitHub Pages 的 base path (`/health/`)
   - 动态修复所有绝对路径

3. **Supabase 初始化** (`app/js/main.js`)
   - 支持从 Render Backend API 获取 Supabase keys

4. **GitHub Actions 工作流** (`.github/workflows/deploy-pages.yml`)
   - 自动部署到 GitHub Pages

## 🚀 启用 GitHub Pages

### 步骤 1: 在 GitHub 仓库设置中启用 Pages

1. 访问你的 GitHub 仓库：https://github.com/baisiyou/health
2. 点击 **Settings** (设置)
3. 在左侧菜单中找到 **Pages** (页面)
4. 在 **Source** (源) 部分：
   - 选择 **GitHub Actions** 作为部署源
   - 或者选择 **Deploy from a branch**，然后选择：
     - Branch: `main`
     - Folder: `/app`
5. 点击 **Save** (保存)

### 步骤 2: 触发部署

有两种方式：

#### 方式 A: 自动部署（推荐）
- 当你推送代码到 `main` 分支时，GitHub Actions 会自动部署

#### 方式 B: 手动触发
1. 在 GitHub 仓库页面，点击 **Actions** 标签
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow** 按钮
4. 选择 `main` 分支
5. 点击 **Run workflow**

### 步骤 3: 等待部署完成

1. 在 **Actions** 标签中查看部署进度
2. 部署完成后，访问：https://baisiyou.github.io/health/

## 📝 重要说明

### GitHub Pages 的限制

1. **只能托管静态文件**
   - 不能运行 Node.js 服务器
   - 所有 API 调用都指向 Render 服务

2. **Base Path**
   - GitHub Pages URL: `https://baisiyou.github.io/health/`
   - 所有相对路径会自动处理

3. **API 依赖**
   - 前端依赖 Render 上的 Backend API 和 Hybrid API
   - 如果 Render 服务不可用，某些功能可能无法工作

### 当前部署状态

- ✅ **Render Frontend**: https://health-ihri.onrender.com (完整功能)
- ✅ **Render Backend API**: https://health-1-3gn7.onrender.com
- ✅ **Render Hybrid API**: https://health-2-aw0s.onrender.com
- 🔄 **GitHub Pages**: https://baisiyou.github.io/health/ (需要启用)

## 🔧 故障排除

### 如果 GitHub Pages 显示 404

1. 检查 GitHub Actions 工作流是否成功运行
2. 确认在 Settings > Pages 中选择了正确的源
3. 等待几分钟让 DNS 更新

### 如果页面加载但 API 调用失败

1. 检查 Render 服务是否正常运行
2. 打开浏览器开发者工具 (F12)
3. 查看 Console 和 Network 标签中的错误信息
4. 确认 API URLs 是否正确：
   - Backend API: `https://health-1-3gn7.onrender.com`
   - Hybrid API: `https://health-2-aw0s.onrender.com`

### 如果路径不正确

1. 确认 `base-path.js` 已加载
2. 检查浏览器控制台是否有 JavaScript 错误
3. 确认所有链接都使用相对路径或通过 `base-path.js` 处理

## 📚 相关文档

- [Render 部署指南](./RENDER_DEPLOY.md)
- [GitHub Pages vs Render](./GITHUB_PAGES_VS_RENDER.md)

