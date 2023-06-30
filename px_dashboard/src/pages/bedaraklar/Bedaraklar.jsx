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
export default function Bedaraklar() {
  const [PolisfingerBedarak, setPolisfingerBedarak] = useState();
  const [PolisFotosBedarak, setPolisFotosBedarak] = useState();

  function handleFilePolisFInger(et) {
    setPolisfingerBedarak(et.target.files[0]);
  }
  function handleFilePolisFoto(ets) {
    setPolisFotosBedarak(ets.target.files[0]);
  }

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
  let polisNameBedaraklar = useRef();
  let polisFirstNameBedaraklar = useRef();
  let polisFatherBedaraklar = useRef();
  let polisTelBedaraklar = useRef();
  let VoqeaJoyibedaraklar = useRef();
  let VoqeaJoyiMahallabedaraklar = useRef();
  let VoqeaJoyiAniqMalumotbedaraklar = useRef();
  let HodimHulosasiBedaraklar = useRef();

  const postDataBedarak = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", polisNameBedaraklar.current.value);
      formData.append("lastName", polisFirstNameBedaraklar.current.value);
      formData.append("familyName", polisFatherBedaraklar.current.value);
      formData.append("phoneNumber", polisTelBedaraklar.current.value);
      formData.append("town", VoqeaJoyibedaraklar.current.value);
      formData.append("maxalla", VoqeaJoyiMahallabedaraklar.current.value);
      formData.append("location", VoqeaJoyiAniqMalumotbedaraklar.current.value);
      formData.append("identifyMissingImages", PolisFotosBedarak);
      formData.append("identifyFingerPrint", PolisfingerBedarak);
      formData.append("comment", HodimHulosasiBedaraklar.current.value);
      let TokenPPSID = localStorage.getItem("idPPS");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/addIdentify/${TokenPPSID}`,
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
    postDataBedarak();
    e.target.reset();
  }
  return (
    <div>
      <Title>
        <h2 className='pb-1 m-0 mb-3 mt-4'>Aniqlangan bedaraklar</h2>
      </Title>
      <div>
        <form onSubmit={(e) => ClickBotton(e)} autoComplete='off'>
          <div className='row'>
            <label className='col-4'>
              <span className='d-block pb-1'>Familiya</span>
              <Inputs
                ref={polisFirstNameBedaraklar}
                name='inputTextFirstName'
                required
              />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1'>Ismi</span>
              <Inputs
                ref={polisNameBedaraklar}
                name='inputTextName'
                required
              ></Inputs>
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Otasini ismi</span>
              <Inputs
                ref={polisFatherBedaraklar}
                required
                name='inputTextPolisPapa'
              />
            </label>
          </div>

          <div className='mt-3 row'>
            <label className='col-4   '>
              <span className='d-block pb-1  '>Telefon raqami</span>
              <Inputs
                ref={polisTelBedaraklar}
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

            <label className='col-2 pe-1 ' htmlFor='fotoBedarakBarmoq'>
              <span className='d-block pb-1   '>Barmoq izi</span>

              <input
                onChange={(et) => handleFilePolisFInger(et)}
                className='input-file-adminka'
                id='fotoBedarakBarmoq'
                name='file_yuklash'
                type='file'
                // placeholder='file yuklang'
                style={{
                  display: "none",
                  width: "0",
                  height: "0",
                  fontSize: "14px",

                  padding: "0px",
                }}
              />

              <div
                className='Fayl-text '
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#F2F2F2",
                  border: "1px solid green",
                  borderRadius: "6px",
                  outline: "none",
                  padding: "8px 1px",
                  fontSize: "14px",
                }}
              >
                file yuklash
              </div>
            </label>
            <label className='col-2 ps-1 ' htmlFor='fotoBedarak'>
              <span className='d-block pb-1  '>Rasm</span>
              <input
                onChange={(ets) => handleFilePolisFoto(ets)}
                className='input-file-adminka'
                id='fotoBedarak'
                name='file_yuklash'
                type='file'
                // placeholder='file yuklang'
                style={{
                  display: "none",
                  width: "0",
                  height: "0",
                  fontSize: "14px",

                  padding: "0px",
                }}
              />

              <div
                className='Fayl-text '
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#F2F2F2",
                  border: "1px solid green",
                  borderRadius: "6px",
                  outline: "none",
                  padding: "8px 1px",
                  fontSize: "14px",
                }}
              >
                file yuklash
              </div>
            </label>
          </div>

          <div className='row mt-4'>
            <label className='col-4'>
              <span className='d-block pb-1  '>Voqea Joyi (tuman)</span>

              <Selects name='rental-option' ref={VoqeaJoyibedaraklar}>
                <option selected={true}>Jizzax sh</option>
              </Selects>
            </label>

            <label className='col-4'>
              <span className='d-block pb-1  '>Voqea Joyi (mahalla) </span>

              <Selects ref={VoqeaJoyiMahallabedaraklar} name='rental-option'>
                <Options></Options>
              </Selects>
            </label>

            <label className='col-4'>
              <span className='d-block pb-1 '>
                Hudud haqida to'liq ma'lumot
              </span>

              <Inputs
                ref={VoqeaJoyiAniqMalumotbedaraklar}
                required
                name='uy_manzil'
              />
            </label>
          </div>

          <div className='row mt-3'></div>

          <div className='row mt-5 justify-content-center align-items-center'>
            <label className='col-8'>
              <span className='d-block pb-1   '>Hodim xulosasi</span>
              <Textareas
                ref={HodimHulosasiBedaraklar}
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
