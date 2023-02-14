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

describe('Testa a CarService', function () {
  afterEach(function () { sinon.restore(); });

  it('Verifica se é pocivel criar um carro como sucesso.', async function () {
    sinon.stub(Model, 'create').resolves(createdMock);

    const result = await new CarService().create(carBodyMock);

    expect(result).to.be.has.all.keys(carAttributes);
    expect(result).to.be.deep.equal(createdMock);
  });

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
        expect((error as HttpError).message).to.be.equal('Car not found');
      }
    },
  );

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
        expect((error as HttpError).message).to.be.equal('Invalid mongo id');
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
        expect((error as HttpError).message).to.be.equal('Car not found');
      }
    },
  );
});
