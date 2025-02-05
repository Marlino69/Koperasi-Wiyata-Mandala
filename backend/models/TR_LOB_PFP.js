import { DataTypes } from "sequelize";
import db from "../config/database.js";

const TrLobPfp = db.define("TR_LOB_PFP", { 
    UUID_LOB_PFP: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
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
    LOB: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    UUID_MS_USER: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "MS_USER",
            key: "UUID_MS_USER"
        }
    }
}, {
    freezeTableName: true 
});

(async () => {
    const {default: MS_USER} = await import('./MS_USER.js');
    TrLobPfp.belongsTo(MS_USER, {
        foreignKey: "UUID_MS_USER"
    });
})

export default TrLobPfp;

console.log("Creating TR_LOB_PFP");
