const app = require('../index.js');
const request = require('supertest');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const Houseplant = require('../lib/models/houseplant.js');

require('dotenv').config();


describe('test routes', () => {
  let houseplant;

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./SQL/setup.sql', 'utf-8'));

    houseplant = await Houseplant
      .insert({ 
        name: 'Calathea', 
        type: 'Tropical'
      });
  });

  afterAll(() => {
    return pool.end();
  });

  it('should return all houseplants', async() => {

    const data = await request(app)
      .get('/houseplants')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual([houseplant]);
  });

  it('should return one houseplant by id', async() => {

    const data = await request(app)
      .get(`/houseplants/${houseplant.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(houseplant);
  });

  it('should create a houseplant', async() => {

    const newHouseplant = { 
      name: 'Bear Paw', 
      type: 'Succulent'
    };

    const data = await request(app)
      .post('/houseplants')
      .send(newHouseplant)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual({ ...newHouseplant, id: '2' });
  });

  it('should update a houseplant by id', async() => {
    const updatedHouseplant = { 
      name: 'Snake Plant', 
      type: 'Succulent'
    };

    const data = await request(app)
      .put(`/houseplants/${houseplant.id}`)
      .send(updatedHouseplant)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual({ ...updatedHouseplant, id: '1' });
  });

  it('should delete a houseplant by id', async() => {

    const data = await request(app)
      .delete(`/houseplants/${houseplant.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(houseplant);
  });
});
