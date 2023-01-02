const express = require('express');
const router = express.Router();

router.get('/login',(req,res)=>{
    res.send('목록 뿌리기');
})
router.post('/login',(req,res)=>{
    res.send('목록 뿌리기');
})

module.exports = router;