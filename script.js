const area = document.querySelector('#input');
const result = document.querySelector('#result');
const btnContainer = document.querySelector('.btnContainer');
const oper = ['+', '-', '*', '/'];
let prevNumber;
let operatorIndex = 0;
let numberIndex = 1;

function submit(data) {
  if (
    oper.some(op => area.textContent[area.textContent.length - 1].includes(op))
  )
    return;
  area.textContent = '';
  const numbers = data.split(/\+|\-|\*|\//g);
  const operators = data.replace(/[0-9]|\./g, '').split('');

  while (operators.length - 1 >= operatorIndex) {
    let num1 = prevNumber || numbers[0];
    let num2 = numbers[numberIndex];
    switch (operators[operatorIndex]) {
      case '+':
        add(num1, num2);
        break;
      case '-':
        minus(num1, num2);
        break;
      case '*':
        multiply(num1, num2);
        break;
      case '/':
        divide(num1, num2);
        break;

      default:
        break;
    }
    numberIndex++;
    operatorIndex++;
  }
  result.textContent = '';
  result.textContent = prevNumber;
  prevNumber = undefined;
  operatorIndex = 0;
  numberIndex = 1;
}

function add(num1, num2) {
  prevNumber = parseFloat(num1) + parseFloat(num2);
}

function minus(num1, num2) {
  prevNumber = parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
  prevNumber = parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
  prevNumber = parseFloat(num1) / parseFloat(num2);
}

btnContainer.addEventListener('click', e => {
  if (e.target.matches('.btn')) {
    const choice = e.target.textContent;
    if (choice.match('=')) return submit(area.textContent);
    if (choice.match('C')) return (area.textContent = '');
    if (choice.match('<'))
      return (area.textContent = area.textContent.slice(0, -1));

    if (
      e.target.className === 'operators' &&
      oper.some(op =>
        area.textContent[area.textContent.length - 1].includes(op)
      )
    )
      return;
    area.textContent += e.target.textContent;
  }
});

addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === '=') return submit(area.textContent);
  if (e.code === 'KeyC') return (area.textContent = '');
  if (e.key === 'Backspace' || e.key === 'Delete') {
    return (area.textContent = area.textContent.slice(0, -1));
  }
  if (
    oper.some(op => e.key.includes(op)) &&
    oper.some(op => area.textContent[area.textContent.length - 1].includes(op))
  ) {
    return;
  }
  console.log(e);
  if (
    e.code.includes('Digit') ||
    e.code.includes('Numpad') ||
    oper.some(op => e.key.includes(op)) ||
    e.code.includes('Period')
  ) {
    area.textContent += e.key;
  }
});
