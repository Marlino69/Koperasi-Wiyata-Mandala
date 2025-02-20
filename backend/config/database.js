import { Sequelize } from "sequelize";

const customLogger = (msg) => {
    const timestamp = new Date().toLocaleString('sv-SE', { timeZoneName: 'short' });
    const timestampColored = `\x1b[32m[${timestamp}]\x1b[0m`;
    console.log(`${timestampColored} - ${msg}`);
};
  

const db = new Sequelize('KPS', "postgres", "123", {
    host: "localhost",
    dialect: "postgres",
    port : 5432,
    logging: customLogger 
});

export default db;
