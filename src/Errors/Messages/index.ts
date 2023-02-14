const NOT_FOUND = {
  status: 404,
  INVALID_ID: 'Wrong id format',
  CAR_NOT_FOUND: 'Car not found',
};

export default NOT_FOUND;

export const UNPROCESSABLE_ENTITY = {
  status: 422,
  MONGO_ID: 'Invalid mongo id',
};
