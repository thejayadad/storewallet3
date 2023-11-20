import db from "@/lib/db";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET(req){
    await db.connect()
    try {
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        const stats = {
            productCount,
            userCount        
        }
        return new Response(JSON.stringify(stats), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}