import {dirname, resolve} from 'path';

export function parentDirname(): string {
    const _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, cs) => cs;
    const stacks: NodeJS.CallSite[] = (new Error() as any).stack;
    Error.prepareStackTrace = _pst;

    let seenThis = false;
    const path = stacks
        .map(value => value.getFileName())
        .filter(value => typeof value === 'string' && !value.startsWith('internal/'))
        .find(value => {
            if (value === __filename)
                seenThis = true;
            else if (seenThis && value !== __filename)
                return true;
            return false;
        });
    return path != null ? dirname(path) : __dirname;
}

export function importBy<T>(ref: string, parentPath: string = parentDirname(), inner = true): T | any {
    let [path, name] = ref.split('#', 2);

    if (parentPath != null && path[0] == '.')
        path = resolve(parentPath, path);
    path = require.resolve(path);

    let module = require(path);
    if (name != null) {
        const n = name.split('.');
        for (const i of n)
            module = module[i];
    } else if (inner && module['default'] != null)
        module = module['default'];

    return module;
}
