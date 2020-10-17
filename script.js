'use strict';

const input = document.querySelector('input');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

let formula = '';
let tmp = '';
let flag = false;
let reset = false;

numbers.forEach(item => {
    item.onclick = () => {
        if (reset && flag) {
            reset = false;
            flag = false;
            formula += input.value + tmp;
            tmp = '';
            input.value = item.textContent;
        } else if ((!(flag) && (input.value === '0')) || reset) {
            reset = false;
            input.value = item.textContent;
        } else {
            if (flag) {
                formula += input.value + tmp;
                tmp = '';
                input.value = item.textContent;
                flag = false;
            } else {
                input.value += item.textContent;
            }
        }

        if (input.value.split('.')[0] === '') {
            input.value = '0' + input.value;
        }
        if (input.value.split('.').length === 3) {
            input.value = input.value.slice(0, -1);
        }
    };
});

operators.forEach(item => {
    item.onclick = () => {
        flag = true;
        operators.forEach(op => {
            op.classList.remove('selected');
        });
        switch (item.dataset.operator) {
            case 'addition':
                tmp = '+';
                break;
            case 'subtraction':
                tmp = '-';
                break;
            case 'multiplication':
                tmp = '*';
                break;
            case 'division':
                tmp = '/'
                break;
            case 'percent':
                break;
            case 'equal':
                input.value = eval(formula + input.value);
                formula = '';
                tmp = '';
                flag = false;
                reset = true;
                break;
        }
        if (item.dataset.operator !== 'equal') {
            item.classList.add('selected');
        }
        if (input.value === '0') {
            flag = false;
            tmp = '';
            item.classList.remove('selected');
        }
    };
});

document.querySelector('.plus_or_minus').onclick = () => {
    input.value = eval(input.value) * -1;
};

document.querySelector('.percent').onclick = () => {
    input.value = eval(input.value) * 0.01;
};

document.querySelector('.all_clear').onclick = () => {
    formula = '';
    tmp = '';
    flag = false;
    reset = false;
    input.value = '0';
};