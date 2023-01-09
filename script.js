const area = document.querySelector('#input');
const result = document.querySelector('#result');
const btnContainer = document.querySelector('.btnContainer');
const btnArr = document.querySelectorAll('.btn');
const oper = ['+', '-', '*', '/'];
let prevNumber;
let operatorIndex = 0;
let numberIndex = 1;

function submit(data) {
  if (oper.includes(data[data.length - 1])) {
    return;
  }
  area.textContent = '';
  const numbers = data.split(/\+|\-|\*|\//g);
  const operators = data.replace(/[0-9]|\./g, '').split('');

  while (operators.length > operatorIndex) {
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
    }
    numberIndex++;
    operatorIndex++;
  }
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
    if (choice === '=') return submit(area.textContent);
    if (choice === 'C') return (area.textContent = '');
    if (choice === '<')
      return (area.textContent = area.textContent.slice(0, -1));

    if (
      oper.some(op => choice.includes(op)) &&
      oper.includes(area.textContent[area.textContent.length - 1])
    )
      return;
    e.target.animate(
      { background: 'rgb(39, 101, 225)' },
      { duration: 100, iteration: 1 }
    );
    area.textContent += e.target.textContent;
  }
});

addEventListener('keydown', e => {
  const { key, code } = e;
  if (key === 'Enter' || key === '=') submit(area.textContent);
  if (code === 'KeyC') area.textContent = '';
  if (key === 'Backspace' || key === 'Delete') {
    area.textContent = area.textContent.slice(0, -1);
  }
  if (
    oper.includes(key) &&
    oper.includes(area.textContent[area.textContent.length - 1])
  ) {
    return;
  }
  if (
    code.includes('Digit') ||
    code.includes('Numpad') ||
    oper.includes(key) ||
    code.includes('Period')
  ) {
    const targetedBtn = Array.from(btnArr).find(btn => btn.textContent === key);
    targetedBtn.animate(
      { background: 'rgb(39, 101, 225)' },
      { duration: 100, iteration: 1 }
    );
    area.textContent += key;
  }
});
