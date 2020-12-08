const pool = require('../utils/pool.js');

module.exports = class Animal {
    id;
    species;
    type;

    constructor(row) {
      this.id = row.id;
      this.species = row.species;
      this.type = row.type;
    }


    //CRUD 
    static async find() {
      const { rows } = await pool.query('SELECT * FROM animals');
      return rows.map(row => new Animal(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
        SELECT *
        FROM animals
        WHERE id=$1`,
      [id]
      );

      if(!rows[0]) throw new Error(`No animal with id ${id}`);

      return new Animal(rows[0]);
    }
    
    static async insert({ species, type }) {
      const { rows } = await pool.query(`
      INSERT INTO animals (species, type)
      VALUES ($1, $2)
      RETURNING *`,
      [species, type]
      );

      return new Animal(rows[0]);
    }


    static async update(id, { species, type }) {
      const { rows } = await pool.query(
        `UPDATE animals
            SET species=$1,
                type=$2,
            WHERE id=$3
            RETURNING *`,
        [species, type, id]
      );

      return new Animal(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM animals
            WHERE id=$1
            RETURNING *`,
        [id]
      );

      return new Animal(rows[0]);
    }
};
