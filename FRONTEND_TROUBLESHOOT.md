# Frontend 服务故障排查

## 🔴 问题
访问 https://health-ihri.onrender.com/ 返回 "Cannot GET /"

## 🔍 可能的原因

1. **服务器没有正确启动**
2. **文件路径问题** - index.html 找不到
3. **路由配置问题**
4. **启动脚本执行问题**

## ✅ 解决步骤

### 步骤 1: 检查 Render 日志

1. 在 Render Dashboard 中进入 Frontend 服务
2. 点击 **"Logs"** 标签
3. 查看启动日志，应该看到：
   ```
   Frontend server running on port XXXX
   __dirname: /opt/render/project/src/app
   index.html exists: true/false
   ```

### 步骤 2: 检查启动命令

在 Render Dashboard 中，确认 Frontend 服务的：
- **Start Command**: `./start-frontend.sh`
- **Build Command**: `npm install`
- **Root Directory**: 留空

### 步骤 3: 如果文件不存在

如果日志显示 `index.html exists: false`，可能是：
- 文件没有正确部署
- 路径问题

### 步骤 4: 临时解决方案

如果问题持续，可以尝试修改 Start Command 为：

```
cd app && pwd && ls -la && node server-static.mjs
```

这样可以查看实际的工作目录和文件列表。

## 📝 请提供的信息

请查看 Render Dashboard 中 Frontend 服务的日志，并告诉我：
1. 服务器是否成功启动？
2. `__dirname` 的值是什么？
3. `index.html exists` 是 true 还是 false？
4. 有任何错误信息吗？

