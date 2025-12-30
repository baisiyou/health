# Render 服务部署完整指南

## 📋 需要部署的三个服务

你的应用由三个独立的服务组成，**都需要部署**才能完整运行：

### 1. Backend API 服务 (`healthsync-backend-api`)
- **作用**: 提供 Supabase 配置 keys
- **Start Command**: `./start-backend.sh`
- **端点**: `/keys`
- **必需**: ✅ 是（前端需要从这里获取 Supabase 配置）

### 2. Hybrid Model API 服务 (`healthsync-hybrid-api`)
- **作用**: AI 诊断功能（ClinicalBERT + XGBoost + RAG）
- **Start Command**: `./start-hybrid.sh`
- **端点**: `/health`, `/analyze`
- **必需**: ✅ 是（AI 诊断功能需要这个服务）

### 3. Frontend 服务 (`healthsync-frontend`)
- **作用**: 前端网站（用户界面）
- **Start Command**: `./start-frontend.sh`
- **URL**: https://health-ihri.onrender.com
- **必需**: ✅ 是（用户访问的界面）

## 🔄 服务之间的依赖关系

```
Frontend (用户访问)
  ↓
  ├──→ Backend API (获取 Supabase keys)
  └──→ Hybrid Model API (AI 诊断功能)
```

## ✅ 部署检查清单

- [ ] Backend API 服务已部署
  - Start Command: `./start-backend.sh`
  - 环境变量: `SUPABASE_URL`, `SUPABASE_KEY`
  
- [ ] Hybrid Model API 服务已部署
  - Start Command: `./start-hybrid.sh`
  
- [ ] Frontend 服务已部署 ✅
  - Start Command: `./start-frontend.sh`
  - URL: https://health-ihri.onrender.com

## 🚀 部署步骤

### 在 Render Dashboard 中：

#### 如果使用 Blueprint：
- Blueprint 会自动创建所有三个服务
- 确保所有服务都已部署并运行

#### 如果手动创建：

1. **Backend API 服务**:
   - 点击 "New +" → "Web Service"
   - 连接 GitHub 仓库
   - Root Directory: 留空
   - Build Command: `npm install`
   - Start Command: `./start-backend.sh`
   - 添加环境变量: `SUPABASE_URL`, `SUPABASE_KEY`

2. **Hybrid Model API 服务**:
   - 点击 "New +" → "Web Service"
   - 连接 GitHub 仓库
   - Root Directory: 留空
   - Build Command: `npm install`
   - Start Command: `./start-hybrid.sh`

3. **Frontend 服务** (已部署):
   - Start Command: `./start-frontend.sh` ✅

## 🔍 验证服务是否运行

### 检查 Backend API
```bash
curl https://[your-backend-api-url].onrender.com/keys
```
应该返回 JSON 格式的 Supabase 配置。

### 检查 Hybrid Model API
```bash
curl https://[your-hybrid-api-url].onrender.com/health
```
应该返回健康检查信息。

### 检查 Frontend
访问：https://health-ihri.onrender.com
应该能看到首页。

## ⚠️ 重要提示

1. **所有三个服务都需要运行**，系统才能完整工作
2. **Frontend 服务会自动从其他服务获取 URL**（通过环境变量配置）
3. 如果缺少任何一个服务，相关功能将无法使用

