export interface FileProps {
  id: number;
  name: string;
  info: {
    cid: string;
    description: string;
    ext: string;
    file_name: string;
    public_hash: string;
    size: string;
    thumbnail: string;
  };

  content_stats: {
    likes_cnt: number;
    downloads_cnt: 0;
    rate: number;
  };
}
