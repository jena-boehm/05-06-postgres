const pool = require('../utils/pool.js');

module.exports = class Movie {
    id;
    title;
    genre;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.genre = row.genre;
    }


    //CRUD 
    static async find() {
      const { rows } = await pool.query('SELECT * FROM movies');
      return rows.map(row => new Movie(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
        SELECT *
        FROM movies
        WHERE id=$1`,
      [id]
      );

      if(!rows[0]) throw new Error(`No movie with id ${id}`);

      return new Movie(rows[0]);
    }
    
    static async insert({ title, genre }) {
      const { rows } = await pool.query(`
      INSERT INTO movies (title, genre)
      VALUES ($1, $2)
      RETURNING *`,
      [title, genre]
      );

      return new Movie(rows[0]);
    }


    static async update(id, { title, genre }) {
      const { rows } = await pool.query(
        `UPDATE movies
            SET title=$1,
                genre=$2,
            WHERE id=$3
            RETURNING *`,
        [title, genre, id]
      );

      return new Movie(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM movies
            WHERE id=$1
            RETURNING *`,
        [id]
      );

      return new Movie(rows[0]);
    }
};
