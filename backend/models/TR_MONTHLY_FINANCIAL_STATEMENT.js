import { DataTypes } from "sequelize";
import db from "../config/database.js";

const TrMonthlyFinancialStatement = db.define("TR_MONTHLY_FINANCE_STATEMENT", {
    UUID_MONTHLY_FINANCIAL_STATEMENT: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    DTM_CRT: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    USR_CRT: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    DTM_UPD: {
        type: DataTypes.DATE,
        allowNull: true
    },
    USR_UPD: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    TOTAL_AMOUNT_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    TOTAL_AMOUNT_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    TOTAL_INCOME: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    TOTAL_EXPENDITURE: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
}, {
    freezeTableName: true
});


export default TrMonthlyFinancialStatement;

console.log("Creating TR_MONTHLY_FINANCIAL_STATEMENT");
