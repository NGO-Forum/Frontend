import { useEffect, useState } from "react";
import { api } from "../../API/api"; // axios instance

export default function DonationTable() {
    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchDonations = async (page = 1, searchQuery = "") => {
        setLoading(true);
        try {
            const res = await api.get("/admin/donations", {
                params: {
                    page: page,
                    search: searchQuery,
                },
            });

            setDonations(res.data.donations.data);
            setCurrentPage(res.data.donations.current_page);
            setLastPage(res.data.donations.last_page);
            setTotalAmount(res.data.totalAmount);

        } catch (error) {
            console.error("Failed to fetch donations:", error);
        }
        setLoading(false);
    };

    // Initial Load
    useEffect(() => {
        fetchDonations();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDonations(1, search);
    };

    return (
        <div>
            {/* HEADER + SUMMARY + SEARCH */}
            <div className="relative mb-4 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">

                <div className="relative p-6 space-y-6">

                    {/* Top Title */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/20">
                                💰
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    Donations Management
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Track and manage all donation records
                                </p>
                            </div>
                        </div>

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="flex w-full max-w-md items-center gap-2"
                        >
                            <div className="flex flex-1 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                                <input
                                    type="text"
                                    placeholder="Search donations..."
                                    className="w-full bg-transparent py-2 text-sm outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <button className="rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] hover:shadow-lg">
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Summary Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-sm">
                            <p className="text-sm text-slate-500">Total Donation Amount</p>
                            <h2 className="mt-2 text-3xl font-bold text-emerald-700">
                                ${Number(totalAmount).toFixed(2)}
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Updated from all records
                            </p>
                        </div>

                        {/* Optional extra cards */}
                        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-sm">
                            <p className="text-sm text-slate-500">Total Donations</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                {donations.length}
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-sm">
                            <p className="text-sm text-slate-500">Average Donation</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                $
                                {donations.length
                                    ? (totalAmount / donations.length).toFixed(2)
                                    : "0.00"}
                            </h2>
                        </div>

                    </div>

                </div>
            </div>


            {/* Loading */}
            {loading && (
                <p className="text-center text-gray-500 py-4">Loading donations...</p>
            )}


            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2">
                    <div>
                        <h2 className="text-lg font-bold text-green-700">Donations List</h2>
                    </div>
                </div>
                {!loading && (
                    <div className="overflow-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-green-600 text-white text-left text-sm">
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Transaction</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3 text-center">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {donations.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center p-6 text-gray-500"
                                        >
                                            No donations found.
                                        </td>
                                    </tr>
                                ) : (
                                    donations.map((donation) => (
                                        <tr key={donation.id} className="border-b">
                                            <td className="px-4 py-2">{donation.full_name}</td>
                                            <td className="px-4 py-2">{donation.email}</td>
                                            <td className="px-4 py-2 font-semibold text-green-700">
                                                ${Number(donation.amount).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-2">{donation.transaction_id}</td>

                                            <td className="px-4 py-2">
                                                {donation.phone}
                                            </td>

                                            <td className="px-4 py-2 text-center">
                                                {new Date(donation.created_at).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-2 flex flex-col gap-4 bg-white px-5 py-2 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-slate-600">
                        Page <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
                        <span className="font-bold text-emerald-700">{lastPage}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => fetchDonations(currentPage - 1, search)}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${currentPage === 1
                                ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700"
                                }`}
                        >
                            Prev
                        </button>

                        <button
                            disabled={currentPage === lastPage}
                            onClick={() => fetchDonations(currentPage + 1, search)}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${currentPage === lastPage
                                ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
