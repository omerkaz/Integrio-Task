* https://interio-task.netlify.app

# Integrio Frontend Task Assignment

## Task Requirements

* Use Functional Components


### University Search Page

1- Create a UniversityFilter component for university search. It is your choice to select filter parameters (at least 3) from API response parameters (can be found in the doc).

2- Send the filter data as search-query to the Public API.

3- List the results.
Public API: universities.hipolabs.com/
Documentation: https://github.com/Hipo/university-domains-list#readme


### User Search Page

1- Retrieve random 100 users as ?results=100.

2- Create a UserFilter component for user search from retrieved 100 users. Filter parameters can be email and gender. Email filter should be a text field,and
should filter the results in realtime, which means, according to written text in the email search bar, rendered users on the page should change. Both filters should work
coordinately.

3 - List the filtered results.

4 - While listing results, add pagination (page's up-limit is 50 items).
Public API: https://randomuser.me/api/?results=100
Documentation: https://randomuser.me/documentation
NOTE:

Pay attention to the difference between University Search Page and User Search Page. While UniversityFilter creates query parameter for get request, UserFilter filters the same request response inside the component.

UniversityFilter does not need to be a live search (submitting a filter form is enough). However, UserFilter is a live search so needs to show current results in any change.


### Profile Popup

* Create a UserDetailModal popup component and when its opened show user info from https://randomuser.me/api/
Public API: https://randomuser.me/api/
Documentation: https://randomuser.me/documentation


### Create User Page

* Build a UserCreateForm component with body parameters (name,lastName,email,gender) and post it to https://randomuser.me/api/ then handle and log the error (because API does not have POST request end-point).


### Styling

* Styling depends on your imagination for this task
No need to be detailed styling but it's great to have class names that are well-named and well structured
Prefer separated .scss files rather than in component styling (styled components)

---

## University Search

* Kullanıcıdan alınan iki adet parametreyi kullanarak APİ'ye axios aracılığıyla get methodu ile istek gönderilmektedir ve dönen cevaptaki veriler pagination ile listelenmektedir.

## User Search

* Component renderlandığında Api'den direkt olarak verinin çekilmesi, çekilenen veri üzerinde email ve gender ile live search yapılması, her sayfada 12 adet kullanıcı olacak şekilde kullanıcıların pagination ile listelenmesi ve kullanıcıların detayını görmek için tıklanıldığında pop-up ile kullanıcı bilgilerinin detaylı gösterimi.

## Create User

* Kullanıcıdan İsim, Soyisim, Email ve Cinsiyet bilgilerinin alınması ve alınan bilgilerin axios.post ile istek atılarak APİ'ye gönderilmesi(APİ bunu desteklemiyor) alınan hatanın catch'lenmesi ve bir obje içerisinde loglanması.
