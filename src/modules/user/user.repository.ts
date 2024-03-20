import { getManyBy, getSingleBy } from 'helper'
import { Users, VerificationCodes } from './user.entity'
import { dataSource } from 'src/database/database.module'
import { EducationLevel, zodiacEnum } from './user.interface'

export const getVerificationCodesBy = getSingleBy(VerificationCodes)

export const getUserBy = getSingleBy(Users)
export const getUsersBy = getManyBy(Users)

export async function getUserDetails(userId: string) {
  const sql = `
    SELECT
     *
    FROM
      "users" as "u"
    WHERE
      "u"."id" = $1`
  const [result] = await (await dataSource).query(sql, [userId])
  return result
}

export async function userFilterQuery(
  page: number,
  limit: number,
  fullName?: string,
  phone?: string,
  birthday?: string,
  religion?: string,
  height?: string,
  education?: EducationLevel,
  gender?: string,
  bio?: string,
  email?: string,
  zodiac?: zodiacEnum,
  smoke?: string,
  drink?: string
) {
  console.log(limit, page)
  const offsetCount = (page - 1) * limit
  let query = ``
  if (fullName) query += ` AND "u"."fullName" = '${fullName}'`
  if (phone) query += ` AND "u"."phone" = '${phone}'`
  if (birthday) query += ` AND "u"."birthday" = '${birthday}'`
  if (religion) query += ` AND "u"."religion" = '${religion}'`
  if (height) query += ` AND "u"."height" = '${height}'`
  if (education) query += ` AND "u"."education" = '${education}'`
  if (gender) query += ` AND "u"."gender" = '${gender}'`
  if (bio) query += ` AND "u"."bio" = '${bio}'`
  if (email) query += ` AND "u"."email" = '${email}'`
  if (zodiac) query += ` AND "u"."zodiac" = '${zodiac}'`
  if (smoke) query += ` AND "u"."smoke" = '${smoke}'`
  if (drink) query += ` AND "u"."drink" = '${drink}'`
  const sql = `
    SELECT
     *
    FROM
      "users" as "u"
    WHERE
      "u"."deleted" = $1
      ${query}
    LIMIT $2 OFFSET $3`
  const result = await (await dataSource).query(sql, [false, limit, offsetCount])
  console.log(sql)
  return result
}

export async function userFilterQueryCount(
  fullName?: string,
  phone?: string,
  birthday?: string,
  religion?: string,
  height?: string,
  education?: EducationLevel,
  gender?: string,
  bio?: string,
  email?: string,
  zodiac?: zodiacEnum,
  smoke?: string,
  drink?: string
) {
  let query = ``
  if (fullName) query += ` AND "u"."fullName" = '${fullName}'`
  if (phone) query += ` AND "u"."phone" = '${phone}'`
  if (birthday) query += ` AND "u"."birthday" = '${birthday}'`
  if (religion) query += ` AND "u"."religion" = '${religion}'`
  if (height) query += ` AND "u"."height" = '${height}'`
  if (education) query += ` AND "u"."education" = '${education}'`
  if (gender) query += ` AND "u"."gender" = '${gender}'`
  if (bio) query += ` AND "u"."bio" = '${bio}'`
  if (email) query += ` AND "u"."email" = '${email}'`
  if (zodiac) query += ` AND "u"."zodiac" = '${zodiac}'`
  if (smoke) query += ` AND "u"."smoke" = '${smoke}'`
  if (drink) query += ` AND "u"."drink" = '${drink}'`
  const sql = `
    SELECT
    count(*) as count
    FROM
      "users" as "u"
    WHERE
      "u"."deleted" = $1
      ${query}`
  const [result] = await (await dataSource).query(sql, [false])

  return result?.count || 0
}

export async function getUserFind(phone: string) {
  const sql = `
    SELECT
     *
    FROM
      "users" as "u"
    WHERE
      "u"."id" = $1`
  const [result] = await (await dataSource).query(sql, [phone])
  return result
}
