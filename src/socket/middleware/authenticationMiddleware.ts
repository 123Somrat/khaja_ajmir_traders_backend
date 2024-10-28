//Authenticate user before upgrade protocol request
const socketAuthenticationMiddleware = (req: any, res: any, next: any) => {
  const token = req._query.token; // Extract token from query string
  console.log(token);
  // Example token validation
  if (token === "abc") {
    next(); // Allow WebSocket upgrade
  } else {
    console.log("Unauthorized request for WebSocket upgrade");
    res.writeHead(401, "Unauthorized"); // Send 401 and close connection
    res.end("Unauthorized");
  }
};

export default socketAuthenticationMiddleware;
