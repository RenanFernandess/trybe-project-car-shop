import * as chai from 'chai';
import * as sinon from 'sinon';

import { Model } from 'mongoose';
import CarService from '../../../src/Services';
import createdMock, { carAttributes, carBodyMock, createResultMock } from './Mocks/carMock';

const { expect } = chai;

describe('Testa a CarService', function () {
  it('Verifica se é pocivel criar um carro como sucesso', async function () {
    sinon.stub(Model, 'create').resolves(createdMock);

    const result = await new CarService().create(carBodyMock);

    expect(result).to.be.has.all.keys(carAttributes);
    expect(result).to.be.deep.equal(createResultMock);
  });
});
