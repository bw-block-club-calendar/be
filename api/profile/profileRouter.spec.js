const request = require("supertest");

const server = require("../server.js");

require('dotenv').config()

const adminToken = process.env.ADMIN_TOKEN;
const userToken = process.env.USER_TOKEN;

it("should set db environment to testing", function () {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("unauthorized GET /api/profile", function() {
    it("should return 400", function() {
      return request(server)
        .get("/api/profile")
        .then(res => {
          expect(res.status).toBe(400);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/profile")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  })

  describe("logged in user unauthorized GET /api/profile", function() {
    it("should return 400", function() {
      return request(server)
        .get("/api/profile")
        .set("authorization", userToken)
        .then(res => {
          expect(res.status).toBe(400);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/profile")
        .set("authorization", userToken)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  })

  describe("logged in user authorized GET /api/profile/own", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/profile/own")
        .set("authorization", userToken)
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/profile/own")
        .set("authorization", userToken)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return correctly formatted profile", function() {
      return request(server)
        .get("/api/profile/own")
        .set("authorization", userToken)
        .then(res => {
          expect(res.body).toHaveProperty("user_id");
          expect(res.body).toHaveProperty("username");
          expect(res.body).toHaveProperty("profile");
        });
    });
  })

  describe("authorized GET /api/profile", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/profile")
        .set("authorization", adminToken)
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/profile")
        .set("authorization", adminToken)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return an array of profiles", function() {
      return request(server)
        .get("/api/profile")
        .set("authorization", adminToken)
        .then(res => {
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it("should return correctly formatted profiles", function() {
      return request(server)
        .get("/api/profile")
        .set("authorization", adminToken)
        .then(res => {
          res.body.forEach(profile => {
            expect(res.body[0]).toHaveProperty("id");
            expect(res.body[0]).toHaveProperty("first_name");
            expect(res.body[0]).toHaveProperty("last_name");
          })
        });
    });

  })
})

it.todo("should post a new profile");
it.todo("should delete an profile");