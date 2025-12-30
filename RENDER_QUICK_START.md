# Render 快速部署指南

## 🚀 快速开始

### 1. 准备工作

确保你已经：
- ✅ 将代码推送到 GitHub
- ✅ 在 Render 注册账号
- ✅ 准备好 Supabase 凭证

### 2. 一键部署（使用 Blueprint）

1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 点击 "New +" → "Blueprint"
3. 连接你的 GitHub 仓库
4. Render 会自动检测 `render.yaml` 并创建三个服务
5. 在 `healthsync-backend-api` 服务中添加环境变量：
   - `SUPABASE_URL`
   - `SUPABASE_KEY`

### 3. 访问应用

部署完成后：
- 前端: `https://healthsync-frontend.onrender.com`
- Backend API: `https://healthsync-backend-api.onrender.com`  
- Hybrid API: `https://healthsync-hybrid-api.onrender.com`

## ⚠️ 重要提示

1. **免费层限制**: 免费服务会在15分钟无活动后休眠，首次访问需要几秒唤醒
2. **环境变量**: 记得在 Backend API 服务中设置 Supabase 凭证
3. **CORS**: 确保所有服务允许跨域请求（代码中已配置）

## 📖 详细文档

查看 [RENDER_DEPLOY.md](./RENDER_DEPLOY.md) 了解详细的部署说明和故障排查。

