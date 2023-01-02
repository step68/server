const express = require('express');
const router = express.Router();
const {
    mainIndex,
    getAllUsers,
    getUser,
    userCreate,
    userUpdate,
    userDelete
} = require('../controller/root_controller');



router.get('/' , mainIndex)
router.get('/list' , getAllUsers)
router.get('/:userid' , getUser)
router.post('/' , userCreate)
router.post('/login' , (req, res)=>{
    res.send('목록 뿌리기');
})
router.put('/' , userUpdate)
router.delete('/' , userDelete)

module.exports = router;