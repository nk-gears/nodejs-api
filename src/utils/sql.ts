/**
 * Objects that have a toSqlString method will have .toSqlString() called and the returned value is used as the raw SQL.
 * @param sql
 */
export const toSqlString = (sql: string): { toSqlString: () => string } => ({
  toSqlString: (): string => sql,
});
