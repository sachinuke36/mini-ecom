"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = addProduct;
exports.smartSearch = smartSearch;
exports.getProducts = getProducts;
const db_config_1 = require("../db/db.config");
const openai_1 = require("../lib/openai");
const cosine_1 = require("../lib/cosine");
async function addProduct(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }
    try {
        const { name, price, description, userId } = req.body;
        const file = req.file;
        const imageUrl = file.path;
        const user = await db_config_1.prisma.user.findUnique({
            where: { userId },
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found. Invalid userId.' });
        }
        let embedding = null;
        try {
            const embeddingResponse = await openai_1.openai.embeddings.create({
                model: "text-embedding-3-small",
                input: description,
            });
            embedding = embeddingResponse.data[0].embedding;
        }
        catch (error) {
            console.warn("Embedding generation failed, proceeding without it:", error.message);
        }
        const product = await db_config_1.prisma.product.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding product' });
    }
}
async function smartSearch(req, res) {
    const { query } = req.body;
    try {
        const embeddingResponse = await openai_1.openai.embeddings.create({
            model: "text-embedding-3-small",
            input: query,
        });
        const queryEmbedding = embeddingResponse.data[0].embedding;
        const products = await db_config_1.prisma.product.findMany({
            where: { embedding: { not: null } },
        });
        const ranked = products
            .map(product => {
            const productEmbedding = JSON.parse(product.embedding || "[]");
            const score = (0, cosine_1.cosineSimilarity)(queryEmbedding, productEmbedding);
            return { ...product, score };
        })
            .sort((a, b) => b.score - a.score);
        res.json(ranked.slice(0, 10));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Smart search failed' });
    }
}
async function getProducts(req, res) {
    const userId = req.params.userId;
    if (!userId)
        return res.json({ message: 'Please login!' });
    const products = await db_config_1.prisma.product.findMany({ where: { addedBy: userId } });
    return res.status(201).json(products);
}
//# sourceMappingURL=product.controller.js.map