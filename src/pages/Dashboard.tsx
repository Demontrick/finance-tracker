import { useState } from "react"
import styled from "styled-components"
import { mockTransactions } from "../services/mockData"
import type { Transaction } from "../models/Transaction"
import { theme } from "../theme/tokens"

import AddTransactionModal from "../components/AddTransactionModal"
import SummaryCard from "../components/SummaryCard"
import TransactionList from "../components/TransactionList"
import FilterBar from "../components/FilterBar"
import FinanceChart from "../components/FinanceChart"

const PageWrapper = styled.div`
  background: ${theme.colors.background};
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
  max-width: ${theme.maxWidth};
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  color: ${theme.colors.text.primary};
`

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${theme.colors.text.primary};
`

const AddButton = styled.button`
  background: ${theme.colors.primary};
  border: none;
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.md};
  margin-bottom: ${theme.spacing.md};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`

function Dashboard() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions)
  const [filter, setFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const addTransaction = (transaction: Transaction) => {
    if (editing) {
      setTransactions(
        transactions.map((t) =>
          t.id === transaction.id ? transaction : t
        )
      )
      setEditing(null)
    } else {
      setTransactions([transaction, ...transactions])
    }
  }

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const startEdit = (transaction: Transaction) => {
    setEditing(transaction)
    setShowModal(true)
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "All") return true
    if (filter === "Income") return t.type === "Income"
    if (filter === "Expense") return t.type === "Expense"
    if (filter === "Pending") return t.status === "Pending"
    if (filter === "Completed") return t.status === "Completed"
    return true
  })

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <PageWrapper>
      <Container>
        <PageTitle>Dashboard</PageTitle>

        <AddButton
          onClick={() => {
            setShowModal(true)
            setEditing(null)
          }}
        >
          + Add Transaction
        </AddButton>

        <SummaryGrid>
          <SummaryCard title="Balance" amount={balance} />
          <SummaryCard
            title="Income"
            amount={totalIncome}
            color={theme.colors.success}
          />
          <SummaryCard
            title="Expenses"
            amount={totalExpenses}
            color={theme.colors.danger}
          />
        </SummaryGrid>

        <FinanceChart income={totalIncome} expenses={totalExpenses} />

        <FilterBar filter={filter} setFilter={setFilter} />

        <TransactionList
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onEdit={startEdit}
        />

        {showModal && (
          <AddTransactionModal
            onAdd={addTransaction}
            onClose={() => {
              setShowModal(false)
              setEditing(null)
            }}
            existing={editing || undefined}
          />
        )}
      </Container>
    </PageWrapper>
  )
}

export default Dashboard