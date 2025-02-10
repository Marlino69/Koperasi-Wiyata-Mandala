import { Sequelize } from "sequelize";

const customLogger = (msg) => {
    const timestamp = new Date().toISOString();
    const timestampColored = `\x1b[32m[${timestamp}]\x1b[0m`;
    console.log(`${timestampColored} - ${msg}`);
};
  
const db = new Sequelize('Koperasi', "postgres", "123", {
    host: "localhost",
    dialect: "postgres",
    port: "5432",
    logging: customLogger 
});

export default db;
