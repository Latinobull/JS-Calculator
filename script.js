const area = document.querySelector('#input');
const result = document.querySelector('#result');
const btnContainer = document.querySelector('.btnContainer');
const oper = ['+', '-', '*', '/'];
let prevNumber;
let operatorIndex = 0;
let numberIndex = 1;
btnContainer.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const choice = e.target.dataset.value;
    if (choice.match('=')) return submit(area.textContent);
    if (choice.match('C')) return (area.textContent = '');
    if (
      e.target.className === 'operators' &&
      oper.some(op =>
        area.textContent[area.textContent.length - 1].includes(op)
      )
    )
      return;
    area.textContent += e.target.dataset.value;
  }
});

function submit(data) {
  area.textContent = '';
  const numbers = data.split(/\+|\-|\×|\÷/g);
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

      default:
        break;
    }
  }
  result.textContent = '';
  result.textContent = prevNumber;
}

function add(num1, num2) {
  prevNumber = parseInt(num1) + parseInt(num2);
  numberIndex++;
  operatorIndex++;
}

function minus(num1, num2) {
  prevNumber = parseInt(num1) - parseInt(num2);
  numberIndex++;
  operatorIndex++;
}
