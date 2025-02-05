import MS_JOB from "../models/MS_JOB.js";

export const createJob = async (req, res) => {
    try {
        const createdJob = await MS_JOB.bulkCreate(req.body);
        res.status(201).json({ msg: "Jobs Created Successfully", data: createdJob });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}

export const getJobID = async (req, res) => {
    const { job_code } = req.body;
    try {
        let jobCodes = ""
        const uuid = await MS_JOB.findOne({
            where: {
                JOB_CODE: job_code
            }
        })
        if (!uuid) {
            jobCodes = await MS_JOB.findAll({
                attributes: ["JOB_CODE"]
            })
        }
        res.status(200).json(uuid || {msg: "Are you sure you inputed the right JOB_CODE?", job_code: jobCodes});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}