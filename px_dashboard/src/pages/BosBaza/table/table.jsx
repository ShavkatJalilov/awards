import "../table/table.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditQalam from "../../../assets/imgs/editQalam";
import { useRef } from "react";
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

function Tables({ SelectKategory, dataBackend }) {
  const [editeText, setEditeText] = useState();

  const modalFamilya = useRef();
  let modalpolisName = useRef();
  let modalpolisFather = useRef();
  let modalpolisTel = useRef();
  let modalpolisLocation = useRef();
  let modalpolisMahalla = useRef();
  let modalpolisPolisJoy = useRef();
  let modalpolisKeltirilganJoy = useRef();
  let modalpolisDescription = useRef();
  let modalwitnessName = useRef();
  let modalwitnessFirstName = useRef();
  let modalwitnessFather = useRef();
  let modalwitnessTel = useRef();
  let modalhodimHulosa = useRef();
  let modaltugilganKuni = useRef();

  const modalFamilyaBayon = useRef();
  let modalpolisNameBayon = useRef();
  let modalpolisFatherBayon = useRef();
  let modalpolisTelBayon = useRef();
  let modaltugilganKuniBayon = useRef();

  let modalpolisLocationBayon = useRef();
  let modalpolisMahallaBayon = useRef();
  let modalpolisPolisJoyBayon = useRef();
  let modalpolisKeltirilganJoyBayon = useRef();
  let tuzilganBayonoma = useRef();
  let modalhodimHulosaBayon = useRef();

  const modalFamilyaProf = useRef();
  let modalpolisNameProf = useRef();
  let modalpolisFatherProf = useRef();
  let modalpolisTelProf = useRef();

  let modalpolisLocationProf = useRef();
  let modalpolisMahallaProf = useRef();
  let modalpolisPolisJoyProf = useRef();

  let ProfHisobT = useRef();
  let modalhodimHulosaProf = useRef();

  const modalFamilyaQidir = useRef();
  let modalpolisNameQidir = useRef();
  let modalpolisFatherQidir = useRef();
  let modalpolisTelQidir = useRef();

  let modalpolisLocationQidir = useRef();
  let modalpolisMahallaQidir = useRef();
  let modalpolisPolisJoyQidir = useRef();
  let modalhodimHulosaQidir = useRef();

  const modalFamilyaBedarak = useRef();
  let modalpolisNameBedarak = useRef();
  let modalpolisFatherBedarak = useRef();
  let modalpolisTelBedarak = useRef();

  let modalpolisLocationBedarak = useRef();
  let modalpolisMahallaBedarak = useRef();
  let modalpolisPolisJoyBedarak = useRef();
  let modalhodimHulosaBedarak = useRef();

  const modalFamilyaQorovul = useRef();
  let modalpolisNameQorovul = useRef();
  let modalpolisFatherQorovul = useRef();
  let modalpolisTelQorovul = useRef();

  let modalpolisLocationQorovul = useRef();
  let modalpolisMahallaQorovul = useRef();
  let modalpolisPolisJoyQorovul = useRef();
  let modalhodimHulosaQorovul = useRef();

  const modalFamilyaQurol = useRef();
  let modalpolisNameQurol = useRef();
  let modalpolisFatherQurol = useRef();
  let modalpolisTelQurol = useRef();
  let QurolNomi = useRef();
  let QurolRaqami = useRef();
  let modalhodimHulosaQurol = useRef();

  function functionModal(e) {
    e.preventDefault();
    let editButonId = e.target.id;
    localStorage.setItem("idPage", editButonId);
    function fetchDataModalIdolish(API) {
      let IDS = localStorage.getItem("idPage");

      fetch(`${API}${IDS}`)
        .then((response) => response.json())
        .then((data) => {
          setEditeText(data.object);
        })
        .catch((error) => console.error(error));
    }

    if (SelectKategory == 1) {
      fetchDataModalIdolish(`${process.env.REACT_APP_BACKEND_API}/api/v1/getIdPerson/`);
    } else if (SelectKategory == 2) {
      fetchDataModalIdolish(`${process.env.REACT_APP_BACKEND_API}/api/statement/get/`);
    } else if (SelectKategory == 3) {
      fetchDataModalIdolish(`${process.env.REACT_APP_BACKEND_API}/api/PROFPersons/getIdProf/`);
    } else if (SelectKategory == 4) {
      fetchDataModalIdolish(`${process.env.REACT_APP_BACKEND_API}/api/v1/getIdCatchWanted/`);
    } else if (SelectKategory == 5) {
      fetchDataModalIdolish(`${process.env.REACT_APP_BACKEND_API}/api/v1/getIdIdentify/`);
    } else if (SelectKategory == 6) {
      fetchDataModalIdolish(`${process.env.REACT_APP_BACKEND_API}/api/guards/getGuard/`);
    } else if (SelectKategory == 7) {
      fetchDataModalIdolish(
        `${process.env.REACT_APP_BACKEND_API}/api/CheckWeapons/getid/`,
      );
    }
  }

  const FormTozalash = useRef();

  const FormTozalash2 = useRef();
  const FormTozalash3 = useRef();
  const FormTozalash4 = useRef();
  const FormTozalash5 = useRef();
  const FormTozalash6 = useRef();
  const FormTozalash7 = useRef();

  const postDataRoyxatModalEdite = async (API) => {
    try {
      const formData = new FormData();
      if (SelectKategory == 1) {
        formData.append("firstName", modalpolisName.current.value);
        formData.append("lastName", modalFamilya.current.value);
        formData.append("familyName", modalpolisFather.current.value);
        formData.append("phoneNumber", modalpolisTel.current.value);
        formData.append("dateOfBirth", modaltugilganKuni.current.value);
        formData.append("place", modalpolisKeltirilganJoy.current.value);
        formData.append("cause", modalpolisDescription.current.value);
        formData.append("town", modalpolisLocation.current.value);
        formData.append("maxalla", modalpolisMahalla.current.value);
        formData.append("location", modalpolisPolisJoy.current.value);
        formData.append("comment", modalhodimHulosa.current.value);
        formData.append("witnessName", modalwitnessName.current.value);
        formData.append("witnessLast", modalwitnessFirstName.current.value);
        formData.append("witnessFamily", modalwitnessFather.current.value);
        formData.append("witnessTel", modalwitnessTel.current.value);
      } else if (SelectKategory == 2) {
        formData.append("firstName", modalpolisNameBayon.current.value);
        formData.append("lastName", modalFamilyaBayon.current.value);
        formData.append("familyName", modalpolisFatherBayon.current.value);
        formData.append("phoneNumber", modalpolisTelBayon.current.value);
        formData.append("dateOfBirth", modaltugilganKuniBayon.current.value);
        formData.append("statement", tuzilganBayonoma.current.value);
        formData.append("town", modalpolisLocationBayon.current.value);
        formData.append("maxalla", modalpolisMahallaBayon.current.value);
        formData.append("location", modalpolisPolisJoyBayon.current.value);
        formData.append(
          "fromPlace",
          modalpolisKeltirilganJoyBayon.current.value,
        );
        formData.append("comment", modalhodimHulosaBayon.current.value);
      } else if (SelectKategory == 3) {
        formData.append("firstName", modalpolisNameProf.current.value);
        formData.append("lastName", modalFamilyaProf.current.value);
        formData.append("familyName", modalpolisFatherProf.current.value);
        formData.append("phoneNumber", modalpolisTelProf.current.value);

        formData.append("town", modalpolisLocationProf.current.value);
        formData.append("maxalla", modalpolisMahallaProf.current.value);
        formData.append("location", modalpolisPolisJoyProf.current.value);
        formData.append("PROFPersons", ProfHisobT.current.value);
        formData.append("comment", modalhodimHulosaProf.current.value);
      } else if (SelectKategory == 4) {
        formData.append("firstName", modalpolisNameQidir.current.value);
        formData.append("lastName", modalFamilyaQidir.current.value);
        formData.append("familyName", modalpolisFatherQidir.current.value);
        formData.append("phoneNumber", modalpolisTelQidir.current.value);

        formData.append("town", modalpolisLocationQidir.current.value);
        formData.append("maxalla", modalpolisMahallaQidir.current.value);
        formData.append("location", modalpolisPolisJoyQidir.current.value);
        formData.append("comment", modalhodimHulosaQidir.current.value);
      } else if (SelectKategory == 5) {
        formData.append("firstName", modalpolisNameBedarak.current.value);
        formData.append("lastName", modalFamilyaBedarak.current.value);
        formData.append("familyName", modalpolisFatherBedarak.current.value);
        formData.append("phoneNumber", modalpolisTelBedarak.current.value);

        formData.append("town", modalpolisLocationBedarak.current.value);
        formData.append("maxalla", modalpolisMahallaBedarak.current.value);
        formData.append("location", modalpolisPolisJoyBedarak.current.value);
        formData.append("comment", modalhodimHulosaBedarak.current.value);
      } else if (SelectKategory == 6) {
        formData.append("firstName", modalpolisNameQorovul.current.value);
        formData.append("lastName", modalFamilyaQorovul.current.value);
        formData.append("familyName", modalpolisFatherQorovul.current.value);
        formData.append("phoneNumber", modalpolisTelQorovul.current.value);

        formData.append("town", modalpolisLocationQorovul.current.value);
        formData.append("maxalla", modalpolisMahallaQorovul.current.value);
        formData.append("location", modalpolisPolisJoyQorovul.current.value);
        formData.append("comment", modalhodimHulosaQorovul.current.value);
      } else if (SelectKategory == 7) {
        formData.append("firstName", modalpolisNameQurol.current.value);
        formData.append("lastName", modalFamilyaQurol.current.value);
        formData.append("familyName", modalpolisFatherQurol.current.value);
        formData.append("phoneNumber", modalpolisTelQurol.current.value);
        formData.append("town", QurolNomi.current.value);
        formData.append("maxalla", QurolRaqami.current.value);
        formData.append("comment", modalhodimHulosaQurol.current.value);
      }

      const pageID = localStorage.getItem("idPage");
      console.log(API);
      const res = await fetch(` ${API}${pageID}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("tokenPPS"),
        },

        body: formData,
      });
    } catch (error) {
      console.log(error);
    }

    FormTozalash?.current?.reset();
    FormTozalash2?.current?.reset();
    FormTozalash3?.current?.reset();
    FormTozalash4?.current?.reset();
    FormTozalash5?.current?.reset();
    FormTozalash6?.current?.reset();
    FormTozalash7?.current?.reset();
  };
  function fromModal(e) {
    console.log(e);
    e.preventDefault();
    if (SelectKategory == 1) {
      postDataRoyxatModalEdite(`${process.env.REACT_APP_BACKEND_API}/api/v1/updatePerson/`);
    } else if (SelectKategory == 2) {
      postDataRoyxatModalEdite(`${process.env.REACT_APP_BACKEND_API}/api/statement/update/`);
    } else if (SelectKategory == 3) {
      postDataRoyxatModalEdite(`${process.env.REACT_APP_BACKEND_API}/api/PROFPersons/update/`);
    } else if (SelectKategory == 4) {
      postDataRoyxatModalEdite(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/updateCatchWanted/`,
      );
    } else if (SelectKategory == 5) {
      postDataRoyxatModalEdite(`${process.env.REACT_APP_BACKEND_API}/api/v1/updateIdentify/`);
    } else if (SelectKategory == 6) {
      postDataRoyxatModalEdite(`${process.env.REACT_APP_BACKEND_API}/api/guards/updateGuard/`);
    } else if (SelectKategory == 7) {
      postDataRoyxatModalEdite(
        `${process.env.REACT_APP_BACKEND_API}/api/CheckWeapons/update/`,
      );
    }
  }

  const postDataRoyxatModalEditeFun = () => {
    fromModal();
  };

  function deletFuK(e) {
    e.preventDefault();
    let idDel = localStorage.getItem("idPage");

    const deleteStudent = async (API) => {
      try {
        const response = await fetch(`${API}${idDel}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (SelectKategory == 1) {
      deleteStudent(`${process.env.REACT_APP_BACKEND_API}/api/v1/deletePerson/`);
    }
    if (SelectKategory == 2) {
      deleteStudent(`${process.env.REACT_APP_BACKEND_API}/api/statement/delete/`);
    }
    if (SelectKategory == 3) {
      deleteStudent(`${process.env.REACT_APP_BACKEND_API}/api/PROFPersons/delete/`);
    }
    if (SelectKategory == 4) {
      deleteStudent(`${process.env.REACT_APP_BACKEND_API}/api/v1/deleteCatchWanted/`);
    }
    if (SelectKategory == 5) {
      deleteStudent(`${process.env.REACT_APP_BACKEND_API}/api/v1/deleteIdIdentify/`);
    }
    if (SelectKategory == 6) {
      deleteStudent(`${process.env.REACT_APP_BACKEND_API}/api/guards/deleteGuards/`);
    }
    if (SelectKategory == 7) {
      deleteStudent(`${process.env.REACT_APP_BACKEND_API}/api/CheckWeapons/delete/`);
    }
    FormTozalash?.current?.reset();

    FormTozalash2?.current?.reset();
    FormTozalash3?.current?.reset();
    FormTozalash4?.current?.reset();
    FormTozalash5?.current?.reset();
    FormTozalash6?.current?.reset();
    FormTozalash7?.current?.reset();
  }

  let MX = 0;

  if (SelectKategory == 1) {
    MX = 1;
  }

  if (SelectKategory == 2) {
    MX = 2;
  }
  if (SelectKategory == 3) {
    MX = 3;
  }
  if (SelectKategory == 4) {
    MX = 4;
  }
  if (SelectKategory == 5) {
    MX = 5;
  }
  if (SelectKategory == 6) {
    MX = 6;
  }
  if (SelectKategory == 7) {
    MX = 7;
  }

  function ModalInputs() {
    if (MX == 1 && editeText) {
      return (
        <>
          <form
            ref={FormTozalash}
            onSubmit={(e) => fromModal(e)}
            htmlFor='example'
          >
            <div>
              <input
                className='ModalinputIIO'
                defaultValue={editeText.lastName}
                ref={modalFamilya}
                type='text'
              />

              <input
                className='ModalinputIIO'
                defaultValue={editeText.firstName}
                ref={modalpolisName}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.familyName}
                ref={modalpolisFather}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.phoneNumber}
                ref={modalpolisTel}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.dateOfBirth}
                ref={modaltugilganKuni}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.town}
                ref={modalpolisLocation}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.maxalla}
                ref={modalpolisMahalla}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.location}
                type='text'
                ref={modalpolisPolisJoy}
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.place}
                ref={modalpolisKeltirilganJoy}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.witnessName}
                ref={modalwitnessName}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.witnessLast}
                ref={modalwitnessFirstName}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.witnessFamily}
                ref={modalwitnessFather}
                type='text'
              />
              <input
                className='ModalinputIIO me-5'
                defaultValue={editeText.witnessTel}
                ref={modalwitnessTel}
                type='text'
              />

              <textarea
                defaultValue={editeText.cause}
                ref={modalpolisDescription}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
              <textarea
                defaultValue={editeText.comment}
                ref={modalhodimHulosa}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
            </div>
            <div className='butonModal'>
              <button
                type='click'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={(e) => deletFuK(e)}
              >
                o'chirish
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => postDataRoyxatModalEditeFun()}
              >
                o'zgartirish
              </button>
            </div>
          </form>
        </>
      );
    } else if (MX == 2 && editeText) {
      return (
        <>
          <form
            ref={FormTozalash2}
            onSubmit={(e) => fromModal(e)}
            htmlFor='example'
          >
            <div>
              <input
                className='ModalinputIIO'
                placeholder={editeText.lastName}
                ref={modalFamilyaBayon}
                type='text'
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.firstName}
                ref={modalpolisNameBayon}
                type='text'
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.familyName}
                ref={modalpolisFatherBayon}
                type='text'
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.phoneNumber}
                ref={modalpolisTelBayon}
                type='text'
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.dateOfBirth}
                ref={modaltugilganKuniBayon}
                type='text'
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.town}
                type='text'
                ref={modalpolisLocationBayon}
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.maxalla}
                ref={modalpolisMahallaBayon}
                type='text'
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.location}
                ref={modalpolisPolisJoyBayon}
                type='text'
              />
              <input
                className='ModalinputIIO'
                placeholder={editeText.fromPlace}
                ref={modalpolisKeltirilganJoyBayon}
                type='text'
              />

              <textarea
                placeholder={editeText.statement}
                ref={tuzilganBayonoma}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
              <textarea
                placeholder={editeText.comment}
                ref={modalhodimHulosaBayon}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
            </div>
            <div className='butonModal'>
              <button
                type='click'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={(e) => deletFuK(e)}
              >
                o'chirish
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => postDataRoyxatModalEditeFun()}
              >
                o'zgartirish
              </button>
            </div>
          </form>
        </>
      );
    } else if (MX == 3 && editeText) {
      console.log("MX == 3", editeText);

      return (
        <>
          <form
            ref={FormTozalash3}
            onSubmit={(e) => fromModal(e)}
            htmlFor='example'
          >
            <div>
              <input
                className='ModalinputIIO'
                defaultValue={editeText.lastName}
                ref={modalFamilyaProf}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.firstName}
                ref={modalpolisNameProf}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.familyName}
                ref={modalpolisFatherProf}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.phoneNumber}
                ref={modalpolisTelProf}
                type='text'
              />

              <input
                className='ModalinputIIO'
                defaultValue={editeText.town}
                ref={modalpolisLocationProf}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.maxalla}
                ref={modalpolisMahallaProf}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.location}
                type='text'
                ref={modalpolisPolisJoyProf}
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.PROFPersons}
                ref={ProfHisobT}
                type='text'
              />

              <textarea
                defaultValue={editeText.passwordspasswords}
                ref={modalhodimHulosaProf}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
            </div>
            <div className='butonModal'>
              <button
                type='click'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={(e) => deletFuK(e)}
              >
                o'chirish
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => postDataRoyxatModalEditeFun()}
              >
                o'zgartirish
              </button>
            </div>
          </form>
        </>
      );
    } else if (MX == 4 && editeText) {
      console.log("MX == 4", editeText);

      return (
        <>
          <form
            ref={FormTozalash4}
            onSubmit={(e) => fromModal(e)}
            htmlFor='example'
          >
            <div>
              <input
                className='ModalinputIIO'
                defaultValue={editeText.lastName}
                ref={modalFamilyaQidir}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.firstName}
                ref={modalpolisNameQidir}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.familyName}
                ref={modalpolisFatherQidir}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.phoneNumber}
                ref={modalpolisTelQidir}
                type='text'
              />

              <input
                className='ModalinputIIO'
                defaultValue={editeText.town}
                type='text'
                ref={modalpolisLocationQidir}
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.maxalla}
                ref={modalpolisMahallaQidir}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.location}
                ref={modalpolisPolisJoyQidir}
                type='text'
              />

              <textarea
                defaultValue={editeText.comment}
                ref={modalhodimHulosaQidir}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
            </div>
            <div className='butonModal'>
              <button
                type='click'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={(e) => deletFuK(e)}
              >
                o'chirish
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => postDataRoyxatModalEditeFun()}
              >
                o'zgartirish
              </button>
            </div>
          </form>
        </>
      );
    } else if (MX == 5 && editeText) {
      console.log("MX == 5", editeText);

      return (
        <>
          <form
            ref={FormTozalash5}
            onSubmit={(e) => fromModal(e)}
            htmlFor='example'
          >
            <div>
              <input
                className='ModalinputIIO'
                defaultValue={editeText.lastName}
                ref={modalFamilyaBedarak}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.firstName}
                ref={modalpolisNameBedarak}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.familyName}
                ref={modalpolisFatherBedarak}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.phoneNumber}
                ref={modalpolisTelBedarak}
                type='text'
              />

              <input
                className='ModalinputIIO'
                defaultValue={editeText.town}
                ref={modalpolisLocationBedarak}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.maxalla}
                ref={modalpolisMahallaBedarak}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.location}
                type='text'
                ref={modalpolisPolisJoyBedarak}
              />

              <textarea
                defaultValue={editeText.comment}
                ref={modalhodimHulosaBedarak}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
            </div>
            <div className='butonModal'>
              <button
                type='click'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={(e) => deletFuK(e)}
              >
                o'chirish
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => postDataRoyxatModalEditeFun()}
              >
                o'zgartirish
              </button>
            </div>
          </form>
        </>
      );
    } else if (MX == 6 && editeText) {
      console.log("MX == 6", editeText);

      return (
        <>
          <form
            ref={FormTozalash6}
            onSubmit={(e) => fromModal(e)}
            htmlFor='example'
          >
            <div>
              <input
                className='ModalinputIIO'
                defaultValue={editeText.lastName}
                ref={modalFamilyaQorovul}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.firstName}
                ref={modalpolisNameQorovul}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.familyName}
                ref={modalpolisFatherQorovul}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.phoneNumber}
                ref={modalpolisTelQorovul}
                type='text'
              />

              <input
                className='ModalinputIIO'
                defaultValue={editeText.town}
                type='text'
                ref={modalpolisLocationQorovul}
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.maxalla}
                ref={modalpolisMahallaQorovul}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.location}
                ref={modalpolisPolisJoyQorovul}
                type='text'
              />

              <textarea
                defaultValue={editeText.comment}
                ref={modalhodimHulosaQorovul}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
            </div>
            <div className='butonModal'>
              <button
                type='click'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={(e) => deletFuK(e)}
              >
                o'chirish
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={() => postDataRoyxatModalEditeFun()}
              >
                o'zgartirish
              </button>
            </div>
          </form>
        </>
      );
    } else if (MX == 7 && editeText) {
      return (
        <>
          <form
            ref={FormTozalash7}
            onSubmit={(e) => fromModal(e)}
            htmlFor='example'
          >
            <div>
              <input
                className='ModalinputIIO'
                defaultValue={editeText.lastName}
                ref={modalFamilyaQurol}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.firstName}
                ref={modalpolisNameQurol}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.familyName}
                ref={modalpolisFatherQurol}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.phoneNumber}
                ref={modalpolisTelQurol}
                type='text'
              />

              <input
                className='ModalinputIIO'
                defaultValue={editeText.gunBrand}
                ref={QurolNomi}
                type='text'
              />
              <input
                className='ModalinputIIO'
                defaultValue={editeText.gunNumber}
                ref={QurolRaqami}
                type='text'
              />

              <textarea
                defaultValue={editeText.comment}
                ref={modalhodimHulosaQurol}
                className='ModalinputIIO ms-0'
                cols='60'
                rows='4'
              ></textarea>
            </div>
            <div className='butonModal'>
              <button
                type='click'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={(e) => deletFuK(e)}
              >
                o'chirish
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => postDataRoyxatModalEditeFun()}
              >
                o'zgartirish
              </button>
            </div>
          </form>
        </>
      );
    }
  }
  function CloseModal(e) {
    e.preventDefault();
    FormTozalash?.current?.reset();
    FormTozalash2?.current?.reset();
    FormTozalash3?.current?.reset();
    FormTozalash4?.current?.reset();
    FormTozalash5?.current?.reset();
    FormTozalash6?.current?.reset();
    FormTozalash7?.current?.reset();
  }
  function mapFunctionBody() {
    if (dataBackend && SelectKategory == 1) {
      return (
        <>
          {dataBackend.object.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                <button
                  type='button'
                  onClick={(e) => functionModal(e)}
                  id={row.id}
                  className='editBaza btn'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  <EditQalam id={row.id} />
                </button>
              </StyledTableCell>
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
                  download
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/1/${row.id}`}
                >
                  yuklash
                </a>{" "}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {" "}
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/1/${row.id}`}
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
    } else if (dataBackend && SelectKategory == 2) {
      return (
        <>
          {dataBackend.object.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                <button
                  type='button'
                  onClick={(e) => functionModal(e)}
                  id={row.id}
                  className='editBaza btn'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  <EditQalam id={row.id} />
                </button>
              </StyledTableCell>
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
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/2/${row.id}`}
                  download
                >
                  yuklash
                </a>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  download
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/2/${row.id}`}
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
    } else if (dataBackend && SelectKategory == 3) {
      return (
        <>
          {dataBackend.object.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                <button
                  type='button'
                  onClick={(e) => functionModal(e)}
                  id={row.id}
                  className='editBaza btn'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  <EditQalam id={row.id} />
                </button>
              </StyledTableCell>
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
    } else if (dataBackend && SelectKategory == 4) {
      return (
        <>
          {dataBackend.object.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                <button
                  type='button'
                  onClick={(e) => functionModal(e)}
                  id={row.id}
                  className='editBaza btn'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  <EditQalam id={row.id} />
                </button>
              </StyledTableCell>
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
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/3/${row.id}`}
                  className=' DounloadFile'
                  download
                >
                  yuklash
                </a>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/3/${row.id}`}
                  download
                >
                  yuklash
                </a>{" "}
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
    } else if (dataBackend && SelectKategory == 5) {
      return (
        <>
          {dataBackend.object.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                <button
                  type='button'
                  onClick={(e) => functionModal(e)}
                  id={row.id}
                  className='editBaza btn'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  <EditQalam id={row.id} />
                </button>
              </StyledTableCell>
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
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadFinger/4/${row.id}`}
                  download
                >
                  yuklash
                </a>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <a
                  className=' DounloadFile'
                  download
                  href={`${process.env.REACT_APP_BACKEND_API}/api/v1/downloadImage/4/${row.id}`}
                >
                  yuklash
                </a>{" "}
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
    } else if (dataBackend && SelectKategory == 6) {
      return (
        <>
          {dataBackend.object.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                <button
                  type='button'
                  onClick={(e) => functionModal(e)}
                  id={row.id}
                  className='editBaza btn'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  <EditQalam id={row.id} />
                </button>
              </StyledTableCell>
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
    } else if (dataBackend && SelectKategory == 7) {
      return (
        <>
          {dataBackend.object.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                <button
                  type='button'
                  onClick={(e) => functionModal(e)}
                  id={row.id}
                  className='editBaza btn'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  <EditQalam id={row.id} />
                </button>
              </StyledTableCell>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              {TableHeadQulda.map((item) => {
                if (SelectKategory == 1 && SelectKategory == item.id) {
                  return (
                    <>
                      <StyledTableCell className='editHeader'>
                        edite
                      </StyledTableCell>
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
                } else if (SelectKategory == 2 && SelectKategory == item.id) {
                  return (
                    <>
                      <StyledTableCell className='editHeader'>
                        edite
                      </StyledTableCell>
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
                } else if (SelectKategory == 3 && SelectKategory == item.id) {
                  return (
                    <>
                      <StyledTableCell className='editHeader'>
                        edite
                      </StyledTableCell>
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
                } else if (SelectKategory == 4 && SelectKategory == item.id) {
                  return (
                    <>
                      <StyledTableCell className='editHeader'>
                        edite
                      </StyledTableCell>
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
                } else if (SelectKategory == 5 && SelectKategory == item.id) {
                  return (
                    <>
                      <StyledTableCell className='editHeader'>
                        edite
                      </StyledTableCell>
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
                } else if (SelectKategory == 6 && SelectKategory == item.id) {
                  return (
                    <>
                      <StyledTableCell className='editHeader'>
                        edite
                      </StyledTableCell>
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
                } else if (SelectKategory == 7 && SelectKategory == item.id) {
                  return (
                    <>
                      <StyledTableCell className='editHeader'>
                        edite
                      </StyledTableCell>
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
          <TableBody className='TableRowScrol'>{mapFunctionBody()}</TableBody>
        </Table>
      </TableContainer>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title fs-5' id='staticBackdropLabel'>
                tahrirlash
              </h3>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={(e) => CloseModal(e)}
              ></button>
            </div>
            <div className='modal-body'>{ModalInputs()}</div>
            <div className='modal-footer'></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Tables;
