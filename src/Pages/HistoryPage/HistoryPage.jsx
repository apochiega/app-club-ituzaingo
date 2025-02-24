import { useState, useEffect } from "react"
import "./styles.css"

const columns = [
  { id: "member_number", label: "N° Socio", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "tickets", label: "Tickets", minWidth: 100, align: "right" },
  { id: "date", label: "Fecha", minWidth: 120 },
  { id: "description", label: "Descripción", minWidth: 200 },
]

const HistoryPage = () => {
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
    <div className="container-fluid px-3 py-4">
      <h1 className="text-center mb-4">Historial de transacciones</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th colSpan={2} className="text-center">
                Usuario
              </th>
              <th colSpan={3} className="text-center">
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
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <select className="form-select" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handleChangePage(page - 1)} disabled={page === 0}>
                Anterior
              </button>
            </li>
            <li className="page-item active">
              <span className="page-link">{page + 1}</span>
            </li>
            <li className={`page-item ${(page + 1) * rowsPerPage >= totalTransactions ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handleChangePage(page + 1)}
                disabled={(page + 1) * rowsPerPage >= totalTransactions}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default HistoryPage

