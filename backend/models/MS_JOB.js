import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const MS_JOB = db.define("MS_JOB", { 
    UUID_MS_JOB: {
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
    JOB_CODE: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    JOB_DESC: {
        type: DataTypes.STRING(70),
        allowNull: false
    }
}, {
    freezeTableName: true 
});

export default MS_JOB;

console.log("Creating MS_JOB");





// // import { Sequelize } from "sequelize";
// // import db from "../config/Database.js";
// // const { DataTypes } = Sequelize;

// // const MS_JOB = db.define("MS_JOB", { 
// //     UUID_MS_JOB: {
// //         type: DataTypes.UUID,
// //         defaultValue: DataTypes.UUIDV4,
// //         allowNullValue: false,
// //         primaryKey: true
// //     },
// //     IS_ACTIVE: {
// //         type: DataTypes.INTEGER,
// //         allowNull: true
// //     },
// //     IS_DELETED: {
// //         type: DataTypes.INTEGER,
// //         allowNull: true
// //     },
// //     DTM_CRT: {
// //         type: DataTypes.DATE,
// //         allowNull: true,
// //         defaultValue: DataTypes.NOW // Default to current date and time
// //     },
// //     USR_CRT: {
// //         type: DataTypes.STRING(50),
// //         allowNull: true
// //     },
// //     DTM_UPD: {
// //         type: DataTypes.DATE,
// //         allowNull: true
// //     },
// //     USR_UPD: {
// //         type: DataTypes.STRING(50),
// //         allowNull: true
// //     },
// //     JOB_CODE: {
// //         type: DataTypes.BIGINT,
// //         allowNull: true
// //     },
// //     JOB_DESC: {
// //         type: DataTypes.STRING(70),
// //         allowNull: false
// //     }
// // }, {
// //     freezeTableName: true 
// // });


// // // Sync the database
// // (async () => {
// //     try {
// //       const { default: MS_USER } = await import('./MS_USER.js');
// //       MS_JOB.hasMany(MS_USER, {
// //         foreignKey: 'UUID_MS_JOB', // Foreign key di tabel MS_USER
// //         sourceKey: 'UUID_MS_JOB'   // Primary key di tabel MS_JOB
// //       });
  
// //       await db.sync({ alter: true }); 
// //       console.log("Database synchronized successfully 😊 .");
// //     } catch (error) {
// //       console.error("Error synchronizing the database:", error);
// //     }
// //   })();



// // export default MS_JOB;

// DIubah