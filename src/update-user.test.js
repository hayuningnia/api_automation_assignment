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
    "email": "hayu-update1@nia.example"
  }); 
  expect(registerResponse.status).toBe(201);

  // Login to get token
  const loginResponse = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
    "email": 'hayu-update1@nia.example',
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

describe('Update User by ID', () => {
  let accessToken;
  let id;

  beforeAll(async () => {
    const setupResult = await setupUserAndGetToken();
    accessToken = setupResult.accessToken;
    id = setupResult.id;
  });

  it('should success update UserId with edit field country', async () => {
    const response = await axios.put(`https://api.practicesoftwaretesting.com/users/${id}`, {
      "first_name": "Hayu",
      "last_name": "Nia",
      "address": "Street 1",
      "city": "City",
      "state": "State",
      "country": "Indonesia",
      "postcode": "1234AA",
      "phone": "0987654321",
      "dob": "1970-01-01",
      "password": "Sup3r-secret!",
      "email": "hayu-update1@nia.example"
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('success', true)
  });

  it('should success update UserId with changes some field', async () => {
    const response = await axios.put(`https://api.practicesoftwaretesting.com/users/${id}`, {
      "first_name": "Hayuning",
      "last_name": "Azaniarti",
      "address": "Street 1",
      "city": "Jakarta",
      "state": "State",
      "country": "Country",
      "postcode": "12345",
      "phone": "0987654321",
      "dob": "1970-01-01",
      "password": "Sup3r-secret!",
      "email": "hayu-update1@nia.example"
    },
    {
			headers: {
        Authorization: `Bearer ${accessToken}`
			}
		});
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('success', true)
  });

	it('should failed Update userId because token is empty', async () => {
		try {
			const response = await axios.put(`https://api.practicesoftwaretesting.com/users/${id}`, {
				"first_name": "Hayuning",
				"last_name": "Azaniarti",
				"address": "Street 1",
				"city": "Jakarta",
				"state": "State",
				"country": "Country",
				"postcode": "12345",
				"phone": "0987654321",
				"dob": "1970-01-01",
				"password": "Sup3r-secret!",
				"email": "hayu-update1@nia.example"
			},
			{
				headers: {
					Authorization: `Bearer `
				}
			});
			fail('Request seharusnya gagal dengan status 401');
		} catch(error) {
			expect(error.response.status).toBe(401);
			expect(error.response.data).toEqual({
        "message": "Unauthorized"
      });
		}
	})
});