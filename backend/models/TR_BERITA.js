import { Sequelize } from "sequelize";
import db from "../config/database.js";
import TrLobBerita from "../models/TR_LOB_BERITA.js"; // Import TR_LOB_BERITA

const { DataTypes } = Sequelize;

const Berita = db.define("TR_BERITA", {
    UUID_BERITA: {
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
    USER_CRT: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    DTM_UPD: {
        type: DataTypes.DATE,
        allowNull: true
    },
    USER_UPD: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    UUID_MS_USER: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    JUDUL_BERITA: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    ISI_BERITA: {
        type: DataTypes.STRING(2000),
        allowNull: true
    }
}, {
    freezeTableName: true
});

// Define association with TR_LOB_BERITA
Berita.hasOne(TrLobBerita, {
    foreignKey: 'UUID_BERITA',
    sourceKey: 'UUID_BERITA',
    as: 'lobBerita'
});

export default Berita;

console.log("Creating TR_BERITA");