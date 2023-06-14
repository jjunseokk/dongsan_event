import React, { useEffect, useState } from "react";
import "../style/manager.scss";
import axios from "axios";

const Manager = () => {
  const [data, setData] = useState([]);
  const [sub_point, setSub_point] = useState(0);
  const [spendData, setSpendData] = useState();
  const [subData, setSubData] = useState();
  const [deleteData, setDeleteData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetchData();
  }, [subData, deleteData]);

  const fetchData = () => {
    axios
      .post("/manager", { searchName })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => console.error(error));
  };

  const request = (item) => {
    console.log(item);
    if (item && item.point < sub_point) {
      alert("차감될 포인트가 현재 포인트보다 많습니다.");
    } else {
      const requestData = { sub_point, item };
      setSpendData(requestData);
      // axios.post 호출 전에 spendData 값을 설정하고 있습니다.
      axios
        .post("/subPoint", requestData)
        .then((response) => {
          console.log(response);
          setSubData(response);
        })
        .catch((error) => console.error(error));
    }
  };

  const deletePoint = (item) => {
    console.log(item);
    axios
      .post("/deletePoint", item)
      .then((response) => {
        console.log(response);
        setDeleteData(response);
        // Remove the deleted item from the data array
        setData((prevData) => prevData.filter((prevItem) => prevItem !== item));
      })
      .catch((error) => console.error(error));
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the numbering for the items
  const calculateItemNumber = (index) => indexOfFirstItem + index + 1;




  return (
    <div className="manager-container">
      <input
        className="search"
        onChange={(e) => setSearchName(e.target.value)}
        type="text"
        placeholder="이름을 검색하세요"
      />
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
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{calculateItemNumber(index)}</td>
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
                  <button onClick={() => deletePoint(item)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (page, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Manager;
