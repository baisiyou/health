# Render 部署错误修复：找不到 package.json

## 错误原因

错误信息显示：
```
npm error path /opt/render/project/src/package.json
npm error enoent Could not read package.json
```

这是因为 Render 在错误的目录下查找 `package.json` 文件。

## 解决方案

### 方案 1: 检查 render.yaml 配置（推荐）

确保 `render.yaml` 中的 `rootDir` 正确设置为 `app`：

```yaml
services:
  - type: web
    name: healthsync-backend-api
    env: node
    rootDir: app          # 确保这行存在
    buildCommand: npm install
    startCommand: node server.mjs
```

### 方案 2: 如果使用 Blueprint

如果使用 Blueprint 部署，确保：
1. `render.yaml` 文件在仓库根目录
2. `rootDir: app` 在每个服务配置中

### 方案 3: 如果手动创建服务

在 Render Dashboard 中手动创建服务时：

1. 在服务设置中找到 **"Root Directory"** 字段
2. 设置为：`app`
3. Build Command: `npm install`
4. Start Command: `node server.mjs` (或对应的文件)

### 方案 4: 修改 Build Command（临时方案）

如果 Root Directory 无法正确设置，可以修改 Build Command：

```
cd app && npm install
```

对应的 Start Command 也需要修改：
```
cd app && node server.mjs
```

但这不是推荐方案，最好使用 rootDir 配置。

## 验证步骤

1. 检查 `render.yaml` 文件中每个服务都有 `rootDir: app`
2. 如果使用 Blueprint，重新部署服务
3. 如果手动创建，删除服务并重新创建，确保 Root Directory 设置为 `app`

