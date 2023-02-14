export const carBodyMock = {
  model: 'Marea xablau',
  year: 2002,
  color: 'Black-white',
  status: false,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const createdMock = {
  ...carBodyMock,
  _id: '63ebe8447220ca4cc0b49825',
  __v: 0,
};

export default createdMock;

export const findAllMock = [
  createdMock,
  {
    _id: '63ebea916f281a62ecf64b30',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
    __v: 0,
  },
];

export const findByIdMock = createdMock;
