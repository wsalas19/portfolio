import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Optional: Add R2 incremental cache if you have an R2 bucket configured
  // incrementalCache: "dummy",
});
