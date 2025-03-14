import { glob } from "glob";
import path from "path";

export async function instanceAll(mpath: string, params: any[]): Promise<any[]> {
  const results = Array<any>();
  const files = glob.sync(mpath);
  const r = files
    .map((f) => {
      const pp = path.parse(f);
      if (path.isAbsolute(f)) {
        return path.join(pp.dir, pp.name);
      } else {
        return path.join(__dirname, pp.dir, pp.name);
      }
    })
    .map(async (f) => instance(f, params));
  const dirs = await Promise.all(r);
  return dirs;
}

async function instance(filePath: string, params: any[]): Promise<any> {
  const module = await import(filePath);
  for (const key in module) {
    if (
      typeof module[key] === "function" &&
      /^\s*class\s/.test(module[key].toString())
    ) {
      return Reflect.construct(module[key], params);
    }
  }
  throw new Error(`No class found in module file ${filePath}`);
}