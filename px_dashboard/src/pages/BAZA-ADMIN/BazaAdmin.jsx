import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Kompyuterchi from "../../assets/imgs/kompyuterchi";
import "../BAZA-ADMIN/baza-admin.css";
function BazaAdmin() {
  const Familya = useRef();
  const ism = useRef();
  const Usernames = useRef();
  const Parolni = useRef();

  const postDataAdmin = async () => {
    try {
      const formData = new FormData();
      formData.append("name", ism.current.value);
      formData.append("lastName", Familya.current.value);
      formData.append("userName", Usernames.current.value);
      formData.append("password", Parolni.current.value);
      const LocalNam = localStorage.getItem("tokenPPS");
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/add`, {
        method: "POST",
        headers: {
          Authorization: LocalNam,
        },
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function formADminSub(e) {
    e.preventDefault();
    postDataAdmin();
  }

  return (
    <>
      <div className='wrapperAdmin'>
        <div className='imgBox'>
          <Kompyuterchi />
        </div>
        <div className='inputBox'>
          <h2 className='TitleXodim'>Xodim qo'shish</h2>
          <form className='formAdmin' onSubmit={(e) => formADminSub(e)}>
            <input
              required
              ref={ism}
              className='inputAdmin'
              type='text'
              placeholder='Ismni kiriting ...'
            />
            <input
              required
              ref={Familya}
              className='inputAdmin'
              type='text'
              placeholder='Familiyani kiriting ...'
            />
            <input
              required
              ref={Usernames}
              className='inputAdmin'
              type='text'
              placeholder='User name kiriting ...'
            />
            <input
              required
              ref={Parolni}
              className='inputAdmin'
              type='text'
              placeholder='Password kiriting ...'
            />

            <button className='formYaratish' type='submit'>
              Yaratish
            </button>
          </form>
          <NavLink to={"BazaAdmin"} className='ppxBaza'>
            PPX BAZA
          </NavLink>
          <NavLink to={"Statistika"} className='ppxBazaStatistika  '>
            STATISTIKA
          </NavLink>
          <NavLink to={"Arxiv"} className='ppxBazaAexive'>
            ARXIV
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default BazaAdmin;
