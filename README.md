
# API Automation

API Automation ini dibuat dengan Javascript dan framework testing JEST. Di setiap test case sudah disediakan payload body, sehingga tidak perlu diubah manual saat akan dijalankan pertama kali. Namun saat akan dijalankan kedua kali dalam waktu berdekatan dengan menjalankan proses pertama kali atau ingin dijalankan manual pada masing masing test case setelah menjalankan pertama kali, payload email di setiap file test saat register perlu diubah karena email sudah ter register saat test pertama kali dijalankan.

## Installation
Jalankan command ini saat baru clone / download project untuk install dependencies
```bash
npm install
```

## Run All Test
Untuk run semua test case yang dibuat, jalankan perintah ini
```bash
npm run test
```


## Features

- Register Test Case
- Login Test Case
- Get User By Id Test Case
- Update User By Id Test Case

## Test Case Reference

#### Register User / register.test.js

```http
  POST https://api.practicesoftwaretesting.com/users/register
```
 Di File ini dijalankan 5 scenario test dengan request body untuk register yang sudah di defined di dalam masing masing test case :
 - Success register with valid data
 - Failed register user with incorrect format password
 - Failed register user because field password is empty
 - Failed register user because email already register
 - Failed register because field first name is empty

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `first_name`      | `string` | first name user |
| `last_name`      | `string` | last name user |
| `address`      | `string` | address user |
| `city`      | `string` | city user |
| `state`      | `string` | state user |
| `country`      | `string` | contry user |
| `postcode`      | `string` | postcode user |
| `phone`      | `string` | phone user |
| `dob`      | `string` | dob user |
| `password`      | `string` | password user |
| `email`      | `string` | email user |

#### Login User / login.test.js

Di file ini dijalankan 7 scenario test dengan request body untuk login yang sudah di defined di dalam masing masing test case :
- Success login user with valid format
- Success login user case with insensitive email
- Failed login user case with insensitive password
- Failed login user with using wrong email
- Failed login user with using wrong password
- Failed login user because field email is empty
- Failed login user because field password is empty

URL: 
```http
  POST https://api.practicesoftwaretesting.com/users/login
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | email saat registrasi |
| `password`      | `string` | password saat registrasi |

#### Get User By Id / get-user.test.js

Di file ini sebelum test case dijalankan, akan dilakukan dulu:
- **register user** dengan payload body yang berbeda dengan body di register.test.js
- **login user** dengan payload body email dan password yang di registrasi kan untuk mendapatkan access_token. access_token akan digunakan sebagai Authorization di headers 
- **get user me** untuk mendapatkan id dari user yang sudah di registrasi di atas.

 Di File ini dijalankan 3 scenario test:
 - success retrieve user details using valid user id
 - failed get user with valid id and without token
 - failed get user because invalid input userid

URL: 
```http
  GET `https://api.practicesoftwaretesting.com/users/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | id user |

#### Update User / update-user.test.js

Di file ini sebelum test case dijalankan, akan dilakukan dulu:
- **register user** dengan payload body yang berbeda dengan body di register.test.js
- **login user** dengan payload body email dan password yang di registrasi kan untuk mendapatkan access_token. access_token akan digunakan sebagai Authorization di headers 
- **get user me** untuk mendapatkan id dari user yang sudah di registrasi di atas.

 Di File ini dijalankan 3 scenario test:
 - success update UserId with edit field country
 - success update UserId with changes some field
 - failed Update userId because token is empty

URL: 
```http
  PUT `https://api.practicesoftwaretesting.com/users/${id}
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `first_name`      | `string` | first name user |
| `last_name`      | `string` | last name user |
| `address`      | `string` | address user |
| `city`      | `string` | city user |
| `state`      | `string` | state user |
| `country`      | `string` | contry user |
| `postcode`      | `string` | postcode user |
| `phone`      | `string` | phone user |
| `dob`      | `string` | dob user |
| `password`      | `string` | password user |
| `email`      | `string` | email user |



