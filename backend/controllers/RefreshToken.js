import Users from "../models/MS_USER.js";
import jwt from "jsonwebtoken";

export const getServerStatus = async (req, res) => {
    try {
        res.status(200).json("ONLINE");
    } catch (error) {
        res.status(500).json("OFFLINE");
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401);

        const user = await Users.findAll({ 
            where: { 
                refresh_token: refreshToken 
            } 
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user[0].UUID_MS_USER;
            const name = user[0].NAMA_LENGKAP;
            const email = user[0].EMAIL;
            const role = user[0].UUID_MS_JOB;
            const noTelp = user[0].NOMOR_TELP;
            const alamat = user[0].ALAMAT;
            const unitKerja = user[0].UNIT_KERJA;
            const noAnggota = user[0].NOMOR_ANGGOTA;
            const tanggalLahir = user[0].TANGGAL_LAHIR;
            const accessToken = jwt.sign({ userId, name, email, role, noTelp, alamat, tanggalLahir, unitKerja, noAnggota }, process.env.ACCESS_TOKEN_SECRET, { 
                expiresIn: '15s' 
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}