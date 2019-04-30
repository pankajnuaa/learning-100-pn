describe('Functions', () => {
    describe('params', () => {
        it('can do optional paramerters', () => {
            type char = string;
            function formatname(first: string, last: string, mi?: char) {
                let fullname = `${last}, ${first}`;
                if (mi !== undefined) {
                    fullname += ` ${mi}.`;
                }
                return fullname;
            }
            expect(formatname('Han', 'Solo')).toBe('Solo, Han');
            expect(formatname('Han', 'Solo', 'D')).toBe('Solo, Han D.')
        });
        it('arbitrary number of arguments', () => {

            function add(a: number, b: number, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((s, n) => s + n, firstTwo);
            }

            expect(add(2, 2)).toBe(4);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
        it('has an array spread operator', () => {
            const numbers = [2, 3, 4, 5];
            let newNumbers = [1, ...numbers, 6];
            expect(newNumbers).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });
});