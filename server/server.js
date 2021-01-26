const express = require('express'); // express 모듈 불러오기
const app = express();   //app변수
const PORT = process.env.PORT || 4000; //포트 번호 할당

app.get('/',(req,res) =>{
    res.send('Server Response Success');
})

app.listen(PORT,()=>{
    console.log(`Server on : http://localhost:${PORT}/`)
})

