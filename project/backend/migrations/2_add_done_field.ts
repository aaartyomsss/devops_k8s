export const second_migration = `
      ALTER TABLE todo
      ADD COLUMN IF NOT EXISTS done boolean;
`
