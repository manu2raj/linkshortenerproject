---
description: Read this file to understand how to fetch data in the project.
---

# Data Fetching Guidelines

This document outline the best practices and guidelines for fetching data in our Next.js project. Adhering to these guidelines will ensure consistency, maintainability, and performance across the application.

## 1. Use server components for data fetching

In Next.js's, ALWAYS use server components to fetch data. Server components allow you to fetch data on the server side, which can improve performance and reduce the amount of JavaScript sent to the client. NEVER use client components for data fetching.

## 2. Data fetching methods

ALWAYS use the helper functions in the /data folder to fetch data. Never fetch data directly in your components. This separation of concerns helps keep your components clean and focused on rendering UI, while the data fetching logic is centralized in one place.

All helper functions in the /data folder should use DRIZZEL ORM to interact with the database.
