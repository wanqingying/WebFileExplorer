const Koa = require("koa");
const serve = require("koa-static");
const bodyparser = require("koa-bodyparser");
const Router = require("@koa/router");
import path from "path";
import { root } from "./config";

const router = new Router();
import { getFileStatListByFolder } from "./fsd";

const app = new Koa();

app.use(bodyparser());

app.use(serve("../client/dist"));
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
  console.log("req url", context.request.originalUrl);
  return await next();
});

app.listen(3500);

router.get("/api/file/list", async (ctx, next: any) => {
  const q = ctx.request.query;
  const _path = q.path;
  console.log("path", path.join(root, _path));
  ctx.body = await getFileStatListByFolder(path.join(root, _path));
  await next();
});
