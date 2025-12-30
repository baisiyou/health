# 已部署的服务 URL

## 🌐 服务 URL 列表

### Frontend 服务
- **URL**: https://health-ihri.onrender.com
- **状态**: ✅ 已部署

### 服务 2
- **URL**: https://health-1-3gn7.onrender.com
- **类型**: 待确认（可能是 Backend API 或 Hybrid API）
- **状态**: ✅ 已部署

## 🔍 服务识别

### 如何识别服务类型：

#### Backend API 服务
- 测试端点: `/keys`
- 应该返回: `{"SUPABASE_URL":"...","SUPABASE_KEY":"..."}`

#### Hybrid Model API 服务
- 测试端点: `/health`
- 应该返回: `{"status":"healthy",...}`

#### Frontend 服务
- 访问根路径 `/` 应该返回 HTML 页面

## 📝 测试命令

### 测试 Backend API
```bash
curl https://health-1-3gn7.onrender.com/keys
```

### 测试 Hybrid API
```bash
curl https://health-1-3gn7.onrender.com/health
```

### 测试 Frontend
```bash
curl https://health-1-3gn7.onrender.com
```

