import { DataTypes } from "sequelize";
import db from "../config/database.js";

const TrHistoryDataPinjaman = db.define("TR_HISTORY_DATA_PINJAMAN", {
    UUID_HIS_PINJAMAN: {
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
    BUNGA_ANGSURAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    ANGSURAN_BERSIH: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    BUNGA_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    DATE_START: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DATE_END: {
        type: DataTypes.DATE,
        allowNull: false
    },
    UUID_PENGAJUAN_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "TR_PENGAJUAN_PINJAMAN",
            key: "UUID_PENGAJUAN_PINJAMAN"
        }
    }
}, {
    freezeTableName: true
});

(async () => {
    const { default: TR_PENGAJUAN_PINJAMAN } = await import('./TR_PENGAJUAN_PINJAMAN.js');

    TrHistoryDataPinjaman.belongsTo(TR_PENGAJUAN_PINJAMAN, {
        foreignKey: 'UUID_PENGAJUAN_PINJAMAN',
        as: 'TrPengajuanPinjaman'
    });

})();

export default TrHistoryDataPinjaman;

console.log("Creating TR_HISTORY_DATA_PINJAMAN");
