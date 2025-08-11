const API_URL = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuaWt1bmouZ3VwdGFfMjAyNkB3b3hzZW4uZWR1LmluIiwiZXhwIjoxNzU0ODk2MzEwLCJpYXQiOjE3NTQ4OTU0MTAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwNjE2NTA5Yi0wNzJkLTRmYzctYTkwNy02MWFmMmViNDA5NzciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJuaWt1bmogZ3VwdGEiLCJzdWIiOiJjYTQwZDQxNC1hZTVhLTRlMjItOGM4Ny05Yjg3ZTU4NDI3OGYifSwiZW1haWwiOiJuaWt1bmouZ3VwdGFfMjAyNkB3b3hzZW4uZWR1LmluIiwibmFtZSI6Im5pa3VuaiBndXB0YSIsInJvbGxObyI6IjIyd3UwMTA0MTUzIiwiYWNjZXNzQ29kZSI6IlVNWFZRVCIsImNsaWVudElEIjoiY2E0MGQ0MTQtYWU1YS00ZTIyLThjODctOWI4N2U1ODQyNzhmIiwiY2xpZW50U2VjcmV0IjoiYkF1VUR0bnpCakV1Y01yRiJ9.Lk2nnzOTEA5Q8mHqEX7L1MCgZvEEkpLqjdiAXLjwLe0"; 

/**
 * A reusable logging function that sends a POST request to the Test Server's Log API.
 * @param {string} stack - The stack where the log originated (e.g., "backend", "frontend").
 * @param {string} level - The severity level of the log (e.g., "error", "info", "warn").
 * @param {string} component - The specific package or component (e.g., "handler", "db", "api").
 * @param {string} message - A descriptive log message.
 */
async function Log(stack, level, component, message) {
  if (!ACCESS_TOKEN) {
    console.error("Access Token is not set. Cannot log to API.");
    return;
  }

  const logPayload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: component.toLowerCase(),
    message: message
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(logPayload)
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(`Failed to log: ${JSON.stringify(data)}`);
      return;
    }

    console.log(`Log created successfully: ${data.logID}`);
  } catch (error) {
    console.error("An error occurred while trying to log:", error.message);
  }
}

export default Log;