import * as chai from 'chai';
import * as sinon from 'sinon';

import { Model } from 'mongoose';
import { afterEach } from 'mocha';
import { MotorcycleService } from '../../../src/Services';
import createdMock, {
  motorcycleAttributes,
  motorcycleBodyMock,
  findAllMock,
  findByIdMock,
} from './Mocks/motorcycleMock';
import HttpError from '../../../src/Errors';
import { IMotorcycle } from '../../../src/Interfaces';

const { expect } = chai;
const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';
const INVALID_MONGO_ID = 'Invalid mongo id';

describe('Testa a MotorcycleService', function () {
  afterEach(function () { sinon.restore(); });

  describe('Testa o metodo create', function () {
    it('Verifica se é pocivel criar uma motocicleta como sucesso.', async function () {
      sinon.stub(Model, 'create').resolves(createdMock);
  
      const result = await new MotorcycleService().create(motorcycleBodyMock as IMotorcycle);
  
      expect(result).to.be.has.all.keys(motorcycleAttributes);
      expect(result).to.be.deep.equal(createdMock);
    });
  
    it(
      `Verifica se é pocivel criar uma motocicleta como sucesso 
      caso o status recebido seja undefind.`,
      async function () {
        const createdMocStatusFalse = { ...createdMock, status: false };
        const { status, ...body } = motorcycleBodyMock;
  
        sinon.stub(Model, 'create').resolves(createdMocStatusFalse);
  
        const result = await new MotorcycleService().create(body as IMotorcycle);
  
        expect(result).to.be.has.all.keys(motorcycleAttributes);
        expect(result).to.be.deep.equal(createdMocStatusFalse);
      },
    );
  });

  describe('Testa o metodo findAll', function () {
    it('Verifica se findAll retorna a lista de motocicletas.', async function () {
      sinon.stub(Model, 'find').resolves(findAllMock);
  
      const result = await new MotorcycleService().findAll();
  
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.be.has.all.keys(motorcycleAttributes);
      expect(result).to.be.deep.equal(findAllMock);
    });
  
    it(
      `Verifica se findAll retorna um error com status 404 e message "Car not found",
       caso a lista de motocicletas esteja vazia.`,
      async function () {
        sinon.stub(Model, 'find').resolves([]);
  
        try {
          await new MotorcycleService().findAll();
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
        }
      },
    );
  });

  describe('Test o metodo findById', function () {
    it('Verifica se findById retorna o motocicleta referente ao id.', async function () {
      sinon.stub(Model, 'findById').resolves(findByIdMock);
  
      const result = await new MotorcycleService().findById(findByIdMock.id);
  
      expect(result).to.be.has.all.keys(motorcycleAttributes);
      expect(result).to.be.deep.equal(findByIdMock);
    });
  
    it(
      `Verifica se findById lança um error com status 422 e message "Invalid mongo id",
       caso o formato do Id seja invalido.`,
      async function () {
        sinon.stub(Model, 'findById').resolves(null);
  
        try {
          await new MotorcycleService().findById('invalidId');
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(422);
          expect((error as HttpError).message).to.be.equal(INVALID_MONGO_ID);
        }
      },
    );
  
    it(
      `Verifica se findById lança um error com status 404 e message "Car not found",
       caso nenhuma motocicleta seja encontrado.`,
      async function () {
        sinon.stub(Model, 'findById').resolves(null);
  
        try {
          await new MotorcycleService().findById(findByIdMock.id);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
        }
      },
    );
  });

  describe('Testa o metodo update', function () {
    it('Verifica se update retorna o motocicleta no fomato correto.', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(findByIdMock);
  
      const result = await new MotorcycleService()
        .update(findByIdMock.id, findByIdMock as IMotorcycle);
  
      expect(result).to.be.has.all.keys(motorcycleAttributes);
      expect(result).to.be.deep.equal(findByIdMock);
    });
  
    it(
      `Verifica se update lança um error com status 422 e message "Invalid mongo id",
       caso o formato do Id seja invalido.`,
      async function () {
        sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
        try {
          await new MotorcycleService().update('invalidId', motorcycleBodyMock as IMotorcycle);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(422);
          expect((error as HttpError).message).to.be.equal(INVALID_MONGO_ID);
        }
      },
    );
  
    it(
      `Verifica se update lança um error com status 404 e message "Car not found",
       caso o motocicleta a ser atualizado não exista.`,
      async function () {
        sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
        try {
          await new MotorcycleService().update(findByIdMock.id, motorcycleBodyMock as IMotorcycle);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
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
          await new MotorcycleService().delete('invalidId');
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(422);
          expect((error as HttpError).message).to.be.equal(INVALID_MONGO_ID);
        }
      },
    );
  
    it(
      `Verifica se delete lança um error com status 404 e message "Car not found",
       caso o motocicleta a ser atualizado não exista.`,
      async function () {
        sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
        try {
          await new MotorcycleService().delete(findByIdMock.id);
        } catch (error) {
          expect((error as HttpError).status).to.be.equal(404);
          expect((error as HttpError).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
        }
      },
    );
  });

  describe('Testa o metodo createMotorcycleDomian', function () {
    it(
      'Verifica se o createMotorcycleDomian retorna null caso receba null ou undefined',
      async function () {
        sinon.stub(Model, 'create').resolves(null);
  
        const result = await new MotorcycleService().create(motorcycleBodyMock as IMotorcycle);
  
        expect(result).to.be.deep.equal(null);
      },
    );
  });
});
