import styled from "styled-components"
import { theme } from "../theme/tokens"
import { formatCurrency } from "../utils/format"
import type { Transaction } from "../models/Transaction"

type Props = {
  transaction: Transaction
  onDelete: (id: number) => void
  onEdit: (transaction: Transaction) => void
}

const Row = styled.div`
  border-bottom: 1px solid ${theme.colors.surface};
  padding: ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${theme.radius.md};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.surface};
  }
`

const Title = styled.h3`
  margin: 0 0 4px 0;
  font-weight: 600;
  font-size: 15px;
  color: ${theme.colors.text.primary};
`

const DateText = styled.p`
  margin: 0;
  color: ${theme.colors.text.secondary};
  font-size: 13px;
`

const Amount = styled.p<{ $type: "Income" | "Expense" }>`
  margin: 0;
  color: ${({ $type }) =>
    $type === "Income" ? theme.colors.success : theme.colors.danger};
  font-weight: 700;
  font-size: 18px;
`

const StatusBadge = styled.span<{ $status: string }>`
  background: ${({ $status }) =>
    $status === "Completed" ? theme.colors.success : theme.colors.warning};
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
`

const ActionButton = styled.button<{ $variant: "edit" | "delete" }>`
  background: ${({ $variant }) =>
    $variant === "edit" ? "#2563eb" : theme.colors.danger};
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  font-size: 13px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`

const MetaRow = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  justify-content: flex-end;
  margin-top: 4px;
  align-items: center;
`

const ActionRow = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xs};
`

const TypeLabel = styled.span`
  font-size: 13px;
  color: ${theme.colors.text.secondary};
`

function TransactionRow({ transaction, onDelete, onEdit }: Props) {
  return (
    <Row>
      <div>
        <Title>{transaction.title}</Title>
        <DateText>{transaction.date}</DateText>
      </div>

      <div style={{ textAlign: "right" }}>
        <Amount $type={transaction.type}>
          {formatCurrency(transaction.amount)}
        </Amount>

        <MetaRow>
          <TypeLabel>{transaction.type}</TypeLabel>
          <StatusBadge $status={transaction.status}>
            {transaction.status}
          </StatusBadge>
        </MetaRow>

        <ActionRow>
          <ActionButton $variant="edit" onClick={() => onEdit(transaction)}>
            Edit
          </ActionButton>
          <ActionButton
            $variant="delete"
            onClick={() => onDelete(transaction.id)}
          >
            Delete
          </ActionButton>
        </ActionRow>
      </div>
    </Row>
  )
}

export default TransactionRow