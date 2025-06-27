import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import Sequelize from "sequelize";
import configFile from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

const sequelize = new Sequelize(
  config?.database,
  config?.username,
  config?.password,
  {
    host: config?.host,
    dialect: config?.dialect,
    logging: false,
  }
);

// Read and import all model files
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
  );

// Use Promise.all with dynamic import
await Promise.all(
  modelFiles.map(async (file) => {
    const modelModule = await import(
      pathToFileURL(path.join(__dirname, file)).href
    );
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })
);

// Apply associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
