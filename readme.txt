| Scenario name | Status |
|--------------|------------------|
| GET log in with correct username and password | 200 OK |
| GET log in with missing username | 500 Internal Server Error |
| GET log in with missing password | 500 Internal Server Error |
| GET log in with missing username and password | 500 Internal Server Error |
| PUT order with valid ID 1 and valid API key | 200 OK |
| PUT order with valid ID 2 and invalid API key with more than 16 digits | 401 Unauthorized |
| PUT order with valid ID 3 and invalid API key with less than 16 digits | 401 Unauthorized |
| PUT order with valid ID 4 and invalid API key with non-digits symbols | 401 Unauthorized |
| PUT order with valid ID 10 and missing API key | 400 Bad request |
| PUT order with missing ID and missing API key | 400 Bad request |
| PUT order with invalid ID 11 and valid API key | 400 Bad request |
| PUT order with invalid ID 0 and valid API key | 400 Bad request |
| PUT order with invalid ID 0 and invalid API key with more than 16 digits | 400 Bad request |
| DELETE order with valid ID 1 and valid API key | 204 No content |
| DELETE order with valid ID 2 and invalid API key with more than 16 digits | 401 Unauthorized |
| DELETE order with valid ID 3 and invalid API key with less than 16 digits | 401 Unauthorized |
| DELETE order with valid ID 4 and invalid API key with non-digits symbols | 401 Unauthorized |
| DELETE order with valid ID 10 and missing API key | 400 Bad request |
| DELETE order with missing ID and missing API key | 400 Bad request |
| DELETE order with invalid ID 11 and valid API key | 400 Bad request |
