import "./Stat.css";
import { useEffect, useState } from "react";
import { getFormControlUnstyledUtilityClass } from "@mui/base";
function Statistika() {
  const [Hodims, setHodims] = useState([]);
  const [test, setTest] = useState(true);

  let Toke = localStorage.getItem("tokenPPS");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: Toke,
      },
    })
      .then((response) => response.json())
      .then((data) => setHodims(data))
      .catch((error) => console.error(error));
  }, []);
  // useEffect(() => {
  //   console.log("test true and false");
  // }, test);

  // function testFunk() {
  //   console.log("test");

  //   setTest((test = false));
  //   console.log(test);
  // }
  return (
    <>
      {/* <button onClick={() => testFunk()}>test</button> */}
      <h2 className='text-center mt-5'>Hodimlar statistikasi</h2>
      <table className='table-statistika'>
        <tr className='trStat'>
          <th className='trStat'>Familiya ism</th>
          <th className='trStat'>Oylik to'plagan ball</th>
          <th className='trStat'>Kunlik to'plagan ball</th>
        </tr>
        {Hodims?.object?.map((item, index) => {
          return (
            <>
              <tr className='trStat'>
                <td className='trStat'>{item.name} </td>
                <td className='trStat'>{item.last} </td>
                <td className='trStat'>{item.birth}</td>
              </tr>
            </>
          );
        })}
      </table>
    </>
  );
}
export default Statistika;
