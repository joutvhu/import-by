import {dirname, resolve} from 'path';

/**
 * Get parent directory path
 *
 * @param filePath you need get parent directory path
 */
export function parentDirname(filePath: string = __filename): string {
    const _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, cs) => cs;
    const stacks: NodeJS.CallSite[] = (new Error() as any).stack;
    Error.prepareStackTrace = _pst;

    let seenThis = false;
    const path = stacks
        .map(value => value.getFileName())
        .filter(value => typeof value === 'string' && !value.startsWith('internal/'))
        .find(value => {
            if (value === filePath)
                seenThis = true;
            else if (seenThis && value !== filePath)
                return true;
            return false;
        });
    return dirname(path != null ? path : filePath);
}

/**
 * Import by a string reference
 *
 * @param ref string reference, format: "<file path>#<property path, split by dot>"
 * @param parentPath is an absolute path to resolve file path
 * @param inner use default if property path does not specified
 */
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
