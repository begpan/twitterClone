import { getLocal } from "./scripts/helpers.js";
import {
  ele,
  renderUserInfo,
  renderTimeline,
  renderLoader,
  renderDetailLoader,
  renderDetail,
  renderUser
} from "./scripts/ui.js";
import API from "./scripts/api.js";
// local storagedan bilgileri al

const user = getLocal("user");
// sayfa yukklenince kullanıcının bilgilerini ekrana bas

// kullanıcınn hangi sayfayı goreceğine kadar veren bir fonksiyon
// ekranın orta kısmında yer alacak html kodunu belirler

const router = () => {
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const query = params.get("q");

  //   page in değerine göre arayuze karar ver

  switch (page) {
    // tweet detayı
    case "status":
      // loadingi ekrana bas
      renderDetailLoader('Gönderi');
      // tweet detaylarını apiden al
      API.getData(`/tweet.php?id=${query}`)
      .then((data)=> renderDetail(data,user))

      // ekrana detay sayfasını bas
      break;
    // arama sayfası
    case "search":
      renderDetailLoader(`Results for ${query}`)
      API.getData(`/search.php?query=${query}&search_type=top`)
      .then((data) =>renderTimeline(data, ele.main , "user_info"))

      break;
    //  kullanıcı detay sayfası
    case "user":
      // sayfanın yuklendiğini belirt

    renderDetailLoader(query)
    // kullanıcı bilgilkerini apıden al

    API.getUser(query)
    .then((user) =>{

      renderUser(user)
        console.log('ekrana  bilgiler basıldı')
        // tweetlerin gelecegı yeri secme
        const outlet = document.querySelector(".page-bottom")
        // kullanıcınn attıgı tweetleri al
        API.getData(`/timeline.php?screenname=${query}`).then(
          (data) => renderTimeline(data, outlet, 'author')
        )
   
    })

      break;

    // varsayılan olarak anasayfayı ekrana bas

    default: // 1)yukleniyoru ekrana bas
      renderLoader(ele.tweetsArea);

      //2) kullanıcı tweetlerinii al

      API.getData(`/timeline.php?screenname=${user.profile}`)
        //3) tweetleri ekrana bas
        .then((data) => renderTimeline(data, ele.tweetsArea, 'author'));
  }

  console.log(page, query);
};

document.addEventListener("DOMContentLoaded", () => {
  // kulllanıcı oturum actıysa bilgilerni ekrarna bas
  if (user) {
    renderUserInfo(user);
  } else {
    // açmadıysa logine yonlendir
    location = "/auth.html";
  }

  // ekrana basılacak sayfayı belirle

  router();
});

// kullacının cıkıs yap butonunu izle oturumu kapat

ele.logoutBtn.addEventListener("click", () => {
  // lkulanıc bilgilerini lokalden klaldır
  localStorage.removeItem("user");

  // logine yonlendir,

  location = "/auth.html";
});

// geri butonuna tıklanma olayını izle

// direkt queryselectorden veremiyoruz cunku js de ekledik ikonu

ele.main.addEventListener('click' , (e) => {
  if(e.target.id === 'back-btn'){
    // bir adım geriye git
    history.back();
  }
})

// arama form özelliği,,

ele.searchForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  // formdaki veriye eriş
  const query = e.target[0].value

  // sayfayı değiş
  location = `?page=search&q=${query}`
})






