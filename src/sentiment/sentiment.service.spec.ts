import { Test, TestingModule } from '@nestjs/testing';
import { SentimentAnalysisService } from './sentiment.service';
import axios from 'axios';

// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SentimentAnalysisService', () => {
  let service: SentimentAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentAnalysisService],
    }).compile();

    service = module.get<SentimentAnalysisService>(SentimentAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyzeSentiment', () => {
    it('should return sentiment analysis results', async () => {
      const mockText = 'Maybe a short walk. I’ll try that.';
      const mockResponse = {
        data: {
          documentSentiment: {
            score: 0.8,
            magnitude: 0.9,
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await service.analyzeSentiment(mockText);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining(
          'https://language.googleapis.com/v1/documents:analyzeSentiment?key=',
        ),
        {
          document: {
            content: mockText,
            type: 'PLAIN_TEXT',
          },
        },
      );

      expect(result).toEqual({
        score: 0.8,
        magnitude: 0.9,
      });
    });

    it('should throw an error if the API call fails', async () => {
      const mockText = 'An example text.';
      const mockError = new Error('API Error');

      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(service.analyzeSentiment(mockText)).rejects.toThrow(
        'Failed to analyze sentiment',
      );
    });
  });
});
