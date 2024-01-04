
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
        <i class="bi bi-three-dots"></i> </a> ` : `<p>Reposted </p>`
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
  <h4>Post<h4>
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
        <button>Follow</button>
      </div>

      <div class="content">
        <p>${tweet.text}</p>
        ${getMedia(tweet.media)}
      </div>

      <div class="info">
        <p>2 ocak 2024 23:00</p>
        <p><span>1.9m</span> <span>views</span></p>
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
    <input type="text" placeholder="Post your reply">
    <button>Reply</button>
  </form>
  
  `

}


// kullanıcı sayfasını ekrana basar

export const renderUser = (user) => {
  ele.main.innerHTML = `
  <div class="user-page">
    <!-- üst kısım -->
    <div class="page-top">
       <!-- nav -->
       <div id="nav">
        <i id="back-btn" class="bi bi-arrow-left"></i>
        <div>
          <h3>${user.name}</h3>
          <p>
            <span>${Math.round(Math.random() * 1200)}</span>
            <span>posts</span>
          </p>

        </div>
      </div>
      <!-- banner -->

      <div class="banner">
        <img src="${user.header_image}" alt="">
        <img id="user-pp" src="${user.avatar}" alt="">
      </div>

      <!-- buttons -->
      <div class="buttons">
        <div class="icon">
          <i class="bi bi-three-dots"></i>
        </div>
        <div class="icon">
          <i class="bi bi-envelope-fill"></i>
        </div>
        <button>Follow</button>
      </div>

      <!-- kullanıcı bilgileri -->
      <div class="info">
        <h4>
          <span>${user.name}</span>
          ${user.blue_verified ? '<i class="bi bi-patch-check-fill"></i>' : ''}
          
        </h4>
        <p class="profile">@${user.profile}</p>
        <p class="description">
        ${user.name}
        </p>

        <div>
          <a href="">
            <span>${user.friends}</span>
            <span>Following</span>
          </a>
          <a href="">
            <span>${user.sub_count}</span>
            <span>Followers</span>
          </a>
        </div>
      </div>

       <!-- butonlar -->
       <div class="radio-input">
        <label>
        <input value="value-1" name="value-radio" id="value-1" type="radio" checked="">
        <span>Posts</span>
        </label>
        <label>
          <input value="value-2" name="value-radio" id="value-2" type="radio">
        <span>Replies</span>
        </label>
        <label>
          <input value="value-3" name="value-radio" id="value-3" type="radio">
        <span>Media</span>
        </label>
        <label>
          <input value="value-3" name="value-radio" id="value-3" type="radio">
        <span>Likes</span>
        </label>
        <span class="selection"></span>
      </div>
       

    </div>
    <!-- alt kısım -->

    <div class="page-bottom">
      <div id="loader-wrapper">
        <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
    </div> </div>
     
    </div>



  </div>`

}