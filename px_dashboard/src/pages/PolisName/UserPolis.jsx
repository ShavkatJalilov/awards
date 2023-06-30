// import ".// App.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import Bajarilgan from "./Bajarilgan";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function UserPolis({ tres, setTrues }) {
  const ProfilName = useRef();
  const ProfilFirstName = useRef();

  const postDataProfil = async () => {
    try {
      const formData = new FormData();
      formData.append("name", ProfilName.current.value);
      formData.append("lastName", ProfilFirstName.current.value);
      const IDhodim = localStorage.getItem("idPPS");
      //API oxiriga id berish kerak ;lkn qaysi ID ekanligini bilmayabman sora shuni SH dan.
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/auth/update/${IDhodim}`,
        {
          method: "PUT",
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

  const HandleOnClick = (e) => {
    e.preventDefault();
    postDataProfil();
    setTrues(tres + 1);
    e.target.reset();
  };
  const [KunlikOylik, setKunlikOylik] = useState();
  const IDhodimTwo = localStorage.getItem("idPPS");
  let Tok = localStorage.getItem("tokenPPS");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/getStaffById/${IDhodimTwo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: Tok,
      },
    })
      .then((response) => response.json())
      .then((data) => setKunlikOylik(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className='section-one'>
        <div className='container'>
          <div className='section-one-nav'>
            <form className='userBox' onSubmit={(e) => HandleOnClick(e)}>
              <input
                ref={ProfilName}
                required
                className='user-name'
                type='text'
                placeholder='ismingizni yozing'
              />
              <input
                ref={ProfilFirstName}
                required
                className='user-name'
                type='text'
                placeholder='familyangizni yozing'
              />
              <button className='Polisbutton' type='submit'>
                O'zgartirish
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='section-two'>
        <div className='row mt-5'>
          <div className='points'>
            <div className='col-6'>
              <div className='point'>
                <h3 className='point-title'> {KunlikOylik?.object[1]}</h3>
              </div>
              <h3 className='text-center d-block mt-5 '>
                Bir kunlik to'plangan ball
              </h3>
            </div>
            <div className='col-6 '>
              <div className='point'>
                <h3 className='point-title'> {KunlikOylik?.object[0]} </h3>
              </div>
              <h3 className='text-center d-block mt-5 '>
                Bir oylik to'plangan ball
              </h3>
            </div>
          </div>
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
      <div className='section-three'>
        <NavLink className='nav-link' to={"Bajarilgan_ishlar"}>
          Bajarilgan ishlar
        </NavLink>
      </div>
    </>
  );
}
