export const findOneResetPasswordToken = `
  SELECT
    BIN_TO_UUID(t.id, 1) AS id,
    t.created_at,
    t.updated_at,
    t.token,
    t.expires_in,
    BIN_TO_UUID(t.user_account_id, 1),
    tt.type
  FROM
    token t
  JOIN token_type AS tt
    ON t.token_type_id = tt.id
  WHERE
    tt.type = 'reset_password'
    AND
    t.user_account_id = UUID_TO_BIN(?, 1)
`;

export const replaceToken = `
  REPLACE INTO token
  SET ?
`;

export const findOneResetPasswordTokenWithUser = `
  SELECT
    BIN_TO_UUID(t.id, 1) AS id,
    t.created_at,
    t.updated_at,
    t.token,
    t.expires_in,
    BIN_TO_UUID(t.user_account_id, 1) AS user_account_id,
    tt.type,
  FROM
    token t
  JOIN token_type AS tt
    ON t.token_type_id = tt.id
  JOIN user_account AS ua
    ON t.user_account_id = ua.id
  WHERE
    tt.type = 'reset_password'
    AND
    t.id = UUID_TO_BIN(?, 1)
`;
