import axios from "axios";

export const saveFormData = async (data) => {
  try {
    // Assuming the backend endpoint for saving form data
    const response = await axios.post("/api/save-cloze-question", data); 
    return response.data;  // Return the server's response data
  } catch (error) {
    console.error("Error saving form data:", error);
    throw error; // Throw error if there's a problem with the request
  }
};


