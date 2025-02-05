import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const TR_PENGAJUAN_SIMPANAN = db.define("TR_PENGAJUAN_SIMPANAN", {
    UUID_PENGAJUAN_SIMPANAN: {
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
    UUID_MS_STATUS_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "MS_STATUS_SIMPANAN",
            key: "UUID_STATUS_SIMPANAN"
        }
    },
    UUID_MS_TYPE_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull:false,
        references: {
            model: "MS_TYPE_SIMPANAN",
            key: "UUID_TYPE_SIMPANAN"
        }
    },
    UUID_MS_USER: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "MS_USER",
            key: "UUID_MS_USER"
        }
    },
    NO_KONTRAK: {
        allowNull:true,
        type: DataTypes.STRING,
    },
    NOMINAL: {
        allowNull:false,
        type: DataTypes.BIGINT,
    },
    REASON: {
        type: DataTypes.TEXT,
    },
    DTM_APPROVED: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    freezeTableName: true
});

(async () => {
    const { default: MS_USER } = await import('./MS_USER.js');
    const { default: MS_STATUS_SIMPANAN } = await import('./MS_STATUS_SIMPANAN.js');
    const { default: MS_TYPE_SIMPANAN } = await import('./MS_TYPE_SIMPANAN.js');
    const { default: TR_History_Data_Simpanan} = await import('./TR_HISTORY_DATA_SIMPANAN.js');

    TR_PENGAJUAN_SIMPANAN.belongsTo(MS_USER, {
        foreignKey: 'UUID_MS_USER',
        targetKey: 'UUID_MS_USER',
        as: 'user'
    });

    TR_PENGAJUAN_SIMPANAN.belongsTo(MS_STATUS_SIMPANAN, {
        foreignKey: 'UUID_MS_STATUS_SIMPANAN',
        targetKey: 'UUID_STATUS_SIMPANAN',
        as: 'status'
    });

    TR_PENGAJUAN_SIMPANAN.belongsTo(MS_TYPE_SIMPANAN, {
        foreignKey: 'UUID_MS_TYPE_SIMPANAN',
        targetKey: 'UUID_TYPE_SIMPANAN',
        as: 'type'
    });

    TR_PENGAJUAN_SIMPANAN.hasMany(TR_History_Data_Simpanan, {
        foreignKey: 'UUID_PENGAJUAN_SIMPANAN',
        sourceKey: 'UUID_PENGAJUAN_SIMPANAN',
        as: 'historySimpanan'
    });

})();

export default TR_PENGAJUAN_SIMPANAN;

console.log("Creating TR_PENGAJUAN_SIMPANAN");
