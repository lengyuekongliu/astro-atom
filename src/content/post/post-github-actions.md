---
title: 使用 GitHub Actions 自动部署 Astro 项目到 NGINX 服务器
description: "由于本站点使用Astro静态生成，每次发布或更新文章都需要本地打包后传到Nginx上较为繁琐，改用使用GitHub Actions实现Astro自动化部署。"
publishDate: 2025-07-14
tags: ['GitHub Actions']
category: ''
draft: false 
---

## 配置 GitHub Actions

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Astro to NGINX

on:
  push:
    branches:
      - deploy # 当推送到 main 分支时触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment: deploy # GitHub Actions使用的环境
    steps:
      # 检出代码
      - name: Checkout Repository
        uses: actions/checkout@v4

      # 设置 pnpm
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      # 设置 Node.js 环境
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22' # 根据你的 Astro 项目调整 Node 版本
          cache: 'pnpm'

      # 安装依赖
      - name: Install Dependencies
        run: pnpm install

      # 构建 Astro 项目
      - name: Build Astro
        run: pnpm build

      # 部署到 NGINX 服务器
      - name: Deploy to Server
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          SERVER_IP: ${{ secrets.SERVER_IP }}
          SERVER_USER: ${{ secrets.SERVER_USER }}
        run: |
          # 安装 SSH 客户端
          sudo apt-get update && sudo apt-get install -y ssh
          # 配置 SSH
          mkdir -p ~/.ssh
          echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H $SERVER_IP >> ~/.ssh/known_hosts
          # 同步 dist 目录到服务器
          rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./dist/ $SERVER_USER@$SERVER_IP:/var/www/kongliu.net
          # 重启 NGINX
          ssh $SERVER_USER@$SERVER_IP "sudo systemctl restart nginx"
```

**关键说明**：
- 需要在`environment`中指定GitHub中配置的环境

## 配置 GitHub Secrets

在 GitHub 仓库的 **Settings > Environments** 中创建环境并添加：

- `SSH_PRIVATE_KEY`：SSH 私钥内容。
- `SERVER_IP`：服务器公网 IP 或域名。
- `SERVER_USER`：服务器用户名。

## 测试部署

推送代码到 `main` 分支：

```bash
git add .
git commit -m "Setup auto-deploy"
git push origin main
```

在 GitHub **Actions** 页面查看工作流运行状态，确认：
- pnpm 安装和构建成功。
- 文件成功同步到服务器。
- NGINX 重启完成。

访问你的域名，验证 Astro 站点是否正常加载。

## 故障排查

1.  在文件同步发生错误，请先检查GitHub Actions环境是否正确配置，并在yml文件中正确指定了`environment`