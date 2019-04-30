export
    function calculate(a: number, b: number, operand: string) {
    if (operand == "+") {
        const sum = a + b;
        return sum.toString();
    } else if (operand == "-") {
        return (a - b).toString();
    } else if (operand == "*") {
        return (a * b).toString();
    } else if (operand == "/") {
        return (a / b).toString();
    }

}