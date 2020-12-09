const pool = require('../utils/pool.js');

module.exports = class Houseplant {
    id;
    name;
    type;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
    }


    //CRUD 
    static async find() {
      const { rows } = await pool.query('SELECT * FROM houseplants');
      return rows.map(row => new Houseplant(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
        SELECT *
        FROM houseplants
        WHERE id=$1`,
      [id]
      );

      if(!rows[0]) throw new Error(`No houseplant with id ${id}`);

      return new Houseplant(rows[0]);
    }
    
    static async insert({ name, type }) {
      const { rows } = await pool.query(`
      INSERT INTO houseplants (name, type)
      VALUES ($1, $2)
      RETURNING *`,
      [name, type]
      );

      return new Houseplant(rows[0]);
    }


    static async update(id, { name, type }) {
      const { rows } = await pool.query(
        `UPDATE houseplants
            SET name=$1,
                type=$2
            WHERE id=$3
            RETURNING *`,
        [name, type, id]
      );

      return new Houseplant(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM houseplants
            WHERE id=$1
            RETURNING *`,
        [id]
      );

      return new Houseplant(rows[0]);
    }
};
