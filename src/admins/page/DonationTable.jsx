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
            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 text-green-700">Donations Management</h1>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

                {/* Summary Box */}
                <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-700 w-full md:w-auto">
                    <p className="text-gray-500">Total Donation Amount</p>
                    <h2 className="text-3xl text-green-700 font-bold mt-2">
                        ${Number(totalAmount).toFixed(2)}
                    </h2>
                </div>

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    className="flex gap-2 w-full md:w-auto"
                >
                    <input
                        type="text"
                        placeholder="Search . . . ."
                        className="border px-3 py-2 rounded-lg flex-1 md:flex-none border-green-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Search
                    </button>
                </form>

            </div>


            {/* Loading */}
            {loading && (
                <p className="text-center text-gray-500 py-4">Loading donations...</p>
            )}

            {/* Table */}
            {!loading && (
                <div className="shadow rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-green-600 text-white text-left text-sm">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Transaction</th>
                                <th className="p-3">Status</th>
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
                                            {donation.status === "paid" ? (
                                                <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-xs">
                                                    PAID
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-yellow-200 text-yellow-700 rounded-full text-xs">
                                                    PENDING
                                                </span>
                                            )}
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
            <div className="flex justify-center items-center gap-3 mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => fetchDonations(currentPage - 1, search)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>

                <span>
                    Page {currentPage} of {lastPage}
                </span>

                <button
                    disabled={currentPage === lastPage}
                    onClick={() => fetchDonations(currentPage + 1, search)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
