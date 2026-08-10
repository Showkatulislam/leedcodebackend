import { UserRepository } from "./modules/users/user.repository.js";

async function main(){
    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail("example@example.com");
    console.log(user);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})