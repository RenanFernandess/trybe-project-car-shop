import * as chai from 'chai';
import * as sinon from 'sinon';

import { Model } from 'mongoose';
import { afterEach } from 'mocha';
import CarService from '../../../src/Services';
import createdMock, {
  carAttributes,
  carBodyMock,
  findAllMock,
  findByIdMock,
} from './Mocks/carMock';
import HttpError from '../../../src/Errors';

const { expect } = chai;
const CAR_NOT_FOUND = 'Car not found';
const INVALID_MONGO_ID = 'Invalid mongo id';

describe('Testa a CarService', function () {
  afterEach(function () { sinon.restore(); });

  describe('Testa o metodo create', function () {
    it('Verifica se é pocivel criar um carro como sucesso.', async function () {
      sinon.stub(Model, 'create').resolves(createdMock);
  
      const result = await new CarService().create(carBodyMock);
  
      expect(result).to.be.has.all.keys(carAttributes);
      expect(result).to.be.deep.equal(createdMock);
    });
  
    it(
      'Verifica se é pocivel criar um carro como sucesso caso o status recebido seja undefind.',
      async function () {
        const createdMocStatusFalse = { ...createdMock, status: false };
        const { status, ...body } = carBodyMock;
  
        sinon.stub(Model, 'create').resolves(createdMocStatusFalse);
  
        const result = await new CarService().create(body);
  
        expect(result).to.be.has.all.keys(carAttributes);
        expect(result).to.be.deep.equal(createdMocStatusFalse);
      },
    );
  });

  describe('Testa o metodo findAll', function () {
    it('Verifica se findAll retorna a lista de carros.', async function () {
      sinon.stub(Model, 'find').resolves(findAllMock);
  
      const result = await new CarService().findAll();
  
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.be.has.all.keys(carAttributes);
      expect(result).to.be.deep.equal(findAllMock);
    });
  
    it(
      `Verifica se findAll retorna um error com status 404 e message "Car not found",
       caso a lista de carros esteja vazia.`,
      async function () {
        sinon.stub(Model, 'find').resolves([]);
  
        try {
          await new CarService().findAll();
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(CAR_NOT_FOUND);
        }
      },
    );
  });

  describe('Test o metodo findById', function () {
    it('Verifica se findById retorna o carro referente ao id.', async function () {
      sinon.stub(Model, 'findById').resolves(findByIdMock);
  
      const result = await new CarService().findById(findByIdMock.id);
  
      expect(result).to.be.has.all.keys(carAttributes);
      expect(result).to.be.deep.equal(findByIdMock);
    });
  
    it(
      `Verifica se findById lança um error com status 422 e message "Invalid mongo id",
       caso o formato do Id seja invalido.`,
      async function () {
        sinon.stub(Model, 'findById').resolves(null);
  
        try {
          await new CarService().findById('invalidId');
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(422);
          expect((error as HttpError).message).to.be.equal(INVALID_MONGO_ID);
        }
      },
    );
  
    it(
      `Verifica se findById lança um error com status 404 e message "Car not found",
       caso nenhum carro seja encontrado.`,
      async function () {
        sinon.stub(Model, 'findById').resolves(null);
  
        try {
          await new CarService().findById(findByIdMock.id);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(CAR_NOT_FOUND);
        }
      },
    );
  });

  describe('Testa o metodo update', function () {
    it('Verifica se update retorna o carro no fomato correto.', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(findByIdMock);
  
      const result = await new CarService().update(findByIdMock.id, findByIdMock);
  
      expect(result).to.be.has.all.keys(carAttributes);
      expect(result).to.be.deep.equal(findByIdMock);
    });
  
    it(
      `Verifica se update lança um error com status 422 e message "Invalid mongo id",
       caso o formato do Id seja invalido.`,
      async function () {
        sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
        try {
          await new CarService().update('invalidId', carBodyMock);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(422);
          expect((error as HttpError).message).to.be.equal(INVALID_MONGO_ID);
        }
      },
    );
  
    it(
      `Verifica se update lança um error com status 404 e message "Car not found",
       caso o carro a ser atualizado não exista.`,
      async function () {
        sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
        try {
          await new CarService().update(findByIdMock.id, carBodyMock);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(CAR_NOT_FOUND);
        }
      },
    );
  });

  describe('Testa o metodo delete', function () {
    it(
      `Verifica se delete lança um error com status 422 e message "Invalid mongo id",
       caso o formato do Id seja invalido.`,
      async function () {
        sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
        try {
          await new CarService().delete('invalidId');
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(422);
          expect((error as HttpError).message).to.be.equal(INVALID_MONGO_ID);
        }
      },
    );
  
    it(
      `Verifica se delete lança um error com status 404 e message "Car not found",
       caso o carro a ser atualizado não exista.`,
      async function () {
        sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
        try {
          await new CarService().delete(findByIdMock.id);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(CAR_NOT_FOUND);
        }
      },
    );
  });

  describe('Testa o metodo createCarDomian', function () {
    it(
      'Verifica se o createCarDomian retorna null caso receba null ou undefined',
      async function () {
        sinon.stub(Model, 'create').resolves(null);
  
        const result = await new CarService().create(carBodyMock);
  
        expect(result).to.be.deep.equal(null);
      },
    );
  });
});
