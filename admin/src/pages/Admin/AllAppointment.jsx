import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, backendURL } = useContext(AdminContext);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('_');
    const date = new Date(`${year}-${month}-${day}`);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(`${backendURL}/api/admin/cancel-appointment`, { appointmentId: id }, {
        headers: { aToken }
      });
      if (data.success) {
        toast.warn(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteCancelledAppointment = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;
    setDeletingId(id);
    try {
      const { data } = await axios.post(`${backendURL}/api/admin/delete-appointment`, { appointmentId: id }, {
        headers: { aToken }
      });
      if (data.success) {
        toast.info(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setDeletingId(null);
  };

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(item => {
        if (filter === "cancelled") return item.cancelled;
        if (filter === "completed") return item.isCompleted;
        if (filter === "pending") return !item.cancelled && !item.isCompleted;
        return true;
      })
      .filter(item => {
        if (paymentFilter === "paid") return item.payment;
        if (paymentFilter === "unpaid") return !item.payment;
        return true;
      })
      .filter(item =>
        item.userId?.username?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(`${a.slotDate.split("_").reverse().join("-")} ${a.slotTime}`);
        const dateB = new Date(`${b.slotDate.split("_").reverse().join("-")} ${b.slotTime}`);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [appointments, filter, paymentFilter, search, sortOrder]);

  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAppointments, currentPage]);

  const handleExportCSV = () => {
    const headers = ["Patient", "Doctor", "Email", "Phone", "Date", "Time", "Status", "Payment", "Amount"];
    const rows = filteredAppointments.map((item) => [
      item.userId?.username || "N/A",
      item.docId?.name || "N/A",
      item.userId?.email || "-",
      item.userId?.phone || "-",
      formatDate(item.slotDate),
      item.slotTime,
      item.cancelled ? "Cancelled" : item.isCompleted ? "Completed" : "Pending",
      item.payment ? "Paid" : "Not Paid",
      item.amount * 86,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "appointments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("All Appointments Report", 14, 16);
    const rows = filteredAppointments.map((item) => [
      item.userId?.username,
      item.docId?.name,
      item.userId?.email || "-",
      item.userId?.phone || "-",
      formatDate(item.slotDate),
      item.slotTime,
      item.cancelled ? "Cancelled" : item.isCompleted ? "Completed" : "Pending",
      item.payment ? "Paid" : "Not Paid",
      `₹ ${item.amount * 86}`,
    ]);
    doc.autoTable({
      startY: 20,
      head: [["Patient", "Doctor", "Email", "Phone", "Date", "Time", "Status", "Payment", "Amount"]],
      body: rows,
    });
    doc.save("appointments.pdf");
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto scroll-smooth">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <p className="text-2xl font-semibold text-primary">All Appointments</p>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">Export CSV</button>
          <button onClick={handleExportPDF} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">Export PDF</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {['all', 'cancelled', 'completed', 'pending'].map((status) => (
          <button
            key={status}
            onClick={() => { setFilter(status); setCurrentPage(1); }}
            className={`min-w-[110px] px-4 py-2 text-sm border rounded-full font-medium text-center transition-all duration-300 ${
              filter === status ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}

        <select onChange={(e) => setPaymentFilter(e.target.value)} value={paymentFilter} className="border border-gray-300 px-3 py-2 rounded text-sm">
          <option value="all">All Payments</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="border border-gray-300 px-3 py-2 rounded text-sm"
        >
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>

        <input
          type="text"
          placeholder="Search Patient"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto border border-gray-300 px-3 py-2 rounded text-sm"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1100px] space-y-1">
          <div className="grid grid-cols-12 gap-2 font-semibold text-xs border-b border-gray-300 py-2 text-gray-700 bg-gray-100 rounded">
            <p className="col-span-1">#</p>
            <p className="col-span-2">Patient</p>
            <p className="col-span-2">Doctor</p>
            <p className="col-span-2">Date & Time</p>
            <p className="col-span-1">Status</p>
            <p className="col-span-1">Payment</p>
            <p className="col-span-1">Amount</p>
            <p className="col-span-2">Action</p>
          </div>

          {paginatedAppointments.length > 0 ? (
            paginatedAppointments.map((item, index) => (
              <div key={item._id} className={`grid grid-cols-12 gap-2 items-center text-sm border-b border-gray-200 py-2 hover:bg-blue-50 transition rounded ${item.cancelled ? 'bg-red-50' : ''}`}>
                <p className="col-span-1">{(currentPage - 1) * itemsPerPage + index + 1}</p>

                <div className="col-span-2 flex items-center gap-2">
                  <img src={item.userId?.image || "./default.webp"} alt="user" className="w-8 h-8 rounded-full object-cover" />
                  <span>{item.userId?.username || "N/A"}</span>
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <img src={item.docId?.image || "./default.webp"} alt="doctor" className="w-8 h-8 rounded-full object-cover" />
                  <span>{item.docId?.name || "N/A"}</span>
                </div>

                <p className="col-span-2 text-xs">{formatDate(item.slotDate)} | {item.slotTime}</p>

                <p className="col-span-1 font-medium">
                  {item.cancelled ? (
                    <span className="text-red-500">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-500">Completed</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </p>

                <p className="col-span-1">
                  {item.payment ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-500">Not Paid</span>
                  )}
                </p>

                <p className="col-span-1">₹ {item.amount * 86}</p>

                <div className="col-span-2 flex flex-col gap-1">
                  {item.cancelled ? (
                    <button
                      onClick={() => deleteCancelledAppointment(item._id)}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm mt-4">No appointments found.</p>
          )}

          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: Math.ceil(filteredAppointments.length / itemsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${currentPage === i + 1 ? "bg-primary text-white" : "bg-white text-gray-700"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AllAppointment };
