export const motorcycleBodyMock = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const createdMock = {
  ...motorcycleBodyMock,
  id: '63ed73879d813fe6f6b73a47',
};

export default createdMock;

export const findAllMock = [
  createdMock,
  {
    id: '63ed74429d813fe6f6b73a49',
    model: 'Titan 061',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 800,
  },
];

export const findByIdMock = createdMock;

export const motorcycleAttributes = Object.keys(createdMock);
