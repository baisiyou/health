# Render Frontend 服务修复步骤

## 🎯 目标
修复 https://health-ihri.onrender.com/ 无法显示首页的问题

## ✅ 立即执行的步骤

### 步骤 1: 在 Render Dashboard 中更新 Start Command

1. 登录 https://dashboard.render.com
2. 找到 Frontend 服务（`health-ihri` 或类似名称）
3. 点击服务名称 → **"Settings"** 标签
4. 找到 **"Start Command"** 字段
5. **更新为**：
   ```
   ./start-frontend.sh
   ```
   或者直接使用：
   ```
   cd app && node server-static.mjs
   ```
6. 点击 **"Save Changes"**
7. 点击 **"Manual Deploy"** 重新部署

### 步骤 2: 查看部署日志

1. 点击 **"Logs"** 标签
2. 等待部署完成
3. 查找以下关键信息：

**成功启动的标志**：
```
✅ Frontend server running on port XXXX
📁 __dirname: /opt/render/project/src/app
📄 index.html exists: true
✅ index.html found at: /opt/render/project/src/app/index.html
```

**如果看到错误**：
- `index.html exists: false` → 文件路径问题
- `Cannot find module` → 依赖问题
- 其他错误 → 查看具体错误信息

### 步骤 3: 测试访问

部署成功后，访问：
- https://health-ihri.onrender.com
- 应该能看到首页

## 🔍 如果仍然失败

### 备选方案：直接在 Start Command 中使用完整路径

如果启动脚本不工作，尝试：

```
cd /opt/render/project/src/app && node server-static.mjs
```

或者：

```
bash -c 'cd app && pwd && ls -la index.html && node server-static.mjs'
```

## 📝 需要的信息

如果问题仍然存在，请提供 Render 日志中的：
1. 启动脚本的输出
2. `__dirname` 的值
3. `index.html exists` 的值
4. 任何错误信息

