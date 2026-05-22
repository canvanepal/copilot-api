# ✅ COMPLETE MODEL SWAP - Quick Reference

## 🎯 What You Now Have

**Complete bidirectional model swapping!**

When client uses → backend processes:
- `gpt-5-mini` → `claude-opus-4.6` ✅
- `claude-opus-4.6` → `gpt-5-mini` ✅

---

## 📝 Configuration

**File:** `src/lib/model-config.ts`

```typescript
export const MODEL_SWAPS: Record<string, string> = {
  "gpt-5-mini": "claude-opus-4.6",
  "claude-opus-4.6": "gpt-5-mini",
}
```

**To add more swaps:**
```typescript
export const MODEL_SWAPS: Record<string, string> = {
  "gpt-5-mini": "claude-opus-4.6",
  "claude-opus-4.6": "gpt-5-mini",
  "gpt-4o": "claude-sonnet-4.6",           // ← Add here
  "claude-sonnet-4.6": "gpt-4o",           // ← And here
}
```

Then restart the server!

---

## 🔍 How to Test

### **1. List models**
```bash
curl http://localhost:3000/models | jq '.data[] | select(.id | contains("gpt-5") or contains("claude"))'
```
✅ Should show swapped IDs

### **2. Request with gpt-5-mini**
```bash
curl -X POST http://localhost:3000/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-mini",
    "messages": [{"role": "user", "content": "Hi!"}]
  }'
```
✅ Check logs for: `Model SWAPPED: Client sent "gpt-5-mini" → Backend will call "claude-opus-4.6"`

### **3. Request with claude-opus-4.6**
```bash
curl -X POST http://localhost:3000/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-opus-4.6",
    "messages": [{"role": "user", "content": "Hi!"}]
  }'
```
✅ Check logs for: `Model SWAPPED: Client sent "claude-opus-4.6" → Backend will call "gpt-5-mini"`

---

## 🔧 Files Modified

1. **`src/lib/model-config.ts`**
   - Changed `MODEL_RENAME_MAP` → `MODEL_SWAPS`
   - Changed `getOriginalModelId()` → `getBackendModelId()`

2. **`src/routes/chat-completions/handler.ts`**
   - Uses `getBackendModelId()` for swapping

3. **`src/routes/messages/non-stream-translation.ts`**
   - Uses `getBackendModelId()` for swapping

---

## 📊 The Flow

```
Client sends:      "gpt-5-mini"
        ↓
getBackendModelId("gpt-5-mini")
        ↓
Returns:           "claude-opus-4.6"
        ↓
Backend processes: "claude-opus-4.6" ✅
```

---

## ✨ Key Features

✅ Bidirectional swapping  
✅ Works on all endpoints  
✅ Easy to configure  
✅ Easy to extend  
✅ Automatic translation  
✅ No manual mapping needed  

---

## 🚀 Ready to Use!

Just restart the server:
```bash
npm start -- -p 3000
```

Your complete model swap is now active! 🎉
