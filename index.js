const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class TelegramBot {
  constructor(token) {
    this.token = token;
    this.apiUrl = `https://api.telegram.org/bot${token}`;
  }

  async sendMessage(chatId, text) {
    try {
      const response = await axios.post(`${this.apiUrl}/sendMessage`, {
        chat_id: chatId,
        text: text
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }
  async sendMultipleMessage(chatIds, text) {
    if (!Array.isArray(chatIds)) {
      chatIds = [chatIds]; // Ensure chatIds is an array
    }

    const results = [];
    for (const chatId of chatIds) {
      try {
        const response = await axios.post(`${this.apiUrl}/sendMessage`, {
          chat_id: chatId,
          text: text
        });
        results.push({ chatId, status: 'success', response: response.data });
      } catch (error) {
        results.push({ chatId, status: 'error', error: error.message });
      }
    }
    return results;
  }

  async setWebhook(url) {
    try {
      const response = await axios.post(`${this.apiUrl}/setWebhook`, {
        url: url
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to set webhook: ${error.message}`);
    }
  }

  async deleteWebhook() {
    try {
      const response = await axios.post(`${this.apiUrl}/deleteWebhook`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete webhook: ${error.message}`);
    }
  }

  async sendPhoto(chatId, photoPath, caption = '') {
    try {
      // Load the photo file
      const photo = fs.createReadStream(photoPath);
      
      // Create form data to send as multipart/form-data
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('photo', photo);
      formData.append('caption', caption);

      // Make POST request to Telegram API
      const response = await axios.post(`${this.apiUrl}/sendPhoto`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Return the response data
      return response.data;
    } catch (error) {
      // Handle error
      throw new Error(`Failed to send photo: ${error.message}`);
    }
  }
  async sendDocument(chatId, documentPath, caption = '') {
    try {
      // Load the document file
      const document = fs.createReadStream(documentPath);
      
      // Create form data to send as multipart/form-data
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('document', document);
      formData.append('caption', caption);

      // Make POST request to Telegram API
      const response = await axios.post(`${this.apiUrl}/sendDocument`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Return the response data
      return response.data;
    } catch (error) {
      // Handle error
      throw new Error(`Failed to send document: ${error.message}`);
    }
  }

  async sendLocation(chatId, latitude, longitude) {
    try {
      const response = await axios.post(`${this.apiUrl}/sendLocation`, {
        chat_id: chatId,
        latitude: latitude,
        longitude: longitude
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to send location: ${error.message}`);
    }
  }

  async editMessageText(chatId, messageId, newText) {
    try {
      const response = await axios.post(`${this.apiUrl}/editMessageText`, {
        chat_id: chatId,
        message_id: messageId,
        text: newText
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to edit message text: ${error.message}`);
    }
  }

  async deleteMessage(chatId, messageId) {
    try {
      const response = await axios.post(`${this.apiUrl}/deleteMessage`, {
        chat_id: chatId,
        message_id: messageId
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete message: ${error.message}`);
    }
  }

}

module.exports = TelegramBot;
