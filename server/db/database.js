const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../../package.json');

//const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;

const dbName = pkg.name

console.log(chalk.yellow(`Opening database connection to ${dbName}`));

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
  }
);

module.exports = db;
