import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { address, pincode, email } = req.body;
    const userId = Number(req.body.userId);

    console.log("Update profile called with:", {
      address,
      pincode,
      email,
      userId,
    });
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    console.log("Existing user:", existingUser);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Check uniqueness if adding email first time
    if (!existingUser.email && email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        address,
        pincode,
        email: existingUser.email ? undefined : email,
      },
    });

    console.log("Updated user:", updatedUser);

    return res.json({ user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({ error: "Profile update failed" });
  }
};
