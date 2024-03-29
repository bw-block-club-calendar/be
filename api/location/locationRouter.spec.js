const request = require("supertest");

const server = require("../server.js");

require('dotenv').config()

const adminToken = process.env.ADMIN_TOKEN;
const userToken = process.env.USER_TOKEN;

it("should set db environment to testing", function () {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("unauthorized GET /api/location", function() {
    it("should return 400", function() {
      return request(server)
        .get("/api/location")
        .then(res => {
          expect(res.status).toBe(400);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/location")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  })

  describe("logged in user unauthorized GET /api/location", function() {
    it("should return 400", function() {
      return request(server)
        .get("/api/location")
        .set("authorization", userToken)
        .then(res => {
          expect(res.status).toBe(400);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/location")
        .set("authorization", userToken)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  })

  describe("authorized GET /api/location", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/location")
        .set("authorization", adminToken)
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/location")
        .set("authorization", adminToken)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return an array of locations", function() {
      return request(server)
        .get("/api/location")
        .set("authorization", adminToken)
        .then(res => {
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it("should return correctly formatted locations", function() {
      return request(server)
        .get("/api/location")
        .set("authorization", adminToken)
        .then(res => {
          res.body.forEach(location => {
            expect(res.body[0]).toHaveProperty("id");
            expect(res.body[0]).toHaveProperty("name");
            expect(res.body[0]).toHaveProperty("coordinates");
          })
        });
    });

  })
})

it.todo("should post a new location");
it.todo("should delete an location");