export const carBodyMock = {
  model: 'Marea xablau',
  year: 2002,
  color: 'Black-white',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const createdMock = {
  ...carBodyMock,
  id: '63ebe8447220ca4cc0b49825',
};

export default createdMock;

export const findAllMock = [
  createdMock,
  {
    id: '63ebea916f281a62ecf64b30',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
];

export const findByIdMock = createdMock;

export const carAttributes = [
  'id',
  'model',
  'year',
  'color',
  'status',
  'buyValue',
  'doorsQty',
  'seatsQty',
];