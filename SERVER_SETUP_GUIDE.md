# Copilot API Server Setup Guide

## Prerequisites

Before you start, make sure you have:
- **Bun** installed (recommended) OR **Node.js** v18+
- **GitHub Account** with Copilot access
- **Git** (to clone the repo)

### Install Bun (Recommended)
```bash
curl -fsSL https://bun.sh/install | bash
```

Or use Node.js/npm if you prefer.

---

## Step 1: Navigate to Project Directory

```bash
cd copilot-api
```

---

## Step 2: Install Dependencies

```bash
# Using Bun (recommended)
bun install

# OR using npm
npm install

# OR using yarn
yarn install
```

---

## Step 3: Authenticate with GitHub

Before running the server, you need to authenticate:

```bash
npm start -- auth
```

This will:
1. Open your browser to GitHub OAuth login
2. Generate a GitHub token
3. Store it locally for the server to use

**Keep this token safe!** It will be stored in your local config directory.

---

## Step 4: Run the Server

### Basic Start (Default Port 4141)
```bash
npm start
```

### With Custom Port
```bash
# Port 3000
npm start -- --port 3000

# Port 8000 (short flag)
npm start -- -p 8000
```

### With Additional Options

#### Verbose Logging
```bash
npm start -- -p 3000 -v
```

#### Enable Manual Request Approval
```bash
npm start -- -p 3000 --manual
```

#### Set Rate Limit (seconds between requests)
```bash
npm start -- -p 3000 --rate-limit 5 --wait
```

#### For Claude Code Integration
```bash
npm start -- -p 3000 -c
```
This will prompt you to select models and copy the setup command to clipboard.

#### For Enterprise/Business Accounts
```bash
# Business account
npm start -- -p 3000 --account-type business

# Enterprise account
npm start -- -p 3000 --account-type enterprise
```

---

## Step 5: Server is Running!

When the server starts, you'll see output like:

```
✅ Server running on http://localhost:4141
🌐 Available models:
- gpt-4o
- claude-opus-4.7
- gemini-3.1-pro-preview
... (more models)
```

---

## Common Commands

### Development Mode (with auto-reload)
```bash
bun run dev
# or
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Check
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
npm run lint:all
```

---

## Testing the Server

### Check if Server is Running
```bash
curl http://localhost:4141
```

### List Available Models
```bash
curl http://localhost:4141/models
```

### With a Custom Port
```bash
curl http://localhost:3000/models
```

---

## Using with Tools

### Claude Code Integration
```bash
npm start -- -p 3000 -c
```
Then copy the generated environment variable command and run it in your Claude Code environment.

### As OpenAI-Compatible API
Use the server URL as your API endpoint:
```
Base URL: http://localhost:4141
API Key: (any value, it's ignored)
```

### As Anthropic-Compatible API
```
Base URL: http://localhost:4141
API Key: (any value, it's ignored)
```

---

## Troubleshooting

### Issue: Authentication Failed
**Solution:** Re-run authentication:
```bash
npm start -- auth
```

### Issue: Port Already in Use
**Solution:** Use a different port:
```bash
npm start -- -p 3001
```

### Issue: Models Not Loading
**Solution:** Check verbose logging:
```bash
npm start -- -v
```

### Issue: Rate Limiting Issues
**Solution:** Enable rate limit wait:
```bash
npm start -- --rate-limit 5 --wait
```

---

## Advanced Options

### All Available Flags
```bash
npm start -- --help
```

| Flag | Alias | Description | Default |
|------|-------|-------------|---------|
| `--port` | `-p` | Port to listen on | `4141` |
| `--verbose` | `-v` | Enable verbose logging | `false` |
| `--account-type` | `-a` | Account type (individual, business, enterprise) | `individual` |
| `--manual` | - | Enable manual request approval | `false` |
| `--rate-limit` | `-r` | Rate limit in seconds | - |
| `--wait` | `-w` | Wait instead of error on rate limit | `false` |
| `--github-token` | `-g` | Provide GitHub token directly | - |
| `--claude-code` | `-c` | Generate Claude Code config | `false` |
| `--show-token` | - | Show tokens in logs (debug) | `false` |
| `--proxy-env` | - | Initialize proxy from env vars | `false` |

---

## Server Configuration

The server supports model renaming via `src/lib/model-config.ts`:

```typescript
export const MODEL_RENAME_MAP: Record<string, string> = {
  "gpt-5-mini": "claude-opus-4.6",
  "claude-opus-4.6": "gpt-5-mini",
}
```

Restart the server after making changes.

---

## Environment Variables

The server respects HTTP proxy settings:
```bash
HTTP_PROXY=http://proxy.example.com:8080
HTTPS_PROXY=https://proxy.example.com:8080
```

Or use the `--proxy-env` flag when starting.

---

## Next Steps

1. ✅ Start the server
2. 📝 Configure model renaming if needed
3. 🔌 Connect your tools (Claude Code, LM Studio, etc.)
4. 🚀 Start making API calls!

---

## API Endpoints

- `GET /models` - List available models
- `POST /chat/completions` - Create chat completion
- `POST /embeddings` - Create embeddings
- `GET /usage` - Check usage statistics
- `GET /token` - Check token info

For OpenAI compatibility:
- `POST /v1/chat/completions`
- `GET /v1/models`
- `POST /v1/embeddings`

For Anthropic compatibility:
- `POST /v1/messages`

---

## Support

For issues, check:
- GitHub Issues: https://github.com/ericc-ch/copilot-api/issues
- Project README: https://github.com/ericc-ch/copilot-api

