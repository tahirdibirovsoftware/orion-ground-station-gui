/// <reference types="vite/client" />

declare module '*.obj' {
    const value: string;
    export default value;
}


// renderer/src/globals.d.ts
declare module '*.json' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any;
    export default value;
  }
  