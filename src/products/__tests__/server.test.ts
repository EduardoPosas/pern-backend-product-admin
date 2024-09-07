import request from "supertest"
import server from "../../server"

describe("Get /", () => {

  it("responds with json", async () => {
    const res = await request(server).get("/")

    expect(res.status).toBe(200)
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.body.message).toBe("Desde index")

    expect(res.status).not.toBe(404)
    expect(res.headers["content-type"]).not.toMatch(/text/)
    expect(res.body.message).not.toBe("desde index")
  })

})