import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Users from "../models/MS_USER.js";
import MS_JOB from "../models/MS_JOB.js";
import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";
import PengajuanSimpanan from "../models/TR_PENGAJUAN_SIMPANAN.js";
import StatusPinjaman from "../models/MS_STATUS_PINJAMAN.js";
import StatusSimpanan from "../models/MS_STATUS_SIMPANAN.js";
import TypePinjaman from "../models/MS_TYPE_PINJAMAN.js";
import TypeSimpanan from "../models/MS_TYPE_SIMPANAN.js";
import HistoryPinjaman from "../models/TR_HISTORY_DATA_PINJAMAN.js";
import HistorySimpanan from "../models/TR_HISTORY_DATA_SIMPANAN.js";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['UUID_MS_USER', 'NAMA_LENGKAP', 'EMAIL', 'NOMOR_TELP', 'UUID_MS_JOB', 'ALAMAT', 'TANGGAL_LAHIR']
    });
        res.json(users);
    } catch (error) {    
        console.log(error);
        res.status(500).json({ message: "Failed to fetch users." });
    }    
}

export const UserApproval = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                IS_ACTIVE: 0
            }
        });

        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "No users pending approval" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
};


export const UserData = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                IS_ACTIVE: 1
            },
            include: [
                {
                  model: PengajuanPinjaman,
                  attributes: ['NOMINAL', 'createdAt'],
                  required: false,
                  include: [
                    {
                        model: StatusPinjaman,
                        as: 'status',
                        attributes: ['STATUS_CODE'],
                        required: false
                      },
                      {
                        model: TypePinjaman,
                        as: 'type',
                        attributes: ['INTEREST_RATE', 'TENOR'],
                        required: false
                      }
                  ]
                },
                {
                  model: PengajuanSimpanan,
                  attributes: ['NOMINAL', 'createdAt'],
                  required: false,
                  include: [
                    {
                        model: StatusSimpanan,
                        as: 'status',
                        attributes: ['STATUS_CODE'],
                        required: false
                    },
                    {
                        model: TypeSimpanan,
                        as: 'type',
                        attributes: ['INTEREST_RATE', 'TYPE_NAME'],
                        required: false
                    },
                    {
                        model: HistorySimpanan,
                        as: "historySimpanan",
                        attributes: ["BUNGA_SIMPANAN", "CURRENT_SIMPANAN"],
                        required: false
                    }
                  ]
                }
              ],
            });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};
export const UserDataById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({
        where: {
          UUID_MS_USER: id,
          IS_ACTIVE: 1
        },
        include: [
          {
            model: PengajuanPinjaman,
            attributes: ['NOMINAL', 'updatedAt', 'createdAt'],
            required: false,
            include: [
              {
                model: StatusPinjaman,
                as: 'status',
                attributes: ['STATUS_CODE'],
                required: false
              },
              {
                model: TypePinjaman,
                as: 'type',
                attributes: ['INTEREST_RATE', 'TENOR'],
                required: false
              },
              {
                model: HistoryPinjaman,
                as: "historyPinjaman",
                attributes: ["BUNGA_PINJAMAN", "ANGSURAN_BERSIH", "BUNGA_ANGSURAN"],
                required: false
              }
            ]
          },
          
          {
            model: PengajuanSimpanan,
            attributes: ['NOMINAL', 'updatedAt', 'createdAt'],
            required: false,
            include: [
                {
                    model: StatusSimpanan,
                    as: 'status',
                    attributes: ['STATUS_CODE'],
                    required: false
                },
                {
                    model: TypeSimpanan,
                    as: 'type',
                    attributes: ['INTEREST_RATE', 'TYPE_NAME'],
                    required: false
                },
                {
                  model: HistorySimpanan,
                  as: "historySimpanan",
                  attributes: ["BUNGA_SIMPANAN", "CURRENT_SIMPANAN"],
                  required: false
                }
            ]
          }
        ],
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  };  
  

export const Register = async (req, res) => {
    const { name, email, password, confPassword, noTelp, role, alamat, tanggalLahir, unitKerja, noAnggota  } = req.body;
 
    if (password !== confPassword) {    
        return res.status(400).json({ message: "Passwords do not match with confirm password!" });    
    }
    
    try {

        const job = await MS_JOB.findOne({ where: { JOB_CODE: role } });
        if (!job) {
            return res.status(400).json({ message: "Role tidak ditemukan di database." });
        }
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        
        await Users.create({
            NAMA_LENGKAP: name,
            EMAIL: email,
            PASSWORD: hashPassword,
            NOMOR_TELP: noTelp,
            ALAMAT: alamat,
            TANGGAL_LAHIR: tanggalLahir,
            UNIT_KERJA: unitKerja,
            NOMOR_ANGGOTA: noAnggota,
            UUID_MS_JOB: job.UUID_MS_JOB,
            IS_ACTIVE: 0
        });
        
        res.json({ msg: "Register Success" });
    } catch (error) {    
        console.log(error);
        res.status(500).json({ message: "Failed to register user." });
    }
}



export const Login = async (req, res) => {
    try {
        // Cari user berdasarkan email
        const user = await Users.findOne({
            where: { EMAIL: req.body.email },
            attributes: ['UUID_MS_USER', 'NAMA_LENGKAP', 'EMAIL', 'PASSWORD', 'UUID_MS_JOB', 'NOMOR_TELP', 'ALAMAT', 'TANGGAL_LAHIR', 'IS_ACTIVE']
        });

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({ message: "Email tidak ditemukan" });
        }

        // Periksa apakah user aktif
        if (user.IS_ACTIVE === 0) {
            return res.status(403).json({ message: "Akun anda belum terverifikasi" });
        }

        // Validasi password
        const match = await bcrypt.compare(req.body.password, user.PASSWORD);
        if (!match) {
            return res.status(400).json({ msg: "Salah Password" });
        }

        // Generate token
        const userId = user.UUID_MS_USER;
        const name = user.NAMA_LENGKAP;
        const email = user.EMAIL;
        const role = user.UUID_MS_JOB;

        const accesstoken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        // Update refresh token di database
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                UUID_MS_USER: userId
            }
        });

        // Simpan refresh token di cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accesstoken, role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            UUID_MS_USER: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const { name, email, noTelp, alamat, role } = req.body;

    const job = await MS_JOB.findOne({ where: { JOB_CODE: role } });
    if (!job) {
        return res.status(400).json({ message: "Role tidak ditemukan di database." });
    }

    try {
        await Users.update({
            NAMA_LENGKAP: name,
            EMAIL: email,
            NOMOR_TELP: noTelp,
            ALAMAT: alamat,
            UUID_MS_JOB: job.UUID_MS_JOB
        }, {
            where: {
                UUID_MS_USER: user.UUID_MS_USER
            }
        });

        res.status(201).json({ msg: "Data User Berhasil Ter-Update" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(204);
        
        const user = await Users.findAll({ 
            where: { 
                refresh_token: refreshToken 
            } 
        });
        if (!user[0]) return res.sendStatus(204);
        const userId = user[0].UUID_MS_USER;
        await Users.update({ refresh_token: null}, {
            where: {
                UUID_MS_USER: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}

export const approveUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Users.update(
            { IS_ACTIVE: 1 },
            { where: { UUID_MS_USER: id } }
        );

        if (result[0] === 0) {
            return res.status(404).json({ message: "User not found or already approved" });
        }

        res.status(200).json({ message: "User approved successfully" });
    } catch (error) {
        console.error("Error approving user:", error);
        res.status(500).json({ message: "Error approving user", error });
    }
};

export const rejectUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Users.update(
            { IS_ACTIVE: 0, IS_DELETED: 1 },
            { where: { UUID_MS_USER: id } }
        );

        if (result[0] === 0) {
            return res.status(404).json({ message: "User not found or already rejected" });
        }

        res.status(200).json({ message: "User rejected successfully" });
    } catch (error) {
        console.error("Error rejecting user:", error);
        res.status(500).json({ message: "Error rejecting user", error });
    }
};

export const getOneUser = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Users.findOne({
            where: {
                UUID_MS_USER: id
            },
            include: [
                {
                    model: MS_JOB,
                    as: 'MS_JOB',
                    attributes: ['UUID_MS_JOB', 'JOB_CODE']
                },
            ],
            attributes: [
                "UUID_MS_USER",
                "IS_ACTIVE",
                "NAMA_LENGKAP",
                "NOMOR_TELP",
                "EMAIL",
                "TANGGAL_LAHIR",
                "ALAMAT",
                "createdAt"
            ]
        });
        res.status(200).json(data)
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json({ message: "Error finding user", error });
    }
}