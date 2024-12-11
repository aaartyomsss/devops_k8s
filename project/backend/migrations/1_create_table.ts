export const first_migration = `
      CREATE TABLE IF NOT EXISTS todo (
        id SERIAL PRIMARY KEY,
        text VARCHAR(140)
      );
`
