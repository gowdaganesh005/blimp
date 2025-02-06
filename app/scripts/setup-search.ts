import { setupQueryCapabilites } from "@/prisma/SearchUsers";

async function runSetup(){
    await setupQueryCapabilites()
    console.log('search capabilites added')
}

runSetup().catch(console.error)