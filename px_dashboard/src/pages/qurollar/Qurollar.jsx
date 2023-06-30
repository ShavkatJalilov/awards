import React from "react";

import {
  Inputs,
  Textareas,
  Title,
} from "../../components/style/styleComponent";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Qurollar() {
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

  let PolisNamequrol = useRef();
  let PolisFirstNamequrol = useRef();

  let familyName = useRef();
  let phoneNumber = useRef();
  let gunBrand = useRef();
  let gunNumber = useRef();
  let comment = useRef();

  const postDataQurol = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", PolisNamequrol.current.value);
      formData.append("lastName", PolisFirstNamequrol.current.value);
      formData.append("familyName", familyName.current.value);
      formData.append("phoneNumber", phoneNumber.current.value);
      formData.append("gunBrand", gunBrand.current.value);
      formData.append("gunNumber", gunNumber.current.value);
      formData.append("comment", comment.current.value);
      let TokenPPSID = localStorage.getItem("idPPS");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/CheckWeapons/add/${TokenPPSID}`,
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
  function ClickBotton(e) {
    postDataQurol();
    e.preventDefault();
    e.target.reset();
  }
  return (
    <div>
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
      <Title>
        <h2 className='pb-1 m-0 mb-3 mt-4'>Tekshirilgan ov qurollari</h2>
      </Title>
      <div>
        <form onSubmit={(e) => ClickBotton(e)} autoComplete='off'>
          <div className='row'>
            <label className='col-4'>
              <span className='d-block pb-1'>Familiya</span>
              <Inputs
                ref={PolisFirstNamequrol}
                name='inputTextFirstName'
                required
              />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1'>Ismi</span>
              <Inputs
                ref={PolisNamequrol}
                name='inputTextName'
                required
              ></Inputs>
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Otasini ismi</span>
              <Inputs required ref={familyName} name='inputTextPolisPapa' />
            </label>
          </div>

          <div className='mt-3 row'>
            <label className='col-4   '>
              <span className='d-block pb-1  '>Telefon raqami</span>
              <Inputs
                ref={phoneNumber}
                onClick={() => inputClickTwoo()}
                className='input-heroTwoo '
                id='organization_phones'
                name='organization_phones'
                placeholder='(+998) 99-000-00-00'
                defaultValue='+998'
                minLength={7}
                type='tell'
                required
              />
            </label>

            <label className='col-4 pe-1 ' htmlFor='file-cv'>
              <span className='d-block pb-1'>Ov quroli nomi </span>

              <Inputs ref={gunBrand} required name='Ov_qurollari' />
            </label>

            <label className='col-4'>
              <span className='d-block pb-1  '>Qurol raqami </span>
              <Inputs ref={gunNumber} required name='qurol_raqami' />
            </label>
          </div>

          <div className='row mt-3'></div>

          <div className='row mt-5 justify-content-center align-items-center'>
            <label className='col-8'>
              <span className='d-block pb-1   '>Hodim xulosasi</span>
              <Textareas
                ref={comment}
                name='textAreaHulosa'
                required
              ></Textareas>
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
    </div>
  );
}
