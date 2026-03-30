import styled from "styled-components"
import { theme } from "../theme/tokens"
import { formatCurrency } from "../utils/format"

type Props = {
  title: string
  amount: number
  color?: string
}

const Card = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const Label = styled.p`
  margin: 0;
  color: ${theme.colors.text.secondary};
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Amount = styled.h2<{ $color?: string }>`
  margin: 0;
  color: ${({ $color }) => $color || theme.colors.text.primary};
  font-size: 28px;
  font-weight: 700;
`

function SummaryCard({ title, amount, color }: Props) {
  return (
    <Card>
      <Label>{title}</Label>
      <Amount $color={color}>{formatCurrency(amount)}</Amount>
    </Card>
  )
}

export default SummaryCard