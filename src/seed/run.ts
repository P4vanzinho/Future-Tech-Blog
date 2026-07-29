import { loadProjectEnv } from "@/lib/loadProjectEnv";

loadProjectEnv();

function parseArgs(argv: string[]) {
  return {
    force: argv.includes("--force"),
  };
}

async function main() {
  const { force } = parseArgs(process.argv.slice(2));
  const { runSeed } = await import("./seed");
  await runSeed({ force });
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown seed error";
  console.error(`Seed failed: ${message}`);
  process.exit(1);
});
