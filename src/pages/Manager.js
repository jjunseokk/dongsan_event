import React from "react";
import '../style/manager.scss'


const Manager = () =>{
    return (
        <div className="manager-container">
            <div className="sidebar">

            </div>
            <div className="section">
                <table>
                    <thead style={{backgroundColor : 'gray'}}>
                        <tr >
                            <td>번호</td>
                            <td>이름</td>
                            <td>전화번호</td>
                            <td>비밀번호</td>
                            <td colSpan="1">포인트</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>박준석</td>
                            <td>010-0000-0000</td>
                            <td>Junseok12!</td>
                            <td>4400p</td>
                            <td><button>포인트 변경</button></td>
                            <td><button>삭제</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Manager;