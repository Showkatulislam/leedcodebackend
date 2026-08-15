import { comparePassword, hashPassword } from "../shared/utils/password.js";

async function main() {
  const password = "MyPassword123";

  const hashedPassword = await hashPassword(password);

  console.log("Original:", password);
  console.log("Hash:", hashedPassword);

  const valid = await comparePassword(password, hashedPassword);

  console.log("Correct password:", valid);

  const invalid = await comparePassword("WrongPassword", hashedPassword);

  console.log("Wrong password:", invalid);
}

main().catch(console.error);
