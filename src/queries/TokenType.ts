const findTokenTypeByType = `
  SELECT
    id,
    type
  FROM
    token_type
  WHERE
    type = ?
`;

export const TokenType = {
  findTokenTypeByType,
};
