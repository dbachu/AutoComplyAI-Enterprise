# 🚀 AutoComplyAI Enterprise -- Local Execution Guide

This guide contains all commands required to initialize, push, and run
the project locally.

------------------------------------------------------------------------

## 🧭 1. Navigate to Project

``` bash
cd /Users/deepikakothamasu/Documents/GitHub/AutoComplyAI_Enterprise_NoGaps
pwd
```

------------------------------------------------------------------------

## 🧱 2. Initialize Git (If Not Already)

``` bash
ls -a
git init
```

------------------------------------------------------------------------

## 👤 3. Set Git User (Repository Only)

``` bash
git config user.name "Your New Git Username"
git config user.email "your_new_email@example.com"

git config user.name
git config user.email
```

------------------------------------------------------------------------

## 📄 4. Add .gitignore

``` bash
touch .gitignore
```

Add:

    # Python
    __pycache__/
    *.pyc
    .env

    # Node
    node_modules/
    dist/
    build/

    # OS
    .DS_Store

    # Logs
    *.log

------------------------------------------------------------------------

## 📦 5. Add & Commit

``` bash
git add .
git commit -m "Initial Enterprise Release - Agentic AI Phishing Detection Platform"
```

------------------------------------------------------------------------

## 🌍 6. Connect to GitHub

``` bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/AutoComplyAI-Enterprise.git
git branch -M main
git push -u origin main
```

> Use GitHub Personal Access Token when prompted.

------------------------------------------------------------------------

## 🐳 7. Run Application (Podman)

``` bash
podman-compose down
podman-compose up --build
```

### Or Docker:

``` bash
docker-compose down
docker-compose up --build
```

------------------------------------------------------------------------

## 🌐 8. Access Application

Frontend:

    http://localhost:5173

Backend Swagger:

    http://localhost:8000/docs

------------------------------------------------------------------------

## 🔄 9. Push Changes Later

``` bash
git add .
git commit -m "Describe your change"
git push
```

If rebuild needed:

``` bash
podman-compose down
podman-compose up --build
```

------------------------------------------------------------------------

## 🧹 10. Clean Reset

``` bash
podman-compose down -v
podman ps -a
podman rm <container_id>
podman-compose up --build
```

------------------------------------------------------------------------

## 🔐 11. Switch Git Account (Optional)

``` bash
git credential-osxkeychain erase
host=github.com
protocol=https
```

Then push again to re-authenticate.

------------------------------------------------------------------------

## 🧠 Quick Health Checks

``` bash
git status
git remote -v
podman ps
```

------------------------------------------------------------------------

✅ End of Guide
