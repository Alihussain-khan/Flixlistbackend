import express from 'express';
import { registerController, loginController, dummyController, movieController } from '../controller/autcontroller.js';
import { isAdmin, signInRequire } from '../Middleware/middleWare.js';

// creating Router Object
const router = express.Router();


// Method POST / Route Register
router.post("/register", registerController)


// Method POST / Route Login
router.post("/login", loginController)

// Method POST / Route Login
router.post("/entermovie", movieController)

// Method GET / Route dummy
router.get("/dummy", signInRequire, isAdmin, dummyController)


export default router;

