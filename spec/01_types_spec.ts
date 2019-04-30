describe('varaibles and constants and stuff', () => {
    it('union a type', () => {
        let x: number | string;

        x = 12;
        x = 'tacos';
    });

    it('declaring an initializing a variables', () => {
        let y = 'tacos';
        let z: string | number = 'red';
    });
    it('constants must be initialized and connot be reassigned', () => {
        const PI = 3.14;

        //but element inside constant can be reassigned
        const favoriteNumber = [5, 6, 7];
        favoriteNumber[0] = 55;

        const movie = {
            title: 'avengersEndGagme',
            yearReleased: 2018
        }
        movie.yearReleased = 2019;
    });

    it('var is broken because it doesn not have block scope', () => {
        let age = 22;
        if (age > 21) {
            var message = 'Old Enough'; //This is only for demonstration  this hoist the variable scope and it is still seen outside the block of code
        }

        expect(message).toBe('Old Enough');
    });
});

describe('literals', () => {
    it('number literals', () => {
        let z = 99;
        let n1 = 1_000_000;
        expect(1000000).toBe(n1);
        let favColor = 0xff;
        let binary = 0b010101;
        let n3 = 1.2;
    });
    describe('string literals', () => {
        it('no difference between single or double', () => {
            let name = 'Darth';
            expect(name).toBe("Darth");
        });
        it('has string literals', () => {
            let story = `it was dark and stromy night.
        The end.`
            console.log(story);
            expect('beer').toBe(`beer`);
        });
        it('has template strings', () => {
            const name = 'Bob', age = 63;
            const info = 'his name is ' + name + ' and he is ' + age + " years old.";
            const info2 = `his name is ${name} and he is ${age} years old.`; //this must have back ticks to pass or its not same as the info

            expect(info).toBe(info2);
        });

        describe('function literals', () => {
            it('how to declare a function', () => {
                expect(add(2, 2)).toBe(4); //this cal be called before the function is described

                //Named Function
                function add(a: number, b: number) {
                    return a + b;
                }

                //an anonymous function with the function keyboard
                const substract = function (a: number, b: number) {
                    return a - b;
                }

                //Anoymous arrow function 
                const multiply = (a: number, b: number) => a * b;

                expect(substract(20, 8)).toBe(12);
                expect(multiply(3, 3)).toBe(9);
            });
        });
        describe('object literals & interfaces', () => {
            it('has them', () => {
                interface Movie {
                    title: string;
                    director: string;
                    yearReleased: number;
                };

                const movie: Movie = {
                    title: 'Thor Ragnorak',
                    director: 'Johnes',
                    yearReleased: 2014
                }
                const antMan: Movie = {
                    title: 'AntMan',
                    director: 'Another Jones',
                    yearReleased: 2015
                }

                expect(movie.title).toBe('Thor Ragnorak');
                expect(movie['title']).toBe('Thor Ragnorak'); //can use this or the above this 

                const dataFromAPI = {
                    data: 'All is good',
                    'generated at': 'Server in DC'
                }

                expect(dataFromAPI.data).toBe('All is good');
                expect(dataFromAPI['generated at']).toBe('Server in DC'); //since there is a space, it has be like this [] 
            });
        });
        describe('array literals', () => {
            it('has them', () => {
                const friends = ['REggie', 'David', 'Sara', 'Sean'];
                expect(friends[1]).toBe('David');
                expect(friends[999]).toBeUndefined();
                friends[999] = 'Billy';
                expect(friends[999]).toBe('Billy');

                // declaring without initializing
                let colors: string[];

                colors = ['Red', 'Green', 'Orange'];

                // You can also use this syntax if you like it better, but I don't (usually)

                let numbers: Array<number>;

                numbers = [1, 2, 3];

                let jumbled: (string | number)[] = [1, 'dog', 'cat'];
                let jumbled1: Array<number | string>;
            });
            it('using tuple types', () => {

                let settings: [boolean, string, number] = [true, 'shirt', 12];

                const s = settings[2];

                // interface NameInfo { fullName: string, numberOfLetters: number };
                // function formatName(first: string, last: string): NameInfo {
                //     let fullName = `${last}, ${first}`;
                //     return {
                //         fullName,
                //         numberOfLetters: fullName.length
                //     };
                // }

                function formatName(first: string, last: string): [string, number] {
                    let fullName = `${last}, ${first}`;
                    return [fullName, fullName.length];
                }

                // const answer = formatName('Han', 'Solo');
                // expect(answer.fullName).toBe('Solo, Han');
                // expect(answer.numberOfLetters).toBe(9);

                const [theName, howLong] = formatName('Han', 'Solo');

                expect(theName).toBe('Solo, Han');
                expect(howLong).toBe(9);


            });
            it('writing unmaintainable code', () => {
                //Prefer union of lierals to actual enums - they are functionally the same for but more awesome
                type SeatType = 'aisle' | 'window' | 'middle';

                let mySeat: SeatType = "aisle";

            });
        });
    });
});