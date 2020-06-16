import supertest from 'supertest'
import faker from 'faker'
import App from '../src/app'

const request = supertest(new App().express)

let id: string
const toll = {
  title: faker.company.companyName(),
  link: faker.internet.url(),
  description: faker.lorem.words(),
  tags: [
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
  ],
}

describe('routes', () => {
  it('should be create a tool in db', async () => {
    const res = await request.post('/tolls').send(toll)

    id = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBe({ ...toll, id })
  })
  it('should list tools', async () => {
    const res = await request.get('/tolls')

    expect(res.status).toBe(200)
    expect(res.body).toBe([{ ...toll, id }])
  })
  it('should be successfully list tolls filtred by tag', async () => {
    const res = await request.get(`/tools?tag=${toll.tags[0]}`)

    expect(res.status).toBe(200)
    expect(res.body).toBe([{ ...toll, id }])
  })
  it('should be unsuccessfully list tolls filtred by tag', async () => {
    const res = await request.get(`/tools?tag=No%20Tag`)

    expect(res.status).toBe(200)
    expect(res.body).toBe([])
  })
  it('should be successfully delete toll', async () => {
    const res = await request.get(`/tools/${id}`)

    expect(res.status).toBe(204)
  })
  it('should be unsuccessfully delete toll', async () => {
    const res = await request.get(`/tools/${id + 1}`)

    expect(res.status).toBe(404)
  })
})
