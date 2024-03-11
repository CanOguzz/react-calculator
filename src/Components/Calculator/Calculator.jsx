import React from "react";
import "./Calculator.css";

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const Display = ({ input, output }) => {
  return (
    <div className="output">
      <span className="result">{output}</span>
      <span id="display" className="input">
        {input}
      </span>
    </div>
  );
};

const Key = ({ keyData: { id, value }, handleInput }) => {
  return (
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );
};

const Keyboard = ({ handleInput }) => {
  return (
    <div className="keys">
      {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
  );
};

const Calculator = () => {
  const [calculatorData, setCalculatorData] = React.useState("");
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");

  const handleSubmit = () => {
    console.log(handleSubmit, calculatorData);
    const total = eval(calculatorData);
    setInput(`${total}`);
    setOutput(`${total}`);
    setCalculatorData(`${total}`);
  };
  const handleClear = () =>  {
    console.log("handleClear called");
    setInput("0");
    setOutput("");
    setCalculatorData("");
  };

  const dotOperator = () => {
    console.log("dotOperator called");
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData}0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formatedValue =
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formatedValue);
      }
    }
  };
  const handleOperators = (value) => {
    console.log("handleOperators");
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calculatorData.charAt(calculatorData.length - 1);

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            setCalculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          );
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  const handleNumbers = (value) => {
    console.log("handleNumbers called with value:", value);
    console.log("handleNumbers");
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const handleInput = (value) => {
    console.log("handleInput called with value:", value);
    const number = numbers.find((num) => num === value.toString());
    console.log("number:", number);
    const operator = operators.find((op) => op === value.toString());

    if (number !== undefined) {
      handleNumbers(value);
    } else if (operator !== undefined) {
      handleOperators(value);
    } else {
      switch (value) {
        case "=":
          handleSubmit();
          break;
        case "AC":
          handleClear();
          break;
        case ".":
          dotOperator();
          break;
        default:
          break;
      }
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  React.useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};

export default Calculator;
