import { useState, useEffect } from "react"
import apiService from "../../axiosApiService/axiosWrapper"
import "./HistoryTable.css"

const columns = [
  { id: "member_number", label: "N° Socio", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "tickets", label: "Tickets", minWidth: 100, align: "right" },
  { id: "date", label: "Fecha", minWidth: 120 },
  { id: "description", label: "Descripción", minWidth: 200 },
]

const HistoryTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [transactions, setTransactions] = useState([])
  const [totalTransactions, setTotalTransactions] = useState(0)

  useEffect(() => {
    fetchTransactions()
  }, [page, rowsPerPage])

  const fetchTransactions = async () => {
    try {
      const response = await apiService.getAllTransactions()
      const data = response.data

      // Ordenar por fecha, la más reciente primero
      data.sort((a, b) => new Date(b.date) - new Date(a.date))
      setTransactions(data)
      setTotalTransactions(data.length) // Ajustar el total de transacciones basado en la respuesta
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className="history-table-container">
      <div className="mt-5">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th colSpan={2} className="title">
                  Usuario
                </th>
                <th colSpan={3} className="title">
                  Detalles de la transacción
                </th>
              </tr>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    className={column.align === "right" ? "text-right" : ""}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <tr key={row.user_id}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <td key={column.id} className={column.align === "right" ? "text-right" : ""}>
                        {value}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <div className="rows-per-page">
            <span>Rows per page:</span>
            <select className="rows-select" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="pagination-range">
            {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, totalTransactions)} of {totalTransactions}
          </div>
          <div className="pagination-actions">
            <button className="pagination-button" onClick={() => handleChangePage(page - 1)} disabled={page === 0}>
              <svg viewBox="0 0 24 24" width="24" height="24" className="pagination-arrow">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              className="pagination-button"
              onClick={() => handleChangePage(page + 1)}
              disabled={(page + 1) * rowsPerPage >= totalTransactions}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="pagination-arrow">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryTable