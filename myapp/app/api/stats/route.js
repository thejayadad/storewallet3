import db from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req){
    await db.connect()
    try {
        const productCount = await Product.countDocuments();
        const stats = {
            productCount,
        
        }
        return new Response(JSON.stringify(stats), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}