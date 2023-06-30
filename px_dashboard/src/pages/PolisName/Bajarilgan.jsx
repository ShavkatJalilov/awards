import "./HodimBajarilganIsh.css";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "./bajarilgan.css";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { TableContainer, TableHead } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    minWidth: "180px",
    backgroundColor: "#61A6F0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },

  "&:last-child  , &:last-child  ": {
    border: 0,
  },
}));

const Bajarilgan = () => {
  const SelectValueBayon = useRef();
  const [SelectKategoryBayon, setSelectKategoryBayon] = useState();

  const [dataBackend , setdataBackend] = useState();

  const TableHeadQulda = [
    {
      id: 1,
      familya: "familya",
      ism: "ism",
      otasini_ismi: "otasini ismi",
      telefon: "telefon raqami",
      barmoqIzi: "barmoq izi",
      rasm: "rasm",
      TugilganSana: "tug'ilgan sana",
      voqeaJoyT: "voqea joyi shahar",
      voqeaJoyM: "voqea joyi mahalla",
      voqeaJoyTM: " hudud haqida ",
      olibkelinganJoy: "olib kelingan hudud",
      voqeaSababi: "voqea sababi",
      familyaG: "guvoh familyasi",
      ismG: "guvoh ismi",
      otasini_ismiG: "guvoh otasini ismi",
      telefonG: "guvoh telefon raqami",
      barmoqIziG: "guvoh barmoq izi",
      rasmG: "guvoh rasmi",
      Hulosa: "hodim hulosasi",
    },
    {
      id: 2,
      familya: "familya",
      ism: "ism",
      otasini_ismi: "otasini ismi",
      telefon: "telefon raqami",
      barmoqIzi: "barmoq izi",
      rasm: "rasm",
      TugilganSana: "tug'ilgan sana",
      voqeaJoyT: "voqea joyi shahar",
      voqeaJoyM: "voqea joyi mahalla",
      voqeaJoyTM: " hudud haqida ",
      olibkelinganJoy: "olib kelingan joy",
      tuzilganBayonnoma: "tuzilgan bayonnoma",
      Hulosa: "hodim hulosasi",
    },
    {
      id: 3,
      familya: "familya",
      ism: "ism",
      otasini_ismi: "otasini ismi",
      voqeaJoyT: "voqea joyi shahar",
      voqeaJoyM: "voqea joyi mahalla",
      voqeaJoyTM: "voqea joyi",
      telefon: "telefon raqami",

      Prof: "PROF da turuvchilar",
      Hulosa: "hodim hulosasi",
    },
    {
      id: 4,
      familya: "familya",
      ism: "ism",
      otasini_ismi: "otasini ismi",
      telefon: "telefon raqami",
      barmoqIzi: "barmoq izi",
      rasm: "rasm",
      voqeaJoyT: "voqea joyi shahar",
      voqeaJoyM: "voqea joyi mahalla",
      voqeaJoyTM: "voqea joyi",

      Hulosa: "hodim hulosasi",
    },
    {
      id: 5,
      familya: "familya",
      ism: "ism",
      otasini_ismi: "otasini ismi",
      telefon: "telefon raqami",
      barmoqIzi: "barmoq izi",
      rasm: "rasm",
      voqeaJoyT: "voqea joyi shahar",
      voqeaJoyM: "voqea joyi mahalla",
      voqeaJoyTM: "voqea joyi",
      Hulosa: "hodim hulosasi",
    },
    {
      id: 6,
      familya: "familya",
      ism: "ism",
      otasini_ismi: "otasini ismi",

      voqeaJoyT: "Obyekt manzili (tuman)",
      voqeaJoyM: "Obyekt manzili (mahalla)",
      voqeaJoyTM: "Obyekt manzili     ",
      telefon: "telefon raqami",

      Hulosa: "hodim hulosasi",
    },
    {
      id: 7,
      familya: "familya",
      ism: "ism",
      otasini_ismi: "otasini ismi",

      ovqurolMarkasi: "ov quroli markasi",
      telefon: "telefon raqami",
      qurolRaqami: "qurol raqami",

      Hulosa: "hodim hulosasi",
    },
  ];
 
  const IDhodimTwo = localStorage.getItem("idPPS");
  let Tok = localStorage.getItem("tokenPPS");

  function hasFormSubmitHodm(e) {
    e.preventDefault();
    // useEffect(() => {

    fetch(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/getStaffScore/${IDhodimTwo}/${SelectKategoryBayon}`,
      {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: Tok,
        },
      },
    ).then((response) => response.json())
      .then((data) =>   setdataBackend(data.object))
      .catch((error) => console.error(error));
  
  }


  function mapFunctionBodyB() {
    if (dataBackend && SelectKategoryBayon == 1) {
      return (
        <>
          {/* dataBackend.object map qilinadi dataBackend ni uzi emas */}

          {dataBackend.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>
                {" "}
                {row.familyName}{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {/* {row.rasm} */}
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/1/${row.id}`}
                  download
                >
                  yuklash
                </a>{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {" "}
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/1/${row.id}`}
                  download
                >
                  yuklash
                </a>{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.dateOfBirth}
              </StyledTableCell>
              <StyledTableCell align='center'> {row.town} </StyledTableCell>
              <StyledTableCell align='center'>{row.maxalla}</StyledTableCell>
              <StyledTableCell align='center'>{row.location}</StyledTableCell>
              <StyledTableCell align='center'>{row.place}</StyledTableCell>
              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.cause}</span>
              </StyledTableCell>
              <StyledTableCell align='center'>
                {" "}
                {row.witnessLast}
              </StyledTableCell>{" "}
              <StyledTableCell align='center'>
                {row.witnessName}
              </StyledTableCell>{" "}
              <StyledTableCell align='center'>
                {" "}
                {row.witnessFamily}{" "}
              </StyledTableCell>{" "}
              <StyledTableCell align='center'>{row.witnessTel}</StyledTableCell>{" "}
              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.comment}</span>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </>
      );
    } else if (dataBackend && SelectKategoryBayon == 2) {
      return (
        <>
          {/* dataBackend.object map qilinadi dataBackend ni uzi emas */}
          {dataBackend.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.familyName}{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/2/${row.id}`}
                  download
                >
                  yuklash
                </a>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/2/${row.id}`}
                  download
                >
                  yuklash
                </a>{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.dateOfBirth}
              </StyledTableCell>
              <StyledTableCell align='center'> {row.town} </StyledTableCell>
              <StyledTableCell align='center'>{row.maxalla}</StyledTableCell>
              <StyledTableCell align='center'>{row.location}</StyledTableCell>
              <StyledTableCell align='center'>{row.fromPlace}</StyledTableCell>
              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.statement}</span>
              </StyledTableCell>

              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.comment}</span>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </>
      );
    } else if (dataBackend && SelectKategoryBayon == 3) {
      return (
        <>
          {/* dataBackend.object map qilinadi dataBackend ni uzi emas */}

          {dataBackend.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.familyName}{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.phoneNumber}
              </StyledTableCell>

              <StyledTableCell align='center'> {row.town} </StyledTableCell>
              <StyledTableCell align='center'>{row.maxalla}</StyledTableCell>
              <StyledTableCell align='center'>{row.location}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.PROFPersons}
              </StyledTableCell>

              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.comment}</span>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </>
      );
    } else if (dataBackend && SelectKategoryBayon == 4) {
      return (
        <>
          {/* dataBackend.object map qilinadi dataBackend ni uzi emas */}

          {dataBackend.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.familyName}{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.dateOfBirth}
              </StyledTableCell>

              <StyledTableCell align='center'> {row.town} </StyledTableCell>
              <StyledTableCell align='center'>{row.maxalla}</StyledTableCell>
              <StyledTableCell align='center'>{row.location}</StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/3/${row.id}`}
                  download
                >
                  yuklash
                </a>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/3/${row.id}`}
                  download
                >
                  yuklash
                </a>{" "}
              </StyledTableCell>

              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.comment}</span>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </>
      );
    } else if (dataBackend && SelectKategoryBayon == 5) {
      return (
        <>
          {/* dataBackend.object map qilinadi dataBackend ni uzi emas */}

          {dataBackend.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.familyName}{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.dateOfBirth}
              </StyledTableCell>

              <StyledTableCell align='center'> {row.town} </StyledTableCell>
              <StyledTableCell align='center'>{row.maxalla}</StyledTableCell>
              <StyledTableCell align='center'>{row.location}</StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/4/${row.id}`}
                  download
                >
                  yuklash
                </a>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/4/${row.id}`}
                  download
                >
                  yuklash
                </a>{" "}
              </StyledTableCell>

              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.comment}</span>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </>
      );
    } else if (dataBackend && SelectKategoryBayon == 6) {
      return (
        <>
          {/* dataBackend.object map qilinadi dataBackend ni uzi emas */}

          {dataBackend.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.familyName}{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.phoneNumber}
              </StyledTableCell>

              <StyledTableCell align='center'> {row.town} </StyledTableCell>
              <StyledTableCell align='center'>{row.maxalla}</StyledTableCell>
              <StyledTableCell align='center'>{row.location}</StyledTableCell>

              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.comment}</span>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </>
      );
    } else if (dataBackend && SelectKategoryBayon == 7) {
      return (
        <>
          {/* dataBackend.object map qilinadi dataBackend ni uzi emas */}

          {dataBackend.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.familyName}{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.phoneNumber}
              </StyledTableCell>

              <StyledTableCell align='center'> {row.gunBrand} </StyledTableCell>
              <StyledTableCell align='center'>{row.gunNumber}</StyledTableCell>

              <StyledTableCell align='center'>
                <span className='HodimHulosaspan'> {row.comment}</span>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </>
      );
    }
  }

  return (
    <>
      <header className='HeaderHodim'>
        <h2 className="text-center mt-2 mb-4">Statistika</h2>

        <form
          className='form-detaBajargan m-0  '
          onSubmit={(e) => hasFormSubmitHodm(e)}
        >
          <select
            onClick={() =>
              setSelectKategoryBayon(SelectValueBayon.current.value)
            }
            className='SelectHeader colorSelect input-style p-0  d-flex justify-content-center  align-items-center'
            ref={SelectValueBayon}
            required
          >
            <option defaultValue disabled selected>
              Kategoriya tanlang
            </option>
            <option value='1'> IIO olib kelingan fuqarolar</option>
            <option value='2'>Tuzilgan bayonnomalar</option>
            <option value='3'>PROF hisobdagi shaxslar</option>
            <option value='4'>Ushlangan qidiruvdagilar</option>
            <option value='5'>Aniqlangan bedaraklar</option>
            <option value='6'>Obyekt qorovulari</option>
            <option value='7'>Ov qurollari</option>
          </select>
          <button type='submit' className='btn btn-outline-primary ms-5 '>
            Tanlash
          </button>
        </form>
      </header>
      <hr className='HRBajarilgan' />

      <>
        <TableContainer>
          <Table className='TableBajarilgan'>
            <TableHead>
              <TableRow>
                {TableHeadQulda.map((item) => {
                  if (
                    SelectKategoryBayon == 1 &&
                    SelectKategoryBayon == item.id
                  ) {
                    return (
                      <>
                        <StyledTableCell align='center'>
                          {" "}
                          {item.familya}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {" "}
                          {item?.ism}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.telefon}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.barmoqIzi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.rasm}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.TugilganSana}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyT}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyTM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.olibkelinganJoy}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item.voqeaSababi}{" "}
                        </StyledTableCell>{" "}
                        <StyledTableCell align='center'>
                          {item?.familyaG}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.ismG}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismiG}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.telefonG}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.Hulosa}
                        </StyledTableCell>
                      </>
                    );
                  } else if (
                    SelectKategoryBayon == 2 &&
                    SelectKategoryBayon == item.id
                  ) {
                    return (
                      <>
                        <StyledTableCell align='center'>
                          {" "}
                          {item.familya}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {" "}
                          {item?.ism}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.telefon}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.barmoqIzi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.rasm}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.TugilganSana}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyT}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyTM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.olibkelinganJoy}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.tuzilganBayonnoma}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.Hulosa}
                        </StyledTableCell>
                      </>
                    );
                  } else if (
                    SelectKategoryBayon == 3 &&
                    SelectKategoryBayon == item.id
                  ) {
                    return (
                      <>
                        <StyledTableCell align='center'>
                          {" "}
                          {item.familya}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {" "}
                          {item?.ism}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.telefon}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.voqeaJoyT}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyTM}{" "}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.Prof}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.Hulosa}
                        </StyledTableCell>
                      </>
                    );
                  } else if (
                    SelectKategoryBayon == 4 &&
                    SelectKategoryBayon == item.id
                  ) {
                    return (
                      <>
                        <StyledTableCell align='center'>
                          {" "}
                          {item.familya}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {" "}
                          {item?.ism}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.telefon}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.barmoqIzi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.rasm}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyT}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyTM}{" "}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.Hulosa}
                        </StyledTableCell>
                      </>
                    );
                  } else if (
                    SelectKategoryBayon == 5 &&
                    SelectKategoryBayon == item.id
                  ) {
                    return (
                      <>
                        <StyledTableCell align='center'>
                          {" "}
                          {item.familya}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {" "}
                          {item?.ism}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.telefon}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.barmoqIzi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.rasm}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyT}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyTM}{" "}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.Hulosa}
                        </StyledTableCell>
                      </>
                    );
                  } else if (
                    SelectKategoryBayon == 6 &&
                    SelectKategoryBayon == item.id
                  ) {
                    return (
                      <>
                        <StyledTableCell align='center'>
                          {" "}
                          {item.familya}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {" "}
                          {item?.ism}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.telefon}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.voqeaJoyT}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyM}{" "}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.voqeaJoyTM}{" "}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.Hulosa}
                        </StyledTableCell>
                      </>
                    );
                  } else if (
                    SelectKategoryBayon == 7 &&
                    SelectKategoryBayon == item.id
                  ) {
                    return (
                      <>
                        <StyledTableCell align='center'>
                          {" "}
                          {item.familya}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {" "}
                          {item?.ism}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.otasini_ismi}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.telefon}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.ovqurolMarkasi}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {item?.qurolRaqami}{" "}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {item?.Hulosa}
                        </StyledTableCell>
                      </>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody className='TableRowScrol'>
              {mapFunctionBodyB()}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
};

export default Bajarilgan;
