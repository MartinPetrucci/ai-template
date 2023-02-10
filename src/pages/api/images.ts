import openai from "@/openai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
  const prompt = req.body.prompt;
  try {
    console.log({ prompt });
    const response = await openai.createImage({
      prompt,
      n: 4,
      size: "256x256",
    });
    const image_url = response.data.data[0].url;
    console.log(response.data.data);
    res.status(200).json({ images: response.data.data });
  } catch (error) {
    console.log("hubo un error", error.message);
    res.status(500).end();
  }
}
