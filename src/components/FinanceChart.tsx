import styled from "styled-components"
import { theme } from "../theme/tokens"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts"

type Props = {
  income: number
  expenses: number
}

const Wrapper = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  margin-bottom: ${theme.spacing.lg};
`

const ChartTitle = styled.h2`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`

function FinanceChart({ income, expenses }: Props) {
  const data = [
    { name: "Income", amount: income },
    { name: "Expenses", amount: expenses }
  ]

  const barColors = [theme.colors.success, theme.colors.danger]

  return (
    <Wrapper>
      <ChartTitle>Financial Overview</ChartTitle>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.colors.surface}
            />

            <XAxis
              dataKey="name"
              stroke={theme.colors.text.secondary}
              tick={{ fill: theme.colors.text.secondary, fontSize: 13 }}
            />

            <YAxis
              stroke={theme.colors.text.secondary}
              tick={{ fill: theme.colors.text.secondary, fontSize: 13 }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              contentStyle={{
                background: theme.colors.background,
                border: `1px solid ${theme.colors.surface}`,
                borderRadius: theme.radius.md,
                color: theme.colors.text.primary
              }}
              formatter={(value) => [`$${value}`, "Amount"]}
            />

            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={barColors[index]} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Wrapper>
  )
}

export default FinanceChart
