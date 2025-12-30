# Render 部署检查清单

## ✅ 部署前准备

### 1. 代码准备
- [x] `render.yaml` 配置文件已创建
- [x] `.gitignore` 已配置（排除 node_modules 等）
- [x] 所有代码更改已提交到 Git
- [x] 代码已推送到 GitHub

### 2. Render 账号准备
- [ ] 在 [render.com](https://render.com) 注册账号
- [ ] GitHub 账号已连接到 Render

### 3. Supabase 配置（如需要）
- [ ] Supabase 项目已创建
- [ ] 已获取 SUPABASE_URL
- [ ] 已获取 SUPABASE_KEY (anon key)

## 🚀 部署步骤

### 步骤 1: 提交并推送代码

```bash
# 检查更改
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "Add Render deployment configuration and updates"

# 推送到 GitHub
git push origin main
```

### 步骤 2: 在 Render 中创建 Blueprint

1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 点击右上角 **"New +"** 按钮
3. 选择 **"Blueprint"**
4. 连接你的 GitHub 账号（如果还没有连接）
5. 选择包含此项目的仓库
6. Render 会自动检测 `render.yaml` 文件
7. 点击 **"Apply"** 创建所有服务

### 步骤 3: 配置环境变量

部署完成后，需要在 `healthsync-backend-api` 服务中配置环境变量：

1. 在 Render Dashboard 中找到 `healthsync-backend-api` 服务
2. 点击服务名称进入详情页
3. 点击左侧菜单中的 **"Environment"**
4. 添加以下环境变量：
   - **Key**: `SUPABASE_URL`
     **Value**: `https://your-project.supabase.co`
   - **Key**: `SUPABASE_KEY`
     **Value**: `your-supabase-anon-key`
5. 点击 **"Save Changes"**

### 步骤 4: 等待部署完成

- 三个服务将自动构建和部署
- 通常需要 5-10 分钟
- 可以在每个服务的 "Events" 标签页查看部署日志

### 步骤 5: 验证部署

部署完成后，每个服务会有一个 URL：

- **Frontend**: `https://healthsync-frontend.onrender.com`
- **Backend API**: `https://healthsync-backend-api.onrender.com`
- **Hybrid API**: `https://healthsync-hybrid-api.onrender.com`

测试访问：
```bash
# 测试前端
curl https://healthsync-frontend.onrender.com

# 测试后端 API
curl https://healthsync-backend-api.onrender.com/keys

# 测试混合模型 API
curl https://healthsync-hybrid-api.onrender.com/health
```

## 🔧 后续配置（可选）

### 自定义域名
- 在服务设置中可以配置自定义域名
- 需要在 DNS 中添加 CNAME 记录

### 环境变量更新
- 可以在 Render Dashboard 的 Environment 标签页中随时更新
- 更新后服务会自动重启

### 监控和日志
- 在服务的 "Logs" 标签页查看实时日志
- 在 "Metrics" 标签页查看性能指标

## ⚠️ 注意事项

1. **免费层限制**:
   - 免费服务会在 15 分钟无活动后休眠
   - 首次访问需要几秒钟唤醒时间
   - 每月有使用时间限制

2. **环境变量安全性**:
   - 敏感信息应通过环境变量配置
   - 不要在代码中硬编码密钥

3. **API URL 配置**:
   - Frontend 服务会自动从其他服务获取 URL
   - 如果自动配置失败，可以手动设置 `BACKEND_API_URL` 和 `HYBRID_API_URL`

## 🆘 遇到问题？

查看 [RENDER_DEPLOY.md](./RENDER_DEPLOY.md) 了解详细的故障排查指南。

