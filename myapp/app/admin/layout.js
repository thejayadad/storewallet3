'use client'

import Aside from "@/components/Dashboard/Aside/Aside"


export default function DashboardLayout({ children }) {
    return <section>
    <section className="grid grid-cols-1 lg:grid-cols-8 gap-4 p-4">
        <Aside />
        {children}

        </section>
        </section>
  }