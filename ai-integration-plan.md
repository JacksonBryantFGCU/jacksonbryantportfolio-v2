# AI Integration Plan

## Goal
Enable users to ask questions like:
> "Which of Jackson's projects involve backend work?"

## Tools
- LangChain (text loader, embedding)
- OpenAI embeddings
- Vector DB: Chroma or Pinecone
- API route to serve LangChain responses

## Flow
1. Load portfolio content
2. Embed and store vectors
3. Use LangChain QA chain to answer
