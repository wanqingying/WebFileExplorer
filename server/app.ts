const Koa = require("koa");
const serve = require("koa-static");
const bodyparser = require("koa-bodyparser");
const Router = require("@koa/router");
const router = new Router();
import { test } from "./fsd";


const app = new Koa();

app.use(bodyparser());

app.use(serve("../client/dist"));
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3500);

router.get("/file/list", async (ctx: any, next: any) => {
  const fid = await test();
  ctx.body = fid.join(",");
  await next();
});
