const productionURL = "https://expensestracker-server.herokuapp.com"; // Production
const developmentURL = "http://localhost:5000"; // Development

export const config = process.env.NODE_ENV === "development" ? developmentURL : productionURL;
