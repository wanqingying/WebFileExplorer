const Koa = require("koa");
const serve = require("koa-static");
const bodyparser = require("koa-bodyparser");
const Router = require("@koa/router");
import path from "path";
import { root } from "./config";
import fs from "fs";
import mime from "mime";

const router = new Router();
import { getFileStatListByFolder } from "./fsd";

const app = new Koa();

app.use(bodyparser());

app.use(serve("../client/dist"));
app.use(router.allowedMethods());

app.use(async (context, next) => {
  console.log("req url", context.request.originalUrl);
  return await next();
});
app.use(router.routes());

app.listen(3500);

router.get("/api/file/list", async (ctx, next: any) => {
  const q = ctx.request.query;
  const _path = q.path;
  console.log("path", path.join(root, _path));
  const files = await getFileStatListByFolder(path.join(root, _path));
  ctx.body = { data: files, code: 0 };
  await next();
});

router.get("/api/file/download", async (ctx, next: any) => {
  const file = ctx.request.query.file;
  const p = path.join("/", file);
  const ps = path.parse(p);
  const mimeType = mime.getType(p);
  console.log("mimeType", mimeType);
  ctx.res.setHeader("Content-disposition", "attachment; filename=" + file);
  ctx.res.setHeader("Content-Type", mimeType);
  const readStream = fs.createReadStream(p, { autoClose: true });
  // readStream.pipe(fs.createWriteStream(path.join(ps.dir, "test.json")));
  ctx.body = readStream;
  // readStream.pipe(ctx.response);
  readStream.on("end", () => {
    console.log("download end");
    ctx.res.end();
  });
  // console.log("download file", file);
  // if (!file) {
  //   ctx.body = { data: null, code: 1 };
  //   return;
  // }
  // console.log("file ", path.join(root, file));
  // try {
  //   fs.accessSync(path.join(root, file), fs.constants.R_OK);
  //   const readStream = fs.createReadStream(path.join(root, file), {
  //     autoClose: true,
  //   });
  //   readStream.on("end", () => {
  //     console.log("download end");
  //     ctx.res.end();
  //   });
  //   ctx.res.setHeader("Content-Type", "application/octet-stream");
  //   await readStream.pipe(ctx.res);
  // } catch (e) {
  //   console.log("e", e);
  //   ctx.body = { data: null, code: 1, message: e.message };
  // }
  await next();
});
