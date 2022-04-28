import request from 'supertest'
import sinon from 'sinon'
import chaiResponseValidator from 'chai-openapi-response-validator'
import chai, { expect } from 'chai'
import { createTestApiInstance, ALICE_PEER_ID } from '../../fixtures'
import { STATUS_CODES } from '../../utils'

let node = sinon.fake() as any

const { api, service } = createTestApiInstance(node)
chai.use(chaiResponseValidator(api.apiDoc))

const ALIAS = 'some_alias'

describe('GET /aliases/{alias}', () => {
  it('should successfuly get alias', async () => {
    await request(service).post('/api/v2/aliases').send({
      peerId: ALICE_PEER_ID.toB58String(),
      alias: ALIAS
    })

    const res = await request(service).get(`/api/v2/aliases/${ALIAS}`)
    expect(res.status).to.equal(200)
    expect(res).to.satisfyApiSpec
    expect(res.body).to.deep.equal({
      peerId: ALICE_PEER_ID.toB58String()
    })
  })
  it('should return 404 on invalid peerId', async () => {
    const res = await request(service).get(`/api/v2/aliases/nonExistingAlias`)

    expect(res.status).to.equal(404)
    expect(res).to.satisfyApiSpec
    expect(res.body).to.deep.equal({ status: STATUS_CODES.PEERID_NOT_FOUND })
  })
})

describe('DELETE /aliases/{alias}', () => {
  it('should remove alias successfuly', async () => {
    await request(service).post('/api/v2/aliases').send({
      peerId: ALICE_PEER_ID.toB58String(),
      alias: ALIAS
    })

    const res = await request(service).delete(`/api/v2/aliases/${ALIAS}`)

    expect(res.status).to.equal(204)
    expect(res).to.satisfyApiSpec
    expect(res.body).to.be.empty
  })
  it("should return 204 even if the alias doesn't exist", async () => {
    await request(service).post('/api/v2/aliases').send({
      peerId: ALICE_PEER_ID.toB58String(),
      alias: 'nonExistingAlias'
    })

    const res = await request(service).delete(`/api/v2/aliases/${ALIAS}`)

    expect(res.status).to.equal(204)
    expect(res).to.satisfyApiSpec
    expect(res.body).to.be.empty
  })
})