import React from "react";

import { Inputs, Selects, Title } from "../../components/style/styleComponent";
import { useState, useRef } from "react";
import { Options } from "../../components/imputs/Imputs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Prof() {
  function inputClickTwoo() {
    let eliNput = document.getElementById("organization_phones");
    eliNput.addEventListener("input", function (e) {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);

      e.target.value =
        "+(" + x[1] + ") " + x[2] + "-" + x[3] + "-" + x[4] + "-" + x[5];
    });
  }

  let PolisFirstNamePROF = useRef();
  let PolisNamePROF = useRef();
  let PolisFatherNamePROF = useRef();
  let voqeaJoyiShPROF = useRef();
  let voqeaJoyiMahallaPROF = useRef();
  let voqeaJoyiAniqManzilPROF = useRef();
  let TelPROF = useRef();
  let PRofHisobdagiSHaxsPROF = useRef();
  let HodimHulosasiPROF = useRef();

  const postDataProff = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", PolisNamePROF.current.value);
      formData.append("lastName", PolisFirstNamePROF.current.value);
      formData.append("familyName", PolisFatherNamePROF.current.value);
      formData.append("phoneNumber", TelPROF.current.value);
      formData.append("town", voqeaJoyiShPROF.current.value);
      formData.append("maxalla", voqeaJoyiMahallaPROF.current.value);
      formData.append("location", voqeaJoyiAniqManzilPROF.current.value);
      formData.append("PROFPersons", PRofHisobdagiSHaxsPROF.current.value);
      formData.append("comment", HodimHulosasiPROF.current.value);
      let TokenPPSID = localStorage.getItem("idPPS");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/PROFPersons/add/${TokenPPSID}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("tokenPPS"),
          },
          body: formData,
        },
      );
      if (res.status === 200) {
        toast.success("Bazaga ma'lumotlar qo'shildi");
      } else {
        toast.error(" Serverda xatolik yuz berdi");
      }
    } catch (error) {
      console.log(error);
      toast.error("xatolik yuz berdi internet yoki serverni tekshiring");
    }
  };

  function ClickBottonP(eProf) {
    eProf.preventDefault();
    postDataProff();
    eProf.target.reset();
  }
  return (
    <div>
      <Title>
        <h2 className='pb-1 m-0 mb-3 mt-4'>PROF Hisobida turuvchi shaxslar</h2>
      </Title>
      <div>
        <form onSubmit={(eProf) => ClickBottonP(eProf)} autoComplete='off'>
          <div className='row'>
            <label className='col-4'>
              <span className='d-block pb-1'>Familiya</span>
              <Inputs
                ref={PolisFirstNamePROF}
                name='inputTextFirstName'
                required
              />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1'>Ismi</span>
              <Inputs
                ref={PolisNamePROF}
                name='inputTextName'
                required
              ></Inputs>
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Otasini ismi</span>
              <Inputs
                ref={PolisFatherNamePROF}
                required
                name='inputTextPolisPapa'
              />
            </label>
          </div>
          <div className='row mt-4'>
            <label className='col-4'>
              <span className='d-block pb-1  '>Voqea Joyi (tuman)</span>

              <Selects ref={voqeaJoyiShPROF} name='rental-option'>
                <option selected={true}>Jizzax sh</option>
              </Selects>
            </label>

            <label className='col-4'>
              <span className='d-block pb-1  '>Voqea Joyi (mahalla) </span>
              <Selects ref={voqeaJoyiMahallaPROF} name='rental-optionPof'>
                <Options></Options>
              </Selects>
            </label>

            <label className='col-4'>
              <span className='d-block pb-1 '>
                Hudud haqida to'liq ma'lumot
              </span>

              <Inputs ref={voqeaJoyiAniqManzilPROF} required name='uy_manzil' />
            </label>
          </div>

          <div className='row mt-3'>
            <label className='col-4   '>
              <span className='d-block pb-1  '>Telefon raqami</span>
              <Inputs
                ref={TelPROF}
                onClick={() => inputClickTwoo()}
                className='input-heroTwoo '
                id='organization_phones'
                name='organization_phones'
                placeholder='(+998) 99-000-00-00'
                default
                defaultValue='+998'
                minLength={7}
                type='tell'
                required
              />
            </label>

            <label className='col-4'>
              <span className='d-block pb-1  '>
                {" "}
                Tekshirilgan PROF Hisobida turuvchi shaxslar
              </span>
              <Inputs ref={PRofHisobdagiSHaxsPROF} name='InputsProf' required />
            </label>
          </div>

          <div className='row mt-5 justify-content-center align-items-center'>
            <label className='col-8'>
              <span className='d-block pb-1   '>Hodim xulosasi</span>
              <textarea
                ref={HodimHulosasiPROF}
                name='textArea'
                style={{
                  display: "block",
                  width: "100%",
                  // maxWidth: "180px",
                  height: "90px",
                  backgroundColor: "#F2F2F2",
                  border: "1px solid green",
                  borderRadius: "6px",
                  outline: "none",
                  fontSize: "14px",
                  padding: "8px 2px",
                }}
                required
              ></textarea>
            </label>
            <button
              className='col-2'
              type='submit'
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "#F2F2F2",
                border: "1px solid green",
                borderRadius: "6px",
                outline: "none",
                fontSize: "14px",
                padding: "8px 2px",
              }}
            >
              <strong>Yuborish</strong>
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme='dark'
      />
    </div>
  );
}
