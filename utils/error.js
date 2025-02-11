function generateRandomResponse() {
  const successResponse = { status: 200, message: "Success" };
  const errorResponses = [
    { status: 400, message: "Bad Request" },
    { status: 401, message: "Unauthorized" },
    { status: 403, message: "Forbidden" },
    { status: 404, message: "Not Found" },
    { status: 500, message: "Internal Server Error" },
    { status: 502, message: "Bad Gateway" },
    { status: 503, message: "Service Unavailable" },
  ];

  // 80% chance of success, 20% chance of error
  const successProbability = 0.6;
  const randomValue = Math.random();

  if (randomValue < successProbability) {
    return {
      type: "success",
      successResponse: successResponse,
    }; // Success response
  } else {
    const errorIndex = Math.floor(Math.random() * errorResponses.length);
    return {
      type: "error",
      errorResponse: errorResponses[errorIndex],
    }; // Error response
  }
}

module.exports = generateRandomResponse;
