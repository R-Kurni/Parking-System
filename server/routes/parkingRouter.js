const router = require("express").Router();
const ParkingController = require("../controllers/parkingController");

router.get("/", ParkingController.getParkings);
router.post("/", ParkingController.createParking);

module.exports = router;
