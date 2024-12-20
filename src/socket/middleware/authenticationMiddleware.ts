//Authenticate user before upgrade protocol request
const socketAuthenticationMiddleware = (req: any, res: any, next: any) => {
  const token = req._query.token; // Extract token from query string

  // Example token validation
  if (token === "abcd") {
    next(); // Allow WebSocket upgrade
  } else {
    console.error("Unauthorized access attempt");
    const error = new Error("Unauthorized"); // Create an error with a message
    next(error); // Pass the error to the next function
  }
  }
;

export default socketAuthenticationMiddleware;
