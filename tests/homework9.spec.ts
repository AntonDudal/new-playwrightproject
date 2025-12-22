import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

//GET
test('GET login with correct username and password | 200 OK |', async ({ request }) => {
  const loginParams = {
    username: 'username1',
    password: 'password1',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: loginParams,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('GET login with missing username | 500 Internal Server Error |', async ({ request }) => {
  const loginParams = {
    username: 'username1'
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: loginParams,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})


test('GET login with missing password | 500 Internal Server Error |', async ({ request }) => {
  const loginParams = {
    password: 'password1'
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: loginParams,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})


test('GET login with missing username and password | 500 Internal Server Error |', async ({ request }) => {
  const loginParams = {
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: loginParams,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

//PUT
test('PUT order with valid ID 1 and valid API key | 200 OK |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 1,
  }
  const requestHeaders = {
    api_key: '1234567891234567',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT order with valid ID 2 and invalid API key with more than 16 digits | 401 Unauthorized |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 2,
  }
  const requestHeaders = {
    api_key: '12345678912345671',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT order with valid ID 3 and invalid API key with less than 16 digits | 401 Unauthorized |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 3,
  }
  const requestHeaders = {
    api_key: '123456789123456',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT order with valid ID 4 and invalid API key with non-digits symbols | 401 Unauthorized |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 4,
  }
  const requestHeaders = {
    api_key: 'asdfghjklzxcvbnm',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/4', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT order with valid ID 10 and missing API key | 401 Unauthorized |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 10,
  }
  const requestHeaders = {}
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})


test('PUT order with missing ID and missing API key | 400 Bad request |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test'
  }
  const requestHeaders = {

  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})


test('PUT order with invalid ID 11 and valid API key | 400 Bad request |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 11,
  }
  const requestHeaders = {
    api_key: '1234567891234567',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})


test('PUT order with invalid ID 0 and valid API key | 400 Bad request |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 0,
  }
  const requestHeaders = {
    api_key: '1234567891234567',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/0', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})


test('PUT order with invalid ID 0 and invalid API key with more than 16 digits | 400 Bad request |', async ({ request, }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: 'Smith',
    comment: 'test',
    id: 0,
  }
  const requestHeaders = {
    api_key: '1234567891234564567',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/0', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})


//DELETE
test('DELETE order with valid ID 1 and valid API key | 204 No content |', async ({ request, }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '1234567891234567',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('DELETE order with valid ID 2 and invalid API key with more than 16 digits | 401 Unauthorized |', async ({ request, }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '1234567891234567123',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('DELETE order with valid ID 3 and invalid API key with less than 16 digits | 401 Unauthorized |', async ({ request, }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '12334567',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/3', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('DELETE order with valid ID 4 and invalid API key with non-digits symbols | 401 Unauthorized |', async ({ request, }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '123sgfdrgf7',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/4', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})


test('DELETE order with valid ID 5 and missing API key | 400 Bad request |', async ({ request, }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5')
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('DELETE order with invalid ID 11 and valid API key | 400 Bad request |', async ({ request, }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '1234567891234567',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/11', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

