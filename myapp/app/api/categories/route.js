import db from "@/lib/db";
import Category from "@/models/Category";


export async function POST(req) {
    await db.connect()

    try {
        const body = await req.json()
        const newCategory = await Category.create(body)

        return new Response(JSON.stringify(newCategory), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}