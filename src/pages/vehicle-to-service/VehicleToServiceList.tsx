import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../extra/loader';

const VehicleToServiceList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchVehicles = async (page) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/services/vehicles/list`, {
                params: {
                    page,
                    limit: 10,
                },
            });

            setVehicles(data.vehicles);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Error fetching vehicles:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link className="font-medium" to="/">
                                Dashboard /
                            </Link>
                        </li>
                        <li className="font-medium text-primary">VEHICLE TO SERVICE</li>
                    </ol>
                </nav>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Vehicle Type</th>
                                <th className="border px-4 py-2">Per KM</th>
                                <th className="border px-4 py-2">Capacity</th>
                                <th className="border px-4 py-2">Commision</th>
                                <th className="border px-4 py-2">Commision Type</th>
                                <th className="border px-4 py-2">Enabled</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">No vehicles found.</td>
                                </tr>
                            ) : (
                                vehicles.map((vehicle, idx) => (
                                    <tr key={vehicle.id}>
                                        <td className="border px-4 py-2">{(page - 1) * 10 + idx + 1}</td>
                                        <td className="border px-4 py-2">{vehicle.name}</td>
                                        <td className="border px-4 py-2">{vehicle.vehicleTypeName}</td>
                                        <td className="border px-4 py-2">{vehicle.perKm}</td>
                                        <td className="border px-4 py-2">{vehicle.capacity}</td>
                                        <td className="border px-4 py-2">{vehicle.commission}</td>
                                        <td className="border px-4 py-2">{vehicle.commissionType}</td>
                                        <td className="border px-4 py-2">{vehicle.enabled ? 'Yes' : 'No'}</td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button
                                                    onClick={() => window.open(`/vts/${vehicle.id}`, '_blank')}
                                                    className="hover:text-primary"
                                                >
                                                    <svg
                                                        className="fill-current"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M3 21h2.586L17.657 8.93a1 1 0 0 0 0-1.415l-2.172-2.172a1 1 0 0 0-1.415 0L3 16.586V21zm16.172-13.657l-2.172-2.172 1.415-1.415 2.172 2.172-1.415 1.415z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M2 21v-2.414L14.586 6l2.828 2.828L4.828 21H2z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center flex-wrap gap-2">
                {/* Prev Button */}
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {/* Page numbers */}
                {(() => {
                    const maxButtons = 10;
                    let start = Math.max(1, page - Math.floor(maxButtons / 2));
                    let end = start + maxButtons - 1;
                    if (end > totalPages) {
                        end = totalPages;
                        start = Math.max(1, end - maxButtons + 1);
                    }

                    const buttons = [];
                    for (let i = start; i <= end; i++) {
                        buttons.push(
                            <button
                                key={i}
                                className={`px-3 py-1 rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
                                onClick={() => handlePageChange(i)}
                            >
                                {i}
                            </button>
                        );
                    }

                    return buttons;
                })()}

                {/* "..." and Last page */}
                {page < totalPages - 4 && (
                    <>
                        <span className="px-2 text-gray-500">...</span>
                        <button
                            className={`px-3 py-1 rounded ${page === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
                            onClick={() => handlePageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default VehicleToServiceList;
