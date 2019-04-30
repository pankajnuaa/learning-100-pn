
import './styles.css';
import { calculate } from './math';



const num1 = document.getElementById("num1") as HTMLInputElement;
const num2 = document.getElementById("num2") as HTMLInputElement;
const operand = document.getElementById("operand") as HTMLInputElement;
const mathButton = document.getElementById("math") as HTMLInputElement;
const answer = document.getElementById("answer") as HTMLSpanElement;

function doMath() {
    const n1 = num1.valueAsNumber;
    const n2 = num2.valueAsNumber;

    answer.innerText = (calculate(n1, n2, operand.value)).toString();
}
mathButton.addEventListener('click', doMath);



