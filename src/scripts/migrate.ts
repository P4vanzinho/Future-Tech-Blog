import { loadProjectEnv } from "@/lib/loadProjectEnv";
import { spawnSync } from "node:child_process";

loadProjectEnv();

const result = spawnSync("npx", ["payload", "migrate"], {
  stdio: "inherit",
  env: process.env,
  shell: false,
});

process.exit(result.status ?? 1);
