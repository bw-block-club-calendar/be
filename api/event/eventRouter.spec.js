const request = require("supertest");

const server = require("../server.js");

it("should set db environment to testing", function () {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("GET /api/event", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/event")
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/event")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return an array of events", function() {
      return request(server)
        .get("/api/event")
        .then(res => {
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it("should return correctly formatted events", function() {
      return request(server)
        .get("/api/event")
        .then(res => {
          res.body.forEach(event => {
            expect(res.body[0]).toHaveProperty("event_id");
            expect(res.body[0]).toHaveProperty("user_id");
            expect(res.body[0]).toHaveProperty("organizer_type");
          })
        });
    });

  })
})

it.todo("should post a new event");
it.todo("should delete an event");