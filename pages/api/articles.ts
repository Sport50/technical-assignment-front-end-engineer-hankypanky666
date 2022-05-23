import { NextApiRequest, NextApiResponse } from "next";
import db from "../../src/firebase";
import striptags from "striptags";

type Data = {
  success: boolean;
  error?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "POST") {
      const { body } = req;
      const data = {
        title: striptags(body.title),
        bodyText: striptags(body.bodyText, ["br"]),
        email: striptags(body.email),
        dateCreated: new Date(),
      };
      const articleRef = db.collection("articles").doc();
      const response = await articleRef.set(data);

      return res.status(200).json({ success: true, data: response });
    }

    if (req.method === "GET") {
      const articles = await db.collection("articles").get();
      const articlesData = articles.docs.map((article) => article.data());

      return res.status(200).json({ success: true, data: articlesData });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (e) {
    return res.status(500).end();
  }
}
