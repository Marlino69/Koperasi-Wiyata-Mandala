import db from "../config/database.js"
import TR_PENGAJUAN_PINJAMAN from "../models/TR_PENGAJUAN_PINJAMAN.js";
import MS_STATUS_PINJAMAN from "../models/MS_STATUS_PINJAMAN.js";
import TR_PENGAJUAN_SIMPANAN from "../models/TR_PENGAJUAN_SIMPANAN.js";
import MS_TYPE_SIMPANAN from "../models/MS_TYPE_SIMPANAN.js";
import MS_STATUS_SIMPANAN from "../models/MS_STATUS_SIMPANAN.js";
import MS_USER from "../models/MS_USER.js"
import MS_TYPE_PINJAMAN from "../models/MS_TYPE_PINJAMAN.js";
import TrHistoryDataPinjaman from "../models/TR_HISTORY_DATA_PINJAMAN.js";
import TrHistoryDataSimpanan from "../models/TR_HISTORY_DATA_SIMPANAN.js";
import { countAngsuran } from "../../src/utils/utils.js";
import Sequelize from "sequelize";
import { Op } from "sequelize";

const getPengajuanIncludeAttribute = (PENGAJUAN) => {
    let include = [
        {
            model: MS_USER,
            as: 'user',
            attributes: ['NAMA_LENGKAP', 'ALAMAT', 'createdAt', 'NOMOR_TELP', "UUID_MS_USER"]
        },
    ];

    let attributes = [
        'NOMINAL',
        'REASON',
        'createdAt',
        "DTM_APPROVED"
    ];

    switch(PENGAJUAN) {
        case "PINJAMAN":
            include.push(
                {
                    model: MS_STATUS_PINJAMAN,
                    as: 'status',
                    attributes: ['UUID_STATUS_PINJAMAN', 'STATUS_CODE', "STATUS_NAME"]
                },
                {
                    model: MS_TYPE_PINJAMAN,
                    as: 'type',
                    attributes: ['UUID_TYPE_PINJAMAN', 'TYPE_NAME', 'MINIMUM_PINJAMAN', 'MAXIMUM_PINJAMAN', 'TENOR', "INTEREST_RATE"]
                }
            );
            attributes.push('UUID_PENGAJUAN_PINJAMAN', 'TENOR', 'INTEREST_RATE')
            break;
        case "SIMPANAN":
            include.push(
                {
                    model: MS_STATUS_SIMPANAN,
                    as: 'status',
                    attributes: ['UUID_STATUS_SIMPANAN', 'STATUS_CODE', "STATUS_NAME"]
                },
                {
                    model: MS_TYPE_SIMPANAN,
                    as: 'type',
                    attributes: ['UUID_TYPE_SIMPANAN', 'TYPE_NAME', 'MINIMUM_SIMPANAN', 'MAXIMUM_SIMPANAN', "INTEREST_RATE", "IS_MANDATORY", "IS_AUTO_APPROVE"]
                }
            );
            attributes.push('UUID_PENGAJUAN_SIMPANAN')
            break;
    }
    return { include, attributes };
}

export const getPengajuan = async (req, res) => {
    const { 
        PENGAJUAN, 
        UUID_MS_TYPE,
        UUID_MS_STATUS,
        UUID_MS_USER,
        UUID_PENGAJUAN_PINJAMAN,
        UUID_PENGAJUAN_SIMPANAN,
    } = req.body;

    const pengajuanModel = {
        "PINJAMAN": TR_PENGAJUAN_PINJAMAN,
        "SIMPANAN": TR_PENGAJUAN_SIMPANAN
    }

    let filter = {};

    if(UUID_MS_TYPE) filter[`UUID_MS_TYPE_${PENGAJUAN}`] = UUID_MS_TYPE;
    if(UUID_MS_STATUS) filter[`UUID_MS_STATUS_${PENGAJUAN}`] = UUID_MS_STATUS;
    if(UUID_MS_USER) filter.UUID_MS_USER = UUID_MS_USER;
    if(UUID_PENGAJUAN_PINJAMAN) filter.UUID_PENGAJUAN_PINJAMAN = UUID_PENGAJUAN_PINJAMAN;
    if(UUID_PENGAJUAN_SIMPANAN) filter.UUID_PENGAJUAN_SIMPANAN = UUID_PENGAJUAN_SIMPANAN;

    try {
        if (PENGAJUAN == "ALL") {
            const pengajuanTypes = ["PINJAMAN", "SIMPANAN"]
            let responseSum = [];
            for (let pengajuanItem of pengajuanTypes) {
                let { include, attributes } = getPengajuanIncludeAttribute(pengajuanItem);
                let response = await pengajuanModel[pengajuanItem].findAll({ where:filter, include, attributes });
                responseSum = [...responseSum, ...response];
            }
            res.status(200).json(responseSum);
        } else {
            let { include, attributes } = getPengajuanIncludeAttribute(PENGAJUAN);
            const response = await pengajuanModel[PENGAJUAN].findAll({ where:filter, include, attributes });
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

// export const getFilteredPengajuan = async(req, res) => {
//     const {
//         UUID_MS_USER,
//         isFiltered,
//         orderBy,
//         sortBy,
//         filterAllTypePinj,
//         filterAllTypeSimp,
//         filterAllStatusPinj,
//         filterAllStatusSimp,
//         filterTypePinj,
//         filterTypeSimp,
//         filterStatusPinj,
//         filterStatusSimp,
//         filterName,
//         filterFromDate,
//         filterToDate,
//         filterMinimalNominal,
//         filterMaksimalNominal
//     } = req.body;

//     let query = `
//         SELECT
//             i."UUID_PENGAJUAN_PINJAMAN" as "UUID_PENGAJUAN",
//             i."createdAt",
//             t."TYPE_NAME",
//             u."UUID_MS_USER",
//             u."NAMA_LENGKAP",
//             i."NOMINAL",
//             i."REASON",
//             s."STATUS_NAME",
//             s."STATUS_CODE",
//             'PINJAMAN' as "PENGAJUAN"
//         FROM "TR_PENGAJUAN_PINJAMAN" i
//         JOIN "MS_TYPE_PINJAMAN" t on i."UUID_MS_TYPE_PINJAMAN" = t."UUID_TYPE_PINJAMAN"
//         JOIN "MS_USER" u on i."UUID_MS_USER" = u."UUID_MS_USER"
//         JOIN "MS_STATUS_PINJAMAN" s on i."UUID_MS_STATUS_PINJAMAN" = s."UUID_STATUS_PINJAMAN"
//         WHERE
//             (i."UUID_MS_USER" = :UUID_MS_USER OR :UUID_MS_USER IS NULL)
//     `

//     if(isFiltered) {
//         query += `
//             AND
//             (i."createdAt"::DATE >= :filterFromDate OR :filterFromDate IS NULL) AND 
//             (i."createdAt"::DATE <= :filterToDate OR :filterToDate IS NULL) AND
//             (:filterName IS NULL OR u."NAMA_LENGKAP" ILIKE '%' || :filterName || '%') AND
//             (:filterMinimalNominal IS NULL OR i."NOMINAL" >= :filterMinimalNominal) AND
//             (:filterMaksimalNominal IS NULL OR i."NOMINAL" <= :filterMaksimalNominal)
        
//         `
//         if(!filterAllTypePinj) {
//             query += `
//                 AND
//                 (i."UUID_MS_TYPE_PINJAMAN" IN (:filterTypePinj))
//             `
//         }
//         if(!filterAllStatusPinj) {
//             query += `
//                 AND
//                 (i."UUID_MS_STATUS_PINJAMAN" IN (:filterStatusPinj))
//             `
//         }
//     }

//     query +=`
//         UNION

//         SELECT
//             i."UUID_PENGAJUAN_SIMPANAN" as "UUID_PENGAJUAN",
//             i."createdAt",
//             t."TYPE_NAME",
//             u."UUID_MS_USER",
//             u."NAMA_LENGKAP",
//             i."NOMINAL",
//             i."REASON",
//             s."STATUS_NAME",
//             s."STATUS_CODE",
//             'SIMPANAN' as "PENGAJUAN"
//         FROM "TR_PENGAJUAN_SIMPANAN" i
//         JOIN "MS_TYPE_SIMPANAN" t on i."UUID_MS_TYPE_SIMPANAN" = t."UUID_TYPE_SIMPANAN"
//         JOIN "MS_USER" u on i."UUID_MS_USER" = u."UUID_MS_USER"
//         JOIN "MS_STATUS_SIMPANAN" s on i."UUID_MS_STATUS_SIMPANAN" = s."UUID_STATUS_SIMPANAN"
//         WHERE
//             (i."UUID_MS_USER" = :UUID_MS_USER OR :UUID_MS_USER IS NULL)
//     `

//     if(isFiltered) {
//         query += `
//             AND
//             (i."createdAt"::DATE >= :filterFromDate OR :filterFromDate IS NULL) AND 
//             (i."createdAt"::DATE <= :filterToDate OR :filterToDate IS NULL) AND
//             (:filterName IS NULL OR u."NAMA_LENGKAP" ILIKE '%' || :filterName || '%') AND
//             (:filterMinimalNominal IS NULL OR i."NOMINAL" >= :filterMinimalNominal) AND
//             (:filterMaksimalNominal IS NULL OR i."NOMINAL" <= :filterMaksimalNominal)
//         `

//         if(!filterAllTypeSimp) {
//             query += `
//                 AND
//                 (i."UUID_MS_TYPE_SIMPANAN" IN (:filterTypeSimp))
//             `
//         }
//         if(!filterAllStatusSimp) {
//             query += `
//                 AND
//                 (i."UUID_MS_STATUS_SIMPANAN" IN (:filterStatusSimp))
//             `
//         }
//     }

//     let sort = "createdAt";
//     switch(sortBy) {
//         case "DATE":
//             sort = "createdAt"
//             break;
//         case "NOMINAL":
//             sort = "NOMINAL"
//             break;
//         case "NAME":
//             sort = "NAMA_LENGKAP"
//             break;
//         case "STATUS":
//             sort = "STATUS_NAME"
//             break;
//     }

//     query += `
//         ORDER BY "${sort}" ${orderBy}
//     `



//     const repl = {
//         UUID_MS_USER: UUID_MS_USER || null,
//         isFiltered: isFiltered || false,
//         filterName: filterName ? filterName : null,
//         filterAllTypePinj: filterAllTypePinj,
//         filterAllTypeSimp: filterAllTypeSimp,
//         filterAllStatusPinj: filterAllStatusPinj,
//         filterAllStatusSimp: filterAllStatusSimp,
//         filterMinimalNominal: filterMinimalNominal > 0 ? filterMinimalNominal : null,
//         filterMaksimalNominal: filterMaksimalNominal > 0 ? filterMaksimalNominal : null,
//         filterTypePinj: filterTypePinj?.length > 0 ? filterTypePinj : ["-1"],
//         filterTypeSimp: filterTypeSimp?.length > 0 ? filterTypeSimp : ["-1"],
//         filterStatusPinj: filterStatusPinj?.length > 0 ? filterStatusPinj : ["-1"],
//         filterStatusSimp: filterStatusSimp?.length > 0 ? filterStatusSimp : ["-1"],
//         filterFromDate: filterFromDate ? filterFromDate : null,
//         filterToDate: filterToDate ? filterToDate : null
//     }

//     try {
//         const [data, metadata] = await db.query(query, {
//             replacements: repl
//         })
//         res.status(200).json(data)
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: "Error fetching data", error: error.message});
//     }
// }

export const getFilteredPengajuan = async(req, res) => {
    const {
        UUID_MS_USER,
        PENGAJUAN,
        isFiltered,
        orderBy,
        sortBy,
        lastId,
        lastColumn,
        filterAllType,
        filterAllStatus,
        filterType,
        filterStatus,
        filterName,
        filterFromDate,
        filterToDate,
        filterMinimalNominal,
        filterMaksimalNominal
    } = req.body;

    let sort = "createdAt";
    let lastColumnName = `i."createdAt"`;
    switch(sortBy) {
        case "DATE":
            sort = "createdAt"
            lastColumnName = `i."createdAt"`
            break;
        case "NOMINAL":
            sort = "NOMINAL"
            lastColumnName = `i."NOMINAL"`
            break;
        case "NAME":
            sort = "NAMA_LENGKAP"
            lastColumnName = `u."NAMA_LENGKAP"`
            break;
        case "STATUS":
            sort = "STATUS_NAME"
            lastColumnName = `s."STATUS_CODE"`
            break;
    }

    let than = `<`
    switch(orderBy) {
        case "ASC":
            than = `>`
            break;
        case "DESC":
            than = `<`
            break;
    }

    let query = ``

    if(PENGAJUAN == "PINJAMAN") {
        query += `
            SELECT
                i."UUID_PENGAJUAN_PINJAMAN" as "UUID_PENGAJUAN",
                i."createdAt",
                t."TYPE_NAME",
                u."UUID_MS_USER",
                u."NAMA_LENGKAP",
                i."NOMINAL",
                i."REASON",
                s."STATUS_NAME",
                s."STATUS_CODE",
                'PINJAMAN' as "PENGAJUAN"
            FROM "TR_PENGAJUAN_PINJAMAN" i
            JOIN "MS_TYPE_PINJAMAN" t on i."UUID_MS_TYPE_PINJAMAN" = t."UUID_TYPE_PINJAMAN"
            JOIN "MS_USER" u on i."UUID_MS_USER" = u."UUID_MS_USER"
            JOIN "MS_STATUS_PINJAMAN" s on i."UUID_MS_STATUS_PINJAMAN" = s."UUID_STATUS_PINJAMAN"
            WHERE
                (i."UUID_MS_USER" = :UUID_MS_USER OR :UUID_MS_USER IS NULL)
        `
        if(lastId) {
            query += `
                AND
                ((${lastColumnName} = :lastColumn AND i."UUID_PENGAJUAN_PINJAMAN" ${than} :lastId) OR (${lastColumnName} ${than} :lastColumn))
            `
        }

        if(isFiltered) {
            query += `
                AND
                (i."createdAt"::DATE >= :filterFromDate OR :filterFromDate IS NULL) AND 
                (i."createdAt"::DATE <= :filterToDate OR :filterToDate IS NULL) AND
                (:filterName IS NULL OR u."NAMA_LENGKAP" ILIKE '%' || :filterName || '%') AND
                (:filterMinimalNominal IS NULL OR i."NOMINAL" >= :filterMinimalNominal) AND
                (:filterMaksimalNominal IS NULL OR i."NOMINAL" <= :filterMaksimalNominal)
            
            `
            if(!filterAllType) {
                query += `
                    AND
                    (i."UUID_MS_TYPE_PINJAMAN" IN (:filterType))
                `
            }
            if(!filterAllStatus) {
                query += `
                    AND
                    (i."UUID_MS_STATUS_PINJAMAN" IN (:filterStatus))
                `
            }
        }
    } else if(PENGAJUAN == "SIMPANAN") { 
        query +=`
            SELECT
                i."UUID_PENGAJUAN_SIMPANAN" as "UUID_PENGAJUAN",
                i."createdAt",
                t."TYPE_NAME",
                u."UUID_MS_USER",
                u."NAMA_LENGKAP",
                i."NOMINAL",
                i."REASON",
                s."STATUS_NAME",
                s."STATUS_CODE",
                'SIMPANAN' as "PENGAJUAN"
            FROM "TR_PENGAJUAN_SIMPANAN" i
            JOIN "MS_TYPE_SIMPANAN" t on i."UUID_MS_TYPE_SIMPANAN" = t."UUID_TYPE_SIMPANAN"
            JOIN "MS_USER" u on i."UUID_MS_USER" = u."UUID_MS_USER"
            JOIN "MS_STATUS_SIMPANAN" s on i."UUID_MS_STATUS_SIMPANAN" = s."UUID_STATUS_SIMPANAN"
            WHERE
                (i."UUID_MS_USER" = :UUID_MS_USER OR :UUID_MS_USER IS NULL)
        `

        if(lastId) {
            query += `
                AND
                ((${lastColumnName} = :lastColumn AND i."UUID_PENGAJUAN_SIMPANAN" ${than} :lastId) OR (${lastColumnName} ${than} :lastColumn))
            `
        }

        if(isFiltered) {
            query += `
                AND
                (i."createdAt"::DATE >= :filterFromDate OR :filterFromDate IS NULL) AND 
                (i."createdAt"::DATE <= :filterToDate OR :filterToDate IS NULL) AND
                (:filterName IS NULL OR u."NAMA_LENGKAP" ILIKE '%' || :filterName || '%') AND
                (:filterMinimalNominal IS NULL OR i."NOMINAL" >= :filterMinimalNominal) AND
                (:filterMaksimalNominal IS NULL OR i."NOMINAL" <= :filterMaksimalNominal)
            `

            if(!filterAllType) {
                query += `
                    AND
                    (i."UUID_MS_TYPE_SIMPANAN" IN (:filterType))
                `
            }
            if(!filterAllStatus) {
                query += `
                    AND
                    (i."UUID_MS_STATUS_SIMPANAN" IN (:filterStatus))
                `
            }
        }
    } else {
        res.status(400).json({ message: "Error Input"});
    }

    query += `
        ORDER BY "${sort}" ${orderBy}, "UUID_PENGAJUAN" ${orderBy}
        LIMIT 50
    `

    const repl = {
        UUID_MS_USER: UUID_MS_USER || null,
        isFiltered: isFiltered || false,
        filterName: filterName ? filterName : null,
        lastColumn: lastColumn || null,
        lastColumnName: lastColumnName || null,
        lastId: lastId || null,
        filterAllType: filterAllType,
        filterAllStatus: filterAllStatus,
        filterMinimalNominal: filterMinimalNominal > 0 ? filterMinimalNominal : null,
        filterMaksimalNominal: filterMaksimalNominal > 0 ? filterMaksimalNominal : null,
        filterType: filterType?.length > 0 ? filterType : ["-1"],
        filterStatus: filterStatus?.length > 0 ? filterStatus : ["-1"],
        filterFromDate: filterFromDate ? filterFromDate : null,
        filterToDate: filterToDate ? filterToDate : null
    }

    try {
        const [data, metadata] = await db.query(query, {
            replacements: repl
        })
        res.status(200).json({data: data, 
            lastId: data.length > 0 ? data[data.length - 1].UUID_PENGAJUAN : null, 
            lastColumn: data.length > 0  ? data[data.length - 1][sort] : null
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message});
    }
}

export const getStatus = async(req, res) => {
    const {
        PENGAJUAN
    } = req.body;
    const pengajuanModel = {
        "PINJAMAN": MS_STATUS_PINJAMAN,
        "SIMPANAN": MS_STATUS_SIMPANAN
    }
    try {
        const response = await pengajuanModel[PENGAJUAN].findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
}

export const getType = async(req, res) => {
    const { 
        PENGAJUAN
    } = req.params;
    const {
        IS_MANDATORY
    } = req.body;
    const pengajuanModel = {
        "PINJAMAN": MS_TYPE_PINJAMAN,
        "SIMPANAN": MS_TYPE_SIMPANAN
    }
    let filter = {};
    if(IS_MANDATORY) filter.IS_MANDATORY = IS_MANDATORY;
    try {
        const response = await pengajuanModel[PENGAJUAN].findAll({ where:filter });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
}

export const createStatus = async (req, res) => {
    const { 
        PENGAJUAN
    } = req.params;
    const pengajuanModel = {
        "PINJAMAN": MS_STATUS_PINJAMAN,
        "SIMPANAN": MS_STATUS_SIMPANAN
    }
    try {
        const createdStatuses = await pengajuanModel[PENGAJUAN].bulkCreate(req.body);
        res.status(201).json({ msg: "Status Pinjaman Created Successfully", data: createdStatuses });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}

export const createType = async (req, res) => {
    const { 
        PENGAJUAN
    } = req.params;
    const pengajuanModel = {
        "PINJAMAN": MS_TYPE_PINJAMAN,
        "SIMPANAN": MS_TYPE_SIMPANAN
    }
    try {
        const createdType = await pengajuanModel[PENGAJUAN].bulkCreate(req.body);
        res.status(201).json({ msg: "Type Created Successfully", data: createdType });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}

export const createPengajuan = async (req, res) => {
    const { 
        PENGAJUAN
    } = req.params;
    const pengajuanModel = {
        "PINJAMAN": TR_PENGAJUAN_PINJAMAN,
        "SIMPANAN": TR_PENGAJUAN_SIMPANAN
    }
    try {
        const createdPengajuanPinjaman = await pengajuanModel[PENGAJUAN].create(req.body);
        res.status(201).json(createdPengajuanPinjaman);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}

export const updateStatusPengajuan = async (req, res) => {
    try {
        const { PENGAJUAN, id, status } = req.body;
        let updateField = {};
        let statusModel;
        let pengajuanModel;
        let filter;
        let uuidStatus;
        let attr;
        let currentStatus;
        let sameStatus;
        switch(PENGAJUAN) {
            case "PINJAMAN":
                statusModel = MS_STATUS_PINJAMAN
                uuidStatus = await statusModel.findOne({ where: { STATUS_CODE: status } });
                updateField = { UUID_MS_STATUS_PINJAMAN: uuidStatus.UUID_STATUS_PINJAMAN }
                pengajuanModel = TR_PENGAJUAN_PINJAMAN
                attr = ["UUID_MS_STATUS_PINJAMAN"]
                filter = { UUID_PENGAJUAN_PINJAMAN: id }
                currentStatus = await pengajuanModel.findOne({
                    where: filter,
                    attributes: attr
                })
                if(currentStatus.UUID_MS_STATUS_PINJAMAN == uuidStatus.UUID_STATUS_PINJAMAN) sameStatus = true;
                break;
            case "SIMPANAN":
                statusModel = MS_STATUS_SIMPANAN
                uuidStatus = await statusModel.findOne({ where: { STATUS_CODE: status } });
                updateField = { UUID_MS_STATUS_SIMPANAN: uuidStatus.UUID_STATUS_SIMPANAN }
                pengajuanModel = TR_PENGAJUAN_SIMPANAN
                attr = ["UUID_MS_STATUS_SIMPANAN"]
                filter = { UUID_PENGAJUAN_SIMPANAN: id }
                currentStatus = await pengajuanModel.findOne({
                    where: filter,
                    attributes: attr
                })
                if(currentStatus.UUID_MS_STATUS_SIMPANAN == uuidStatus.UUID_STATUS_SIMPANAN) sameStatus = true;
                break;
        }
        if(!sameStatus) {
            if (status == "APPROVED") updateField.DTM_APPROVED = new Date()
            const updatedPengajuan = await pengajuanModel.update(
                updateField, {
                    where: filter
                }
            );
            if(status == "APPROVED") await createHistoryPengajuan({ PENGAJUAN, id });
            res.status(201).json({ msg: sameStatus});
        } else {
            res.status(400).json("Status is already " + status)
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });        
    }
}

export const getActivePengajuanPinjamanAnggota = async (req, res) => {
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

export const getActivePengajuanSimpananAnggota = async (req, res) => {
    const { id, month, year } = req.body;
    try {
        const statusSimpananan = await MS_STATUS_SIMPANAN.findOne({ where: { STATUS_CODE: "APPROVED" } });
        const uuid_status = statusSimpananan.UUID_STATUS_SIMPANAN;

        let query = `
            SELECT
                t."UUID_TYPE_SIMPANAN",
                t."TYPE_NAME",
                t."IS_MANDATORY",
                t."IS_AUTO_APPROVE",
                SUM(p."NOMINAL") AS total_nominal,
                COUNT(p."UUID_PENGAJUAN_SIMPANAN") AS total_pengajuan,
                s."UUID_STATUS_SIMPANAN",
                s."STATUS_CODE",
                u."UUID_MS_USER",
                u."NAMA_LENGKAP"
            FROM "TR_PENGAJUAN_SIMPANAN" p
            JOIN "MS_STATUS_SIMPANAN" s on p."UUID_MS_STATUS_SIMPANAN" = s."UUID_STATUS_SIMPANAN"
            JOIN "MS_TYPE_SIMPANAN" t on p."UUID_MS_TYPE_SIMPANAN" = t."UUID_TYPE_SIMPANAN"
            JOIN "MS_USER" u on p."UUID_MS_USER" = u."UUID_MS_USER"
            WHERE p."UUID_MS_STATUS_SIMPANAN" = :uuid_status
            AND p."DTM_APPROVED" IS NOT NULL
            AND EXTRACT(MONTH FROM p."DTM_APPROVED") = :month
            AND EXTRACT(YEAR FROM p."DTM_APPROVED") = :year
        `;


        const replacements = { uuid_status, month, year }

        if (id) {
            query += ' AND p."UUID_MS_USER" = :id';
            replacements.id = id;
        }

        query += `
            GROUP BY
                t."UUID_TYPE_SIMPANAN",
                t."TYPE_NAME",
                t."IS_MANDATORY",
                t."IS_AUTO_APPROVE",
                s."UUID_STATUS_SIMPANAN",
                s."STATUS_CODE",
                u."UUID_MS_USER",
                u."NAMA_LENGKAP"
        `

        const [data, metadata] = await db.query(query, {
            replacements: replacements
        })

        let totalSimpanan = 0;

        const processedData = data.map(row => {
            const nominal = parseFloat(row.total_nominal);

            totalSimpanan += parseFloat(nominal);

            return {
                ...row
            }
        });

        res.status(200).json({processedData, TOTAL_SIMPANAN: totalSimpanan})
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message }); 
    }
}

export const createMandatoryPengajuan = async(req, res) => {
    try {
        const dtmNow = new Date();
        const monthNow = dtmNow.getMonth() + 1;
        const yearNow = dtmNow.getFullYear();
        const [bulkSimpanan, metadataSimpanan] = await db.query(
            `
                SELECT
                u."UUID_MS_USER",
                t."UUID_TYPE_SIMPANAN" as "UUID_MS_TYPE_SIMPANAN",
                s."UUID_STATUS_SIMPANAN" as "UUID_MS_STATUS_SIMPANAN",
                t."DEFAULT_NOMINAL" as "NOMINAL",
                :dtmNow as "DTM_APPROVED" 
                FROM "MS_USER" u
                JOIN "MS_TYPE_SIMPANAN" t on t."IS_MANDATORY" = 1 
                JOIN "MS_STATUS_SIMPANAN" s on s."STATUS_CODE" = 'APPROVED' 
                JOIN "MS_JOB" j on u."UUID_MS_JOB" = j."UUID_MS_JOB"
                WHERE
                    j."JOB_CODE" = 'ANGGOTA' AND
                    (
                        u."UUID_MS_USER" NOT IN (
                                                    SELECT "UUID_MS_USER" 
                                                    FROM "TR_PENGAJUAN_SIMPANAN" 
                                                    WHERE
                                                        t."TYPE_NAME" = 'Simpanan Pokok' OR
                                                        (
                                                            t."TYPE_NAME" != 'Simpanan Pokok' AND
                                                            EXTRACT(MONTH FROM "createdAt") = :monthNow
                                                            AND
                                                            EXTRACT(YEAR FROM "createdAt") = :yearNow)
                                                        )
                    )
                ORDER BY "UUID_MS_USER" ASC, "UUID_TYPE_SIMPANAN" DESC
            `, {
                replacements: {
                    monthNow: monthNow,
                    yearNow: yearNow,
                    dtmNow: dtmNow
                }
            }
        );
        const bulkCreate = await TR_PENGAJUAN_SIMPANAN.bulkCreate(bulkSimpanan)

        const bungaPersenSimpanan = await MS_TYPE_SIMPANAN.findOne(
            {
                attributes: ["INTEREST_RATE"]
            }
        )

        for (const item of bulkCreate) {

            let currentSimpanan;
            let historyData;
            currentSimpanan = await getLatestHistoryCurrentSimpanan( item.UUID_MS_USER )
            if (!currentSimpanan) {
                currentSimpanan = item.NOMINAL
            } else {
                currentSimpanan = parseInt(currentSimpanan)
                currentSimpanan += parseInt(item.NOMINAL)
            }
            historyData = {
                DEPOSIT_AMOUNT: item.NOMINAL,
                CURRENT_SIMPANAN: currentSimpanan,
                BUNGA_SIMPANAN: currentSimpanan * bungaPersenSimpanan.INTEREST_RATE/100,
                UUID_PENGAJUAN_SIMPANAN: item.UUID_PENGAJUAN_SIMPANAN
            }
            await TrHistoryDataSimpanan.create(historyData)
        }
    } catch (error) {
        console.log(error)
    }
    
}

export const createHistoryPengajuan = async({PENGAJUAN, id}) => {
    const pengajuanModel = {
        "PINJAMAN": TR_PENGAJUAN_PINJAMAN,
        "SIMPANAN": TR_PENGAJUAN_SIMPANAN
    }

    const historyModel = {
        "PINJAMAN": TrHistoryDataPinjaman,
        "SIMPANAN": TrHistoryDataSimpanan
    }

    let pengajuanWhere;
    if(PENGAJUAN=="PINJAMAN") pengajuanWhere = { "UUID_PENGAJUAN_PINJAMAN":id }
    if(PENGAJUAN=="SIMPANAN") pengajuanWhere = { "UUID_PENGAJUAN_SIMPANAN":id }

    try {
        const pengajuanData = await pengajuanModel[PENGAJUAN].findOne({
            where: pengajuanWhere
        })

        let historyData = {}
        let createHistory

        if(pengajuanData) {
            if(PENGAJUAN == "PINJAMAN") {
                const dateStart = new Date(pengajuanData.DTM_APPROVED);
                const dateEnd = new Date(dateStart)
                dateEnd.setMonth(dateStart.getMonth() + pengajuanData.TENOR - 1)

                const angsuranBersih = Math.round(pengajuanData.NOMINAL / pengajuanData.TENOR);
                const bungaPinjaman = Math.round(pengajuanData.NOMINAL * (pengajuanData.INTEREST_RATE/100))
                const bungaAngsuran = Math.round(bungaPinjaman / pengajuanData.TENOR);
                historyData = {
                    ANGSURAN_BERSIH: angsuranBersih,
                    BUNGA_ANGSURAN: bungaAngsuran,
                    BUNGA_PINJAMAN: bungaPinjaman,
                    UUID_PENGAJUAN_PINJAMAN: pengajuanData.UUID_PENGAJUAN_PINJAMAN,
                    DATE_START: dateStart,
                    DATE_END: dateEnd
                }
            } else if (PENGAJUAN == "SIMPANAN") {
                let currentSimpanan;
                currentSimpanan = await getLatestHistoryCurrentSimpanan( pengajuanData.UUID_MS_USER )
                if (!currentSimpanan) {
                    currentSimpanan = pengajuanData.NOMINAL
                } else {
                    currentSimpanan = parseInt(currentSimpanan)
                    currentSimpanan += parseInt(pengajuanData.NOMINAL)
                }
                
                const bungaPersenSimpanan = await MS_TYPE_SIMPANAN.findOne(
                    {
                        attributes: ["INTEREST_RATE"]
                    }
                )

                historyData = {
                    DEPOSIT_AMOUNT: pengajuanData.NOMINAL,
                    CURRENT_SIMPANAN: currentSimpanan,
                    BUNGA_SIMPANAN: currentSimpanan * bungaPersenSimpanan.INTEREST_RATE/100,
                    UUID_PENGAJUAN_SIMPANAN: id
                }
            }

            createHistory = await historyModel[PENGAJUAN].create(historyData);
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentSimpanan = async(userId) => {
    try {
        const [currentSimpanan, metadataCurrSimp] = await db.query(
            `
                SELECT
                SUM(p."NOMINAL") AS "CURRENT_SIMPANAN"
                FROM
                "TR_PENGAJUAN_SIMPANAN" p
                JOIN "MS_STATUS_SIMPANAN" s ON p."UUID_MS_STATUS_SIMPANAN" = s."UUID_STATUS_SIMPANAN"
                WHERE
                    s."STATUS_CODE" = 'APPROVED' AND
                    p."UUID_MS_USER" = :userId
            `, {
                replacements: {
                    userId: userId
                }
            }
        )
        return currentSimpanan[0].CURRENT_SIMPANAN
    } catch (error) {
        console.log(error)
    }
}

export const getLatestHistoryCurrentSimpanan = async(userId) => {
    try {
        const [data, metadata] = await db.query(
            `
                SELECT
                    h."CURRENT_SIMPANAN"
                FROM "TR_HISTORY_DATA_SIMPANAN" h
                JOIN "TR_PENGAJUAN_SIMPANAN" p ON h."UUID_PENGAJUAN_SIMPANAN" = p."UUID_PENGAJUAN_SIMPANAN"
                WHERE
                    p."UUID_MS_USER" = :userId
                ORDER BY h."createdAt" DESC, p."UUID_MS_USER" DESC
                LIMIT 1
            `, {
                replacements: {
                    userId: userId
                }
            }
        )
        return data[0].CURRENT_SIMPANAN
    } catch (error) {
        console.log(error)
    }
}