import React, { useEffect, useState } from "react";

interface DashboardProps {
    siteId: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ siteId }) => {

    return (
        <div className="p-6 bg-[#16161a] h-[calc(100vh-61px)] text-[#fffffe]">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#24242a] p-6 rounded-lg">
                    <h3 className="text-xl mb-4">Posts de Blog Recentes</h3>
                    <button className="mt-4 bg-[#7f5af0] px-4 py-2 rounded">
                        Ver mais
                    </button>
                </div>
            </div>
        </div>
    );
};
