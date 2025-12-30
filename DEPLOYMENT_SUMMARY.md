# Render 部署配置总结

本文档总结了为部署到 Render 平台所做的所有更改。

## 📝 创建的配置文件

### 1. `render.yaml`
Render Blueprint 配置文件，定义了三个服务：
- `healthsync-backend-api`: 后端 API 服务（提供 Supabase keys）
- `healthsync-hybrid-api`: 混合模型 API 服务（AI 诊断）
- `healthsync-frontend`: 前端静态网站服务

### 2. `app/server-static.mjs`
新的静态文件服务器，用于前端服务：
- 提供静态文件（HTML, CSS, JS, 图片等）
- 自动注入 API 配置到 HTML 文件中
- 提供 `/api/config` 端点用于获取 API URLs
- 支持 SPA 路由（所有路由返回 index.html）

### 3. `app/js/api-config.js`
前端 API 配置类：
- 从 `window.API_CONFIG` 读取配置（由服务器注入）
- 或从 `/api/config` 端点获取配置
- 提供 `getBackendApiUrl()` 和 `getHybridApiUrl()` 方法

### 4. `.renderignore`
Render 部署时忽略的文件和目录

### 5. `RENDER_DEPLOY.md`
详细的部署指南和故障排查文档

### 6. `RENDER_QUICK_START.md`
快速开始指南

## 🔧 修改的文件

### 1. `app/server.mjs`
- 修改端口从硬编码 `5001` 改为 `process.env.PORT || 5001`
- 支持 Render 自动设置的 PORT 环境变量

### 2. `app/hybrid-api.js`
- 修改端口从硬编码 `8000` 改为 `process.env.PORT || 8000`
- 支持 Render 自动设置的 PORT 环境变量

### 3. `app/js/hybrid-model.js`
- 更新 API URL 使用动态配置
- 使用 `window.apiConfig.getHybridApiUrl()` 替代硬编码的 `localhost:8000`

### 4. `app/js/main.js`
- 更新 Supabase keys 端点使用动态配置
- 使用 `window.apiConfig.getSupabaseKeysUrl()` 替代硬编码的 URL

## 🚀 部署流程

1. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **在 Render 中创建 Blueprint**
   - 登录 Render Dashboard
   - 点击 "New +" → "Blueprint"
   - 连接 GitHub 仓库
   - Render 会自动检测 `render.yaml`

3. **配置环境变量**
   - 在 `healthsync-backend-api` 服务中添加：
     - `SUPABASE_URL`
     - `SUPABASE_KEY`

4. **访问服务**
   - Frontend: `https://healthsync-frontend.onrender.com`
   - Backend API: `https://healthsync-backend-api.onrender.com`
   - Hybrid API: `https://healthsync-hybrid-api.onrender.com`

## 🔑 环境变量

### Backend API 服务
- `SUPABASE_URL`: Supabase 项目 URL
- `SUPABASE_KEY`: Supabase anon key
- `PORT`: 自动设置（Render）

### Hybrid API 服务
- `PORT`: 自动设置（Render）

### Frontend 服务
- `BACKEND_API_URL`: 自动从 backend-api 服务获取（Render）
- `HYBRID_API_URL`: 自动从 hybrid-api 服务获取（Render）
- `PORT`: 自动设置（Render）

## ⚠️ 注意事项

1. **免费层限制**: Render 免费层服务会在 15 分钟无活动后休眠
2. **环境变量**: 敏感信息应通过 Render Dashboard 设置，不要提交到代码仓库
3. **CORS**: 所有 API 服务都已配置 CORS，允许跨域请求
4. **API URL 注入**: 前端 HTML 文件会在服务器端自动注入 API 配置，无需手动修改 HTML

## 🐛 故障排查

如果遇到问题，请查看 `RENDER_DEPLOY.md` 中的详细故障排查指南。

常见问题：
- 构建失败：检查 Node.js 版本和依赖
- 服务无法启动：检查端口配置和启动命令
- API 连接失败：检查环境变量和 CORS 配置
- CORS 错误：确保所有服务都配置了 CORS

