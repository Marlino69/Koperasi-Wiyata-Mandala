import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;


const MsGeneralSetting = db.define("MS_GENERALSETTING", { 
    UUID_SETTING: {
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
        defaultValue: DataTypes.NOW // Default to current date and time
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
    GS_CODE: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    DATA_TYPE: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    GS_VALUE: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    freezeTableName: true 
});

export default MsGeneralSetting;

console.log("Creating MS_GENERALSETTING");