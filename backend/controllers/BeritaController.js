import Berita from "../models/TR_BERITA.js"; 
import LobBerita from "../models/TR_LOB_BERITA.js"; 

export const getAllBerita = async (req, res) => {
    try {
        const response = await Berita.findAll({
            where: { IS_DELETED: 0 },
            include: [
                {
                    model: LobBerita,
                    as: 'lobBerita',
                    attributes: ['LOB', 'UUID_BERITA'],
                },
            ],
            attributes: ['UUID_BERITA', 'JUDUL_BERITA', 'ISI_BERITA', 'DTM_CRT'],
        });

        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

export const getBeritaById = async (req, res) => {
    try {
        const response = await Berita.findOne({
            where: {
                UUID_BERITA: req.params.id
            },
            include: [
                {
                    model: LobBerita,
                    as: 'lobBerita',
                    attributes: ['LOB'] // Include only the image (LOB) field
                }
            ]
        });

        if (response) {
            // Check if the LOB field exists and is valid
            const imageUrl = response.lobBerita && response.lobBerita.LOB 
                ? `http://localhost:5000/uploads/${response.lobBerita.LOB}` // Fallback image path
                : null;

            res.status(200).json({ ...response.toJSON(), imageUrl });
        } else {
            res.status(404).json({ message: "Berita not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};



export const createBerita = async (req, res) => {
    const { judulBerita, penulis, kontenBerita, fotoBerita } = req.body;

    if (!judulBerita || !penulis || !kontenBerita || !fotoBerita) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newBerita = await Berita.create({
            JUDUL_BERITA: judulBerita,
            ISI_BERITA: kontenBerita,
            USER_UPD: penulis,
            IS_DELETED: 0,
            DTM_CRT: new Date(),
            USER_CRT: req.user ? req.user.id : null,
        });

        await LobBerita.create({
            LOB: fotoBerita,
            UUID_BERITA: newBerita.UUID_BERITA,
            DTM_CRT: new Date(),
            USER_CRT: req.user ? req.user.id : null,
        });

        res.status(201).json({
            message: 'Berita created successfully, and photo stored in Lob Berita',
            newBerita,
        });
    } catch (error) {
        console.error('Error creating berita or storing photo in Lob Berita:', error);
        res.status(500).json({
            message: 'Failed to create berita or store photo in Lob Berita.',
            error: error.message,
        });
    }
};

export const updateBerita = async (req, res) => {
    try {
        const beritaId = req.params.id;
        const berita = await Berita.findOne({ where: { UUID_BERITA: beritaId } });

        if (!berita) {
            return res.status(404).json({ message: "Berita not found" });
        }

        const updatedData = {
            JUDUL_BERITA: req.body.judulBerita || berita.JUDUL_BERITA,
            ISI_BERITA: req.body.kontenBerita || berita.ISI_BERITA,
            USER_UPD: req.body.penulis || berita.USER_UPD,
            IS_DELETED: 0,
        };

        if (req.body.fotoBerita) {
            if (!req.body.fotoBerita.startsWith('data:image/')) {
                return res.status(400).json({ message: 'Invalid base64 image format' });
            }

            const lobUpdateResult = await LobBerita.update(
                { LOB: req.body.fotoBerita },
                { where: { UUID_BERITA: berita.UUID_BERITA } }
            );

            if (lobUpdateResult[0] === 0) {
                return res.status(404).json({ message: 'No photo found to update in TR_LOB_BERITA.' });
            }
        }

        const result = await Berita.update(updatedData, { where: { UUID_BERITA: beritaId } });

        if (result[0] === 0) {
            return res.status(404).json({ message: 'No rows updated. Berita may not exist or no changes made.' });
        }

        res.status(200).json({ msg: 'Berita Updated Successfully' });
    } catch (error) {
        console.error('Error updating berita:', error);
        res.status(500).json({ message: 'Error updating Berita', error: error.message });
    }
};

export const deleteBerita = async (req, res) => {
    try {
        const berita = await Berita.findOne({
            where: { UUID_BERITA: req.params.id }
        });
        if (berita) {
            await Berita.update(
                { IS_DELETED: 1 },
                { where: { UUID_BERITA: req.params.id } }
            );
            res.status(200).json({ msg: "Berita Deleted Successfully (Soft Delete)" });
        } else {
            res.status(404).json({ message: "Berita not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error deleting Berita", error: error.message });
    }
};

export const deleteAllBerita = async (req, res) => {
    try {
        const response = await Berita.destroy({
            where: {}
        });
        res.status(200).json({ msg: response + " Berita Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error deleting Berita", error: error.message });
    }
};