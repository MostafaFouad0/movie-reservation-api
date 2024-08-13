const express = require("express");
const app = express();
app.use(express.json());
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
