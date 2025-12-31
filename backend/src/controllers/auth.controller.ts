import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, mobile, password, email } = req.body;
    const role = "farmer";
    if (!name || !mobile || !password) {
      return res.status(400).json({
        error: "Name, mobile and password are required",
      });
    }
    const existing = await prisma.user.findUnique({ where: { mobile } });
    if (existing)
      return res.status(400).json({ error: "Mobile already registered" });
    console.log("come to backend");
    if (!password || password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long",
      });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        error: "Mobile number must be exactly 10 digits",
      });
    }
    if (email) {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
          error: "Invalid email address",
        });
      }
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ error: "Email already registered" });
      }
    }
    console.log("backend email: ", email, password, name, mobile);
    // const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        name,
        mobile,
        email: email || null,
        password,
      },
    });

    // const token = signJwt({ userId: user.id, mobile: user.mobile });
    // res.json({
    //   user: {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name,
    //     mobile: user.mobile,
    //     role: user.role,
    //   },
    //   token,
    // });
    res.status(201).json({
      message: "Registration successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
  //   return res.status(201).json({
  //     message: "Registration successful",
  //   });
  // } catch (err: any) {
  //   if (err.code === "P2002") {
  //     return res.status(400).json({
  //       error: "Mobile or email already exists",
  //     });
  //   }

  //   return res.status(500).json({ error: "Server error" });
  // }
};

export const login = async (req: Request, res: Response) => {
  console.log("inside login of auth controller");
  try {
    const { username, password } = req.body;
    console.log("login backend : ", username, password);
    // const user = await prisma.user.findUnique({ where: { email } });
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { mobile: username }],
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    console.log("user: ", user);
    //const ok = await bcrypt.compare(password, user.password);
    const ok = password === user.password;
    console.log("ok: ", ok);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signJwt({ userId: user.id, email: user.email });
    console.log("token: ", token);
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
      userId: user.id,
    });
    console.log("login successfully......");
    return user.id;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    // JWT is stateless – nothing to destroy on server
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
