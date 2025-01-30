const axios = require('axios');

async function setupUserAndGetToken() {
   // Register user
   const registerResponse = await axios.post('https://api.practicesoftwaretesting.com/users/register', {
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
    "email": "hayu-user1@nia.example"
  }); 
  expect(registerResponse.status).toBe(201);

  // Login to get token
  const loginResponse = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
    "email": 'hayu-user1@nia.example',
    "password": 'Sup3r-secret!'
  });
  accessToken = loginResponse.data.access_token;

  // Get user me to get id user
  const getUserMeResponse = await axios.get('https://api.practicesoftwaretesting.com/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  id = getUserMeResponse.data.id;

  return {
    accessToken,
    id
  };
}

describe('Get User by ID', () => {
  let accessToken;
  let id;

  beforeAll(async () => {
    const setupResult = await setupUserAndGetToken();
    accessToken = setupResult.accessToken;
    id = setupResult.id;
  });

  it('should retrieve user details using valid user id', async () => {
    const response = await axios.get(`https://api.practicesoftwaretesting.com/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('first_name', 'Hayu');
    expect(response.data).toHaveProperty('address', 'Street 1');
  });

  it('should failed get user with valid id and without token', async () => {
    try {
      const response = await axios.get(`https://api.practicesoftwaretesting.com/users/${id}`, {
        headers: {
          Authorization: `Bearer `
        }
      });
      fail('Request seharusnya gagal dengan status 401');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        "message": "Unauthorized"
      });
    }
  });

  it('should failed get user because invalid input userid', async () => {
    try {
      const response = await axios.get(`https://api.practicesoftwaretesting.com/users/123456`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      fail('Request seharusnya gagal dengan status 404');
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toEqual({
        "error": "You are not authorized to view this user."
      });
    }
  });

});

