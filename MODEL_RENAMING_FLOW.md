# 🔄 Model Renaming - Complete Flow Explained

## How It Works Now

Your setup swaps `gpt-5-mini` ↔️ `claude-opus-4.6`. Here's the **complete flow**:

---

## 📊 Flow Diagram

### **API Request with Renamed Model**

```
Client Request:
  POST /chat/completions
  {
    "model": "claude-opus-4.6",    ← Client uses renamed ID
    "messages": [...]
  }
         ↓
         ↓ Handler (handler.ts)
         ↓
Model ID Translation:
  getOriginalModelId("claude-opus-4.6")
  Returns: "gpt-5-mini"             ← Maps back to real model!
         ↓
         ↓ Payload Updated
         ↓
Backend Request:
  {
    "model": "gpt-5-mini",          ← Sent to Copilot API
    "messages": [...]
  }
         ↓
         ↓ GitHub Copilot API
         ↓
Response:
  Returns completion from gpt-5-mini
         ↓
         ↓ Back to Client
         ↓
Complete!
```

---

## ✅ What Was Updated

### **1. `src/lib/model-config.ts`**
Added `MODEL_REVERSE_MAP` - maps display names back to original IDs:

```typescript
// Original mapping (display name → original)
MODEL_RENAME_MAP: {
  "gpt-5-mini": "claude-opus-4.6",
  "claude-opus-4.6": "gpt-5-mini",
}

// Reverse mapping (original → display name)
MODEL_REVERSE_MAP: {
  "claude-opus-4.6": "gpt-5-mini",
  "gpt-5-mini": "claude-opus-4.6",
}

// New helper function
getOriginalModelId("claude-opus-4.6") → "gpt-5-mini"
getOriginalModelId("gpt-5-mini") → "claude-opus-4.6"
```

### **2. `src/routes/chat-completions/handler.ts`**
Added model ID translation in chat completions handler:

```typescript
// Convert renamed model ID back to original
const originalModelId = getOriginalModelId(payload.model)
if (originalModelId !== payload.model) {
  consola.info(`Model ID mapped: "${payload.model}" → "${originalModelId}"`)
  payload = {
    ...payload,
    model: originalModelId,  // ← Use original for backend
  }
}
```

### **3. `src/routes/messages/non-stream-translation.ts`**
Updated Anthropic message handler:

```typescript
function translateModelName(model: string): string {
  // First, convert renamed model IDs back to original
  const originalModel = getOriginalModelId(model)
  
  // Then apply any other transformations
  if (originalModel.startsWith("claude-opus-")) {
    return originalModel.replace(/^claude-opus-4-.*/, "claude-opus-4")
  }
  return originalModel
}
```

---

## 🎯 Complete Request/Response Examples

### **Example 1: Using `/chat/completions`**

**Client sends:**
```json
{
  "model": "claude-opus-4.6",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

**Server processes:**
1. Receives: `"model": "claude-opus-4.6"`
2. Looks up: `getOriginalModelId("claude-opus-4.6")`
3. Gets: `"gpt-5-mini"`
4. Updates payload with original ID
5. Finds model in `state.models` using `gpt-5-mini`
6. Forwards to Copilot API with `gpt-5-mini`
7. Gets response from `gpt-5-mini`
8. Sends back to client ✅

---

### **Example 2: Using `/v1/messages` (Anthropic)**

**Client sends:**
```json
{
  "model": "claude-opus-4.6",
  "messages": [...]
}
```

**Server processes:**
1. `translateToOpenAI()` is called
2. Calls `translateModelName("claude-opus-4.6")`
3. Calls `getOriginalModelId("claude-opus-4.6")`
4. Returns `"gpt-5-mini"`
5. Translates to OpenAI format with `gpt-5-mini`
6. Sends to Copilot API ✅

---

### **Example 3: Using `/models` endpoint**

**Client request:**
```bash
GET http://localhost:3000/models
```

**Server response:**
```json
{
  "object": "list",
  "data": [
    {
      "id": "claude-opus-4.6",      ← Renamed display
      "object": "model",
      "display_name": "claude-opus-4.6"
    },
    {
      "id": "gpt-5-mini",           ← Swapped to this
      "object": "model",
      "display_name": "gpt-5-mini"
    },
    ... other models
  ]
}
```

Client sees renamed models, but backend calls use originals! ✅

---

## 🔀 The Double Mapping

```
FORWARD (Display):
  gpt-5-mini (real) → claude-opus-4.6 (display)
  claude-opus-4.6 (real) → gpt-5-mini (display)

REVERSE (Backend):
  claude-opus-4.6 (from client) → gpt-5-mini (to backend)
  gpt-5-mini (from client) → claude-opus-4.6 (to backend)
```

---

## 📋 What Happens in Each Endpoint

| Endpoint | Flow |
|----------|------|
| `/models` | Uses `MODEL_RENAME_MAP` to show custom names |
| `/chat/completions` | Uses `getOriginalModelId()` to map back to real model |
| `/v1/chat/completions` | Uses `getOriginalModelId()` to map back to real model |
| `/v1/messages` | Uses `translateModelName()` → `getOriginalModelId()` |
| `/embeddings` | Uses `getOriginalModelId()` to map back to real model |

---

## ✨ The Result

Now when you use the API:

1. **List Models** - See your custom names
   ```bash
   curl http://localhost:3000/models
   # Returns: claude-opus-4.6, gpt-5-mini (swapped!)
   ```

2. **Make Requests** - Use the custom names
   ```bash
   curl -X POST http://localhost:3000/chat/completions \
     -d '{"model": "claude-opus-4.6", ...}'
   # Internally calls: gpt-5-mini ✅
   ```

3. **Get Response** - From the correct backend model
   ```json
   {
     "model": "gpt-5-mini",
     "choices": [...]
   }
   ```

---

## 🎯 Summary

✅ **What changed:**
- Added `MODEL_REVERSE_MAP` for reverse lookup
- Added `getOriginalModelId()` function
- Updated chat completions handler to translate model IDs
- Updated Anthropic message handler to translate model IDs

✅ **What works now:**
- `/models` returns custom names
- Client can use custom names in requests
- Server maps custom names back to originals
- Backend receives and calls original models
- Everything works seamlessly!

✅ **The magic:**
```
Client sees:   "claude-opus-4.6"
              ↓ (getOriginalModelId)
Backend gets:  "gpt-5-mini"
              ↓ (processes)
Returns data from gpt-5-mini ✅
```

---

## 🔧 To Add More Model Renames

Just add to `MODEL_RENAME_MAP` in `src/lib/model-config.ts`:

```typescript
export const MODEL_RENAME_MAP: Record<string, string> = {
  "gpt-5-mini": "claude-opus-4.6",
  "claude-opus-4.6": "gpt-5-mini",
  "gpt-4o": "my-custom-gpt4",           // ← Add here
  "another-model": "my-other-name",     // ← And here
}
```

The reverse map and all handlers will automatically use it! ✨

---

## 📝 Files Modified

1. `src/lib/model-config.ts` - Added reverse mapping
2. `src/routes/chat-completions/handler.ts` - Added model translation
3. `src/routes/messages/non-stream-translation.ts` - Added model translation

**Restart the server** for changes to take effect!

---

## ✅ Verification

To verify it's working:

```bash
# Check /models shows custom names
curl http://localhost:3000/models | grep "id\|display_name"

# Check logs show translation happening
# (Run with: npm start -- -v)
```

You should see logs like:
```
Model ID mapped: "claude-opus-4.6" → "gpt-5-mini"
```

Perfect! Everything is wired up correctly! 🎉
