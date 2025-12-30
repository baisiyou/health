# 修复 Render 部署错误：找不到 package.json

## 🔴 错误信息
```
npm error path /opt/render/project/src/package.json
npm error enoent Could not read package.json
```

## ✅ 解决方案

### 方案 1: 如果使用 Blueprint（推荐）

如果使用 Blueprint 部署，`rootDir: app` 应该已经配置好了。请检查：

1. **确认 render.yaml 在仓库根目录**
2. **重新部署 Blueprint**：
   - 在 Render Dashboard 中删除现有的服务
   - 重新创建 Blueprint
   - 确保选择了正确的仓库和分支

### 方案 2: 如果手动创建服务

在 Render Dashboard 中，对于每个服务：

1. 进入服务设置页面
2. 找到 **"Root Directory"** 字段
3. 设置为：`app`（不要带斜杠）
4. 保存更改
5. 手动触发重新部署

### 方案 3: 修改 Build Command（临时方案）

如果 Root Directory 设置不生效，可以修改 Build Command：

**修改前**：
```
npm install
```

**修改后**：
```
cd app && npm install
```

对应的 Start Command 也需要修改：

**Backend API**:
```
cd app && node server.mjs
```

**Hybrid API**:
```
cd app && node hybrid-api.js
```

**Frontend**:
```
cd app && node server-static.mjs
```

⚠️ **注意**：这不是推荐方案，最好使用 Root Directory 配置。

### 方案 4: 更新 render.yaml（如果需要）

如果方案 3 更可靠，我可以更新 render.yaml 文件使用 `cd app &&` 前缀。

## 🔍 验证步骤

1. 检查 Render Dashboard 中服务的 Root Directory 设置
2. 查看服务的 Build 日志，确认在哪个目录执行命令
3. 确保 `app/package.json` 文件存在于仓库中

