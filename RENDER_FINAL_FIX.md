# Render 部署最终修复方案

## 🔴 问题
启动命令找不到 server.mjs 文件，因为 npm scripts 没有正确切换目录。

## ✅ 解决方案

已在 `package.json` 中修复 npm scripts，使用 `sh -c` 确保正确执行目录切换。

### 当前配置

**package.json**:
```json
{
  "scripts": {
    "postinstall": "cd app && npm install",
    "start:backend": "sh -c 'cd app && node server.mjs'",
    "start:hybrid": "sh -c 'cd app && node hybrid-api.js'",
    "start:frontend": "sh -c 'cd app && node server-static.mjs'"
  }
}
```

**render.yaml**:
```yaml
buildCommand: npm install
startCommand: npm run start:backend  # (或 start:hybrid, start:frontend)
```

## 🔄 如果还有问题

### 备选方案：直接在 render.yaml 中使用命令

如果 npm scripts 仍然不工作，可以在 render.yaml 中直接使用命令：

```yaml
buildCommand: npm install
startCommand: sh -c 'cd app && node server.mjs'
```

需要我更新 render.yaml 使用这种方式吗？

