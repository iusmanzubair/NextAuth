"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { SettingsSchema } from "@/Schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { CurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const Settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await CurrentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) return { error: "Unauthorized!" };

  if (user.isOAuth) {
    values.password = undefined;
    values.newPassword = undefined;
    values.email = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id)
      return { error: "Email already in use!" };

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) return { error: "Incorrect Password!" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: "Settings Updated!" };
};
