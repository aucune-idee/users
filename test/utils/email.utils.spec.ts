import { sanitizeEmail } from "../../app/utils/email.utils";

jest.mock('../../app/models/user.model');

describe("Email utils", () => {
    describe("sanitizeEmail()", () => {
        it('Remove dots', () => {
            expect(sanitizeEmail("test@email.com")).toEqual("test@emailcom");
        });
        it('Remove multiple dots', () => {
            expect(sanitizeEmail("t.e.s.t@e.m.a.i.l.com")).toEqual("test@emailcom");
        });
        it('Remove gmail filter', () => {
            expect(sanitizeEmail("test+filter@email.com")).toEqual("test@emailcom");
        });
    });
})