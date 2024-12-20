import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import SentimentDto from './dto/sentiment.dto';
import { log, error } from 'console';

@Injectable()
export class SentimentAnalysisService {
  private readonly API_KEY = process.env.API_KEY; // Replace with your Google Cloud API key
  private readonly API_URL = `https://language.googleapis.com/v1/documents:analyzeSentiment`;

  async analyzeSentiment(text: string): Promise<SentimentDto> {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    try {
      const response = await axios.post(`${this.API_URL}?key=${this.API_KEY}`, {
        document,
      });

      log('Analyzing sentiment for:', text);
      log('Sentiment:', response.data.documentSentiment);

      const sentiment = response.data.documentSentiment;
      return {
        score: sentiment.score,
        magnitude: sentiment.magnitude,
      };
    } catch (err) {
      error('ERROR:', err.response ? err.response.data : err.message);
      throw new HttpException(
        'Failed to analyze sentiment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
