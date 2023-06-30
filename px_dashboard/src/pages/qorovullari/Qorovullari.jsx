import React from "react";

import {
  Inputs,
  Selects,
  Textareas,
  Title,
} from "../../components/style/styleComponent";
import { useState, useRef } from "react";
import { Options } from "../../components/imputs/Imputs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Qorovullari() {
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

  let PolisName = useRef();
  let PolisFirstName = useRef();
  let familyName = useRef();
  let phoneNumber = useRef();
  let town = useRef();
  let maxalla = useRef();
  let location = useRef();
  let comment = useRef();

  const postDataQorovul = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", PolisName.current.value);
      formData.append("lastName", PolisFirstName.current.value);
      formData.append("familyName", familyName.current.value);
      formData.append("phoneNumber", phoneNumber.current.value);
      formData.append("town", town.current.value);
      formData.append("maxalla", maxalla.current.value);
      formData.append("location", location.current.value);

      formData.append("comment", comment.current.value);
      let TokenPPSID = localStorage.getItem("idPPS");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/guards/addGuards/${TokenPPSID}`,
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
    e.preventDefault();
    postDataQorovul();
    e.target.reset();
  }
  return (
    <div>
      <Title>
        <h2 className='pb-1 m-0 mb-3 mt-4'>
          Jami tekshirilgan obyektlar qorovullari
        </h2>
      </Title>
      <div>
        <form onSubmit={(e) => ClickBotton(e)} autoComplete='off'>
          <div className='row'>
            <label className='col-4'>
              <span className='d-block pb-1'>Familiya</span>
              <Inputs ref={PolisFirstName} name='inputTextFirstName' required />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1'>Ismi</span>
              <Inputs ref={PolisName} name='inputTextName' required></Inputs>
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Otasini ismi</span>
              <Inputs ref={familyName} required name='inputTextPolisPapa' />
            </label>
          </div>

          <div className='mt-3 row'></div>
          <div className='row mt-4'>
            <label className='col-4'>
              <span className='d-block pb-1  '>Obyekt manzili (tuman)</span>

              <Selects name='rental-option'>
                <option ref={town} selected={true}>
                  Jizzax sh
                </option>
              </Selects>
            </label>

            <label className='col-4'>
              <span className='d-block pb-1  '>Obyekt manzili (mahalla) </span>

              <Selects ref={maxalla} name='rental-option'>
                <Options></Options>
              </Selects>
            </label>

            <label className='col-4'>
              <span className='d-block pb-1 '>
                Obyekt manzili haqida to'liq ma'lumot
              </span>

              <Inputs ref={location} required name='uy_manzil' />
            </label>
          </div>
          <div className='row mt-3'>
            <label className='col-4   '>
              <span className='d-block pb-1  '>Telefon raqami</span>
              <Inputs
                ref={phoneNumber}
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
          </div>

          <div className='row mt-5 justify-content-center align-items-center'>
            <label className='col-8'>
              <span className='d-block pb-1   '>Hodim xulosasi </span>
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
