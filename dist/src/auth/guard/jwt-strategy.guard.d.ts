import { Strategy } from "passport-jwt";
interface JwtPayload {
    sub: string;
    role: "employee" | "customer";
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): {
        sub: string;
        role: "customer" | "employee";
    };
}
export {};
