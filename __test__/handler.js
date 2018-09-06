const proxyquire = require('proxyquire');
const sinon = require('sinon');

const { expect } = require('chai');

describe('handler', () => {
  let handler;
  const upsertStub = sinon.stub();
  const getStub = sinon.stub();
  const getAllStub = sinon.stub();
  const deleteStub = sinon.stub();

  beforeEach(() => {
    handler = proxyquire('../handler', {
      './model/member': {
        upsert: upsertStub,
        get: getStub,
        getAll: getAllStub,
        delete: deleteStub,
      },
    });
  });

  describe('create', () => {
    it('200 response code when element created', async () => {
      upsertStub.returns({});
      const result = await handler.create({ body: '{}' });
      expect(result.statusCode).eqls(200);
    });
    it('500 response code when error creating element', async () => {
      upsertStub.throws(new Error('Some dynamo error'));
      const result = await handler.create({ body: '{}' });
      expect(result.statusCode).eqls(500);
    });
  });

  describe('getOne', () => {
    it('404 response code when the element does not exists', async () => {
      getStub.returns(null);
      const result = await handler.getOne({ body: '{}', pathParameters: {} });
      expect(result.statusCode).eqls(404);
    });
    it('200 response code when element found ', async () => {
      getStub.returns({});
      const result = await handler.getOne({ body: '{}', pathParameters: {} });
      expect(result.statusCode).eqls(200);
    });
    it('500 response code when error retrieving', async () => {
      getStub.throws(new Error('Some dynamo error'));
      const result = await handler.create({ body: '{}' });
      expect(result.statusCode).eqls(500);
    });
  });

  describe('getAll', () => {
    it('200 response code when query executed', async () => {
      getAllStub.returns({});
      const result = await handler.getAll({ body: '{}', pathParameters: {} });
      expect(result.statusCode).eqls(200);
    });
    it('500 response code when error executing query', async () => {
      getAllStub.throws(new Error('Some dynamo error'));
      const result = await handler.getAll({ body: '{}' });
      expect(result.statusCode).eqls(500);
    });
  });

  describe('update', () => {
    it('404 response code when the element does not exists', async () => {
      getStub.returns(null);
      const result = await handler.update({ body: '{}', pathParameters: {} });
      expect(result.statusCode).eqls(404);
    });
    it('200 response code when member updated', async () => {
      getStub.returns({});
      upsertStub.returns({});
      const result = await handler.update({ body: '{}', pathParameters: {} });
      expect(result.statusCode).eqls(200);
    });
    it('500 response code when error updating element', async () => {
      getStub.returns({});
      upsertStub.throws(new Error('Some dynamo error'));
      const result = await handler.update({ body: '{}', pathParameters: {} });
      expect(result.statusCode).eqls(500);
    });
  });

  describe('delete', () => {
    it('404 response code when the element does not exists', async () => {
      getStub.returns(null);
      const result = await handler.delete({ pathParameters: {} });
      expect(result.statusCode).eqls(404);
    });
    it('200 response code when member updated', async () => {
      getStub.returns({});
      deleteStub.returns({});
      const result = await handler.delete({ pathParameters: {} });
      expect(result.statusCode).eqls(200);
    });
    it('500 response code when error updating element', async () => {
      getStub.returns({});
      deleteStub.throws(new Error('Some dynamo error'));
      const result = await handler.delete({ pathParameters: {} });
      expect(result.statusCode).eqls(500);
    });
  });
});
