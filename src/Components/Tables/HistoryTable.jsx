import { useState, useEffect } from "react"
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

  const fetchTransactions = () => {
    // Simular una llamada a la API
    const mockData = []
    const start = page * rowsPerPage + 1
    const end = start + rowsPerPage
    for (let i = start; i < end; i++) {
      mockData.push({
        member_number: `000${i}`,
        email: `user${i}@example.com`,
        tickets: Math.floor(Math.random() * 20) + 1,
        description: `Reserva ${Math.floor(Math.random() * 3) + 1} hora(s)`,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      })
    }
    // Ordenar por fecha, la más reciente primero
    mockData.sort((a, b) => new Date(b.date) - new Date(a.date))
    setTransactions(mockData)
    setTotalTransactions(100) // Simular un total de 100 transacciones
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
              {transactions.map((row) => (
                <tr key={row.member_number}>
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

