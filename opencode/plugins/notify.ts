import type { Plugin } from "@opencode-ai/plugin"
import { basename } from "path"

interface NotificationConfig {
  title: string
  body: string
  tags: string
  priority: string
}

export const NotifyPlugin: Plugin = async ({
  project,
  client,
  $,
  directory,
  worktree,
}) => {
  // Extract the directory name from the full path
  const dirName = basename(directory)

  // Event-specific notification configurations
  const notificationConfigs: Record<string, NotificationConfig> = {
    "session.idle": {
      title: "Session Idle",
      body: `OpenCode session in ${dirName} is now idle.`,
      tags: "hourglass",
      priority: "default",
    },
    "session.error": {
      title: "Session Error",
      body: `OpenCode session in ${dirName} encountered an error.`,
      tags: "warning",
      priority: "high",
    },
    "permission.asked": {
      title: "Permission Required",
      body: `OpenCode is requesting permission in ${dirName}.`,
      tags: "lock",
      priority: "high",
    },
  }

  // Helper function to send notification to ntfy.sh
  const sendNotification = async (eventType: string) => {
    try {
      // If event type is unknown, do nothing
      const config = notificationConfigs[eventType]
      if (!config) {
        return
      }

      // Make sure NTFYSH_URL is defined
      const url = process.env.NTFYSH_URL
      if (!url) {
        throw new Error("NTFYSH_URL is not defined")
      }

      const response = await fetch(url, {
        method: "POST",
        body: config.body,
        headers: {
          Title: config.title,
          Priority: config.priority,
          Tags: config.tags,
        },
      })

      if (!response.ok) {
        throw new Error(
          `ntfy.sh request failed with status ${response.status}`
        )
      }

      // Log successful notification
      await client.app.log({
        body: {
          service: "notify-plugin",
          level: "info",
          message: `Sent ntfy.sh notification for ${eventType} event`,
          extra: { directory: dirName, eventType, title: config.title },
        },
      })
    } catch (error) {
      // Handle errors gracefully and log them
      const errorMessage = error instanceof Error ? error.message : String(error)

      await client.app.log({
        body: {
          service: "notify-plugin",
          level: "error",
          message: `Failed to send notification for ${eventType} event`,
          extra: {
            directory: dirName,
            eventType,
            error: errorMessage,
          },
        },
      })
    }
  }

  return {
    event: async ({ event }) => {
      await sendNotification(event.type)
    }
  }
}
