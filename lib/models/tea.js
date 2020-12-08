const pool = require('../utils/pool.js');

module.exports = class Tea {
    id;
    title;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.description = row.description;
      this.url = row.url;
    }


    //CRUD 
    static async find() {
      const { rows } = await pool.query('SELECT * FROM teas');
      return rows.map(row => new Tea(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
        SELECT *
        FROM teas
        WHERE id=$1`,
      [id]
      );

      if(!rows[0]) throw new Error(`No tea with id ${id}`);

      return new Tea(rows[0]);
    }
    
    static async insert({ title, description, url }) {
      const { rows } = await pool.query(`
      INSERT INTO teas (title, description, url)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, description, url]
      );

      return new Tea(rows[0]);
    }


    static async update(id, { title, description, url }) {
      const { rows } = await pool.query(
        `UPDATE teas
            SET title=$1,
                description=$2,
                url=$3
            WHERE id=$4
            RETURNING *`,
        [title, description, url, id]
      );

      return new Tea(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM teas
            WHERE id=$1
            RETURNING *`,
        [id]
      );

      return new Tea(rows[0]);
    }
};
