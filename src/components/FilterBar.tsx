import styled from "styled-components"
import { theme } from "../theme/tokens"

type FilterOption = "All" | "Income" | "Expense" | "Pending" | "Completed"

type Props = {
  filter: string
  setFilter: (value: string) => void
}

const Wrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
  flex-wrap: wrap;
`

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: ${theme.radius.md};
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.2s ease, transform 0.1s ease;
  background: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${theme.colors.text.primary};

  &:hover {
    background: ${({ $active }) =>
      $active ? theme.colors.primary : "#2d3f55"};
  }

  &:active {
    transform: scale(0.97);
  }
`

const FILTERS: FilterOption[] = [
  "All", "Income", "Expense", "Pending", "Completed"
]

function FilterBar({ filter, setFilter }: Props) {
  return (
    <Wrapper>
      {FILTERS.map((name) => (
        <FilterButton
          key={name}
          $active={filter === name}
          onClick={() => setFilter(name)}
        >
          {name}
        </FilterButton>
      ))}
    </Wrapper>
  )
}

export default FilterBar