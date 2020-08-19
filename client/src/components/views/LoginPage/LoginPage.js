import React ,{useState} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'

function LoginPage(props) {

    const dispatch = useDispatch();

    //state변화를 시켜서 input의 value 값을 변화시킨다
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
       event.preventDefault();

       let body = {
           email:Email,
           password:Password
       }

       dispatch(loginUser(body))
       .then(response => {
           if(response.payload.loginSuccess){
               props.history.push('/')
           }else{
               alert('Error');
           }
       })

    }
    //타이핑을 하기 위해 onChange 이벤트 발생시켜서 value를 수정되게 한다.
    return (
        <div style={{
            display:'flex', justifyContent:'center',
            alignItems:'center',width:'100%',height:'100vh'
        }}>

           <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
           >
                <label>Email</label>
               <input type="email" value={Email} onChange={onEmailHandler} />
               <label>Password</label>
               <input type="password" value={Password} onChange={onPasswordHandler}/>
               <br/>
               <button>
                    Login
               </button>
           </form>
        </div>
    );
}

export default withRouter(LoginPage);