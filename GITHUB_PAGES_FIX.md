# GitHub Pages 显示 README.md 的修复指南

## 🔍 问题诊断

如果 https://baisiyou.github.io/health/ 仍然显示 README.md 而不是应用首页，可能的原因：

1. **GitHub Pages 未启用 GitHub Actions 部署**
2. **GitHub Actions 工作流未运行或失败**
3. **GitHub Pages 设置选择了错误的源**

## ✅ 解决步骤

### 步骤 1: 检查 GitHub Pages 设置

1. 访问：https://github.com/baisiyou/health/settings/pages

2. 在 **Source** (源) 部分，确保选择：
   - ✅ **GitHub Actions** (推荐)
   - 或者 **Deploy from a branch**，然后：
     - Branch: `main`
     - Folder: `/ (root)` 或 `/app`

3. 点击 **Save** (保存)

### 步骤 2: 检查 GitHub Actions 工作流

1. 访问：https://github.com/baisiyou/health/actions

2. 查看是否有 **"Deploy to GitHub Pages"** 工作流

3. 如果工作流存在但未运行：
   - 点击工作流名称
   - 点击 **"Run workflow"** 按钮
   - 选择 `main` 分支
   - 点击 **"Run workflow"**

4. 如果工作流运行失败：
   - 点击失败的工作流运行
   - 查看错误日志
   - 根据错误信息修复

### 步骤 3: 手动触发部署

如果自动部署没有触发，手动触发：

1. 访问：https://github.com/baisiyou/health/actions/workflows/deploy-pages.yml

2. 点击 **"Run workflow"** 按钮（右上角）

3. 选择 `main` 分支

4. 点击 **"Run workflow"**

5. 等待部署完成（通常需要 1-2 分钟）

### 步骤 4: 验证部署

部署完成后：

1. 等待 1-2 分钟让 DNS 更新

2. 访问：https://baisiyou.github.io/health/

3. 应该看到 HealthSync AI 首页，而不是 README.md

## 🔧 如果仍然显示 README.md

### 选项 A: 使用分支部署（备用方案）

如果 GitHub Actions 不工作，使用分支部署：

1. 访问：https://github.com/baisiyou/health/settings/pages

2. 在 **Source** 部分：
   - 选择 **Deploy from a branch**
   - Branch: `main`
   - Folder: `/app` (重要！)

3. 点击 **Save**

4. 等待几分钟让部署完成

### 选项 B: 检查文件结构

确保 `app/index.html` 存在：

1. 访问：https://github.com/baisiyou/health/tree/main/app

2. 确认 `index.html` 文件存在

3. 如果不存在，可能需要重新推送代码

### 选项 C: 清除缓存

1. 在浏览器中按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac) 硬刷新

2. 或使用无痕模式访问

## 📝 当前配置状态

✅ **已完成的配置：**
- GitHub Actions 工作流已创建 (`.github/workflows/deploy-pages.yml`)
- 前端代码已配置支持 GitHub Pages
- API 配置已更新支持 GitHub Pages 环境
- 路径处理已修复

⏳ **需要手动操作：**
- 在 GitHub 设置中启用 GitHub Actions 部署
- 或手动触发工作流运行

## 🚀 推荐操作

**立即执行：**

1. 访问：https://github.com/baisiyou/health/settings/pages
2. 选择 **GitHub Actions** 作为部署源
3. 访问：https://github.com/baisiyou/health/actions
4. 手动触发 **"Deploy to GitHub Pages"** 工作流
5. 等待部署完成
6. 访问：https://baisiyou.github.io/health/ 验证

## 💡 提示

- GitHub Pages 部署通常需要 1-2 分钟
- 首次部署可能需要更长时间
- 如果工作流失败，检查 Actions 标签中的错误日志
- 确保仓库是公开的，或者你已启用 GitHub Pages 的私有仓库支持

