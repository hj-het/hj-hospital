// api.js
const API_BASE_URL = "https://hjhelthcare.kisskross.life/api";  

// Utility function for handling HTTP POST requests
export const postRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        // If response is successful, return the result
        if (response.ok) {
            return result;
        } else {
            // If the response is not successful, throw error with message
            throw new Error(result.message || "Something went wrong");
        }
    } catch (error) {
        // Catching network or other errors
        console.error("Error occurred:", error);
        throw error;  // Re-throw the error to be handled by the calling function
    }
};

// Utility function for handling HTTP GET requests
export const getRequest = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        throw error;
    }
};

// Utility function for handling HTTP PUT requests
export const putRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        throw error;
    }
};

// Utility function for handling HTTP DELETE requests
export const deleteRequest = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        throw error;
    }
};
