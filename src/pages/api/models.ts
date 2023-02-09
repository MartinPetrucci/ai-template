import { NextApiRequest, NextApiResponse } from "next";
import openai from "@/openai";
export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await openai.listModels();
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong..." });
  }
}
