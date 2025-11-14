# CoWork Kerala Admin Panel API Documentation

Version: 1.0.0

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URLs](#base-urls)
- [Common Headers](#common-headers)
- [Error Handling](#error-handling)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication-endpoints)
  - [Spaces Management](#spaces-management)
  - [Lead Management](#lead-management)
  - [Settings](#settings-endpoints)

---

## Overview

This API documentation covers all endpoints required for the CoWork Kerala Admin Panel. The API follows RESTful conventions and returns JSON responses.

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {your-jwt-token}
```

Tokens are obtained through the `/auth/login` endpoint and are valid for 24 hours.

## Base URLs

- **Production**: `https://api.coworkkerala.com/v1`
- **Development**: `http://localhost:3000/api/v1`

## Common Headers

All requests should include:

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token} (for protected routes)
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error response format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

---

## API Endpoints

## Authentication Endpoints

### Login

Authenticate admin user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "admin@coworkkerala.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "admin@coworkkerala.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

### Logout

Logout current admin user and invalidate token.

**Endpoint:** `POST /auth/logout`

**Headers:** Requires authentication

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Spaces Management

### Get All Spaces

Retrieve a paginated list of all coworking spaces.

**Endpoint:** `GET /spaces`

**Headers:** Requires authentication

**Query Parameters:**

| Parameter | Type   | Default | Description                        |
| --------- | ------ | ------- | ---------------------------------- |
| page      | number | 1       | Page number                        |
| limit     | number | 10      | Items per page                     |
| status    | string | -       | Filter by status (active/inactive) |
| city      | string | -       | Filter by city                     |
| search    | string | -       | Search in name                     |

**Example Request:**

```
GET /spaces?page=1&limit=10&status=active&city=Kochi
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "SP-2025-001",
      "spaceName": "WorkHub Kochi",
      "spaceType": "Coworking Space",
      "city": "Kochi",
      "spaceCategory": "Premium",
      "shortDescription": "Modern coworking space in the heart of Kochi",
      "status": "active",
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "totalPages": 3
  }
}
```

---

### Get Space by ID

Retrieve detailed information about a specific space.

**Endpoint:** `GET /spaces/{id}`

**Headers:** Requires authentication

**URL Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | Space ID    |

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "SP-2025-001",
    "spaceName": "WorkHub Kochi",
    "spaceType": "Coworking Space",
    "city": "Kochi",
    "spaceCategory": "Premium",
    "shortDescription": "Modern coworking space",
    "longDescription": "A fully equipped modern coworking space with all amenities...",
    "amenities": [
      "High-speed WiFi",
      "Meeting Rooms",
      "Printing Services",
      "Cafeteria"
    ],
    "pricing": {
      "hotDesk": 5000,
      "dedicatedDesk": 8000,
      "privateOffice": 25000
    },
    "location": {
      "address": "MG Road, Kochi, Kerala",
      "pincode": "682001",
      "latitude": 9.9312,
      "longitude": 76.2673
    },
    "contact": {
      "name": "John Doe",
      "email": "workhub@example.com",
      "phone": "+91 98765 43210"
    },
    "status": "active",
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "error": {
    "code": "SPACE_NOT_FOUND",
    "message": "Space with ID SP-2025-001 not found"
  }
}
```

---

### Create New Space

Create a new coworking space listing.

**Endpoint:** `POST /spaces`

**Headers:** Requires authentication

**Request Body:**

```json
{
  "spaceName": "WorkHub Kochi",
  "spaceType": "Coworking Space",
  "city": "Kochi",
  "spaceCategory": "Premium",
  "shortDescription": "Modern coworking space in the heart of Kochi",
  "longDescription": "A fully equipped modern coworking space with all amenities including high-speed internet, meeting rooms, and more.",
  "amenities": [
    "High-speed WiFi",
    "Meeting Rooms",
    "Printing Services",
    "Cafeteria",
    "Parking"
  ],
  "pricing": {
    "hotDesk": 5000,
    "dedicatedDesk": 8000,
    "cabinSeat": 12000
  },
  "location": {
    "address": "MG Road, Kochi, Kerala",
    "pincode": "682001",
    "latitude": 9.9312,
    "longitude": 76.2673
  },
  "contact": {
    "name": "John Doe",
    "email": "workhub@example.com",
    "phone": "+91 98765 43210"
  },
  "status": "active"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "SP-2025-025",
    "spaceName": "WorkHub Kochi",
    "spaceType": "Coworking Space",
    ...
  },
  "message": "Space created successfully"
}
```

**Validation Errors (400 Bad Request):**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "spaceName",
        "message": "Space name must be at least 3 characters"
      },
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

---

### Update Space

Update an existing coworking space.

**Endpoint:** `PUT /spaces/{id}`

**Headers:** Requires authentication

**URL Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | Space ID    |

**Request Body:** (Same as Create Space)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "SP-2025-001",
    ...
  },
  "message": "Space updated successfully"
}
```

---

### Delete Space

Delete a coworking space.

**Endpoint:** `DELETE /spaces/{id}`

**Headers:** Requires authentication

**URL Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | Space ID    |

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Space deleted successfully"
}
```

---

## Lead Management

### Get All Leads

Retrieve a paginated list of all leads.

**Endpoint:** `GET /leads`

**Headers:** Requires authentication

**Query Parameters:**

| Parameter | Type   | Default | Description                                               |
| --------- | ------ | ------- | --------------------------------------------------------- |
| page      | number | 1       | Page number                                               |
| limit     | number | 10      | Items per page                                            |
| status    | string | -       | Filter by status (new/contacted/qualified/converted/lost) |
| search    | string | -       | Search in name, email, or phone                           |

**Example Request:**

```
GET /leads?page=1&limit=10&status=new
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "LD-2025-001",
      "name": "Anjali Sharma",
      "email": "anjali.s@example.com",
      "phone": "0123 456 789",
      "enquiredFor": "WorkHub Kochi",
      "spaceType": "Hot Desk",
      "numberOfSeats": 5,
      "location": "Kochi",
      "message": "Looking for a flexible workspace for my startup team",
      "date": "2025-10-28",
      "status": "qualified",
      "createdAt": "2025-10-28T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 156,
    "totalPages": 16
  }
}
```

---

### Get Lead by ID

Retrieve detailed information about a specific lead.

**Endpoint:** `GET /leads/{id}`

**Headers:** Requires authentication

**URL Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | Lead ID     |

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "LD-2025-001",
    "name": "Anjali Sharma",
    "email": "anjali.s@example.com",
    "phone": "0123 456 789",
    "enquiredFor": "WorkHub Kochi",
    "spaceType": "Hot Desk",
    "numberOfSeats": 5,
    "location": "Kochi",
    "message": "Looking for a flexible workspace for my startup team",
    "date": "2025-10-28",
    "status": "qualified",
    "createdAt": "2025-10-28T14:30:00Z"
  }
}
```

---

### Create Lead

Create a new lead (typically from website inquiry form).

**Endpoint:** `POST /leads`

**Request Body:**

```json
{
  "name": "Anjali Sharma",
  "email": "anjali.s@example.com",
  "phone": "0123 456 789",
  "enquiredFor": "WorkHub Kochi",
  "spaceType": "Hot Desk",
  "numberOfSeats": 5,
  "location": "Kochi",
  "message": "Looking for a flexible workspace for my startup team"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "LD-2025-157",
    "name": "Anjali Sharma",
    ...
  },
  "message": "Lead created successfully"
}
```

---

### Update Lead Status

Update the status of a lead.

**Endpoint:** `PATCH /leads/{id}`

**Headers:** Requires authentication

**URL Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | Lead ID     |

**Request Body:**

```json
{
  "status": "contacted"
}
```

**Valid Status Values:**

- `new` - New lead
- `contacted` - Lead has been contacted
- `qualified` - Qualified lead
- `converted` - Converted to customer
- `lost` - Lead lost

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "LD-2025-001",
    "status": "contacted",
    ...
  },
  "message": "Lead status updated successfully"
}
```

---

### Delete Lead

Delete a lead from the system.

**Endpoint:** `DELETE /leads/{id}`

**Headers:** Requires authentication

**URL Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | Lead ID     |

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

## Settings Endpoints

### Update Password

Update the admin user's password.

**Endpoint:** `PUT /settings/password`

**Headers:** Requires authentication

**Request Body:**

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewSecurePassword456!"
}
```

**Password Requirements:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "Current password is incorrect"
  }
}
```

```json
{
  "success": false,
  "error": {
    "code": "WEAK_PASSWORD",
    "message": "New password does not meet security requirements",
    "details": [
      "Password must be at least 8 characters",
      "Password must contain at least one uppercase letter",
      "Password must contain at least one special character"
    ]
  }
}
```

---

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## Pagination

All list endpoints support pagination with the following query parameters:

- `page` (default: 1)
- `limit` (default: 10, max: 100)

Pagination metadata is included in all list responses:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 156,
    "totalPages": 16,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Webhooks

The API supports webhooks for real-time event notifications:

### Supported Events

- `lead.created` - New lead created
- `lead.status_changed` - Lead status updated
- `space.created` - New space created
- `space.updated` - Space updated
- `space.deleted` - Space deleted

### Webhook Payload Format

```json
{
  "event": "lead.created",
  "timestamp": "2025-10-28T14:30:00Z",
  "data": {
    "id": "LD-2025-157",
    "name": "Anjali Sharma",
    ...
  }
}
```

---

## Support

For API support or questions:

- Email: support@coworkkerala.com
- Documentation: https://docs.coworkkerala.com
- Status Page: https://status.coworkkerala.com

---

**Last Updated:** January 2025
**Version:** 1.0.0
