"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const database_1 = require("./database/database");
const ENV = process.env.NODE_ENV || 'dev';
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Init applicaction');
        const server = new server_1.Server(8080);
        const db = database_1.Database.getInstance(ENV);
        yield db.connect();
        server.assignMorgan();
        server.assignDefaultRoutes();
        db.getMongoose()
            .then(mongoose => {
            server.run();
            console.log(`Database connected on::${mongoose.connection.db.databaseName}`);
        })
            .catch(err => {
            console.error(err);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=init.js.map