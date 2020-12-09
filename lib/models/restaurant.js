const pool = require('../utils/pool.js');

module.exports = class Restaurant {
    id;
    name;
    city;
    cuisine;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.city = row.city;
      this.cuisine = row.cuisine;
    }


    //CRUD 
    static async find() {
      const { rows } = await pool.query('SELECT * FROM restaurants');
      return rows.map(row => new Restaurant(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
        SELECT *
        FROM restaurants
        WHERE id=$1`,
      [id]
      );

      if(!rows[0]) throw new Error(`No restaurant with id ${id}`);

      return new Restaurant(rows[0]);
    }
    
    static async insert({ name, city, cuisine }) {
      const { rows } = await pool.query(`
      INSERT INTO restaurants (name, city, cuisine)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, city, cuisine]
      );

      return new Restaurant(rows[0]);
    }


    static async update(id, { name, city, cuisine }) {
      const { rows } = await pool.query(
        `UPDATE restaurants
            SET name=$1,
                city=$2,
                cuisine=$3
            WHERE id=$4
            RETURNING *`,
        [name, city, cuisine, id]
      );

      return new Restaurant(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM restaurants
            WHERE id=$1
            RETURNING *`,
        [id]
      );

      return new Restaurant(rows[0]);
    }
};
