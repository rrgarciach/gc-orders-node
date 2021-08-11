import { Handler } from 'aws-lambda';
import { commonHandler } from '../middlewares';
import { ok } from '../utils/requests';

export const getList: Handler = commonHandler(async ({token, body}) => {
  return ok({});
});
