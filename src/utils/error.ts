import httpErrors from 'http-errors';

const DEFAULT_CODE = 'ERR_UNEXPECTED';
const DEFAULT_MESSAGE = 'Something wrong';

/**
 * Create error helper
 * @param status error status code, ex.: 400, 403, 500
 * @param code error code, ex.: ERR_UNEXPECTED
 * @param message more detailed error information
 */
export const createError = (
  status: number = 500,
  code: string | any = DEFAULT_CODE,
  message: string | any = DEFAULT_MESSAGE,
): httpErrors.HttpError => {
  return httpErrors(status, message, { code });
};

/**
 * Create catch error helper use in try/catch
 * @param error `status`, `code`, `message`
 */
export const createCatchError = ({
  status = 500,
  code = DEFAULT_CODE,
  message = DEFAULT_MESSAGE,
}: any): httpErrors.HttpError => {
  return httpErrors(status, message, { code });
};
