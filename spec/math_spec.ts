import { calculate } from "../src/math";

describe('the math module', () => {
    it('can do add', () => {
        expect(calculate(2, 2, '+')).toBe(4);
    });
    it('can substract', () => {
        expect(calculate(5, 3, "-")).toBe(2)
    });
    it('can multiply', () => {
        expect(calculate(5, 3, "*")).toBe(15)
    });
    it('can divide', () => {
        expect(calculate(15, 5, "/")).toBe(3)
    });
});