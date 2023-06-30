import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Selects } from "../../../components/style/styleComponent";
import "../header/header.css";

import Tables from "../table/table";
function Header() {
  const SelectValue = useRef();
  const yil = useRef();
  const oy = useRef();
  const kun = useRef();
  const boshlanishVaqt = useRef();
  const tugashVaqt = useRef();
  const shahar = useRef();
  const mahalla = useRef();

  const [SelectKategory, setSelectKategory] = useState();
  const [dataBackend, setdataBackend] = useState();

  const postDataBazaPoisk = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/getCatchTime/${SelectKategory}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("tokenPPS"),
          },
          body: JSON.stringify({
            day: kun.current.value,
            month: oy.current.value,
            year: yil.current.value,

            startH: boshlanishVaqt.current.value,
            endH: tugashVaqt.current.value,
            town: shahar.current.value,
            maxalla: mahalla.current.value,
          }),
        },
      );

      const data = await res.json();
      setdataBackend(data);
    } catch (error) {
      console.log(error);
    }
  };

  function hasFormSubmit(e) {
    e.preventDefault();
    setSelectKategory(SelectValue.current.value);
    postDataBazaPoisk();
    // e.target.reset();
  }

  return (
    <>
      <header className='header'>
        <div className='containers'>
          <div className='blog'>
            <h1 className='text-white'>PPX BAZASI</h1>

            <form className='form-deta  ' onSubmit={(e) => hasFormSubmit(e)}>
              <select
                onClick={() => setSelectKategory(SelectValue.current.value)}
                className='SelectHeader input-style pb-2'
                ref={SelectValue}
                required
              >
                <option value='0' selected>
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
              <div className='TimeBox'>
                <input
                  ref={yil}
                  className='deta-input input-style'
                  type='number'
                  placeholder='Yil'
                  required
                />
                <input
                  ref={oy}
                  className='deta-input input-style'
                  type='number'
                  required
                  placeholder='oy'
                />
                <input
                  ref={kun}
                  className='deta-input input-style'
                  type='number'
                  required
                  placeholder='sana'
                />
                <input
                  ref={boshlanishVaqt}
                  className='  input-style'
                  type='time'
                  required
                  placeholder='vaqt'
                />
                <input
                  ref={tugashVaqt}
                  className='  input-style'
                  type='time'
                  required
                  placeholder='vaqt'
                />
              </div>
              <div>
                <select ref={shahar} className=' input-style'>
                  <option>Jizzax sh</option>
                </select>

                <select
                  ref={mahalla}
                  className=' input-style'
                  placeholder='Mahalla'
                  required
                >
                  <option selected>Mahalla</option>
                  <option> Xalqobod MFY</option>
                  <option> Jizzaxlik MFY</option>
                  <option> Uchariq MFY</option>
                  <option> Ravallik MFY</option>
                  <option> O'ratepalik MFY</option>
                  <option> Olmazor MFY</option>
                  <option> Zilol MFY</option>
                  <option> Kassoblik MFY</option>
                  <option> Oqqo'rg'onlik MFY</option>
                  <option> Sayiljo‘yi MFY</option>
                  <option> Bog‘ishamol MFY</option>
                  <option> A.Temur MFY</option>
                  <option> Navro‘z MFY</option>
                  <option> “Toshloq” MFY</option>
                  <option> Shodlik MFY</option>
                  <option> Turon MFY</option>
                  <option> Sangzor MFY</option>
                  <option> Kimyogar MFI</option>
                  <option> Madaniyat MFY</option>
                  <option> Tinchlik MFY</option>
                  <option> MFY jant</option>
                  <option> H. Olimjon MFI</option>
                  <option> A.Navoiy MFY</option>
                  <option> Hayobod MFY</option>
                  <option> Sayhon MFI</option>
                  <option> Ittifoq MFY</option>
                  <option> Yoshlik MFY</option>
                  <option> Bobur MFY</option>
                  <option> Kaliya MFY</option>
                  <option> “Bunyodkor” MFY</option>
                  <option> Do'stlik MFY</option>
                  <option> Nurliobod MFY</option>
                  <option> Ulug'bek MFY</option>
                </select>
              </div>

              <button className='btn-nav' type='submit'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-search'
                  viewBox='0 0 16 16'
                >
                  <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>

      <Tables dataBackend={dataBackend} SelectKategory={SelectKategory} />
    </>
  );
}

export default Header;
