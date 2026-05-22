# 🚀 Quick Start Guide - Copilot API Server

## ⚡ Super Quick Start (30 seconds)

### Windows Users:
Just double-click:
```
start.bat
```
It will automatically:
1. Install dependencies (if needed)
2. Start the server
3. Open usage viewer page

### Mac/Linux Users:
```bash
cd copilot-api
bun install
npm start
```

---

## 📋 Step-by-Step Instructions

### Step 1️⃣: Check if Bun is Installed
```bash
bun --version
```

If not installed, install it:
```bash
curl -fsSL https://bun.sh/install | bash
```

Or use npm instead (comes with Node.js v18+)

---

### Step 2️⃣: Install Dependencies

```bash
cd C:\Users\Arun\Downloads\clauuu\copilot-api
bun install
```

Wait for it to complete (usually 1-2 minutes)

---

### Step 3️⃣: Authenticate with GitHub

```bash
npm start -- auth
```

This will:
- Open GitHub in your browser
- Ask you to authorize the app
- Generate and save your tokens locally

**Keep these tokens safe!** ✔️

---

### Step 4️⃣: Start the Server

#### Option A: Default Port (4141)
```bash
npm start
```

#### Option B: Custom Port (e.g., 3000)
```bash
npm start -- -p 3000
```

#### Option C: With Logging
```bash
npm start -- -p 3000 -v
```

---

## ✅ Server Running? You Should See:

```
✅ Server running on http://localhost:4141

Available models:
- gpt-4o
- claude-opus-4.7
- gemini-3.1-pro-preview
... (more models)

🌐 Usage Viewer: https://ericc-ch.github.io/copilot-api?endpoint=http://localhost:4141/usage
```

---

## 🧪 Test the Server

Open a new terminal/command prompt and run:

```bash
# List all models
curl http://localhost:4141/models

# Or with your custom port
curl http://localhost:3000/models
```

You should see JSON with all available models ✅

---

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running

---

## 🔧 Common Issues & Solutions

### ❌ "Port already in use"
**Solution:** Use a different port
```bash
npm start -- -p 3001
```

### ❌ "bun: command not found"
**Solution:** Install Bun or use npm/node instead
```bash
# Using npm instead
npm install
npm start
```

### ❌ "Auth failed"
**Solution:** Re-authenticate
```bash
npm start -- auth
```

### ❌ "Models not loading"
**Solution:** Enable verbose logging to see what's wrong
```bash
npm start -- -v
```

---

## 📝 Using Custom Port

### Example: Run on Port 8000

```bash
npm start -- -p 8000
```

Then access at: `http://localhost:8000`

---

## 🎯 Next Steps

1. ✅ Server is running
2. 📝 (Optional) Customize model names in `src/lib/model-config.ts`
3. 🔌 Connect to your tools (Claude Code, LM Studio, etc.)
4. 🚀 Start making API calls!

---

## 📚 Available API Endpoints

When server runs on port 4141:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `http://localhost:4141/models` | GET | List models |
| `http://localhost:4141/chat/completions` | POST | Chat completion |
| `http://localhost:4141/embeddings` | POST | Create embeddings |
| `http://localhost:4141/usage` | GET | Check usage stats |
| `http://localhost:4141/token` | GET | Token info |

---

## 💡 Pro Tips

### Run in Background (Windows)
```batch
start /B bun run start
```

### Run in Background (Mac/Linux)
```bash
npm start &
```

### Run with Development Mode (Auto-reload)
```bash
bun run dev
```

### View All Commands
```bash
npm start -- --help
```

---

## 🆘 Need Help?

- Check the full guide: `SERVER_SETUP_GUIDE.md`
- Visit: https://github.com/ericc-ch/copilot-api
- Check issues: https://github.com/ericc-ch/copilot-api/issues

---

## 📦 What You've Modified

You've customized:
- ✅ Model renaming in `src/lib/model-config.ts`
- ✅ Swapped `gpt-5-mini` ↔️ `claude-opus-4.6`

These changes will be reflected in the `/models` endpoint!

---

**Happy coding! 🎉**
