import { PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "client/src/utils/help";
import { Middleware } from "@reduxjs/toolkit";

type HookPos = "before" | "after" | "later";
type HookMatch = string | Array<string> | ((a: PayloadAction) => boolean);
type HookHandle = (cb: () => void) => void;
interface Hook {
  id: string;
  handle: any;
  match: HookMatch;
  position: HookPos;
}

export class RxHook {
  private static hooks: Hook[] = [];
  public static timer = null;
  public static match = (p: HookMatch) => {
    return RxHook.wrap(p);
  };
  private static wrap = (p: HookMatch) => {
    return {
      later: RxHook.addHook.bind(RxHook, p, "later") as HookHandle,
      before: RxHook.addHook.bind(RxHook, p, "before") as HookHandle,
      after: RxHook.addHook.bind(RxHook, p, "after") as HookHandle,
    };
  };
  private static addHook = (match: HookMatch, pos, handle: Function) => {
    const id = uuid();
    RxHook.hooks.push({ match, handle, id, position: pos });
    return () => (RxHook.hooks = RxHook.hooks.filter((p) => p.id !== id));
  };

  public static exec = (action: PayloadAction, pos: any) => {
    const hooks = RxHook.hooks.filter((h) => {
      if (h.position !== pos) return false;
      if (Array.isArray(h.match)) return h.match.includes(action.type);
      if (typeof h.match === "string") return h.match === action.type;
      if (typeof h.match === "function") return h.match(action);
    });
    hooks.forEach((h) => {
      try {
        h.handle();
      } catch (e) {
        console.error(e);
      }
    });
  };
}

export const handleRxHook: Middleware = (api) => (next) => (action) => {
  RxHook.exec(action, "before");
  const na = next(action);
  RxHook.exec(action, "after");
  if (RxHook.timer) clearTimeout(RxHook.timer);
  RxHook.timer = setTimeout(RxHook.exec.bind(RxHook, action, "later"));
  return na;
};
export const handleLog: Middleware = (api) => (next) => (action) => {
  console.log("will dispatch action ", action.type, action);
  return next(action);
};
