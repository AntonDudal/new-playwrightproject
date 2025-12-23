import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanDto } from '../dto/loan-dto'

test('POST request to loan calculation decision for negative decision with very high risk', async ({ request }) => {
  const requestBody = LoanDto.createHighRiskRequest()
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskDecision).toBe('negative')
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
})

test('POST request to loan calculation decision for positive decision with medium risk', async ({ request }) => {
  const requestBody = LoanDto.createMediumRiskRequest()
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
})

test('POST request to loan calculation decision for positive decision with low risk', async ({ request }) => {
  const requestBody = LoanDto.createLowRiskRequest()
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
})