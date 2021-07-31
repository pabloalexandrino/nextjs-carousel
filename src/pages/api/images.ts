// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  image: string;
}

const images: Data[] = [
  { image: 'https://picsum.photos/500/500' },
  { image: 'https://picsum.photos/500/500' },
  { image: 'https://picsum.photos/500/500' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json(images);
}
