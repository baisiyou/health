# 检查已部署的服务

## 🌐 已知已部署的服务

根据你提供的 URL，**Frontend 服务**已经部署：
- **URL**: https://health-ihri.onrender.com
- **服务名**: `healthsync-frontend` 或类似名称

## 📋 完整的服务列表

你的应用需要**三个服务**：

### 1. Backend API 服务
- **服务名**: `healthsync-backend-api` 或类似
- **URL**: `https://[服务名].onrender.com`
- **测试端点**: `/keys`
- **Start Command**: `./start-backend.sh`
- **状态**: ❓ 需要检查

### 2. Hybrid Model API 服务
- **服务名**: `healthsync-hybrid-api` 或类似
- **URL**: `https://[服务名].onrender.com`
- **测试端点**: `/health`
- **Start Command**: `./start-hybrid.sh`
- **状态**: ❓ 需要检查

### 3. Frontend 服务 ✅
- **服务名**: `healthsync-frontend` 或类似
- **URL**: https://health-ihri.onrender.com
- **Start Command**: `./start-frontend.sh`
- **状态**: ✅ 已部署

## 🔍 如何检查已部署的服务

### 方法 1: 在 Render Dashboard 中查看

1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 在 Dashboard 主页，你会看到所有已部署的服务列表
3. 查找以下服务名：
   - `healthsync-backend-api` 或包含 "backend" 的服务
   - `healthsync-hybrid-api` 或包含 "hybrid" 的服务
   - `healthsync-frontend` 或包含 "frontend" 的服务（这个你已经有了）

### 方法 2: 通过测试端点检查

#### 测试 Backend API
```bash
# 替换 [your-backend-url] 为实际的服务 URL
curl https://[your-backend-url].onrender.com/keys
```

如果返回 JSON 格式的 Supabase 配置，说明服务已部署。

#### 测试 Hybrid Model API
```bash
# 替换 [your-hybrid-url] 为实际的服务 URL
curl https://[your-hybrid-url].onrender.com/health
```

如果返回健康检查信息，说明服务已部署。

### 方法 3: 检查服务状态

在 Render Dashboard 中，每个服务会显示：
- **状态**: Live（运行中）、Building（构建中）、Failed（失败）等
- **URL**: 服务的访问地址
- **最后更新**: 部署时间

## ✅ 检查清单

请检查以下项目：

- [ ] **Frontend 服务** - ✅ 已部署（https://health-ihri.onrender.com）
- [ ] **Backend API 服务** - ❓ 需要检查
- [ ] **Hybrid Model API 服务** - ❓ 需要检查

## 🚀 如果缺少服务

如果发现缺少某个服务，需要创建它：

1. 在 Render Dashboard 点击 **"New +"** → **"Web Service"**
2. 连接 GitHub 仓库
3. 配置：
   - **Build Command**: `npm install`
   - **Start Command**: 
     - Backend API: `./start-backend.sh`
     - Hybrid API: `./start-hybrid.sh`
4. 对于 Backend API，记得添加环境变量：
   - `SUPABASE_URL`
   - `SUPABASE_KEY`

## 📝 快速检查命令

你可以告诉我 Render Dashboard 中显示了哪些服务，我可以帮你确认哪些已部署，哪些还需要部署。

