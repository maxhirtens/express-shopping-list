process.env.NODE_ENV = "test";
const request = require("supertest");
 
const app = require("./app");
let items = require("./fakeDb");

let candy = { name: "Candy", price:"3.75" }

beforeEach(function () {
    items.push(candy);
  });
  
  afterEach(function () {
    items.length = 0;
  });

describe("GET /items", () => {
test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [candy] })
})
})

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
      const res = await request(app).get(`/items/${candy.name}`);
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({ item: candy })
    })
    test("Responds with 404 for invalid item", async () => {
      const res = await request(app).get(`/items/apple`);
      expect(res.statusCode).toBe(404)
    })
  })
  
describe("POST /items", () => {
test("Creating an item", async () => {
    const res = await request(app).post("/items").send({ name: "Cheetos", price: 4.50 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "Cheetos", price: 4.50 } });
})
test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
})
})