import { DataTypes } from "sequelize";
import db from "../config/database.js";

const TrMonthlyFinanceAnggota = db.define("TR_MONTHLY_FINANCE_ANGGOTA", {
    UUID_MONTHLY_FINANCE_ANGGOTA: {
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
    AMOUNT_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    AMOUNT_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    UUID_MS_USER: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "MS_USER",
            key: "UUID_MS_USER"
        }
    },
    WAGE: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    freezeTableName: true
});

(async () => {
    const { default: MS_USER } = await import('./MS_USER.js');

    TrMonthlyFinanceAnggota.belongsTo(MS_USER, {
        foreignKey: 'UUID_MS_USER',
        targetKey: 'UUID_MS_USER',
        as: 'MsUser'
    });

})();

export default TrMonthlyFinanceAnggota;

console.log("Creating TR_MONTHLY_FINANCE_ANGGOTA");