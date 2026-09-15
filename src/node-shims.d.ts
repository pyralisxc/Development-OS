declare module 'node:fs' { export const promises: any; }
declare module 'node:path' { const path: any; export default path; }
declare module 'node:url' { export function fileURLToPath(value: string | URL): string; }
declare module 'node:crypto' { const crypto: any; export default crypto; }
declare module 'node:child_process' { export function spawn(command: string, args?: readonly string[], options?: any): any; }
declare module 'node:test' { const test: (name: string, fn: (...args: any[]) => any) => void; export default test; }
declare module 'node:assert/strict' { const assert: any; export default assert; }
declare const process: any;
