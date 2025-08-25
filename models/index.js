import Sequelize from "sequelize";
import dotenv from "dotenv";
import UserToken from "./userToken.model.js";
import User from "./user.model.js";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// Initialize models
const db = {
  User: User(sequelize, Sequelize.DataTypes),
  UserToken: UserToken(sequelize, Sequelize.DataTypes),
};

// Apply associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
