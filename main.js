import {getLocal} from "./scripts/helpers.js"
import {ele,renderUserInfo, renderTimeline, renderLoader} from "./scripts/ui.js"
import API from "./scripts/api.js"
// local storagedan bilgileri al

const user = getLocal('user')
// sayfa yukklenince kullanıcının bilgilerini ekrana bas 

document.addEventListener("DOMContentLoaded" , ()=>{
    // kulllanıcı oturum actıysa bilgilerni ekrarna bas
    if(user){
        renderUserInfo(user)
    }else{
        // açmadıysa logine yonlendir
        location ='/auth.html'
    }

    // 1)yukleniyoru ekrana bas

    renderLoader(ele.tweetsArea)



    //2) kullanıcı tweetlerinii al

    API.getData(`/timeline.php?screenname=${user.profile}`)
        //3) tweetleri ekrana bas
    .then((data) => renderTimeline(data, ele.tweetsArea))




})

// kullacının cıkıs yap butonunu izle oturumu kapat

ele.logoutBtn.addEventListener('click' , ()=>{
    // lkulanıc bilgilerini lokalden klaldır
    localStorage.removeItem("user");

    // logine yonlendir,

    location = '/auth.html'

})