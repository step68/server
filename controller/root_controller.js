const fs = require('fs');
const path = require('path');
const users = require('../model/data.json');
console.log( users );


const setUser = user =>{ users.push(user); }
const writeUser = users =>{ 
    fs.writeFile(path.join(__dirname,'..','model','data.json'),  users , (err)=>{
        if(err) console.log(err);
    })
}
const mainIndex = (req, res)=>{  // 맨처음 컴 켜질경우   
    res.sendFile( path.join(__dirname,'..', 'views', 'index.html')); 
}
const getAllUsers = (req, res)=>{ 
    res.json(users);
}
const getUser = (req, res)=>{
    console.log( req.params.userid );
    // find {}
    // filter [{}, {}]
    const filterData = users.find( user => user.userid === req.params.userid );
    let resData = {};
    if( !filterData ){
        resData = { 'success': false, 'message' : '데이터를 찾을 수 없습니다.' };   
    }else{
        resData = { 'success': true, 'message' : '정상처리', data : filterData }
    } 
    res.json( resData );
}
const userCreate = (req, res)=>{
    // 중복된 데이터 있으면 에러 
    // 없으면 생성 
    console.log( req.body.userid );
    const filterData = users.find(user => user.userid === req.body.userid);
    let resData = {}

    // 이미있으면 안됨 
    if( filterData ){
        resData = { 'success': false, 'message' : '중복된 아이디가 존재' };   
    }else{
        const id = users.length > 0 ? users[users.length-1].id + 1  : 1 ; 
        // 2개 + 1  : 유일한 키값의 중복 발생할 수 있음 
        // 마지막 배열의 키값의 id 몇번을 가지고 있나 찾아서 그값 + 1; 
        // 자동 생성 시스템
    
        const data = req.body;
        const user = { id ,  ...data  }; 
        
        setUser( user );
        writeUser( JSON.stringify(users, null, " " ) );
        // users 아니라 fliter된 users 
        console.log( users ); 
    
        resData = { 'success': true, 'message' : '정상처리', data : users }
    } 
    res.json( resData );
}
const userUpdate = (req, res)=>{
    // 수정할 데이타를 찾아서 
    // 찾은 데이터가 있으면 수정 없으면 에러
    console.log( req.body.userid );
    const user = users.find( user =>  user.userid === req.body.userid );
    if( !user ){
        res.json({success:false, message:'데이터 없음'})
    }
  
    if( req.body.username !== '' ){
        user.username = req.body.username; 
    }
    if( req.body.useremail !== ''){
        user.useremail = req.body.useremail; 
    }
    if( req.body.userphone !== ''){
        user.userphone = req.body.userphone; 
    }
    // updateData 수정됨 


    // 기존 데이터를 지우고 수정된 데이터로 새로 쓰기 
    const filterData = users.filter( user =>  user.userid !== req.body.userid );
    //const updateData = filerData.push( user );  // 뒤에 넣기 
    const updateData = [user, ...filterData];  // 앞에 넣기 

    const resData = {success:true, message:'수정되었습니다.'}

    writeUser( JSON.stringify(updateData, null, " " )  );
    res.send(resData);
}
const userDelete = (req, res)=>{
    // 삭제할 데이타를 찾아서 
    // 찾은 데이터가 있으면 삭제 없으면 에러
    console.log( req.body.userid );
    const deleteData = users.find( user =>  user.userid === req.body.userid );
    if( !deleteData ){
        res.json({success:false, message:'데이터 없음'})
    }
    // 배열의 데이터를 지워진 것 처럼 만들기 
    // 지울 데이터를 제외한 배열 생성 => db 덮어쓰기
    const filterData = users.filter( user =>  user.userid !== req.body.userid );
    const resData = {success:true, message:'삭제되었습니다.'}

    writeUser( JSON.stringify(filterData, null, " " )  );
    res.send(resData);
}

module.exports = {
    setUser,
    writeUser,
    mainIndex,
    getAllUsers,
    getUser,
    userCreate,
    userUpdate,
    userDelete
}