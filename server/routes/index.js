const router = require("express").Router();
const parkingRouter = require("./parkingRouter");

router.use("/parkings", parkingRouter);

module.exports = router;
