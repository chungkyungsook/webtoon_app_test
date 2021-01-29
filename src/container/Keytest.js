import React, { useRef, useState } from 'react';
import axios from "axios";
import KeyTemp from "./KeyTemp";
import KinokoTemp from "./KinokoTemp";
const Keytest = () =>{
    const url = '172.26.3.62'

    //key값 저장
    const [keys, setKeys] = useState({
        keyList : undefined,
        idKey : false
    })
    

    //input 값 바꿔주기
    const [input, setInput] = useState({
        user : '',
    })

    //user정보 
    const [users, setUsers] = useState([
        {
          id: 1,
          username: 'velopert',
          userKey: '1111'
        },
        {
          id: 2,
          username: 'tester',
          userKey: '2222'
        },
        {
          id: 3,
          username: 'liz',
          userKey: '3333'
        }
      ]);
    
    const nextId = useRef(3)
    //user 생성
    const onCreate = () => {

        const user = {
          id: nextId.current,
          username : `me${nextId.current}`,
          userKey : JSON.stringify(keys.keyList.key).replaceAll('"','')
          
        };
        setUsers([...users, user]);
    
        setKeys({
            keyList :undefined
        })
        nextId.current += 1;
      };
    

    
    //값 비교
    const _getList = () =>{
        const apiUrl = '/dummy/key.json';
        axios.get(apiUrl).then(data =>{
            setKeys({
                keyList : data.data.keyNumber.find(k =>(
                    k.key === input.user
                ))
            })
        }).catch(e=>{
            console.log(e)
        })
    }

    //input값 바꾸기
    const onchange = (e) =>{
        setInput({
            user : e.target.value
        })
    }

    const [tset1, setTest1] = useState({
        persons: []
    })

    const [kionoko ,setKinoko] = useState({
        kinokoObj : [],
    })

    //서버 통신
    const onClick = ()=>{
        console.log("클리ㅣㄱ")
        
        //list 값 받아오기
        axios.get(`http://${url}/api/myfarm/list`,{
            params :{
                userId : 'SZ4S71'
            }
            
        }).then(data =>{
            setKinoko({
                kinokoObj : data.data
            })
        })
    }
    return (
        <div>
            <button onClick={onClick}>값 통신</button><br/>
            <input onChange={onchange} />
            <button onClick={_getList}>값 가져오기</button>
            <h1>{input.user}</h1>
            <h1>{console.log(keys.keyList)}</h1>
            <h1>{keys.keyList === undefined ? "인증 실패" : onCreate()}</h1>
            <h2>{console.log(users)}</h2>
            <h2>{console.log("kinoko",kionoko.kinokoObj)}</h2>
            {/* <KeyTemp users={users}/> */}
            <KinokoTemp kionoko={kionoko.kinokoObj}/>
        </div>
    )
}

export default Keytest;
