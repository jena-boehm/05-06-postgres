const app = require('../index.js');
const request = require('supertest');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const Tea = require('../lib/models/tea.js');

require('dotenv').config();


describe('test routes', () => {
  let tea;

  beforeEach(async() => {
    pool.query(fs.readFileSync('./SQL/setup.sql', 'utf-8'));

    tea = await Tea
      .insert({ 
        title: 'Oolong', 
        description: 'Oolong is produced through a process including withering the plant under strong sun and oxidation before curling and twisting.', 
        url: 'https://en.wikipedia.org/wiki/Oolong'
      });
  });

  afterAll(() => {
    return pool.end();
  });

  test('should return all teas', async() => {

    const data = await request(app)
      .get('/teas')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual([tea]);
  });

  test('should return one tea by id', async() => {


    const data = await request(app)
      .get(`/teas/${tea.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(tea);
  });
});
