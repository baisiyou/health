# 修复 Render Frontend 服务 - 完整指南

## 🔴 问题
访问 https://health-ihri.onrender.com/ 返回 "Cannot GET /"

## ✅ 解决方案

### 步骤 1: 在 Render Dashboard 中更新 Start Command

1. **进入 Frontend 服务设置**
   - 登录 Render Dashboard
   - 找到 Frontend 服务（如 `health-ihri`）
   - 点击服务名称进入详情页
   - 点击左侧 **"Settings"** 标签

2. **更新 Start Command**
   
   找到 **"Start Command"** 字段，更新为以下命令：

   ```
   cd app && node server-static.mjs
   ```

   或者如果上面不行，尝试：

   ```
   bash -c 'cd app && node server-static.mjs'
   ```

3. **确认其他设置**
   - **Build Command**: `npm install`
   - **Root Directory**: 留空（不要填任何内容）

4. **保存并重新部署**
   - 点击 **"Save Changes"**
   - 点击 **"Manual Deploy"** 或等待自动部署

### 步骤 2: 检查 Render 日志

部署后，查看日志：

1. 点击 **"Logs"** 标签
2. 查找以下信息：

**应该看到的日志**：
```
Current working directory: /opt/render/project/src/app
Checking for index.html...
-rw-r--r-- ... index.html
Starting server...
Frontend server running on port XXXX
__dirname: /opt/render/project/src/app
index.html exists: true
```

**如果有错误**：
- 查看具体的错误信息
- 检查文件路径是否正确
- 确认 index.html 是否存在

### 步骤 3: 验证部署

部署成功后，访问：
- https://health-ihri.onrender.com
- 应该能看到 HealthSync AI 首页

## 🔍 如果仍然有问题

### 检查清单：

- [ ] Start Command 已更新为 `cd app && node server-static.mjs`
- [ ] Build Command 是 `npm install`
- [ ] Root Directory 是空的
- [ ] 服务已重新部署
- [ ] 查看日志确认服务器启动成功
- [ ] 确认 `index.html exists: true` 在日志中

### 如果文件不存在：

如果日志显示 `index.html exists: false`，可能是：
1. 文件没有正确部署
2. 需要重新推送代码到 GitHub
3. 需要清除构建缓存并重新部署

## 📝 请提供的信息

如果问题仍然存在，请告诉我 Render 日志中显示的信息：
1. 服务器是否启动成功？
2. `__dirname` 的值是什么？
3. `index.html exists` 是 true 还是 false？
4. 有任何错误信息吗？

