import httpErrors from 'http-errors';

const DEFAULT_CODE = 'ERR_UNEXPECTED';
const DEFAULT_MESSAGE = 'Something wrong';

/**
 * Error helper
 * @param status error status code, ex.: 400, 403, 500
 * @param code error code, ex.: ERR_UNEXPECTED
 * @param message more detailed error information
 */
export const handleError = (
  status: number = 500,
  code: string | any = DEFAULT_CODE,
  message: string | any = DEFAULT_MESSAGE,
): httpErrors.HttpError => {
  return httpErrors(status, message, { code });
};

/**
 * Catch error helper used in try/catch
 * @param error `status`, `code`, `message`
 */
export const handleCatchError = ({
  status = 500,
  code = DEFAULT_CODE,
  message = DEFAULT_MESSAGE,
}: any): httpErrors.HttpError => {
  return httpErrors(status, message, { code });
};
