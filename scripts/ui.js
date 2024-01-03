
export const ele = {
    user_name: document.querySelector("#user-name"),
    user_tag: document.querySelector("#user-tag"),
    pics: document.querySelectorAll("#profile-pic"),
    tweetsArea:document.querySelector(".tweets-area"),
    logoutBtn: document.querySelector("#logout-btn"),
    main: document.querySelector("main"),
    searchForm: document.querySelector("aside form")
}

// kullanıcı bilgilerini ekrana basar


export const renderUserInfo = (user) => {
    // kullanıcı resimlerini ekrana bas
    ele.pics.forEach(img=> img.src = user.avatar)
    // kullanıcı isimlerini ekrana bas
    ele.user_name.innerHTML = user.name;
    ele.user_tag.innerHTML = '@' + user.profile;



}

// tweetin medya içeriğini alacak ve içeriğie göre htm olusturaacak

const getMedia = (media) => {
  if (!media) return ''
if (media.photo){
    return `<img src= ${media.photo[0].media_url_https} />`
}
if(media.video){
    const url = media.video[0].variants[0].url
    return `<video controls src="${url}"/>`
}
// media içeriği yoksa

return '';

}

// tweetleri ekrana basar
// 1) data: tweetler:
// 2)outlet: hangi elementin içine gönderilcek

export const renderTimeline = (data, outlet, user) =>{

    console.log(data)
    outlet.innerHTML = data.timeline.map((tweet)=> `
    <div class="tweet">
    <img id="user-img" src="${tweet[user] ? tweet[user].avatar : '/img/defaultt.png'}">
    <div class="body">
        <div class="user">
        ${tweet[user] ? `   
        <a href="?page=user&q=${tweet[user].screen_name}">
        <img id="mobile-img" src="${tweet[user]?.avatar}">

        <b>${tweet[user]?.name}</b>
        <p>${tweet[user]?.screen_name}</p>
        <p>${moment(tweet.created_at).fromNow()}</p>
        <i class="bi bi-three-dots"></i> </a> ` : `<p>Retweet edildi </p>`
       }

     
        </div>


        <a href="?page=status&q=${tweet.tweet_id}" class="content">
            <p>${tweet.text}</p>
            ${getMedia(tweet.media)}
                    </a>
        <div class="buttons">
            <button>
                <i class="bi bi-chat"></i>
                <span>${tweet.replies}</span>
            </button>
            <button>
                <i class="bi bi-recycle"></i>
                <span>${tweet.retweets}</span>
            </button>
            <button>
                <i class="bi bi-heart"></i>
                <span>${tweet.favorites}</span>
            </button>
            <button>
                <i class="bi bi-bookmark"></i>
                <span>${tweet.bookmarks}</span>
            </button>
        </div>
    </div>
</div>
    
    
    `
    ) .join('')

}

// parametre olarak aldıgını alana yukleniyor basar

export const renderLoader = (outlet) =>{
    outlet.innerHTML = `
    <div id="loader-wrapper">
    <div class="wrapper">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
</div> </div>`
}


// detay sayfasının yukleniyorunu ekrana basar
export const renderDetailLoader  = (text)=>{

    ele.main.innerHTML = `
    <div class="nav">
    <i id="back-btn"  class="bi bi-arrow-left"></i>
    <h4>${text}<h4>
    </div>

    <div id="loader-wrapper">
    <div class="wrapper">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
</div> </div>
    `
}

// ejraba tweet detay sayfaısını basar



export const renderDetail = (tweet,user) => {
  ele.main.innerHTML = `   <div class="nav">
  <i id="back-btn" class="bi bi-arrow-left"></i>
  <h4>Gönderi<h4>
  </div>

  <div class="tweet detail-tweet">
    <img id="user-img" src="${tweet.author.image}" alt="">

    <div class="body">
      <div  class="user">
        <a href="?page=user&q=${tweet.author.screen_name}">
          <img id="mobile-img" src="${tweet.author.image}" alt="">
          <b>${tweet.author.name}</b>
          <p>${tweet.author.screen_name}</p>
        </a>
        <button>Takip et</button>
      </div>

      <div class="content">
        <p>${tweet.text}</p>
        ${getMedia(tweet.media)}
      </div>

      <div class="info">
        <p>2 ocak 2024 23:00</p>
        <p><span>1.9m</span> <span>görüntülenme</span></p>
      </div>

      <div class="buttons">
        <button>
          <i class="bi bi-chat"></i>
          <span>${tweet.replies}</span>
      </button>
      <button>
          <i class="bi bi-recycle"></i>
          <span>${tweet.retweets}</span>
      </button>
      <button>
          <i class="bi bi-heart"></i>
          <span>${tweet.likes}</span>
      </button>
      <button>
          <i class="bi bi-bookmark"></i>
          <span>${tweet.bookmarks}</span>
      </button>
      </div>
    </div>


  </div>

  <form id="comment-form">
    <img src="${user.avatar}" alt="">
    <input type="text" placeholder="yorum yaz">
    <button>Yanıtla</button>
  </form>
  
  `

}