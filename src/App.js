import React, { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import './App.css';

const App = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [formula, setFormula] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleButtonClick = (value) => {
    switch (value) {
      case 'AC':
        setCurrentValue('0');
        setFormula('');
        setPrevValue(null);
        setOperator(null);
        setResetDisplay(false);
        break;
      case '=':
        if (operator && prevValue !== null) {
          const result = evaluate(prevValue, currentValue, operator);
          setCurrentValue(result.toString());
          setFormula(`${formula}=${result}`);
          setPrevValue(result);
          setOperator(null);
          setResetDisplay(true);
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (operator && prevValue !== null) {
          const result = evaluate(prevValue, currentValue, operator);
          setPrevValue(result);
          setCurrentValue(result.toString());
          setFormula(`${result}${value}`);
        } else {
          setPrevValue(parseFloat(currentValue));
          setFormula(`${formula}${value}`);
        }
        setOperator(value);
        setResetDisplay(true);
        break;
      case '.':
        if (!currentValue.includes('.')) {
          setCurrentValue(currentValue + value);
          setFormula(formula + value);
        }
        break;
      default:
        if (resetDisplay) {
          setCurrentValue(value);
          setResetDisplay(false);
        } else {
          setCurrentValue(currentValue === '0' ? value : currentValue + value);
        }
        setFormula(formula + value);
        break;
    }
  };

  const evaluate = (prev, curr, op) => {
    switch (op) {
      case '+':
        return prev + parseFloat(curr);
      case '-':
        return prev - parseFloat(curr);
      case '*':
        return prev * parseFloat(curr);
      case '/':
        return prev / parseFloat(curr);
      default:
        return curr;
    }
  };

  return (
    <div id="calculator">
      <Display currentValue={currentValue} />
      <div id="buttons">
        <Button id="clear" value="AC" onClick={handleButtonClick} />
        <Button id="divide" value="/" onClick={handleButtonClick} />
        <Button id="multiply" value="*" onClick={handleButtonClick} />
        <Button id="seven" value="7" onClick={handleButtonClick} />
        <Button id="eight" value="8" onClick={handleButtonClick} />
        <Button id="nine" value="9" onClick={handleButtonClick} />
        <Button id="subtract" value="-" onClick={handleButtonClick} />
        <Button id="four" value="4" onClick={handleButtonClick} />
        <Button id="five" value="5" onClick={handleButtonClick} />
        <Button id="six" value="6" onClick={handleButtonClick} />
        <Button id="add" value="+" onClick={handleButtonClick} />
        <Button id="one" value="1" onClick={handleButtonClick} />
        <Button id="two" value="2" onClick={handleButtonClick} />
        <Button id="three" value="3" onClick={handleButtonClick} />
        <Button id="equals" value="=" onClick={handleButtonClick} />
        <Button id="zero" value="0" onClick={handleButtonClick} />
        <Button id="decimal" value="." onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default App;
