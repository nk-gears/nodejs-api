export const findTokenTypeByType = `
  SELECT
    id,
    type
  FROM
    token_type
  WHERE
    type = ?
`;
