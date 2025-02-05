import { DataTypes } from "sequelize";
import db from "../config/database.js";

const TrLobBerita = db.define("TR_LOB_BERITA", {
    UUID_LOB_BERITA: {
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
        type: DataTypes.TEXT,
        allowNull: true
    },
    UUID_BERITA: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "TR_BERITA",
            key: "UUID_BERITA"
        }
    }
}, {
    freezeTableName: true
});

(async () => {
    const { default: Berita } = await import('./TR_BERITA.js');
    TrLobBerita.belongsTo(Berita, {
        foreignKey: 'UUID_BERITA',
        targetKey: 'UUID_BERITA',
        as: 'lobBerita'
    });
})();

export default TrLobBerita;

console.log("Creating TR_LOB_BERITA");
