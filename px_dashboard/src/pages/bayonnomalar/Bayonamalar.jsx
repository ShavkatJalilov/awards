import React from "react";

import {
  Inputs,
  Selects,
  Textareas,
  Title,
} from "../../components/style/styleComponent";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Options } from "../../components/imputs/Imputs";

export default function Bayonamalar() {
  const [PolisfingerBayonnoma, setPolisfingerBayonnoma] = useState();
  const [PolisFotosBayonnoma, setPolisFotosBayonnoma] = useState();

  function handleFilePolisFInger(et) {
    setPolisfingerBayonnoma(et.target.files[0]);
  }
  function handleFilePolisFoto(ets) {
    setPolisFotosBayonnoma(ets.target.files[0]);
  }

  let polisNameBayonnoma = useRef();
  let polisFirstNameBayonnoma = useRef();
  let polisFatherBayonnoma = useRef();
  let polisTelBayonnoma = useRef();
  let DataBayonnoma = useRef();
  let TuzilganBayonnoma = useRef();
  let OlibKelinganJoyBayonnoma = useRef();
  let HodimHulosasiBayonnoma = useRef();

  let polisLocationB = useRef();
  let polisMahallaB = useRef();
  let polisPolisJoyB = useRef();

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

  const postData = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", polisNameBayonnoma.current.value);
      formData.append("lastName", polisFirstNameBayonnoma.current.value);
      formData.append("familyName", polisFatherBayonnoma.current.value);
      formData.append("phoneNumber", polisTelBayonnoma.current.value);
      formData.append("dateOfBirth", DataBayonnoma.current.value);
      formData.append("statement", TuzilganBayonnoma.current.value);
      formData.append("fromPlace", OlibKelinganJoyBayonnoma.current.value);
      formData.append("staffComment", HodimHulosasiBayonnoma.current.value);
      formData.append("fingerByte", PolisfingerBayonnoma);
      formData.append("imageByte", PolisFotosBayonnoma);

      formData.append("town", polisLocationB.current.value);
      formData.append("maxalla", polisMahallaB.current.value);
      formData.append("location", polisPolisJoyB.current.value);
      let TokenPPSID = localStorage.getItem("idPPS");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/statement/add/${TokenPPSID}`,
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
    postData();

    e.target.reset();
  }

  return (
    <div>
      <Title>
        <h2 className='pb-1 m-0 mb-3 mt-4'>Bayonnomalar</h2>
      </Title>
      <div>
        <form onSubmit={(e) => ClickBotton(e)} autoComplete='off'>
          <div className='row'>
            <label className='col-4'>
              <span className='d-block pb-1'>Familiya</span>
              <Inputs
                ref={polisFirstNameBayonnoma}
                name='inputTextFirstName'
                required
              />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1'>Ismi</span>
              <Inputs
                ref={polisNameBayonnoma}
                name='inputTextName'
                required
              ></Inputs>
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Otasini ismi</span>
              <Inputs
                required
                ref={polisFatherBayonnoma}
                name='inputTextPolisPapa'
              />
            </label>
          </div>

          <div className='mt-3 row'>
            <label className='col-4   '>
              <span className='d-block pb-1  '>Telefon raqami</span>
              <Inputs
                ref={polisTelBayonnoma}
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

            <label className='col-2 pe-1 ' htmlFor='file-cv'>
              <span className='d-block pb-1   '>Barmoq izi</span>

              <input
                onChange={(even) => handleFilePolisFInger(even)}
                className='input-file-adminka'
                id='file-cv'
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

            <label className='col-2 ps-1 ' htmlFor='file-cvBayon'>
              <span className='d-block pb-1  '>Rasm</span>
              <input
                onChange={(even) => handleFilePolisFoto(even)}
                className='input-file-adminka'
                id='file-cvBayon'
                name='file_yuklashBayon'
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
            <label className='col-4'>
              <span className='d-block pb-1  '>Tug'ilgan sanasi</span>

              <Inputs ref={DataBayonnoma} name='data' type={"date"} required />
            </label>
          </div>

          <div className='row mt-3'>
            {/* <div className=' '> */}
            <label className='col-4'>
              <span className='d-block pb-1  '>Voqea Joyi (tuman)</span>

              <Selects ref={polisLocationB} name='rental-option'>
                <option selected={true}>Jizzax sh</option>
              </Selects>
            </label>
            <label className='  col-4'>
              <span className='d-block pb-1 Allinputs '>
                Voqea Joyi (mahalla){" "}
              </span>

              <Selects
                className='Select__menu-list Allinputs'
                ref={polisMahallaB}
                name='rental-option'
              >
                <Options></Options>
              </Selects>
            </label>
            <label className='col-4'>
              <span className='d-block pb-1 '>
                Hudud haqida to'liq ma'lumot
              </span>

              <Inputs
                className='Allinputs'
                required
                name='uy_manzil'
                ref={polisPolisJoyB}
              />
            </label>
            {/* </div> */}
          </div>

          <div className='row  mt-4 mb-2'>
            <label className='  col-4'>
              <span className='d-block pb-1 '>
                Olib kelingan shaxsning hududi
              </span>
              <Inputs
                ref={OlibKelinganJoyBayonnoma}
                required
                name='uy_manzil'
              />
            </label>
          </div>
          <div className='row mt-3   '>
            <label className='col-8'>
              <span className='d-block pb-1  '>Tuzilgan bayonnoma</span>
              <Textareas
                ref={TuzilganBayonnoma}
                name='textArea'
                required
              ></Textareas>
            </label>
          </div>

          <div className='row mt-5 justify-content-start align-items-center'>
            <label className='col-8'>
              <span className='d-block pb-1   '>Hodim xulosasi</span>
              <Textareas
                ref={HodimHulosasiBayonnoma}
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
