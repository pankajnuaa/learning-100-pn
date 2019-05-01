import * as _ from 'lodash';
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

//use f to focus and x to skip 
describe('higher order function', () => {
    it('a simple example', () => {
        type StringDecorator = (x: string) => string;
        const Identity: StringDecorator = (n) => n;

        function formatName(first: string, last: string, fn: StringDecorator = Identity) {
            return fn(`${last}, ${first}`);
        }

        expect(formatName('Luke', 'Skywalker')).toBe('Skywalker, Luke');

        expect(formatName('Han', 'Solo', paddItOut)).toBe('     Solo, Han     ');

        expect(formatName('Ben', 'Solo', (n) => '%%%' + n)).toBe('%%%Solo, Ben');

        function paddItOut(s: string) {
            return '     ' + s + '     ';
        }

    });
    describe('tag maker', () => {
        it('using a standard function', () => {
            // <h1>Content</h1>
            // <h2>Other Content</h2>

            function tagMaker(tag: string, content: string) {
                return `<${tag}>${content}</${tag}>`;
            }

            expect(tagMaker('h1', 'Content')).toBe('<h1>Content</h1>');
            expect(tagMaker('h1', 'Hi')).toBe('<h1>Hi</h1>');
        });
        it('an oop tagmaker', () => {
            class TagMaker {
                private tag: string;
                constructor(tag: string) {
                    this.tag = tag;
                }
                make(content: string) {
                    return `<${this.tag}>${content}</${this.tag}>`;
                }
            }

            const h1Maker = new TagMaker('h1');
            expect(h1Maker.make('Content')).toBe('<h1>Content</h1>');
            expect(h1Maker.make('Taco Salad')).toBe('<h1>Taco Salad</h1>');

        });
        it('as a higher-order function', () => {
            function tagMaker(tag: string): (content: string) => string {
                return (content: string) => `<${tag}>${content}</${tag}>`;;
            }

            const h1Maker = tagMaker('h1');
            const pMaker = tagMaker('p');

            expect(h1Maker('Content')).toBe('<h1>Content</h1>');
            expect(pMaker('Stuff')).toBe('<p>Stuff</p>');
            expect(tagMaker('h3')('stuff')).toBe('<h3>stuff</h3>')
        });
        it('currying a function', () => {
            function add(a: number, b: number) {
                return a + b;
            }

            const curried = _.curry(add);
            const addOne = curried(1);
            const add10 = curried(10);


            expect(addOne(22)).toBe(23);
            expect(add10(90)).toBe(100);



            function tagMaker(tag: string, content: string) {
                return `<${tag}>${content}</${tag}>`;
            }

            const curriedTagMaker = _.curry(tagMaker);

            const h1Maker = curriedTagMaker('h1');

            expect(h1Maker('Content')).toBe('<h1>Content</h1>');

        });

    });
    describe('Array Methods', () => {
        let numbers: number[];

        beforeEach(() => {
            numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        });
        it('has a forEach', () => {
            numbers.forEach((e, i, c) => console.log({ e, i, c }));
            //just for reference
            for (let element of numbers) {
                console.log(element + " from for each loop")
            }
        });

        describe('method that create a brand new array', () => {
            it('map creates a new array based on the input fromt he source array', () => {
                function doubleId(n: number) {
                    return n * 2;
                }
                const doubleIt2 = (n: number) => 2 * n;

                const double = numbers.map(n => n * 2);
                const double3 = numbers.map(doubleIt2);
                expect(double).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18])
            });
            it('flter returns a new array with the elements that have passed the predicate', () => {
                const isEven = (n: number) => n % 2 === 0;
                const evens = numbers.filter(isEven);
                expect(evens).toEqual([2, 4, 6, 8]);

                const doubledEvens = numbers.filter(isEven).map(n => n * 2);
                expect(doubledEvens).toEqual([4, 8, 12, 16])
            });
            it('a practice', () => {
                interface Vehicle {
                    vin: string;
                    makeAndModel: string;
                    mileage: number;
                }
                const vehicles: Vehicle[] = [
                    { vin: '9999', makeAndModel: 'Chevy Tahoe', mileage: 182000 },
                    { vin: 'aka92', makeAndModel: 'Toyota Prius', mileage: 89999 },
                    { vin: 'kduwi', makeAndModel: 'Ford Explorer', mileage: 99998 }
                ];

                // Your Code Here lowMileageVehicles < 100_000
                const low = (v: Vehicle) => v.mileage < 100000;
                const lowMileageVehicles = vehicles.
                    filter(low). //vehicle[] (2)
                    map(v => v.makeAndModel); //string[]

                expect(lowMileageVehicles).toEqual(['Toyota Prius', 'Ford Explorer']);
            });
        });
        describe('methods that return a single scalar value', () => {
            it('some that check the membership of an array', () => {
                expect(numbers.some(n => n > 3)).toBe(true);
                expect(numbers.every(n => n > 3)).toBe(false);
            });
            it('reduce', () => {
                let answer = numbers.reduce((s: number, n: number) => s + n);
                expect(answer).toBe(45);
                answer = numbers.reduce((s, n) => s + n, 100);
                expect(answer).toBe(145);
            });
            it('a far out weird example of using reduce.', () => {


                interface State {
                    count: number;
                }

                const initialState: State = {
                    count: 0
                }

                /*
                    We can do three different things to this state.
                    We can increment it. (+1)
                    We can decrement it. (-1)
                    We can reset it (make it back to what it was at the beginning)
                */
                interface Action {
                    type: string;
                }

                class Increment implements Action {
                    readonly type = 'INCREMENT';
                }

                class Decrement implements Action {
                    readonly type = 'DECREMENT';
                }

                class Reset implements Action {
                    readonly type = 'RESET';
                }

                class SetAt implements Action {
                    readonly type = 'SET';


                    constructor(public value: number) { }
                }

                const userActions: Action[] = [
                    new Increment(),
                    new Decrement(),
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Reset(),
                    new Increment(),
                    new SetAt(100),
                    new Increment(),
                    new Increment(),
                    new Decrement()
                ];

                type allActions = Reset | Increment | Decrement | SetAt;

                const endState = userActions.reduce((state: State, action: allActions): State => {
                    switch (action.type) {
                        case 'SET': {
                            return {
                                count: action.value
                            }
                        }
                        case 'INCREMENT': {
                            return {
                                count: state.count + 1
                            }
                        }
                        case 'DECREMENT': {
                            return {
                                count: state.count - 1
                            }
                        }
                        case 'RESET': {
                            return {
                                count: 0
                            }
                        }
                    }
                }, initialState)

                expect(endState.count).toBe(101);


            });
        });
    });


});