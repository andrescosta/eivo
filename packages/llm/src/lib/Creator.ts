import { instanceAll } from "./utils/loader";


async function run(gensPath: string, params: any[]) {
  const rs = await instanceAll(gensPath, params);
  rs.forEach((p) => {
    if (typeof p["run"] === "function") {
      p.run();
    } else {
      console.log(`warning, no run method for ${p}. `);
    }
  });
}