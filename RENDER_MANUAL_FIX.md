# Render 部署 - 手动修复指南

## ⚠️ 重要提示

如果 Render 仍然显示旧错误（直接运行 `node server.mjs`），说明 Render 还没有使用最新的 `render.yaml` 配置。

## ✅ 立即解决方案：在 Render Dashboard 中手动更新

### 步骤 1: 进入服务设置

1. 登录 Render Dashboard
2. 找到你的服务（如 `healthsync-backend-api`）
3. 点击服务名称进入详情页
4. 点击左侧的 **"Settings"** 标签

### 步骤 2: 更新 Build Command

在 **"Build Command"** 字段中输入：
```
npm install
```

### 步骤 3: 更新 Start Command

在 **"Start Command"** 字段中输入（根据服务选择对应的命令）：

**Backend API 服务**:
```
sh -c 'cd app && node server.mjs'
```

**Hybrid API 服务**:
```
sh -c 'cd app && node hybrid-api.js'
```

**Frontend 服务**:
```
sh -c 'cd app && node server-static.mjs'
```

### 步骤 4: 检查 Root Directory

确保 **"Root Directory"** 字段是**空的**（不要填任何内容）

### 步骤 5: 保存并重新部署

1. 点击 **"Save Changes"**
2. 点击 **"Manual Deploy"** 或等待自动部署
3. 选择最新的 commit

## 🔍 验证配置

在保存之前，确认：
- ✅ Build Command: `npm install`
- ✅ Start Command: `sh -c 'cd app && node server.mjs'` (或对应的文件)
- ✅ Root Directory: 空

## 📝 为什么需要手动更新？

如果使用 Blueprint：
- Render 可能缓存了旧的配置
- 需要删除服务并重新创建 Blueprint
- 或者手动更新每个服务的命令

如果手动创建服务：
- 需要手动更新命令
- render.yaml 只对 Blueprint 生效

