# Render 部署指南

本文档说明如何将 HealthSync AI 项目部署到 Render 平台。

## 📋 前置要求

1. **Render 账号**: 在 [render.com](https://render.com) 注册账号
2. **GitHub 仓库**: 将代码推送到 GitHub
3. **环境变量**: 准备 Supabase 凭证

## 🚀 部署步骤

### 方法一：使用 render.yaml 自动部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **在 Render 中创建 Blueprint**
   - 登录 Render Dashboard
   - 点击 "New +" -> "Blueprint"
   - 连接你的 GitHub 仓库
   - Render 会自动检测 `render.yaml` 文件
   - 点击 "Apply" 创建所有服务

3. **配置环境变量**
   
   对于 `healthsync-backend-api` 服务，添加以下环境变量：
   - `SUPABASE_URL`: https://hzcvnaqracbehsviqvoj.supabase.co
   - `SUPABASE_KEY`: sb_publishable_cxoW7ilKVMNyJ_W5TV8c7Q_4r9suXUD
   
   可以在 Render Dashboard 的每个服务的 "Environment" 标签页中配置。

### 方法二：手动创建服务

如果自动部署不工作，可以手动创建三个服务：

#### 1. Backend API 服务

- **类型**: Web Service
- **名称**: `healthsync-backend-api`
- **环境**: Node
- **根目录**: `app`
- **构建命令**: `npm install`
- **启动命令**: `node server.mjs`
- **环境变量**:
  - `SUPABASE_URL`: (你的 Supabase URL)
  - `SUPABASE_KEY`: (你的 Supabase Key)

#### 2. Hybrid Model API 服务

- **类型**: Web Service
- **名称**: `healthsync-hybrid-api`
- **环境**: Node
- **根目录**: `app`
- **构建命令**: `npm install`
- **启动命令**: `node hybrid-api.js`

#### 3. Frontend 服务

- **类型**: Web Service
- **名称**: `healthsync-frontend`
- **环境**: Node
- **根目录**: `app`
- **构建命令**: `npm install`
- **启动命令**: `node server-static.mjs`
- **环境变量** (在服务创建后设置):
  - `BACKEND_API_URL`: 从 `healthsync-backend-api` 服务获取 (使用 "Add from Service" 功能)
  - `HYBRID_API_URL`: 从 `healthsync-hybrid-api` 服务获取 (使用 "Add from Service" 功能)

## 🔧 环境变量配置

### Backend API 服务需要的环境变量：

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

### Frontend 服务自动配置：

Frontend 服务会自动从其他服务获取 URL，无需手动配置。但如果自动配置失败，可以手动设置：

```
BACKEND_API_URL=https://healthsync-backend-api.onrender.com
HYBRID_API_URL=https://healthsync-hybrid-api.onrender.com
```

## 🌐 访问服务

部署完成后，每个服务都会有一个 URL：

- **Frontend**: `https://healthsync-frontend.onrender.com`
- **Backend API**: `https://healthsync-backend-api.onrender.com`
- **Hybrid API**: `https://healthsync-hybrid-api.onrender.com`

## 🔍 故障排查

### 1. 构建失败

- 检查 Node.js 版本是否兼容
- 查看构建日志中的错误信息
- 确保所有依赖都在 `package.json` 中

### 2. 服务无法启动

- 检查启动命令是否正确
- 确认端口使用 `process.env.PORT`（Render 会自动设置）
- 查看服务日志

### 3. API 连接失败

- 确认环境变量 `BACKEND_API_URL` 和 `HYBRID_API_URL` 已正确设置
- 检查前端服务日志中的 API URL
- 使用浏览器开发者工具查看网络请求

### 4. CORS 错误

确保所有 API 服务都设置了 CORS：

```javascript
app.use(cors());
```

## 📝 注意事项

1. **免费层限制**: Render 免费层服务会在 15 分钟无活动后休眠，首次访问会需要几秒钟唤醒
2. **环境变量**: 敏感信息（如 Supabase keys）应通过环境变量设置，不要提交到代码仓库
3. **端口**: Render 会自动设置 `PORT` 环境变量，代码中应使用 `process.env.PORT`
4. **静态文件**: 前端使用 Express 提供静态文件，并注入 API 配置

## 🔄 更新部署

代码更新后：

1. 推送更改到 GitHub
2. Render 会自动检测并重新部署（如果启用了 Auto-Deploy）
3. 或手动在 Render Dashboard 中点击 "Manual Deploy"

## 📚 相关文档

- [Render 文档](https://render.com/docs)
- [Render Blueprint 文档](https://render.com/docs/blueprint-spec)
- [项目 README](./README.md)

