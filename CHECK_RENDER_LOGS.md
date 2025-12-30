# 如何检查 Render 日志来诊断问题

## 🔍 查看 Frontend 服务日志

### 步骤：

1. **登录 Render Dashboard**: https://dashboard.render.com
2. **找到 Frontend 服务**: 点击服务名称（如 `health-ihri`）
3. **点击 "Logs" 标签**: 查看实时日志
4. **查找以下信息**:

### 应该看到的日志：

#### 启动成功时：
```
Frontend server running on port XXXX
Backend API URL: https://...
Hybrid API URL: https://...
__dirname: /opt/render/project/src/app
index.html exists: true
Current directory files: [ 'index.html', 'server-static.mjs', ... ]
```

#### 如果文件不存在：
```
__dirname: /opt/render/project/src/app
index.html exists: false
```

#### 如果启动失败：
```
Error: Cannot find module...
或
Error: ENOENT: no such file...
```

## 🔧 根据日志诊断

### 情况 1: 服务器没有启动
- **症状**: 没有看到 "Frontend server running" 消息
- **解决**: 检查启动命令是否正确

### 情况 2: index.html 不存在
- **症状**: `index.html exists: false`
- **解决**: 检查文件是否在正确位置，可能需要重新部署

### 情况 3: 路径错误
- **症状**: `__dirname` 指向错误的目录
- **解决**: 检查启动脚本是否正确切换目录

## 📝 请提供的信息

请查看 Render 日志并告诉我：
1. 是否看到 "Frontend server running" 消息？
2. `__dirname` 的值是什么？
3. `index.html exists` 是 true 还是 false？
4. 有任何错误信息吗？

这样我可以更准确地帮你解决问题。

