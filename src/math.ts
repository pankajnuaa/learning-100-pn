export
    function calculate(a: number, b: number, operand: string) {
    if (operand == "+") {
        const sum = a + b;
        return sum;
    } else if (operand == "-") {
        return (a - b);
    } else if (operand == "*") {
        return (a * b);
    } else if (operand == "/") {
        return (a / b);
    }

}