const app = require('../index.js');
const request = require('supertest');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const Houseplant = require('../lib/models/houseplant.js');

require('dotenv').config();


describe('test routes', () => {
  let houseplant;

  beforeEach(async() => {
    pool.query(fs.readFileSync('./SQL/setup.sql', 'utf-8'));

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
    const expectation = { 
      name: 'Calathea', 
      type: 'Tropical'
    };

    const data = await request(app)
      .get('/houseplants')
      .expect('Content-Type', /json/)
      .expect(200);

      console.log(data.body);

    expect(data.body).toEqual(expectation);
  });

  //   it('should return one houseplant by id', async() => {

  //     const data = await request(app)
  //       .get(`/houseplants/${houseplant.id}`)
  //       .expect('Content-Type', /json/)
  //       .expect(200);

//     expect(data.body).toEqual(houseplant);
//   });
});
