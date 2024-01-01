// locale veri kaydeder

export const setLocal = (key,value)=>{
// locale kaydedeeğinmiz verileri stringe cevrie
const strData= JSON.stringify(value);
// locale kaydet
localStorage.setItem(key, strData)
}


// localden veri ceker

export const getLocal = (key)=>{
    // localden veriye eriş
   const strData= localStorage.getItem(key);

//    stringi sj verisine cevir ve dondur

return JSON.parse(strData)

}


