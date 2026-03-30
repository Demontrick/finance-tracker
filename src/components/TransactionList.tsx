import styled from "styled-components"
import { theme } from "../theme/tokens"
import type { Transaction } from "../models/Transaction"
import TransactionRow from "./TransactionRow"

type Props = {
  transactions: Transaction[]
  onDelete: (id: number) => void
  onEdit: (transaction: Transaction) => void
}

const Wrapper = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
`

const ListTitle = styled.h2`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.text.secondary};
`

const EmptyTitle = styled.h3`
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text.secondary};
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
`

function TransactionList({ transactions, onDelete, onEdit }: Props) {
  return (
    <Wrapper>
      <ListTitle>Transactions ({transactions.length})</ListTitle>

      {transactions.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No transactions found</EmptyTitle>
          <EmptyText>Add a transaction or change filters</EmptyText>
        </EmptyState>
      ) : (
        transactions.map((t) => (
          <TransactionRow
            key={t.id}
            transaction={t}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </Wrapper>
  )
}

export default TransactionList