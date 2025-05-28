import { Request, Response } from "express";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import { prisma } from "../db/db.config";
import {ai} from '../lib/openai'
import {cosineSimilarity} from '../lib/cosine'

export async function addProduct(req: Request, res: Response):Promise<any>{
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const { name, price, description, userId } = req.body;
    const file = req.file as Express.Multer.File & { secure_url?: string };
    const imageUrl = file.path; 
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Invalid userId.' });
    }
            let embedding: number[] | undefined = []
        try {
            const embeddingResponse = await ai.models.embedContent({
                model:'gemini-embedding-exp-03-07',
                contents: description,
                config: {
                    taskType: "RETRIEVAL_QUERY",
                }
            });
                 embedding = embeddingResponse.embeddings?.[0]?.values;
                console.log("embeddingResponse: ",embeddingResponse)
                console.log("embeding: ",embedding)
        } catch (error:any) {
                console.warn("Embedding generation failed, proceeding without it:", error.message);
        }
        const product = await prisma.product.create({
          data: {
            name,
            price: parseFloat(price),
            description,
            imageUrl, 
            addedBy: userId,
            embedding: JSON.stringify(embedding)
          },
        });

     

    // Send back the product data, including image URL
    res.status(201).json({
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
}


export async function smartSearch(req: Request, res: Response):Promise<any> {
  const { query } = req.body;

  try {
    const embeddingResponse = await ai.models.embedContent({
      model: "gemini-embedding-exp-03-07",
      contents: query,
        config: {
            taskType: "RETRIEVAL_QUERY",
        }
    });

const queryEmbedding = embeddingResponse.embeddings?.[0]?.values;

    const products = await prisma.product.findMany({
      where: { embedding: { not: null } },
    });

    const ranked = products
  .map(product => {
    let productEmbedding: number[] = [];

    try {
      const parsed = JSON.parse(product.embedding || "[]");
      if (Array.isArray(parsed) && typeof parsed[0] === "number") {
        productEmbedding = parsed;
      }
    } catch (e) {
      console.warn("Failed to parse embedding for product:", product.id);
    }

    const score =
      queryEmbedding && productEmbedding.length
        ? cosineSimilarity(queryEmbedding, productEmbedding)
        : 0;

    return { ...product, score };
  })
  .filter(product => product.score > 0) // Optional: remove completely irrelevant items
  .sort((a, b) => b.score - a.score);

    return res.json(ranked.slice(0, 10)); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Smart search failed' });
  }
}


export async function getProducts(req: Request, res: Response):Promise<any>{
    const userId = req.params.userId as string
    if(!userId) return res.json({message: 'Please login!'});
    const products = await prisma.product.findMany({where: {addedBy: userId}});
   return res.status(201).json(products)
}
