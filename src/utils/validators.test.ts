import { z } from "zod";
import { password_validator } from "~/utils/validators";

it("should ensure secure password", () => {
  const value = password_validator.safeParse("WorkMany25@");

  expect(value.success).toBe(true);
});

it("should validate password match", () => {
  const schema = z.object({
    password: password_validator,
    confirm_password: password_validator,
  });

  expect(schema.safeParse({ password: "WorkMany25@" }).success).toBe(false);
  expect(
    schema.safeParse({
      password: "WorkMany25@",
      confirm_password: "WorkMany25",
    }).success,
  ).toBe(false);
  expect(
    schema.safeParse({
      password: "WorkMany25@",
      confirm_password: "WorkMany25",
    }).success,
  ).toBe(false);
  expect(
    schema.safeParse({
      password: "WorkMany25@",
      confirm_password: "WorkMany25@",
    }).success,
  ).toBe(true);
});
