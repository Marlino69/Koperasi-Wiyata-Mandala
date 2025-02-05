import db from "../config/database.js"
import MsGeneralSetting from "../models/MS_GENERALSETTING.js";
import MS_USER from "../models/MS_USER.js"
import Sequelize from "sequelize";
import { Op } from "sequelize";

export const getAllGenset = async (req,res) => {
    try{
        const response = await MsGeneralSetting.findAll();
        res.status(200).json(response);
    }catch(e){
        console.log(e);
    }
}
export const dummy = async (req, res) => {
    const { id, month, year } = req.body;
    try {
        const statusPinjaman = await MS_STATUS_PINJAMAN.findOne({ where: { STATUS_CODE: "APPROVED" } });
        const uuid_status = statusPinjaman.UUID_STATUS_PINJAMAN;

        let query = `
            SELECT
            p."UUID_PENGAJUAN_PINJAMAN",
            p."REASON",
            p."NOMINAL",
            s."UUID_STATUS_PINJAMAN",
            s."STATUS_CODE",
            t."UUID_TYPE_PINJAMAN",
            t."TYPE_NAME",
            p."TENOR",
            p."INTEREST_RATE",
            u."UUID_MS_USER",
            u."NAMA_LENGKAP"
            FROM "TR_PENGAJUAN_PINJAMAN" p
            JOIN "MS_STATUS_PINJAMAN" s on p."UUID_MS_STATUS_PINJAMAN" = s."UUID_STATUS_PINJAMAN"
            JOIN "MS_TYPE_PINJAMAN" t on p."UUID_MS_TYPE_PINJAMAN" = t."UUID_TYPE_PINJAMAN"
            JOIN "MS_USER" u on p."UUID_MS_USER" = u."UUID_MS_USER"
            WHERE p."UUID_MS_STATUS_PINJAMAN" = :uuid_status
            AND p."DTM_APPROVED" is not NULL
            AND :month in (
            SELECT month
            FROM generate_series(
                EXTRACT(MONTH FROM p."DTM_APPROVED") + (EXTRACT(YEAR FROM p."DTM_APPROVED") - :year) * 12,
                EXTRACT(MONTH FROM p."DTM_APPROVED") + t."TENOR" - 1 + (EXTRACT(YEAR FROM p."DTM_APPROVED") - :year) * 12
            ) as month ) 
        `;

        const replacements = { uuid_status, month, year }

        if (id) {
            query += ' AND p."UUID_MS_USER" = :id';
            replacements.id = id;
        }

        const [data, metadata] = await db.query(query, {
            replacements: replacements
        })

        let totalAngsuran = 0;

        const processedData = data.map(row => {
            const nominal = parseFloat(row.NOMINAL);
            const bunga = parseFloat(row.INTEREST_RATE);
            const bulan = row.TENOR;

            const angsuran = countAngsuran(nominal, bunga, bulan);

            totalAngsuran += parseFloat(angsuran);

            return {
                ...row,
                ANGSURAN: angsuran
            }
        });

        res.status(200).json({processedData, TOTAL_ANGSURAN: totalAngsuran})
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message }); 
    }
}
