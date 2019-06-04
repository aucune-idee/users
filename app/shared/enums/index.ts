export * from "./armies";
export * from "./game-type";

export function enum2Array(enumParam: any): Array<string>{
    return Object.values(enumParam).filter(x => typeof x === 'string') as Array<string>;
}