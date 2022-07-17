# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
***
## University Search

* Kullanıcıdan alınan iki adet parametreyi kullanarak APİ'ye axios aracılığıyla get methodu ile istek gönderilmektedir ve dönen cevaptaki veriler pagination ile listelenmektedir.

## User Search

* Component renderlandığında Api'den direkt olarak verinin çekilmesi, çekilenen veri üzerinde email ve gender ile live search yapılması, her sayfada 12 adet kullanıcı olacak şekilde kullanıcıların pagination ile listelenmesi ve kullanıcıların detayını görmek için tıklanıldığında pop-up ile kullanıcı bilgilerinin detaylı gösterimi.

## Create User

* Kullanıcıdan İsim, Soyisim, Email ve Cinsiyet bilgilerinin alınması ve alınan bilgilerin axios.post ile istek atılarak APİ'ye gönderilmesi(APİ bunu desteklemiyor) alınan hatanın catch'lenmesi ve bir obje içerisinde loglanması.