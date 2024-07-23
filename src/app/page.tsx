'use client'
import Image from "next/image"; // Importing the Image component
import { useState } from "react"; // Importing useState to manage state in the component

export default function Home() {
  // Setting up state variables to manage data within the component
  const [inputValue, setInputValue] = useState(""); // Stores the user's input value
  const [apiResponse, setApiResponse] = useState(""); // Stores the response from the API
  const [squareColor, setSquareColor] = useState("black"); // Initial color of the square is black
  const [showWarning, setShowWarning] = useState(false); // State to control the display of the warning popup
  const [errorMessage, setErrorMessage] = useState(""); // State to store any error messages

  // Function to handle changes in the input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the input value with the user's input
    setErrorMessage(""); // Clear any previous error messages when input changes
  };

  // Function to handle the submit button click
  const handleSubmit = async () => {
    // Validate the input to check if it's a number
    const number = parseInt(inputValue, 10);
    if (isNaN(number)) {
      setErrorMessage("Please enter a valid number."); // Show an error message if the input is not a number
      return;
    }

    try {
      // Make a request to the API with the input number
      const response = await fetch(`https://personal-y0lex6zh.outsystemscloud.com/ServiceTesting/rest/ColorPicker/GetColor/?int=${number}`, {
        method: "GET",
      });

      // Process the response from the API
      const data = await response.text(); // Get the response as text
      setApiResponse(data); // Store the response data

      // Check if the response is an error message
      if (data.startsWith("Input out of range")) {
        setShowWarning(true); // Show the warning popup if input is out of range
      } else {
        setSquareColor(data); // Update the square color based on the API response
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      setApiResponse("Error fetching data"); // Show an error message if the API request fails
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter an integer" // Placeholder text for the input field
            value={inputValue} // The current value of the input field
            onChange={handleInputChange} // Function to call when the input value changes
            className="border border-gray-300 rounded-md px-4 py-2 text-black w-48" // Styling for the input field
          />
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit 
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message if there is one */}
        </div>
        <div className="w-24 h-24 rounded-md" style={{ backgroundColor: squareColor }} /> {/* Display a square with a dynamic background color */}
      </div>
      <div className="mt-8">
        <p>API Response: {apiResponse}</p> {/* Display the API response */}
      </div>
      <div className="mt-4">
        <p className="text-gray-500">Insert a number between 1 and 50</p> {/* Instruction text for the user */}
      </div>

      {/* Display a warning popup if showWarning is true */}
      {showWarning && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-red-500 font-bold">Insert a number between 1 and 50!</p> {/* Warning message */}
            <p>{apiResponse}</p> {/* Display the API response */}
            <button onClick={() => setShowWarning(false)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Close {/* Text on the close button */}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
