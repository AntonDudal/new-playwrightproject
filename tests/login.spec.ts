import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../dto/login-dto'

test('should return token with correct username and password', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  const jwtValue = await response.text()
  const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.OK)
  expect(jwtValue).toMatch(jwtRegex)
})

test('should not return token with incorrect username and password', async ({ request }) => {
  const requestBody = new LoginDto('antonduda', 'whe7s5qbYbfT2n')
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('should not return token with incorrect HTTP method GET', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()
  const response = await request.get('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('should not return token with incorrect HTTP method PUT', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()
  const response = await request.put('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('should not return token with incorrect body structure only username', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()
  const incorrectBody = { username: requestBody.username }
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: incorrectBody,
  })
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('should not return token with incorrect body structure only password', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()
  const incorrectBody = { password: requestBody.password }
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: incorrectBody,
  })
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
