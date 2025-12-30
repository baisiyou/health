# Render Build Command 和 Start Command 说明

## 📋 三个服务的命令配置

### 1. Backend API 服务 (`healthsync-backend-api`)

```yaml
buildCommand: npm install
startCommand: node server.mjs
```

**说明**:
- **Build Command**: `npm install` - 安装所有 Node.js 依赖包（从 package.json）
- **Start Command**: `node server.mjs` - 启动后端 API 服务器（Express 服务器，提供 Supabase keys）

### 2. Hybrid Model API 服务 (`healthsync-hybrid-api`)

```yaml
buildCommand: npm install
startCommand: node hybrid-api.js
```

**说明**:
- **Build Command**: `npm install` - 安装所有 Node.js 依赖包
- **Start Command**: `node hybrid-api.js` - 启动混合模型 API 服务器（AI 诊断服务）

### 3. Frontend 服务 (`healthsync-frontend`)

```yaml
buildCommand: npm install
startCommand: node server-static.mjs
```

**说明**:
- **Build Command**: `npm install` - 安装所有 Node.js 依赖包
- **Start Command**: `node server-static.mjs` - 启动前端静态文件服务器（Express 服务器，提供静态文件并注入 API 配置）

## 🔍 命令详解

### Build Command (`npm install`)

**作用**: 
- 读取 `app/package.json` 文件
- 下载并安装所有列出的依赖包到 `node_modules/` 目录
- 生成 `package-lock.json` 锁定版本

**为什么需要**:
- 确保服务器上有运行代码所需的所有依赖
- 包括 Express、CORS、Supabase 客户端等

### Start Command

**Backend API**: `node server.mjs`
- 启动 Express 服务器
- 监听 Render 自动分配的端口（通过 `process.env.PORT`）
- 提供 `/keys` 端点返回 Supabase 配置

**Hybrid API**: `node hybrid-api.js`
- 启动混合模型 API 服务器
- 监听 Render 自动分配的端口
- 提供 `/health` 和 `/analyze` 端点

**Frontend**: `node server-static.mjs`
- 启动静态文件服务器
- 提供 HTML、CSS、JS 等静态文件
- 自动注入 API URL 配置到 HTML 中
- 监听 Render 自动分配的端口

## ⚙️ 工作目录 (rootDir)

所有服务都使用 `rootDir: app`，这意味着：
- Build Command 在 `app/` 目录下执行
- Start Command 也在 `app/` 目录下执行
- 所有路径都是相对于 `app/` 目录的

## 🔄 部署流程

1. **构建阶段** (Build Command):
   ```
   cd app
   npm install
   ```
   这个阶段会：
   - 安装所有依赖
   - 通常需要 1-2 分钟

2. **启动阶段** (Start Command):
   ```
   cd app
   node [server-file]
   ```
   这个阶段会：
   - 启动 Node.js 服务器
   - 监听端口（Render 自动设置 PORT 环境变量）
   - 服务开始运行

## 📝 注意事项

1. **端口配置**: 
   - Render 会自动设置 `PORT` 环境变量
   - 代码中使用 `process.env.PORT || defaultPort` 来获取端口
   - 不需要在命令中指定端口

2. **环境变量**:
   - 在 Render Dashboard 的 Environment 标签中配置
   - Build Command 阶段可以使用环境变量
   - Start Command 运行时可以使用环境变量

3. **日志查看**:
   - Build 日志：在服务的 "Events" 标签页查看
   - Runtime 日志：在服务的 "Logs" 标签页查看

## ✅ 验证命令是否正确

如果部署失败，检查：

1. **Build Command 错误**:
   - 检查 `app/package.json` 是否存在
   - 检查依赖是否在 package.json 中正确声明
   - 查看 Build 日志中的错误信息

2. **Start Command 错误**:
   - 检查服务器文件是否存在（server.mjs, hybrid-api.js, server-static.mjs）
   - 检查文件是否有语法错误
   - 查看 Runtime 日志中的错误信息

3. **端口错误**:
   - 确保代码使用 `process.env.PORT` 而不是硬编码端口
   - 检查服务器是否成功启动并监听端口

