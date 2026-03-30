import { useState } from "react"
import styled from "styled-components"
import { theme } from "../theme/tokens"
import type { Transaction } from "../models/Transaction"

type Props = {
  onAdd: (transaction: Transaction) => void
  onClose: () => void
  existing?: Transaction
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const Modal = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const ModalTitle = styled.h2`
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: 18px;
  color: ${theme.colors.text.primary};
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  background: ${theme.colors.background};
  border: 1px solid #2d3748;
  border-radius: ${theme.radius.md};
  color: ${theme.colors.text.primary};
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  background: ${theme.colors.background};
  border: 1px solid #2d3748;
  border-radius: ${theme.radius.md};
  color: ${theme.colors.text.primary};
  font-size: 14px;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.xs};
`

const ModalButton = styled.button<{ $variant: "cancel" | "confirm" }>`
  background: ${({ $variant }) =>
    $variant === "confirm" ? theme.colors.primary : theme.colors.surface};
  border: ${({ $variant }) =>
    $variant === "cancel" ? `1px solid #2d3748` : "none"};
  color: ${theme.colors.text.primary};
  padding: 9px 18px;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`

function AddTransactionModal({ onAdd, onClose, existing }: Props) {
  const [title, setTitle] = useState(existing?.title || "")
  const [amount, setAmount] = useState(existing?.amount || 0)
  const [type, setType] = useState<"Income" | "Expense">(
    existing?.type || "Expense"
  )
  const [status, setStatus] = useState<"Pending" | "Completed">(
    existing?.status || "Pending"
  )

  const handleSubmit = () => {
    if (!title || amount <= 0) return

    const newTransaction: Transaction = {
      id: existing ? existing.id : Date.now(),
      title,
      amount,
      type,
      status,
      date: existing
        ? existing.date
        : new Date().toISOString().split("T")[0]
    }

    onAdd(newTransaction)
    onClose()
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          {existing ? "Edit Transaction" : "Add Transaction"}
        </ModalTitle>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <Select
          value={type}
          onChange={(e) => setType(e.target.value as "Income" | "Expense")}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </Select>

        <Select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Pending" | "Completed")
          }
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </Select>

        <ActionRow>
          <ModalButton $variant="cancel" onClick={onClose}>
            Cancel
          </ModalButton>
          <ModalButton $variant="confirm" onClick={handleSubmit}>
            {existing ? "Save" : "Add"}
          </ModalButton>
        </ActionRow>
      </Modal>
    </Overlay>
  )
}

export default AddTransactionModal