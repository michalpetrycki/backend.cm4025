"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
exports.collections = {};
async function connectToDatabase() {
    dotenv.config();
    console.log('dotenv');
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING_LOCAL);
    console.log('client');
    await client.connect();
    console.log('connect');
    const db = client.db(process.env.DB_NAME);
    // ! says to typescript that even if something might look like null it definitely is not a null
    const usersCollection = db.collection(process.env.USERS_COLLECTION);
    exports.collections.users = usersCollection;
    console.log(`Successfully connected to database ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}
exports.connectToDatabase = connectToDatabase;
