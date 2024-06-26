# Telegram API Package for Node.js

[![npm version](https://badge.fury.io/js/telegram-api-package.svg)](https://badge.fury.io/js/telegram-api-package)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Node.js package for interacting with the Telegram Bot API. Easily send messages, photos, documents, and more using this library.

## Installation

Install the package via npm:

```bash
npm install telegram-api-package
```

# Usage

```bash
const TelegramBot = require('telegram-api-package');

// Initialize your bot with the token
const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN');

// Example: Sending a message
bot.sendMessage('123456789', 'Hello from your Telegram bot!')
  .then(response => {
    console.log('Message sent:', response);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
```
# Features

-   Send text messages
-   Send photos
-   Send documents
-   Send locations
-   Edit message text
-   Delete messages


# API Documentation

For detailed API documentation, refer to the Telegram Bot API Documentation.

# Contributing

Contributions are welcome! Please read the Contributing Guidelines first.

# License

This project is licensed under the MIT License - see the LICENSE file for details.