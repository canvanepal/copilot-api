# Running Copilot API Server - Visual Guide

## 🎯 Overview

```
Your Machine
├── Terminal/Command Prompt
│   └── npm start (or bun run dev)
│       └── Server listens on http://localhost:4141
│           └── Proxy to GitHub Copilot API
│               └── Returns models with your custom names!
```

---

## 🚀 Run It Now (Choose Your OS)

### 🪟 Windows Users

**Method 1: Double-click (Easiest)**
```
1. Open File Explorer
2. Navigate to: C:\Users\Arun\Downloads\clauuu\copilot-api
3. Double-click: start.bat
4. Done! Server runs on port 4141
```

**Method 2: Command Prompt**
```batch
cd C:\Users\Arun\Downloads\clauuu\copilot-api
npm start -- -p 4141
```

---

### 🍎 Mac Users

```bash
cd ~/Downloads/clauuu/copilot-api
npm start
```

Or specify port:
```bash
npm start -- -p 3000
```

---

### 🐧 Linux Users

```bash
cd ~/Downloads/clauuu/copilot-api
npm start
```

Or specify port:
```bash
npm start -- -p 3000
```

---

## 📋 First Time Setup (Do Once)

```
Step 1: Navigate to project
├─ cd copilot-api

Step 2: Install dependencies
├─ bun install
└─ (takes 1-2 minutes)

Step 3: Authenticate
├─ npm start -- auth
├─ Browser opens
└─ Click authorize → Done!

Step 4: Start server
├─ npm start
└─ ✅ Server running!
```

---

## ⚙️ Quick Commands Reference

```bash
# Start on default port 4141
npm start

# Start on custom port
npm start -- -p 3000

# Start with verbose logging
npm start -- -v

# Start for Claude Code
npm start -- -c

# Dev mode (auto-reload)
bun run dev

# Authenticate (first time only)
npm start -- auth

# Check if running
curl http://localhost:4141/models
```

---

## 🔍 What You'll See

### Terminal Output When Starting:
```
🌐 Listening on http://localhost:4141

Available models:
- claude-opus-4.7
- gpt-5-mini (renamed from gpt-5-mini → claude-opus-4.6)
- claude-opus-4.6 (renamed to gpt-5-mini)
- ... (more models)

✅ Server ready to accept requests
```

### Model Response with Your Custom Names:
```json
{
  "object": "list",
  "data": [
    {
      "id": "claude-opus-4.6",        // ← Your renamed model!
      "display_name": "claude-opus-4.6"
    },
    {
      "id": "gpt-5-mini",             // ← Swapped!
      "display_name": "gpt-5-mini"
    }
    // ... more models
  ]
}
```

---

## ✅ Verify It's Running

In a **new terminal/command prompt**:

```bash
# Get all models
curl http://localhost:4141/models

# Or if using port 3000:
curl http://localhost:3000/models

# You should see JSON with all models ✅
```

---

## 📍 Default & Alternative Ports

```
Default:        http://localhost:4141
Alternative:    http://localhost:3000
Alternative:    http://localhost:8000
Custom:         http://localhost:YOUR_PORT
```

---

## 🎮 Port Selection Guide

| Port | Use Case |
|------|----------|
| 4141 | Default, usually available |
| 3000 | If 4141 is busy |
| 8000 | Alternative development |
| 5000 | Flask/other apps often use this |
| 9000 | Usually available |

**Port busy?** Just use `npm start -- -p 3000` or any other number!

---

## 🛑 Stopping the Server

Press these keys in the terminal:
```
Ctrl + C
```

Server will stop gracefully.

---

## 📁 Project Structure

```
copilot-api/
├── src/
│   ├── main.ts              (Entry point)
│   ├── server.ts            (Server setup)
│   ├── start.ts             (Start command ← Port config here)
│   ├── routes/
│   │   └── models/
│   │       └── route.ts     (Your model endpoint)
│   └── lib/
│       └── model-config.ts  (Your custom renames ← Edit this!)
├── package.json
├── start.bat                (Windows quick start)
├── QUICK_START.md           (This file)
└── SERVER_SETUP_GUIDE.md    (Detailed guide)
```

---

## 🔧 Customize Model Names

Edit file: `src/lib/model-config.ts`

```typescript
export const MODEL_RENAME_MAP: Record<string, string> = {
  "gpt-5-mini": "claude-opus-4.6",           // Original → New name
  "claude-opus-4.6": "gpt-5-mini",           // Can swap!
  "gpt-4o": "my-custom-gpt4",                // Add more as needed
}
```

**After editing:**
1. Save the file
2. Restart the server (Ctrl+C and npm start again)
3. Changes take effect immediately!

---

## 🌟 Advanced Options

```bash
# All these work:
npm start                                    # Default port 4141
npm start -- -p 3000                         # Custom port
npm start -- -p 3000 -v                      # With logging
npm start -- -p 3000 --rate-limit 5 --wait  # Rate limiting
npm start -- -p 3000 -c                      # Claude Code mode
npm start -- -a enterprise -p 3000           # Enterprise account
```

---

## ❓ Troubleshooting

### "Port 4141 already in use"
```bash
npm start -- -p 3001  # Try different port
```

### "bun not found"
```bash
npm install  # Use npm instead of bun
```

### "Models not loading"
```bash
npm start -- -v  # Enable verbose logging to see errors
```

### "Authentication failed"
```bash
npm start -- auth  # Re-authenticate
```

---

## 🎯 Next Steps

1. ✅ Run: `npm start`
2. ✅ See: Terminal shows "Server running"
3. ✅ Test: `curl http://localhost:4141/models`
4. ✅ Use: Connect your tools!

---

## 📚 Documentation Files Created

- **QUICK_START.md** ← You are here (Quick overview)
- **SERVER_SETUP_GUIDE.md** ← Detailed instructions
- **src/lib/model-config.ts** ← Your custom model names

---

## 💬 Support

- GitHub: https://github.com/ericc-ch/copilot-api
- Issues: https://github.com/ericc-ch/copilot-api/issues
- Wiki: Check the repo for more info

---

## 🎉 You're All Set!

Everything is configured and ready to go:
- ✅ Server files cloned
- ✅ Model renaming set up
- ✅ Port configuration explained
- ✅ Documentation created

**Just run:** `npm start` and you're live! 🚀

---

**Questions?** Check SERVER_SETUP_GUIDE.md for detailed info!
