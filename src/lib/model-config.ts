/**
 * MODEL SWAPPING CONFIGURATION
 *
 * This creates a complete swap between two models.
 * When client calls one, the backend processes the other.
 *
 * Example:
 * - Client sends: "model": "gpt-5-mini"
 * - Backend calls: "claude-opus-4.6"
 *
 * AND vice versa:
 * - Client sends: "model": "claude-opus-4.6"
 * - Backend calls: "gpt-5-mini"
 */

// Define model swaps (bidirectional mapping)
export const MODEL_SWAPS: Record<string, string> = {
  // "model-id-from-client": "actual-model-to-call-in-backend"
  "gpt-5-mini": "claude-opus-4.6",
  "claude-opus-4.6": "gpt-5-mini",
  // Add more swaps as needed:
  // "gpt-4o": "claude-sonnet-4.6",
  // "claude-sonnet-4.6": "gpt-4o",
}

/**
 * Optional: Filter models - set to true to exclude certain models
 * Example: { "gpt-3.5-turbo": true }
 */
export const MODEL_FILTER: Record<string, boolean> = {
  // Filter out gpt-3.5-turbo
  "gpt-3.5-turbo": true,
  // Add model IDs here to exclude them from the response
}

/**
 * Get the display name for a model in /models endpoint
 * Shows what the client will see when listing models
 */
export function getDisplayModel(
  originalId: string,
  originalName: string,
  shouldFilter: boolean = true,
) {
  // Check if model should be filtered out
  if (shouldFilter && MODEL_FILTER[originalId]) {
    return null
  }

  // Check if this model should be displayed with a swapped ID
  const swappedId = MODEL_SWAPS[originalId]

  if (swappedId) {
    // This model is part of a swap
    // Display with the swapped ID
    return {
      id: swappedId,
      name: swappedId,
    }
  }

  // Not swapped, return original
  return {
    id: originalId,
    name: originalName,
  }
}

/**
 * Get the actual backend model ID to process
 * This is used when handling API requests
 *
 * IMPORTANT: This swaps the model IDs!
 * If client sends a swapped model, we call the original
 * If client sends an original, we call the swapped
 *
 * Example:
 * getBackendModelId("gpt-5-mini") -> "claude-opus-4.6"  (swap!)
 * getBackendModelId("claude-opus-4.6") -> "gpt-5-mini"  (swap!)
 * getBackendModelId("gpt-4o") -> "gpt-4o"  (no swap, return as-is)
 */
export function getBackendModelId(clientModelId: string): string {
  // Check if this client ID is in the swaps
  if (MODEL_SWAPS[clientModelId]) {
    // Return the swapped model to process
    return MODEL_SWAPS[clientModelId]
  }

  // Check if this client ID is a swapped value
  // (meaning find the original and return it)
  for (const [clientId, backendId] of Object.entries(MODEL_SWAPS)) {
    if (backendId === clientModelId) {
      // This was the backend model, so return the client model
      return clientId
    }
  }

  // Not part of any swap, return as-is
  return clientModelId
}

/**
 * Get the actual original model from the backend
 * This finds which real model in state.models to use for lookups
 *
 * Example:
 * getActualBackendModel("gpt-5-mini") -> "claude-opus-4.6" (to search in state.models)
 */
export function getActualBackendModel(clientModelId: string): string {
  // First, get what we should actually call
  const backendId = getBackendModelId(clientModelId)
  return backendId
}
