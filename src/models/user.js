"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    username;
    password;
    email;
    role;
    id;
    constructor(username, password, email, role, id) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.id = id;
    }
}
exports.default = User;
