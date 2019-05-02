const insertOne = `
  INSERT INTO user_account
  SET ?
`;

const findByEmail = `
  SELECT
    BIN_TO_UUID(id, 1) AS id,
    username,
    email,
    password,
    created_at,
    updated_at
  FROM
    user_account
  WHERE
    email = ?
`;

const findOneWithProfile = `
  SELECT
    BIN_TO_UUID(ua.id, 1) AS id,
    ua.username,
    ua.email,
    ua.password,
    ua.created_at,
    ua.updated_at,
    JSON_OBJECT(
      'id', BIN_TO_UUID(up.id, 1),
      'avatar', up.avatar,
      'name', up.name,
      'birthdate', up.birthdate,
      'gender', up.gender,
      'city_regency', up.city_regency,
      'province', up.province,
      'country', up.country,
      'created_at', up.created_at,
      'updated_at', up.updated_at
    ) AS profile
  FROM user_account ua
  JOIN user_profile AS up
    ON ua.id = up.user_account_id
  WHERE ua.id = UUID_TO_BIN(?, 1)
`;

const findOneWithProfileAndSocialProvider = `
  SELECT
    BIN_TO_UUID(ua.id, 1) AS id,
    ua.username,
    ua.email,
    ua.password,
    ua.created_at,
    ua.updated_at,
    JSON_OBJECT(
      'id', BIN_TO_UUID(up.id, 1),
      'avatar', up.avatar,
      'name', up.name,
      'birthdate', up.birthdate,
      'gender', up.gender,
      'city_regency', up.city_regency,
      'province', up.province,
      'country', up.country,
      'created_at', up.created_at,
      'updated_at', up.updated_at
    ) AS profile,
    IF (
      COUNT(sp.id) = 0,
      NULL,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', BIN_TO_UUID(sp.id, 1),
          'type', sp.type,
          'auth_id', sp.auth_id,
          'created_at', sp.created_at,
          'updated_at', sp.updated_at
        )
      )
    ) AS social_provider
  FROM user_account ua
  JOIN user_profile AS up
    ON ua.id = up.user_account_id
  LEFT OUTER JOIN social_provider AS sp
    ON ua.id = sp.user_account_id
  WHERE ua.id = UUID_TO_BIN(?, 1)
  GROUP BY ua.id, up.id
`;

const updateOneById = `
  UPDATE user_account
  SET ?
  WHERE
    id = UUID_TO_BIN(?, 1)
`;

export const UserAccount = {
  insertOne,
  findByEmail,
  findOneWithProfile,
  findOneWithProfileAndSocialProvider,
  updateOneById,
};
