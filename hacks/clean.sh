rm -rf node_modules/
rm -rf apps/data/node_modules/
rm -rf packages/contracts/node_modules/
rm -rf dist/
rm -rf apps/data/dist/
rm -rf packages/contracts/dist/
rm pnpm-lock.yaml
pnpm store prune
pnpm cache delete
