import express from 'express';
import { registerController, usermovies,  verifiy, loginController, dummyController, movieController, moviesSender, add, remove} from '../controller/autController.js';

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

router.get("/sendmovies", moviesSender)

router.put("/add", add)

router.put("/remove", remove)

router.get("/verify", verifiy)

router.post("/usermovies", usermovies)

export default router;

