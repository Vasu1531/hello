const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Define your user ID
const USER_ID = "john_doe_17091999";

// Middleware
app.use(bodyParser.json());

// Process Arrays Function
const processArrays = (inputArray) => {
  const evenNumbers = inputArray.filter(num => num % 2 === 0);
  const oddNumbers = inputArray.filter(num => num % 2 !== 0);
  const alphabetsUppercase = inputArray.filter(char => typeof char === 'string' && char.match(/[a-zA-Z]/)).map(char => char.toUpperCase());

  return { evenNumbers, oddNumbers, alphabetsUppercase };
};

// POST /process_array
app.post('/process_array', (req, res) => {
  try {
    const inputArray = req.body.array;

    if (!inputArray || !Array.isArray(inputArray)) {
      throw new Error("Invalid input. 'array' key is missing or not an array.");
    }

    const { evenNumbers, oddNumbers, alphabetsUppercase } = processArrays(inputArray);

    const response = {
      user_id: USER_ID,
      is_success: true,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets_uppercase: alphabetsUppercase
    };

    res.status(200).json(response);
  } catch (error) {
    const errorResponse = {
      user_id: USER_ID,
      is_success: false,
      message: error.message || "An error occurred."
    };
    
    res.status(400).json(errorResponse);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
