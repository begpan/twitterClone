import API from "./api.js";
import {setLocal} from "./helpers.js";

const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameWarn: document.querySelector(".name-warning"),
  passWarn: document.querySelector(".pass-warning"),
};

const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$";

// şifre kuralları için REGEX
// Minimum eight characters, at least one letter, one number and one special character:

// isim ve şifreyi kontrol eden bir fonksiyon yaz
// isim veya şifrede problem varsa uyarı olarak ekrana basacak ve false dondurecek
// problem yoksa true dondurur

const checkValues = (name, pass) => {
  let isPassError = false;
  let isNameError = false;

  //!  1) ismi kontrol et hataları ekrana bas

  if (!name.trim()) {
    isNameError = true;
    authEle.nameWarn.innerHTML = `<p class=>Bu isimde kullanıcı bulunamadı</p>`;
  } else {
    isNameError = false;
    authEle.nameWarn.innerHTML = " ";
  }
  //!  2) şifre kontrol

  if (!pass.trim()) {
    isPassError = true;
    authEle.passWarn.innerHTML = `<p>Lütfen şifre giriniz</p>`;
  } else if (pass.length < 8) {
    isPassError = true;
    authEle.passWarn.innerHTML = `<p>Şifre en az 8 haneli olmalı</p>`;
  } else if (!pass.match(regex)) {
    isPassError = true;
    authEle.passWarn.innerHTML = `<p>şifre yeterince güçlü değil</p>`;
  } else {
    isPassError = false;
    authEle.passWarn.innerHTML = "";
  }

  //!  3)fonksiyon döndüreceği değere karar ver
  if (isNameError || isPassError) {
    return false;
  } else {
    return true;
  }
};

//! formun gonderilme olayını izleme ve inputlardaki verilere eriş

// formun gönderilme olayını izle ve inputlardaki verilere eriş
authEle.loginForm.addEventListener("submit", (e) => {
  //1) sayfayı yenilemeyi engelle
  e.preventDefault();

  //2) değerlere erişme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  //3) değerlerde hata yoksa:

  if (checkValues(name, pass)) {
    API.getUser(name)
      .then((data) => {
        // eğer kullanıcı bulunamadıysa
        if (data.status === "error") {
          authEle.nameWarn.innerHTML = `<p class=>Bu isimde kullanıcı bulunamadı</p>`;
        } else {
          // kullanıcı bulunduysa locale kaydet 

          setLocal("user",data)
        //   ve anasayfaya yonlendir
          location =  '/'

        }
      })
      .catch((err) => console.log(err));
  }
});
