import { DataTypes } from "sequelize";
import db from "../config/database.js";

const TrHistoryDataSimpanan = db.define("TR_HISTORY_DATA_SIMPANAN", {
    UUID_HIS_SIMPANAN: {
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
    WITHDRAW_AMOUNT: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    DEPOSIT_AMOUNT: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    SHU_AMOUNT: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    CURRENT_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    BUNGA_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    UUID_PENGAJUAN_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "TR_PENGAJUAN_SIMPANAN",
            key: "UUID_PENGAJUAN_SIMPANAN"
        }
    }
}, {
    freezeTableName: true
});

(async () => {
    const { default: TR_PENGAJUAN_SIMPANAN } = await import('./TR_PENGAJUAN_SIMPANAN.js');

    TrHistoryDataSimpanan.belongsTo(TR_PENGAJUAN_SIMPANAN, {
        foreignKey: 'UUID_PENGAJUAN_SIMPANAN',
        as: 'TrPengajuanSimpanan'
    });
    
})();

export default TrHistoryDataSimpanan;

console.log("Creating TR_HISTORY_DATA_SIMPANAN");
