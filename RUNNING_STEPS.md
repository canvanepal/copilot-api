# 📋 Complete Server Running Steps

## ⏱️ Time to Get Running: ~5 minutes

---

## 🎬 START HERE

### If you're on Windows:
Double-click: `start.bat`

**That's it!** The script will:
1. ✅ Install dependencies
2. ✅ Start the server
3. ✅ Open usage viewer

---

## 🛠️ Manual Steps (All Platforms)

### **Step 1: Open Terminal/Command Prompt**

Navigate to the project:
```bash
cd C:\Users\Arun\Downloads\clauuu\copilot-api
```

---

### **Step 2: Install Dependencies** (First time only)

```bash
bun install
```

Or with npm:
```bash
npm install
```

**⏳ Wait 1-2 minutes to complete**

---

### **Step 3: Authenticate with GitHub** (First time only)

```bash
npm start -- auth
```

This will:
1. Open your browser
2. Ask you to authorize GitHub
3. Generate tokens automatically
4. Save them locally

**✅ You only need to do this once!**

---

### **Step 4: Start the Server** 🚀

Choose your preferred port:

```bash
# Default port 4141
npm start

# Or custom port (example: 3000)
npm start -- -p 3000

# Or with verbose logging
npm start -- -p 3000 -v
```

---

### **Step 5: Server is Running!** ✅

You should see:
```
✅ Server running on http://localhost:4141

Available models:
- claude-opus-4.7
- gpt-5-mini ← (renamed)
- claude-opus-4.6 ← (renamed)
... (more models)
```

---

## 🧪 Test It's Working

Open a **NEW terminal** and run:

```bash
# Test the server
curl http://localhost:4141/models

# You'll see JSON with all models
```

---

## 🗺️ What Happens Behind the Scenes

```
┌─────────────────────────────────┐
│  Your Application               │
│  (Claude Code, LM Studio, etc)  │
└──────────────┬──────────────────┘
               │ 
               ↓ API calls
┌──────────────────────────────────┐
│  Your Copilot API Server         │
│  (Running on localhost:4141)     │
│                                  │
│  - Receives /models request      │
│  - Applies model renames         │
│  - Returns custom model list     │
└──────────────┬──────────────────┘
               │
               ↓ Forwards request
┌──────────────────────────────────┐
│  GitHub Copilot API (Real)       │
│  (api.githubcopilot.com)         │
└──────────────────────────────────┘
```

---

## 📦 Your Customizations in Place

✅ Model renaming configured:
- File: `src/lib/model-config.ts`
- Swapped: `gpt-5-mini` ↔️ `claude-opus-4.6`

When you call `/models`:
```json
{
  "id": "claude-opus-4.6",        // ← Custom name!
  "display_name": "claude-opus-4.6"
}
```

---

## 📝 Port Configuration

### Set Port at Startup

```bash
# Port 4141 (default)
npm start

# Port 3000
npm start -- -p 3000

# Port 8000
npm start -- -p 8000

# Port 5000
npm start -- -p 5000

# ANY port
npm start -- -p YOUR_PORT_NUMBER
```

### Change Default Port (Optional)

Edit `src/start.ts` line 132:
```typescript
default: "4141",  // Change this number
```

---

## 🎯 Common Usage Scenarios

### **Scenario 1: Simple Test Run**
```bash
npm start
# Server runs on 4141
# Test with: curl http://localhost:4141/models
```

### **Scenario 2: Run on Specific Port**
```bash
npm start -- -p 8000
# Server runs on 8000
# Test with: curl http://localhost:8000/models
```

### **Scenario 3: Development with Auto-Reload**
```bash
bun run dev
# Changes to code auto-reload
```

### **Scenario 4: Claude Code Integration**
```bash
npm start -- -c
# Server runs and prompts for model selection
# Generates environment variable command
```

### **Scenario 5: Enterprise Account**
```bash
npm start -- -a enterprise
# Uses enterprise GitHub Copilot API
```

---

## 🛑 Stopping the Server

Press in the terminal:
```
Ctrl + C
```

Server stops gracefully.

---

## 🔄 Running Again

You don't need to re-authenticate! Just run:
```bash
npm start -- -p YOUR_PORT
```

Authentication is stored locally.

---

## 📊 Available API Endpoints

Once server is running on port 4141:

| Endpoint | Method | What it does |
|----------|--------|-------------|
| `/models` | GET | List all models (with your custom names!) |
| `/chat/completions` | POST | Create chat completion |
| `/embeddings` | POST | Create text embeddings |
| `/usage` | GET | Check API usage |
| `/token` | GET | Check token validity |
| `/v1/chat/completions` | POST | OpenAI compatible |
| `/v1/models` | GET | OpenAI compatible |
| `/v1/embeddings` | POST | OpenAI compatible |
| `/v1/messages` | POST | Anthropic compatible |

---

## 💡 Pro Tips

### Run in Background

**Windows:**
```batch
start /B npm start
```

**Mac/Linux:**
```bash
npm start &
```

### Check if Port is Busy

**Windows:**
```batch
netstat -ano | findstr :4141
```

**Mac/Linux:**
```bash
lsof -i :4141
```

### View Full Help

```bash
npm start -- --help
```

---

## ⚡ All Possible Startup Flags

```bash
npm start -- [options]

Options:
  -p, --port              Port number (default: 4141)
  -v, --verbose           Enable verbose logging
  -a, --account-type      Account type: individual|business|enterprise
  -r, --rate-limit        Rate limit seconds between requests
  -w, --wait              Wait on rate limit instead of erroring
  -g, --github-token      Provide GitHub token directly
  -c, --claude-code       Setup Claude Code integration
      --show-token        Show tokens in logs (debug)
      --proxy-env         Use HTTP proxy from env vars
      --manual            Enable manual request approval
```

**Examples:**
```bash
npm start -- -p 3000 -v
npm start -- -p 8000 -c
npm start -- -a enterprise -p 5000
npm start -- -r 5 -w
```

---

## 📊 What Gets Logged

```
[00:00:00] ✅ GitHub token loaded
[00:00:01] ✅ Copilot token loaded
[00:00:02] ✅ VS Code version detected
[00:00:03] ✅ Models cached (28 models available)
[00:00:04] ✅ Server listening on http://localhost:4141

Available models:
- claude-opus-4.7
- gpt-5-mini (your rename)
- claude-opus-4.6 (your rename)
... (more)

🌐 Usage Viewer: https://ericc-ch.github.io/copilot-api?endpoint=http://localhost:4141/usage
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | `npm start -- -p 3001` |
| bun not found | Install: `curl -fsSL https://bun.sh/install \| bash` |
| Models won't load | Enable logging: `npm start -- -v` |
| Auth failed | Re-run: `npm start -- auth` |
| Server crashes | Check logs with: `npm start -- -v` |

---

## 📚 Documentation Files

I've created these files for you:

1. **HOW_TO_RUN.md** ← You are here
2. **QUICK_START.md** ← Quick overview with tips
3. **SERVER_SETUP_GUIDE.md** ← Detailed reference
4. **src/lib/model-config.ts** ← Your model customizations

---

## ✅ You're Ready!

Everything is set up:
- ✅ Project cloned
- ✅ Model renaming configured
- ✅ Port options explained
- ✅ Full documentation created

### **Next Command to Run:**
```bash
npm start
```

**OR** if you're on Windows, just double-click `start.bat`

---

## 🎉 Done!

Your Copilot API server will be live and ready to use! 🚀

Questions? Check the other documentation files or the GitHub repo:
https://github.com/ericc-ch/copilot-api

