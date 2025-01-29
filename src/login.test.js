const axios = require('axios');

describe('Login API', () => {
  it('Success login user with valid format', async () => {
    const response = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
      "email": "hayu@nia3.example",
      "password": "Sup3r-secret!"
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('access_token');
  });

  it('Success login user case with insensitive email', async () => {
    const response = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
      "email": "Hayu@Nia3.example",
      "password": "Sup3r-secret!"
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('access_token');
  });

  it('Failed login user case with insensitive password', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
        "email": "hayu@nia3.example",
        "password": "SUP3R-SECRET!"
      });
      fail('Request seharusnya gagal dengan status 401');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        "error": "Unauthorized"
      });
    }
  });

  it('Failed login user with using wrong email', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
        "email": "hayu@nia.example",
        "password": "Sup3r-secret!"
      });
      fail('Request seharusnya gagal dengan status 401');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        "error": "Unauthorized"
      });
    }
  });

  it('Failed login user with using wrong password', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
        "email": "hayu@nia3.example",
        "password": "super-secret"
      });
      fail('Request seharusnya gagal dengan status 401');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        "error": "Unauthorized"
      });
    }
  });

  it('Failed login user because field email is empty', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
        "email": "",
        "password": "Sup3r-secret!"
      });
      fail('Request seharusnya gagal dengan status 401');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        "error": "Invalid login request"
      });
    }
  });

  it('Failed login user because field password is empty', async () => {
    try {
      const response = await axios.post('https://api.practicesoftwaretesting.com/users/login', {
        "email": "hayu@nia3.example",
        "password": ""
      });
      fail('Request seharusnya gagal dengan status 401');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        "error": "Invalid login request"
      });
    }
  });

});