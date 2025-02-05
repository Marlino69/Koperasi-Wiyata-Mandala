import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const MS_TYPE_SIMPANAN = db.define("MS_TYPE_SIMPANAN", {
    UUID_TYPE_SIMPANAN: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    IS_ACTIVE: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    IS_DELETED: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DTM_CRT: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
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
    TYPE_NAME: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    TYPE_DESC: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    MINIMUM_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    MAXIMUM_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    INTEREST_RATE: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    IS_MANDATORY: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DEFAULT_NOMINAL: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    IS_AUTO_APPROVE: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    freezeTableName: true
})

export default MS_TYPE_SIMPANAN;

console.log("Creating MS_TYPE_SIMPANAN");