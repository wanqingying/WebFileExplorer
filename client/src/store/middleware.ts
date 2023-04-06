import {PayloadAction} from "@reduxjs/toolkit";

interface HookS {
    match: Function;
    handle: Function;
    position: string;
    id: string;
}

type Hrt = (callback: Function) => { cancel: Function };
export class ReduxHook {
    private static hooks: HookS[] = [];
    public static tm: any = null;

    private static wrap = (id, p: any) => {
        return {
            after: ReduxHook.addTask.bind(this, id, p, "after") as Hrt,
            later: ReduxHook.addTask.bind(this, id, p, "after") as Hrt,
            before: ReduxHook.addTask.bind(this, id, p, "before") as Hrt,
        };
    };
    private static addTask = (id, match, pos, fn: Function) => {
        ReduxHook.hooks.push({ match, position: pos, handle: fn, id });
        return {
            cancel: () => {
                ReduxHook.hooks = ReduxHook.hooks.filter((h) => h.id !== id);
            },
        };
    };

    public static match = (cb: ((action: PayloadAction) => boolean) | string) => {
        return ReduxHook.wrap(Math.random().toString(36).replace(".", ""), cb);
    };

    public static exec = (action: PayloadAction, position: string) => {
        const hooks = ReduxHook.hooks.filter((h) => {
            if (h.position !== position) return false;
            if (typeof h.match === "string") return h.match === action.type;
            if (typeof h.match === "function") return h.match(action);
        });
        try {
            hooks.forEach((h) => h.handle());
        } catch (e) {
            console.error(e);
        }
    };
}

export function hookMiddleware({ getState, dispatch }) {
    return (next) => (action) => {
        ReduxHook.exec(action, "before");
        const na = next(action);
        ReduxHook.exec(action, "after");
        if (ReduxHook.tm) clearTimeout(ReduxHook.tm);
        ReduxHook.tm = setTimeout(() => {
            ReduxHook.tm = null;
            ReduxHook.exec(action, "later");
        });
        return na;
    };
}
