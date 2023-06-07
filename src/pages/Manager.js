import React, { useEffect, useState } from "react";
import "../style/manager.scss";
import axios from "axios";

const Manager = () => {
  const [data, setData] = useState([]);
  const [sub_point, setSub_point] = useState(0);
  const [spendData, setSpendData] = useState();
  const [subData, setSubData] = useState();
  const [deleteData, setDeleteData] = useState();

  useEffect(() => {
    fetchData();
  }, [subData, deleteData]);

  const fetchData = () => {
    axios
      .post("/manager")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .post('/subPoint', { spendData })
      .then((response) => {
        console.log(response);
        setSubData(response);
      })
      .catch((error) => console.error(error))
  }, [spendData]);

  const request = (item) => {
    if (item && item.point < sub_point) {
      alert("차감될 포인트가 현재 포인트보다 많습니다.");
    } else {
      setSpendData({ sub_point, item });
    }
  };

  console.log(deleteData);

  const deletePoint = (item) => {
    console.log(item);
    axios
      .post('/deletePoint', item)
      .then((response => {
        console.log(response);
        setDeleteData(response);
        // Remove the deleted item from the data array
        setData((prevData) => prevData.filter((prevItem) => prevItem !== item));
      }))
      .catch(error => console.error(error))
  };


  return (
    <div className="manager-container">
      {/* <div className="sidebar">
        광주동산교회 관리자 페이지
      </div> */}
      <div className="section">
        <table>
          <thead style={{ backgroundColor: "gray" }}>
            <tr>
              <td>번호</td>
              <td>이름</td>
              <td>전화번호</td>
              <td>비밀번호</td>
              <td>포인트</td>
              <td>포인트차감</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.password}</td>
                <td>{item.point}</td>
                <td>
                  <input
                    onChange={(e) => {
                      setSub_point(parseInt(e.target.value));
                    }}
                    type="number"
                  />
                </td>
                <td>
                  <button onClick={() => request(item)}>포인트 변경</button>
                </td>
                <td>
                  <button onClick={() => { deletePoint(item) }}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
