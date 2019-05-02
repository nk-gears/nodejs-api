export const insertOne = `
  INSERT INTO social_provider
  SET ?
`;

export const findOneByAuthId = `
  SELECT
    BIN_TO_UUID(id, 1) AS id,
    created_at,
    updated_at,
    type,
    auth_id,
    BIN_TO_UUID(user_account_id, 1) AS user_account_id
  FROM
    social_provider
  WHERE
    auth_id = ?
`;

export const SocialProvider = {
  insertOne,
  findOneByAuthId,
};
