import db from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const product = await Product.findById(id)

        return new Response(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}
export async function DELETE(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const product = await Product.findById(id)
      
        await Product.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Successfully deleted Product'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 }) 
    }
}
export async function PUT(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const body = await req.json()
        const product = await Product.findById(id)

        const updatedProduct = await ProductfindByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(updatedProduct), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}