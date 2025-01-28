const axios = require('axios');

describe('Register API', () => {
  it('Success register with valid data', async () => {
    const response = await axios.post('https://api.practicesoftwaretesting.com/users/register', {
      "first_name": "Hayu",
      "last_name": "Nia",
      "address": "Street 1",
      "city": "City",
      "state": "State",
      "country": "Country",
      "postcode": "1234AA",
      "phone": "0987654321",
      "dob": "1970-01-01",
      "password": "Sup3r-secret!",
      "email": "hayu@nia3.example"
    });
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('first_name', 'Hayu');
  });

  it('Failed register user with incorrect format password', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/register', {
        "first_name": "Hayu",
        "last_name": "Nia",
        "address": "Street 1",
        "city": "City",
        "state": "State",
        "country": "Country",
        "postcode": "1234AA",
        "phone": "0987654321",
        "dob": "1970-01-01",
        "password": "super-secret",
        "email": "hayu@nia2.example"
      });
      fail('Request seharusnya gagal dengan status 422');
    } catch (error) {
      expect(error.response.status).toBe(422);
      expect(error.response.data).toEqual({
        "password": [
          "The password field must contain at least one uppercase and one lowercase letter.",
          "The password field must contain at least one number."
      ]
      });
    }
  })

  it('Failed register user because field password is empty', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/register', {
        "first_name": "Hayu",
        "last_name": "Nia",
        "address": "Street 1",
        "city": "City",
        "state": "State",
        "country": "Country",
        "postcode": "1234AA",
        "phone": "0987654321",
        "dob": "1970-01-01",
        "password": "",
        "email": "hayu@nia2.example"
      });
      fail('Request seharusnya gagal dengan status 422');
    } catch (error) {
      expect(error.response.status).toBe(422);
      expect(error.response.data).toEqual({
        "password": [
          "The password field is required.",
      ]
      });
    }
  })

  it('Failed register user because email already register', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/register', {
        "first_name": "Hayu",
        "last_name": "Nia",
        "address": "Street 1",
        "city": "City",
        "state": "State",
        "country": "Country",
        "postcode": "1234AA",
        "phone": "0987654321",
        "dob": "1970-01-01",
        "password": "Sup3r-secret!",
        "email": "hayu@nia3.example"
      });
      fail('Request seharusnya gagal dengan status 422');
    } catch (error) {
      console.log(error.response)
      expect(error.response.status).toBe(422);
      expect(error.response.data).toEqual({
        "email": [
          "A customer with this email address already exists."
      ]
      });
    }
  })

  it('Failed register because field first name is empty', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/register', {
        "first_name": "",
        "last_name": "Nia",
        "address": "Street 1",
        "city": "City",
        "state": "State",
        "country": "Country",
        "postcode": "1234AA",
        "phone": "0987654321",
        "dob": "1970-01-01",
        "password": "Sup3r-secret!",
        "email": "hayu@nia4.example"
      });
      fail('Request seharusnya gagal dengan status 422');
    } catch (error) {
      console.log(error.response)
      expect(error.response.status).toBe(422);
      expect(error.response.data).toEqual({
        "first_name": [
          "The first name field is required."
      ]
      });
    }
  })

});

