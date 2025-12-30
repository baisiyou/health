# Frontend 服务快速修复

## 🔴 当前问题
访问 https://health-ihri.onrender.com/ 返回 "Cannot GET /"

## ✅ 立即解决方案

### 方法 1: 在 Render Dashboard 中更新 Start Command

1. 进入 Frontend 服务设置
2. 找到 **"Start Command"** 字段
3. 更新为以下命令之一：

**选项 A**（推荐）:
```
cd app && pwd && ls -la index.html && node server-static.mjs
```

**选项 B**:
```
bash -c 'cd app && node server-static.mjs'
```

**选项 C**（如果上面都不行）:
```
cd /opt/render/project/src/app && node server-static.mjs
```

4. 保存并重新部署

### 方法 2: 检查 Render 日志

在 Render Dashboard 中：
1. 进入 Frontend 服务
2. 点击 **"Logs"** 标签
3. 查看启动日志，寻找：
   - 服务器是否启动成功
   - `__dirname` 的值
   - `index.html exists` 的值
   - 任何错误信息

### 方法 3: 验证文件部署

确认 `app/index.html` 文件已正确推送到 GitHub：
- 访问: https://github.com/baisiyou/health/blob/main/app/index.html
- 确认文件存在

## 🔍 诊断步骤

请告诉我 Render 日志中显示的信息，特别是：
1. 服务器启动消息
2. `__dirname` 的值
3. `index.html exists` 的值

这样我可以提供更精确的解决方案。

