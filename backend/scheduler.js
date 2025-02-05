import cron from "node-cron";
import {
    createMandatoryPengajuan
} from "./controllers/PengajuanController.js"

function Scheduler() {
    // Monthly CRON
    cron.schedule("1 0 1 * * *", function(){
        console.log("Creating Automatic Mandatory Pengajuan Simpanan for Every Anggota...")
        createMandatoryPengajuan();
        console.log("Pengajuan Created Succesfully!")
    })
}

export default Scheduler;
