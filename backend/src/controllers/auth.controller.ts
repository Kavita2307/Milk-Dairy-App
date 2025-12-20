import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });
    console.log("come to backend");
    console.log("backend email: ", email, password, name);
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, password: hash, name },
    });

    const token = signJwt({ userId: user.id, email: user.email });
    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("inside login of auth controller");
  try {
    const { email, password } = req.body;
    console.log("login backend email: ", email, password);
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("user: ", user);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = (await password) === user.password;
    // const ok = await bcrypt.compare(password, user.password);
    console.log("ok: ", ok);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signJwt({ userId: user.id, email: user.email });
    console.log("token: ", token);
    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
      userId: user.id,
    });
    console.log("login successfully......");
    // return user.id;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
