const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Product = require('../models/product');
const mongoose = require('mongoose');

const api = supertest(app);

let token;

const login = {
    username: "niraj1",
    password: "password"
}

const register = {
    fname:"niraj",
    lname:"bhata",
    username:"niraj1",
    password:"password",
}

const product = {
    productname:"Ring",
    productdetails:"Gold Ring",
    price:1000,
}

test('Register User', async () => {
    await api
        .post('/api/user/register')
        .send(register)
        .expect(201)
});