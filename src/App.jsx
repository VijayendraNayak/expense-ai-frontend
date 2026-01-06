import Navbar from "./components/Navbar"
import AddExpense from "./pages/AddExpense"

function App() {

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <AddExpense />
    </div>
  )
}

export default App