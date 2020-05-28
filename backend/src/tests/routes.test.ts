import request = require("supertest");
import app = require("../server");

describe("Next game queries", () => {
  it("should get next move", async () => {
    const res = await request(app).post("/api/next-move").send(
      {
        "game": {
          "state": "playing",
          "boxes": [
            {
              "position": 0,
              "value": null
            },
            {
              "position": 1,
              "value": null
            },
            {
              "position": 2,
              "value": null
            },
            {
              "position": 3,
              "value": null
            },
            {
              "position": 4,
              "value": null
            },
            {
              "position": 5,
              "value": null
            },
            {
              "position": 6,
              "value": null
            },
            {
              "position": 7,
              "value": null
            },
            {
              "position": 8,
              "value": null
            }
          ],
          "players": [
            {
              "piece": "x"
            },
            {
              "piece": "o"
            }
          ],
          "currentPlayer": {
            "piece": "x"
          }
        },
        "box": {
          "position": 5,
          "value": null
        }
      }
    );

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("boxes");
  });
  it("should get ended game - Player 1 wins", async () => {
    const res = await request(app).post("/api/next-move").send(
      {
        "game": {
          "state": "playing",
          "boxes": [
            {
              "position": 0,
              "value": "o"
            },
            {
              "position": 1,
              "value": "o"
            },
            {
              "position": 2,
              "value": "x"
            },
            {
              "position": 3,
              "value": null
            },
            {
              "position": 4,
              "value": "x"
            },
            {
              "position": 5,
              "value": "o"
            },
            {
              "position": 6,
              "value": null
            },
            {
              "position": 7,
              "value": null
            },
            {
              "position": 8,
              "value": "x"
            }
          ],
          "players": [
            {
              "piece": "x"
            },
            {
              "piece": "o"
            }
          ],
          "currentPlayer": {
            "piece": "x"
          }
        },
        "box": {
          "position": 6,
          "value": null
        }
      }
    );

    const object = {
      "boxes": [
        {
          "position": 6,
          "value": "x"
        }
      ],
      "ended": {
        "player": "x",
        "line": "d2"
      }
    };

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject(object);
  });

  it("should get 400 error - No game data", async () => {
    const res = await request(app).post("/api/next-move").send(
      {
        "box": {
          "position": 5,
          "value": null
        }
      }
    );

    expect(res.status).toEqual(400);
  });
  it("should get 400 error - No box data", async () => {
    const res = await request(app).post("/api/next-move").send(
      {
        "game": {
          "state": "playing",
          "boxes": [
            {
              "position": 0,
              "value": null
            },
            {
              "position": 1,
              "value": null
            },
            {
              "position": 2,
              "value": null
            },
            {
              "position": 3,
              "value": null
            },
            {
              "position": 4,
              "value": null
            },
            {
              "position": 5,
              "value": null
            },
            {
              "position": 6,
              "value": null
            },
            {
              "position": 7,
              "value": null
            },
            {
              "position": 8,
              "value": null
            }
          ],
          "players": [
            {
              "piece": "x"
            },
            {
              "piece": "o"
            }
          ],
          "currentPlayer": {
            "piece": "x"
          }
        }
      }
    );

    expect(res.status).toEqual(400);
  });
  it("should get 400 error - Bad game boxes data", async () => {
    const res = await request(app).post("/api/next-move").send(
      {
        "game": {
          "state": "playing",
          "boxes": [

          ],
          "players": [
            {
              "piece": "x"
            },
            {
              "piece": "o"
            }
          ],
          "currentPlayer": {
            "piece": "x"
          }
        }
      }
    );

    expect(res.status).toEqual(400);
  });
});
