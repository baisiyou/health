# 本地运行指南

## 🚀 快速启动

### 方法一：使用启动脚本（推荐用于开发）

```bash
# 1. 安装依赖（首次运行）
cd app && npm install && cd ..

# 2. 启动所有服务
chmod +x start_hybrid_system.sh
./start_hybrid_system.sh
```

### 方法二：手动启动（使用新的 server-static.mjs）

```bash
# 1. 安装依赖
cd app && npm install

# 2. 在三个终端窗口中分别运行：

# 终端1: Backend API
cd app && node server.mjs

# 终端2: Hybrid Model API  
cd app && node hybrid-api.js

# 终端3: Frontend Server
cd app && node server-static.mjs
```

### 方法三：后台运行（适合快速测试）

```bash
# 启动所有服务到后台
cd app
node server.mjs &
node hybrid-api.js &
node server-static.mjs &
```

## 📱 访问地址

启动成功后，可以访问：

- **前端应用**: http://localhost:8080
- **Backend API**: http://localhost:5001/keys
- **Hybrid Model API**: http://localhost:8000/health
- **患者注册**: http://localhost:8080/html/registration.html
- **临床诊断**: http://localhost:8080/clinical-diagnosis.html

## ⚙️ 环境变量配置

如果需要使用 Supabase 功能，需要在 `app/keys.env` 文件中配置：

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

或者在运行 Backend API 时设置环境变量：

```bash
SUPABASE_URL=your_url SUPABASE_KEY=your_key node server.mjs
```

## 🔍 检查服务状态

```bash
# 检查端口占用
lsof -ti:5001,8000,8080

# 测试 API 端点
curl http://localhost:5001/keys
curl http://localhost:8000/health
curl http://localhost:8080/
```

## 🛑 停止服务

```bash
# 使用停止脚本
./stop_hybrid_system.sh

# 或手动停止
lsof -ti:5001 | xargs kill -9
lsof -ti:8000 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

## 📝 注意事项

1. **端口占用**: 确保端口 5001、8000、8080 未被占用
2. **依赖安装**: 首次运行需要执行 `npm install` 安装依赖
3. **环境变量**: Backend API 需要 Supabase 配置才能完整工作
4. **前端服务器**: 新版本使用 `server-static.mjs`，会自动注入 API 配置

## 🐛 故障排查

### 服务无法启动
- 检查端口是否被占用：`lsof -ti:端口号`
- 检查 Node.js 版本：`node --version` (需要 Node.js 14+)
- 检查依赖是否安装：`ls app/node_modules`

### API 连接失败
- 检查服务是否正常运行：`curl http://localhost:端口/health`
- 检查浏览器控制台的错误信息
- 确认 API URL 配置正确

### 前端页面无法加载
- 检查前端服务器是否运行：`curl http://localhost:8080`
- 检查浏览器控制台的网络请求
- 确认静态文件路径正确

