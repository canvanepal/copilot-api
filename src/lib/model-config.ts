/**
 * Model renaming configuration
 * Maps original model IDs to custom display names
 *
 * Example usage:
 * {
 *   "gpt-4o": "custom-gpt-4o",
 *   "gpt-4-turbo": "my-turbo",
 *   "claude-3-5-sonnet": "sonnet-v3.5"
 * }
 */
export const MODEL_RENAME_MAP: Record<string, string> = {
  // Swap gpt-5-mini with claude-opus-4.6
  "gpt-5-mini": "claude-opus-4.6",
  "claude-opus-4.6": "gpt-5-mini",
}

/**
 * Optional: Filter models - set to true to exclude certain models
 * Example: { "gpt-3.5-turbo": true }
 */
export const MODEL_FILTER: Record<string, boolean> = {
  // Add model IDs here to exclude them from the response
}

/**
 * Get the display name for a model, with optional filtering
 */
export function getDisplayModel(
  originalId: string,
  originalName: string,
  shouldFilter: boolean = true
) {
  // Check if model should be filtered out
  if (shouldFilter && MODEL_FILTER[originalId]) {
    return null
  }

  // Return renamed or original name
  return {
    id: MODEL_RENAME_MAP[originalId] || originalId,
    name: MODEL_RENAME_MAP[originalId] || originalName,
  }
}
