module.exports = {
  // dialect: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: 'root',
  // database: 'projeto_integrado_db',

  dialect: 'sqlite',
  storage: 'src/database/db.sqlite',

  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
};
