rm -rf node_modules/
rm -rf apps/api/node_modules/
rm -rf packages/contracts/node_modules/
rm -rf packages/llm/node_modules/
rm -rf ops/cli/node_modules/
rm -rf dist/
rm -rf apps/api/dist/
rm -rf ops/cli/dist/
rm -rf packages/contracts/dist/
rm -rf packages/llm/dist/
rm pnpm-lock.yaml
pnpm store prune
pnpm cache delete
