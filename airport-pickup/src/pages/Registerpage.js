import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../const';
import axios from 'axios';


export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [wechat, setWechat] = useState("");
    const [phone, setPhone] = useState("");

    function onFormSubmit(e){
        e.preventDefault();
        const volunteerInfo = {
            name,
            email,
            wechat,
            phone
        }
        // console.log(volunteerInfo)
        axios.post(serverUrl, { volunteerInfo })
        .then(res => {
        console.log(res);
        console.log(res.data)
        })
        navigate("/choosetime")
    }

  return (
    <div className='row justify-content-center p-5'>
        <div className='col-12 col-md-8'>
            <h1 className='fw-bold my-4'>接机志愿者注册</h1>
        <div className='col-12 col-md-8'>
            谢谢您参与接机！问卷实时更新，欢迎您选择合适的时间！如果想要接多位学生可多次提交本问卷~
            </div>
            <div  className='my-2'>
            免责声明： RCSSA在本次活动中只提供一个志愿者和新生匹配的平台，无法为因此产生的后果承担任何责任。在接机过程中可能会出现新生因为海关，行李，天气等原因导致延误，还请您和新生保持联络。希望您可以通过本次活动结识更多的rice新生！
            </div>
            <div  className='my-2 color-light-blue'>
            友情提醒：新生普遍会携带两个大号托运箱和一个登机箱，请您也考虑行李所需的空间。（家用轿车，小型suv大概可以接下两位新生，大suv可以接下三位新生）
            </div>
            <form className='mt-3 row' onSubmit={(e)=>onFormSubmit(e)}>
                <div className="my-2 col-12 col-md-6">
                    <div className='fw-bold mb-2'>姓</div>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="" required/>
                </div>
                <div className="my-2 col-12 col-md-6">
                    <div className='fw-bold mb-2'>名</div>
                    <input type="text" className="form-control" value={name}  placeholder="" required/>
                </div>
                <div className="my-2 col-12 col-md-6">
                    <div className='mb-2'><b>邮箱</b> (请填入@rice.edu邮箱以便于身份核实)</div>
                    <input type="email" id="email" pattern=".+@rice.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="@rice.edu" required/>
                </div>
                <div className="my-2 col-12 col-md-6">
                    <div className='fw-bold mb-2'>微信号</div>
                    <input type="text" className="form-control" placeholder="" value={wechat} onChange={e => setWechat(e.target.value)} />
                </div>
                <div className="my-2 col-12 col-md-6">
                    <div className='mb-2'><b>手机号</b> (格式: 123-456-7890) </div> 
                    <input type="tel" id="phone" className="form-control" name="phone"
                        pattern="[0-9]{3}(-)?[0-9]{3}(-)?[0-9]{4}"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required/>
                </div>
                {/* <div className="my-2 col-12 col-md-6">
                    <div className='fw-bold mb-2'>其他联系方式</div>
                    <input type="text" className="form-control" placeholder=""/>
                </div> */}

                <div className="form-check mt-4">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" required/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        我已阅读并了解免责声明
                    </label>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type='submit' className='btn btn-info homepage-btn my-3'>下一步</button>
                </div>
            </form>
        </div>
    </div>
  )
}
