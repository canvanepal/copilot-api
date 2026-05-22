import { Hono } from "hono"

import { forwardError } from "~/lib/error"
import { state } from "~/lib/state"
import { cacheModels } from "~/lib/utils"
import { getDisplayModel } from "~/lib/model-config"

export const modelRoutes = new Hono()

modelRoutes.get("/", async (c) => {
  try {
    if (!state.models) {
      // This should be handled by startup logic, but as a fallback.
      await cacheModels()
    }

    const models = state.models?.data
      .map((model) => {
        // Get display info (handles renaming and filtering)
        const displayInfo = getDisplayModel(model.id, model.name)
        return displayInfo
          ? {
              id: displayInfo.id,
              object: "model",
              type: "model",
              created: 0, // No date available from source
              created_at: new Date(0).toISOString(), // No date available from source
              owned_by: model.vendor,
              display_name: displayInfo.name,
            }
          : null
      })
      .filter((model) => model !== null)

    return c.json({
      object: "list",
      data: models,
      has_more: false,
    })
  } catch (error) {
    return await forwardError(c, error)
  }
})
