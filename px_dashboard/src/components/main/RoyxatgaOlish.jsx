import { Buttons, Inputs, Selects, Title } from "../style/styleComponent";
import { useState, useRef } from "react";
import { Options } from "../imputs/Imputs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function RoyxatgaOlish() {
  const [count, useCounts] = useState(true);
  const FunkState = () => {
    useCounts(!count);
  };

  function inputClick() {
    let eliNput = document.getElementById("organization_phone");
    eliNput.addEventListener("input", function (e) {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);

      e.target.value =
        "+(" + x[1] + ") " + x[2] + "-" + x[3] + "-" + x[4] + "-" + x[5];
    });
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

  let polisName = useRef();
  let polisFirstName = useRef();
  let polisFather = useRef();
  let polisTel = useRef();

  let polisLocation = useRef();
  let polisMahalla = useRef();
  let polisPolisJoy = useRef();
  let polisKeltirilganJoy = useRef();

  let polisDescription = useRef();
  let witnessName = useRef();
  let witnessFirstName = useRef();
  let witnessFather = useRef();
  let witnessTel = useRef();
  let hodimHulosa = useRef();
  let tugilganKuni = useRef();

  const [Polisfinger, setPolisfinger] = useState();
  const [fotoPolis, setfotoPolis] = useState();
  // const [Witnesfinger, setWitnesfinger] = useState();
  // const [fotoWitnes, setfotoWitnes] = useState();
  function handleFilePolisFInger(et) {
    setPolisfinger(et.target.files[0]);
  }
  function handleFilePolisFoto(evt) {
    setfotoPolis(evt.target.files[0]);
  }
  // function handleFileWillsFinger(even) {
  //   setWitnesfinger(even.target.files[0]);
  // }
  // function handleFileWillsFoto(eve) {
  //   setfotoWitnes(eve.target.files[0]);
  // }

  const AllInputs = document.querySelectorAll(".Allinputs");

  const postDataRoyxat = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", polisName.current.value);
      formData.append("lastName", polisFirstName.current.value);
      formData.append("familyName", polisFather.current.value);

      formData.append("phoneNumber", polisTel.current.value);
      formData.append("dateOfBirth", tugilganKuni.current.value);
      formData.append("place", polisKeltirilganJoy.current.value);
      formData.append("cause", polisDescription.current.value);

      formData.append("personFinger", Polisfinger);
      formData.append("personImage", fotoPolis);

      formData.append("town", polisLocation.current.value);
      formData.append("maxalla", polisMahalla.current.value);
      formData.append("location", polisPolisJoy.current.value);
      formData.append("comment", hodimHulosa.current.value);

      formData.append("witnessName", witnessName.current.value);
      formData.append("witnessLast", witnessFirstName.current.value);
      formData.append("witnessFamily", witnessFather.current.value);
      formData.append("witnessTel", witnessTel.current.value);
      let TokenPPSID = localStorage.getItem("idPPS");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/addPerson/${TokenPPSID}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("tokenPPS"),
          },
          body: formData,
        },
        // toast.success("bazaga ma'lumotlar qo'shildi"),
      );

      if (res.status === 200) {
        toast.success("Bazaga ma'lumotlar qo'shildi");
      } else {
        toast.error(" Serverda xatolik yuz berdi");
      }
    } catch (error) {
      console.log(error);
      toast.error("xatolik yuz berdi internet yoki serverni tekshiring");

      // toast.error("ma'lumotlar yuborilmadi ");
    }
  };

  function ClickBotton(e) {
    e.preventDefault();
    postDataRoyxat();
    e.target.reset();
  }

  return (
    <div>
      <Title>
        <h2 className='pb-1 m-0 mb-3 mt-2'>Ro'yhatga olish</h2>
      </Title>

      <div>
        <form onSubmit={(e) => ClickBotton(e)} autoComplete='off'>
          <div className='row'>
            <label className='col-4'>
              <span className='d-block pb-1'>Familiya</span>
              <Inputs
                className='Allinputs'
                ref={polisFirstName}
                name='inputTextFirstName'
                required
              />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1'>Ismi</span>
              <Inputs
                className='Allinputs'
                ref={polisName}
                name='inputTextName'
                required
              ></Inputs>
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Otasini ismi</span>
              <Inputs
                className='Allinputs'
                ref={polisFather}
                required
                name='inputTextPolisPapa'
              />
            </label>
          </div>

          <div className='mt-3 row'>
            <label className='col-4   '>
              <span className='d-block pb-1  '>Telefon raqami</span>
              <Inputs
                ref={polisTel}
                onClick={() => inputClickTwoo()}
                className='input-heroTwoo Allinputs  '
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

            <label className='col-2 pe-1 ' htmlFor='file-cv'>
              <span className='d-block pb-1   '>Barmoq izi</span>

              <input
                // ref={polisFileFinger}
                onChange={(even) => handleFilePolisFInger(even)}
                className='input-file-adminka Allinputs'
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

            <label className='col-2 ps-1 ' htmlFor='file-cvs'>
              <span className='d-block pb-1  '>Rasm</span>
              <input
                onChange={(eve) => handleFilePolisFoto(eve)}
                // ref={polisFileFoto}
                accept='.pdf'
                className='input-file-adminka Allinputs'
                id='file-cvs'
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

            <label className='col-4'>
              <span className='d-block pb-1  '>Tug'ilgan sanasi</span>

              <Inputs
                className='Allinputs'
                name='data'
                type={"date"}
                required
                ref={tugilganKuni}
              />
            </label>
          </div>

          <div className='row mt-3'>
            {/* <div className=' '> */}
            <label className='col-4'>
              <span className='d-block pb-1  '>Voqea Joyi (tuman)</span>

              <Selects ref={polisLocation} name='rental-option'>
                <option selected={true}>Jizzax sh</option>
              </Selects>
            </label>
            <label className='  col-4'>
              <span className='d-block pb-1 Allinputs '>
                Voqea Joyi (mahalla){" "}
              </span>

              <Selects
                className='Select__menu-list Allinputs'
                ref={polisMahalla}
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
                ref={polisPolisJoy}
              />
            </label>
            {/* </div> */}
          </div>
          <label className='mini-input mt-4 mb-2'>
            <span className='d-block pb-1 '>
              Olib kelingan shaxsning hududi
            </span>
            <Inputs
              className='Allinputs'
              required
              name='uy_manziltwoo'
              ref={polisKeltirilganJoy}
            />
          </label>
          <label className='col-12'>
            <span className='d-block pb-1  '>Voqea Sababi</span>
            <textarea
              className='Allinputs'
              ref={polisDescription}
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

          <label className='d-flex align-items-center mt-3 '>
            <span className='me-2 mb-1  '>Guvohlar</span>
            <input
              className='Allinputs'
              type='Checkbox'
              onChange={() => FunkState()}
              // checked={}
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </label>

          <div
            className={
              count == false
                ? "row mt-3 GuvohTable "
                : "row mt-3 GuvohTable d-none"
            }
          >
            <label className='col-4'>
              <span className='d-block pb-1  '>Familiya</span>
              <Inputs
                className='Allinputs'
                ref={witnessFirstName}
                name='inputTextFamiliya'
              />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Ismi</span>
              <Inputs
                className='Allinputs'
                ref={witnessName}
                name='inputTextIsmi'
              />
            </label>
            <label className='col-4'>
              <span className='d-block pb-1  '>Otasini ismi</span>
              <Inputs
                className='Allinputs'
                ref={witnessFather}
                name='inputTextPapa'
              />
            </label>
          </div>
          <div
            className={
              count == false
                ? "mt-3 row justify-content-center align-items-center GuvohTable"
                : "mt-3 row justify-content-center align-items-center GuvohTable d-none"
            }
          >
            <label className='col-4'>
              <span className='d-block pb-1  '>Telefon raqami</span>

              <Inputs
                ref={witnessTel}
                onClick={() => inputClick()}
                className='input-heroTwoo Allinputs'
                id='organization_phone'
                name='organization_phone'
                placeholder='(+998) 99-000-00-00'
                default
                defaultValue='+998'
                minLength={7}
                type='tell'
                required
              />
            </label>
          </div>
          <div className='row mt-3 justify-content-center align-items-center'>
            <label className='col-8'>
              <span className='d-block pb-1   '>Hodim xulosasi</span>
              <textarea
                className='Allinputs'
                name='textArea'
                ref={hodimHulosa}
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
            <Buttons className='col-2' type='submit'>
              <strong>Yuborish</strong>
            </Buttons>
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
