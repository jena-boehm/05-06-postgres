const fs = require('fs');
const request = require('supertest');
const app = require('../index.js');
const pool = require('../lib/utils/pool.js');
const Tea = require('../lib/models/tea.js');


describe('test routes', () => {
  let tea;

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./SQL/setup.sql', 'utf-8'));

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

  it('should return all teas', async() => {

    const data = await request(app)
      .get('/teas');


    expect(data.body).toEqual([tea]);
  });

  it('should return one tea by id', async() => {


    const data = await request(app)
      .get(`/teas/${tea.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(tea);
  });

  it('should create a tea', async() => {

    const newTea = { 
      title: 'Pu-erh', 
      description: 'A variety of fermented tea traditionally produced in Yunnan Province, China.', 
      url: 'https://en.wikipedia.org/wiki/Pu%27er_tea'
    };

    const data = await request(app)
      .post('/teas')
      .send(newTea)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual({ ...newTea, id: '2' });
  });

  it('should update a tea by id', async() => {
    const updatedTea = { 
      title: 'Pu-erh', 
      description: 'A variety of fermented tea traditionally produced in Yunnan Province, China.', 
      url: 'https://en.wikipedia.org/wiki/Pu%27er_tea'
    };

    const data = await request(app)
      .put(`/teas/${tea.id}`)
      .send(updatedTea)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual({ ...updatedTea, id: '1' });
  });

  it('should delete a tea by id', async() => {

    const data = await request(app)
      .delete(`/teas/${tea.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(tea);
  });
});
