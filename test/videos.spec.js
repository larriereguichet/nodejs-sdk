const path = require('path');
const { expect } = require('chai');
const apiVideo = require('../lib');
const { ITEMS_TOTAL } = require('./api');

describe('Videos ressource', () => {
  describe('create', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const title = 'Video test';
    const properties = {
      description: 'Video test',
    };

    it('Does not throw', async () => {
      await client.videos.create(title, properties);
    });
  });


  describe('update', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const properties = {
      description: 'Video test 2',
      tag: ['test1', 'test2'],
    };

    it('Does not throw', async () => {
      await client.videos.update('vix1x1x1x1x1x1x1x1x1x', properties);
    });
  });

  describe('get', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });

    it('Does not throw', async () => {
      await client.videos
        .get('vix1x1x1x1x1x1x1x1x1x');
    });

    it('Returns a video', async () => {
      const video = await client.videos.get('vix1x1x1x1x1x1x1x1x1x');
      expect(video).to.have.property('videoId');
    });
  });

  describe('getStatus', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });

    it('Does not throw', async () => {
      await client.videos.getStatus('vix1x1x1x1x1x1x1x1x1x');
    });
  });

  describe('Search with parameters (currentPage, pageSize)', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const parameters = {
      currentPage: 1,
      pageSize: 25,
    };

    it('Retrieves only specified page ', async () => {
      const videos = await client.videos.search(parameters);
      expect(videos).to.be.an.instanceOf(Array);
      expect(videos).to.have.lengthOf(parameters.pageSize);
    });
  });

  describe('Search without parameters', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const parameters = {};

    it('Retrieves all pages ', async () => {
      const videos = await client.videos.search(parameters);
      expect(videos).to.be.an.instanceOf(Array);
      expect(videos).to.have.lengthOf(ITEMS_TOTAL);
    });
  });

  describe('Download', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const source = 'https://www.example.com/video.mp4';
    const title = 'Video test';
    const properties = {
      description: 'Video test',
    };

    it('Does not throw', async () => {
      await client.videos.download(source, title, properties);
    });
  });

  describe('Upload', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const source = path.join(__dirname, 'data/small.webm');
    const videoId = 'vix1x1x1x1x1x1x1x1x1x';

    it('Does not throw', async () => {
      await client.videos.upload(source, {}, videoId);
    });
  });

  describe('Upload thumbnail', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const source = path.join(__dirname, 'data/test.png');
    const videoId = 'vix1x1x1x1x1x1x1x1x1x';

    it('Does not throw', async () => {
      await client.videos.uploadThumbnail(source, videoId);
    });
  });

  describe('makePublic', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const properties = {
      public: true,
    };

    it('Does not throw', async () => {
      await client.videos.makePublic('vix1x1x1x1x1x1x1x1x1x');
    });
  });

  describe('makePrivate', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });

    it('Does not throw', async () => {
      await client.videos.makePrivate('vix1x1x1x1x1x1x1x1x1x');
    });
  });

  describe('updateThumbnailWithTimecode', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });
    const properties = {
      timecode: '00:10:05.02',
    };

    it('Does not throw', async () => {
      await client.videos.updateThumbnailWithTimecode('vix1x1x1x1x1x1x1x1x1x', '00:10:05.02');
    });
  });


  describe('delete', () => {
    const client = new apiVideo.Client({ apiKey: 'test' });

    it('Does not throw', async () => {
      await client.videos.delete('vix1x1x1x1x1x1x1x1x1x');
    });
  });


  describe('cast', () => {
    it('Should return video object', () => {
      const client = new apiVideo.Client({ apiKey: 'test' });
      const data = {
        videoId: 'vix1x1x1x1x1x1x1x1x1x',
        title: 'Video test',
        description: 'Video test',
        public: true,
        panoramic: false,
        mp4Support: false,
        tags: [],
        metadata: [],
        source: {
          type: 'upload',
          uri: '/videos/vix1x1x1x1x1x1x1x1x1x/source',
        },
        publishedAt: '2019-01-01T00:00:00+02:00',
        assets: {
          iframe: '<iframe src="https://embed.api.video/vod/vix1x1x1x1x1x1x1x1x1x" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen=""></iframe>',
          player: 'https://embed.api.video/vod/vix1x1x1x1x1x1x1x1x1x',
          hls: 'https://cdn.api.video/vod/vix1x1x1x1x1x1x1x1x1x/hls/manifest.m3u8',
          thumbnail: 'https://cdn.api.video/vod/vix1x1x1x1x1x1x1x1x1x/thumbnail.jpg',
        },
      };
      const video = client.videos.cast(data);
      expect(video).to.deep.equal(data);
    });
  });

  describe('castStatus', () => {
    it('Should return videoStatus object', () => {
      const client = new apiVideo.Client({ apiKey: 'test' });
      const data = {
        ingest: {
          status: 'uploaded',
          filesize: 273579401,
          receivedBytes: [
            {
              to: 134217727,
              from: 0,
              total: 273579401,
            },
            {
              to: 268435455,
              from: 134217728,
              total: 273579401,
            },
            {
              to: 273579400,
              from: 268435456,
              total: 273579401,
            },
          ],
        },
        encoding: {
          playable: true,
          qualities: [
            {
              quality: '360p',
              status: 'encoded',
            },
            {
              quality: '480p',
              status: 'encoded',
            },
            {
              quality: '720p',
              status: 'encoded',
            },
            {
              quality: '1080p',
              status: 'encoding',
            },
            {
              quality: '2160p',
              status: 'waiting',
            },
          ],
          metadata: {
            width: 424,
            height: 240,
            bitrate: 411.218,
            duration: 4176,
            framerate: 24,
            samplerate: 48000,
            videoCodec: 'h264',
            audioCodec: 'aac',
            aspectRatio: '16/9',
          },
        },
      };
      const videoStatus = client.videos.castStatus(data);
      expect(videoStatus).to.deep.equal(data);
    });
  });
});
