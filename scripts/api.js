// apiye zorunlu gondermemiz gereken ve apikey ini içeren obje

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '231212d91fmshffb83140c2a81bap1f33dbjsnacbedf34ea27',
		'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com'
	}
};
// KULLANICI İSMİNDEN HESAP BİŞGİLERİNİ ERİŞ

export default class API {
 static async getUser(username) { // basa static koyarsak altta apı.getuser yoksa basa new gelir

// 1) verileri al
  const res =  await fetch (`https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,options)

// 2) json verisini javascript verisine cevir

const data = await res.json()

// 3) veriyi fonksiyonun cagrıldıgı yere gonder

return data;



}

// parametre olarak gonderdiğimiz endpointleri alır
static async getData(endpoint){
	// parametre olarak gelen ucnoktata istek atcaz

	try{
		const res = await fetch (`https://twitter-api45.p.rapidapi.com${endpoint}` ,options)
	    return  await res.json()
	} catch (err) {
		console.log('veirleri alırken hata', err);
	  }
	



	// gelen veriyidöndür
}

}

