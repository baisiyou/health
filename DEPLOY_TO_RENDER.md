# 🚀 部署到 Render - 快速指南

## 步骤 1: 提交并推送代码到 GitHub

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "Add Render deployment configuration and UI improvements"

# 推送到 GitHub
git push origin main
```

## 步骤 2: 在 Render 中创建 Blueprint

1. 访问 [Render Dashboard](https://dashboard.render.com)
2. 点击 **"New +"** → **"Blueprint"**
3. 连接 GitHub 仓库
4. Render 会自动检测 `render.yaml`
5. 点击 **"Apply"** 创建服务

## 步骤 3: 配置环境变量

在 `healthsync-backend-api` 服务中：
- 进入服务 → **Environment** 标签
- 添加：
  - `SUPABASE_URL` = 你的 Supabase URL
  - `SUPABASE_KEY` = 你的 Supabase Key

## 步骤 4: 等待部署完成

部署通常需要 5-10 分钟，完成后会获得服务 URL。

## 📚 详细文档

- [完整部署指南](./RENDER_DEPLOY.md)
- [快速检查清单](./RENDER_DEPLOY_CHECKLIST.md)
- [部署总结](./DEPLOYMENT_SUMMARY.md)

