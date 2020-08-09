# Majestic Art

## Overview

Majestic Art is a full-stack eCommerce application for selling unique pieces of art.

### Features

- User registration and login
- Admin dashboard for managing products & orders
- Shopping cart
- Stripe integration for product checkout
- Email notifications for order updates

### Technologies

- Visual Studio 2019 / Visual Studio Code
- ASP.NET Core
- Angular
- SQL Server with Entity Framework Core

## Getting Started

### Stripe

1. Sign up for a [Stripe](https://stripe.com/) account
2. Locate your API keys in the dashboard under Developers > API Keys
3. In `appsettings.json` replace the publishable and secret keys with your own

### Stripe CLI

1. Download and install the [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Follow the instructions to login to the CLI with your Stripe account
3. Run the following command in the directory containing the CLI tool to listen to webhook events:

> stripe.exe listen --forward-to <https://localhost:44301/api/stripewebhook>

4. In `appsettings.json` replace the webhook secret in the Stripe section with the one from the CLI

### Server

1. Open solution in Visual Studio 2019
2. In Package Manager Console run `Update-Database` to apply database migrations

### Client

1. Open `ClientApp` directory in Visual Studio Code
2. Run `npm install` in terminal to install dependencies

## Running the Application

In Visual Studio 2019 start the application with the local IIS Express server.
The first time it runs it will seed the database with the following user data you can use to login (username, password):

- Admin account: john.doe@gmail.com, Passwd@1
- User account: will.smith@gmail.com, Passwd@1

Once started it will automatically open the application in the browser.
